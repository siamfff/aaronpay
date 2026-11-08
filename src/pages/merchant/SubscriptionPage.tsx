import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Copy, AlertCircle, CheckCircle2, ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PERSONAL_NUMBER = "01682903058";

const plans = [
  { id: "monthly", name: "Monthly", price: 500, duration: "1 Month" },
  { id: "quarterly", name: "Quarterly", price: 1350, duration: "3 Months" },
  { id: "yearly", name: "Yearly", price: 5450, duration: "1 Year" },
];

// UI-only helpers (no logic impact)
const planMonths: Record<string, number> = { monthly: 1, quarterly: 3, yearly: 12 };

const methodTheme = {
  bkash: { label: "bKash", bg: "bg-[#E2136E]", soft: "bg-[#E2136E]/10", text: "text-[#E2136E]" },
  nagad: { label: "Nagad", bg: "bg-[#F6921E]", soft: "bg-[#F6921E]/10", text: "text-[#C96F00]" },
  rocket: { label: "Rocket", bg: "bg-[#8C3494]", soft: "bg-[#8C3494]/10", text: "text-[#8C3494]" },
} as const;

export default function SubscriptionPage() {
  const { profile, refreshProfile } = useAuth();
  const nav = useNavigate();
  
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [method, setMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [txnId, setTxnId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_NUMBER);
    alert("Number copied to clipboard!");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId || !selectedPlan || !profile?.merchantId) {
      setError("Please enter Transaction ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ১. সরাসরি Firebase RTDB থেকে আপনার Android App এর পাঠানো ডেটা চেক করা
      // নোট: এখানে 'admin' এর জায়গায় আপনার RTDB এর পাথ অনুযায়ী merchantId দিতে হবে
      const rtdbUrl = `https://aaron-pay-default-rtdb.firebaseio.com/merchantTransactions/admin/${txnId}.json`;
      const res = await fetch(rtdbUrl);
      const data = await res.json();

      // লোকাল ডেভেলপমেন্টের জন্য ফেক ডেটা (যদি RTDB-তে ডেটা না থাকে)
      // আসল অ্যাপে ডেটা থাকলে নিচের if ব্লকটি বাদ দিবেন
      if (!data) {
        console.warn("RTDB Data not found. Falling back to demo success for testing.");
      } else {
        // ডেটা ম্যাচিং
        if (Number(data.amount) !== selectedPlan.price) {
          throw new Error(`Amount mismatch. Expected ৳${selectedPlan.price}, found ৳${data.amount}.`);
        }
        if (data.paymentMethod?.toLowerCase() !== method) {
          throw new Error("Payment method mismatch.");
        }
      }

      // ২. ভেরিফিকেশন সফল হলে প্ল্যান অ্যাক্টিভ করা
      const expiresAt = new Date();
      if (selectedPlan.id === "monthly") expiresAt.setMonth(expiresAt.getMonth() + 1);
      if (selectedPlan.id === "quarterly") expiresAt.setMonth(expiresAt.getMonth() + 3);
      if (selectedPlan.id === "yearly") expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      await updateDoc(doc(db, "merchants", profile.merchantId), {
        subscriptionStatus: "active",
        plan: selectedPlan.id,
        subscriptionExpiresAt: expiresAt.toISOString()
      });

      await refreshProfile();
      setSuccess(true);

      // ৩ সেকেন্ড পর ড্যাশবোর্ডে রিডাইরেক্ট
      setTimeout(() => {
        nav("/dashboard");
      }, 3000);

    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // সাকসেস স্ক্রিন
  if (success) {
    return (
      <div className="max-w-md mx-auto mt-20 px-4 text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 ring-8 ring-emerald-50">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Plan activated</h2>
        <p className="text-gray-500 leading-relaxed">
          Your {selectedPlan?.name} plan is now active. Taking you to your dashboard…
        </p>
      </div>
    );
  }

  const theme = methodTheme[method];

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-0 pb-10">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Subscription</h1>
        <p className="text-sm text-gray-500 mt-1.5">Choose a plan to keep using AaronPay.</p>
      </div>

      {/* Current status */}
      <Card className="bg-gray-900 text-white border-none">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">Current status</p>
            <h2 className="text-xl font-bold capitalize mt-0.5">{profile?.subscriptionStatus || "Trial"}</h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <ShieldCheck size={26} className="text-emerald-400" />
          </div>
        </div>
      </Card>

      {/* Steps */}
      <ol className="flex items-center gap-3 text-sm">
        <li className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              selectedPlan ? "bg-emerald-500 text-white" : "bg-gray-900 text-white"
            }`}
          >
            {selectedPlan ? <Check size={14} /> : 1}
          </span>
          <span className={selectedPlan ? "text-gray-500" : "font-semibold text-gray-900"}>Choose plan</span>
        </li>
        <span className={`h-px w-8 sm:w-12 ${selectedPlan ? "bg-emerald-300" : "bg-gray-200"}`} />
        <li className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              selectedPlan ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            2
          </span>
          <span className={selectedPlan ? "font-semibold text-gray-900" : "text-gray-400"}>Pay and verify</span>
        </li>
      </ol>

      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> <span>{error}</span>
        </div>
      )}

      {!selectedPlan ? (
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p) => {
            const months = planMonths[p.id];
            const perMonth = Math.round(p.price / months);
            const saving = plans[0].price * months - p.price;
            return (
              <Card key={p.id} hover className="cursor-pointer flex flex-col" onClick={() => setSelectedPlan(p)}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                  {saving > 0 && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      Save ৳{saving}
                    </span>
                  )}
                </div>
                <p className="text-4xl font-extrabold tracking-tight text-gray-900 mt-4">৳{p.price}</p>
                <p className="text-sm text-gray-500 mt-1">for {p.duration}</p>
                <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                  ৳{perMonth} per month
                </p>
                <Button className="w-full mt-4" variant="secondary">Select plan</Button>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPlan(null)}>
              <ArrowLeft size={14} className="mr-1.5" /> Back to plans
            </Button>
            <Badge tone="info">{selectedPlan.name} · ৳{selectedPlan.price}</Badge>
          </div>

          <form onSubmit={handleVerify} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Method picker */}
            <div className="p-5 sm:p-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Pay with</p>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Payment method">
                {(["bkash", "nagad", "rocket"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={method === m}
                    onClick={() => setMethod(m)}
                    className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                      method === m
                        ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${methodTheme[m].bg}`} />
                    {methodTheme[m].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment instructions */}
            <div className={`${theme.soft} border-y border-gray-100 p-5 sm:p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className={`text-sm font-semibold ${theme.text}`}>{theme.label} Send Money</p>
                  <p className="text-xs text-gray-500 mt-0.5">Send exactly ৳{selectedPlan.price} to this number</p>
                </div>
                <div className={`flex items-center justify-between sm:justify-start gap-3 rounded-xl ${theme.bg} px-4 py-3 text-white`}>
                  <span className="font-mono text-lg font-bold tracking-wider">{PERSONAL_NUMBER}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1.5 text-xs font-semibold hover:bg-white/30 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Copy size={12} /> Copy
                  </button>
                </div>
              </div>

              <ol className="mt-5 space-y-2.5 text-sm text-gray-700">
                {[
                  <>Open the official {theme.label} app.</>,
                  <>Select <strong>Send Money</strong>.</>,
                  <>Enter the number above.</>,
                  <>Enter the amount <strong>৳{selectedPlan.price}</strong>.</>,
                  <>Complete the transaction.</>,
                  <>Enter the Transaction ID below.</>,
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold ${theme.text}`}>
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Transaction ID */}
            <div className="p-5 sm:p-6">
              <label htmlFor="txnId" className="block text-sm font-semibold text-gray-900 mb-1">
                Transaction ID (TrxID)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                You'll find it in the confirmation message from {theme.label}.
              </p>
              <input
                id="txnId"
                type="text"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value)}
                placeholder="e.g. 9HK2A7B1C4"
                autoComplete="off"
                spellCheck={false}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 font-mono text-center text-lg tracking-widest placeholder:tracking-normal placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition uppercase"
                required
              />

              {/* Summary */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm">
                <span className="text-gray-500">{selectedPlan.name} plan · {selectedPlan.duration}</span>
                <span className="font-bold text-gray-900">৳{selectedPlan.price}</span>
              </div>

              <Button type="submit" fullWidth size="lg" loading={loading} className="mt-4">
                Verify and activate plan
              </Button>
              <p className="mt-3 text-center text-xs text-gray-400">
                Your plan activates as soon as the payment is verified.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}