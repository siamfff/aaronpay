import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShieldCheck, Copy, Check, CheckCircle2, AlertCircle, Loader2,
  ChevronRight, ChevronLeft, ClipboardPaste, Lock,
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

type MethodKey = "bkash" | "nagad" | "rocket";

const METHODS: Record<MethodKey, { name: string; logo: string; color: string; soft: string }> = {
  bkash:  { name: "bKash",  logo: "https://i.postimg.cc/jS31XPDW/image.png", color: "#E2136E", soft: "#FDEEF5" },
  nagad:  { name: "Nagad",  logo: "https://i.postimg.cc/rsTZm9HV/image.png", color: "#F7941D", soft: "#FEF4E6" },
  rocket: { name: "Rocket", logo: "https://i.postimg.cc/qMh6qd8v/image.png", color: "#8C3494", soft: "#F5ECF6" },
};

const DEMO_SESSION = {
  merchantId: "merchant_demo",
  merchantName: "Demo Store",
  merchantLogo: "",
  orderId: "ORDER-1001",
  amount: 500,
  currency: "BDT",
  paymentMethods: {
    bkash: { enabled: true, number: "01711111111" },
    nagad: { enabled: true, number: "01722222222" },
    rocket: { enabled: true, number: "01733333333" },
  },
};

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1500);
    } catch { /* clipboard blocked */ }
  };
  return { copied, copy };
}

function Stepper({ step }: { step: 1 | 2 }) {
  const items = ["Method", "Pay & verify"];
  return (
    <ol className="flex items-center gap-2 text-xs sm:text-sm font-semibold" aria-label="Checkout progress">
      {items.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <li key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full grid place-items-center text-[11px] sm:text-xs transition-colors ${
              done ? "bg-emerald-500 text-white" : active ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"}`}>
              {done ? <Check size={13} strokeWidth={3} /> : n}
            </span>
            <span className={active || done ? "text-slate-900" : "text-slate-400"}>{label}</span>
            {i < items.length - 1 && <span className={`h-px flex-1 ${done ? "bg-emerald-400" : "bg-slate-200"}`} />}
          </li>
        );
      })}
    </ol>
  );
}

export default function CheckoutPage() {
  const { sessionId } = useParams();
  const { copied, copy } = useCopy();

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedMethod, setSelectedMethod] = useState<MethodKey | null>(null);
  const [txnId, setTxnId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    async function loadSession() {
      if (!sessionId) { setLoading(false); setErrorMsg("Invalid payment link."); return; }
      try {
        const snap = await getDoc(doc(db, "paymentSessions", sessionId));
        if (snap.exists()) setSession(snap.data());
        else if (import.meta.env.DEV) setSession(DEMO_SESSION);
        else setErrorMsg("This payment link is invalid or has expired.");
      } catch {
        setErrorMsg("Could not load the payment session. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, [sessionId]);

  useEffect(() => {
    if (!isSuccess) return;
    if (countdown <= 0) {
      if (session?.redirectUrl) window.location.href = session.redirectUrl;
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [isSuccess, countdown, session]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [selectedMethod]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTxnId(text.trim().toUpperCase().replace(/\s/g, ""));
    } catch { /* permission denied */ }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId || !session || !selectedMethod) return;
    setIsVerifying(true);
    setErrorMsg("");
    
    try {
      // রিলেটিভ ইউআরএল ব্যবহার করা হলো যাতে ব্রাউজার ব্লক না করে
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId, merchantId: session.merchantId, txnId,
          method: selectedMethod, amount: session.amount,
        }),
      });
      
      const data: any = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Verification failed");
      setIsSuccess(true);

    } catch (err: any) {
      // লোকাল ডেভেলপমেন্টে UI টেস্ট করার জন্য ফলব্যাক (Worker কাজ না করলে)
      if (err.message === "Failed to fetch" && import.meta.env.DEV) {
        setTimeout(() => setIsSuccess(true), 1000);
      } else {
        setErrorMsg(err.message === "Failed to fetch"
          ? "Network problem. Make sure server is running." : err.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-slate-50 grid place-items-center">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[100dvh] bg-slate-50 grid place-items-center p-4">
        <div className="bg-white max-w-sm w-full rounded-3xl border border-slate-200 p-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-500 grid place-items-center mb-4">
            <AlertCircle size={28} />
          </div>
          <h1 className="text-lg font-bold text-slate-900">Can’t open this payment</h1>
          <p className="text-sm text-slate-500 mt-2">{errorMsg}</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    const rows = [
      ["Merchant", session.merchantName],
      ["Order ID", session.orderId],
      ["Method", selectedMethod ? METHODS[selectedMethod].name : "-"],
      ["TrxID", txnId],
    ];
    return (
      <div className="min-h-[100dvh] bg-slate-50 grid place-items-center p-4 sm:p-6">
        <div className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="bg-emerald-500 text-white px-6 sm:px-10 py-8 sm:py-10 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full grid place-items-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="text-2xl font-extrabold">Payment received</h1>
            <p className="text-emerald-50 text-sm mt-1">We verified your transaction.</p>
            <p className="text-4xl font-extrabold mt-5 tabular-nums">৳ {session.amount}</p>
          </div>
          <dl className="px-6 sm:px-10 py-6 space-y-3 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-slate-500 shrink-0">{k}</dt>
                <dd className={`font-semibold text-slate-900 text-right break-all ${k === "TrxID" ? "font-mono" : ""}`}>{v}</dd>
              </div>
            ))}
          </dl>
          {session.redirectUrl ? (
            <div className="px-6 sm:px-10 pb-8">
              <a href={session.redirectUrl}
                 className="block w-full text-center bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-colors">
                Back to {session.merchantName}
              </a>
              <p className="text-xs text-slate-400 text-center mt-3">Returning automatically in {Math.max(countdown, 0)}s</p>
            </div>
          ) : (
            <p className="px-6 pb-8 text-xs text-slate-400 text-center">You can safely close this page.</p>
          )}
        </div>
      </div>
    );
  }

  const enabled = (Object.keys(METHODS) as MethodKey[]).filter((k) => session.paymentMethods?.[k]?.enabled);
  const brand = selectedMethod ? METHODS[selectedMethod] : null;
  const number: string = selectedMethod ? session.paymentMethods[selectedMethod]?.number ?? "" : "";
  const txnValid = txnId.length >= 6;

  const submitLabel = isVerifying
    ? <><Loader2 size={18} className="animate-spin" /> Checking payment…</>
    : <>Confirm payment of ৳ {session.amount}</>;

  return (
    <div className="min-h-[100dvh] bg-slate-50 px-4 sm:px-6 py-5 sm:py-10 pb-28 lg:pb-10">
      <div className="mx-auto w-full max-w-md sm:max-w-xl lg:max-w-5xl grid gap-5 lg:gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-10 space-y-4">
          <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 grid place-items-center overflow-hidden shrink-0">
                {session.merchantLogo
                  ? <img src={session.merchantLogo} alt="" className="w-full h-full object-cover" />
                  : <span className="text-lg font-extrabold text-slate-700">{session.merchantName?.charAt(0)}</span>}
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-slate-900 truncate">{session.merchantName}</h1>
                <p className="text-xs text-slate-500 truncate">Order {session.orderId}</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1 shrink-0">
                <Lock size={11} /> Secure
              </span>
            </div>

            <div className="mt-5 lg:mt-7 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">Amount to pay</p>
                <p className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1">
                  <span className="text-2xl lg:text-3xl font-semibold text-slate-400 mr-1">৳</span>{session.amount}
                </p>
              </div>
              {selectedMethod && (
                <button type="button" onClick={() => copy("amount", String(session.amount))}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 bg-slate-100 hover:bg-slate-200 active:scale-95 transition">
                  {copied === "amount" ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                </button>
              )}
            </div>

            {brand && (
              <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-3">
                <img src={brand.logo} alt="" className="w-9 h-9 rounded-lg p-1 object-contain" style={{ background: brand.soft }} />
                <div className="text-sm">
                  <p className="text-slate-500 text-xs">Paying with</p>
                  <p className="font-bold text-slate-900">{brand.name}</p>
                </div>
              </div>
            )}
          </section>

          <p className="hidden lg:flex text-xs text-slate-400 font-medium items-center gap-1.5 px-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secured by <Link to="/" className="font-bold text-slate-600 hover:text-slate-900 transition-colors">AaronPay</Link>
          </p>
        </aside>

        <main className="space-y-5 min-w-0">
          <div className="lg:bg-white lg:rounded-3xl lg:border lg:border-slate-200 lg:p-6 lg:shadow-sm">
            <Stepper step={selectedMethod ? 2 : 1} />
          </div>

          {errorMsg && (
            <div role="alert" className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p className="font-medium">{errorMsg}</p>
            </div>
          )}

          {!selectedMethod && (
            <section>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 mb-3">How would you like to pay?</h2>
              {enabled.length === 0 ? (
                <p className="text-sm text-slate-500 bg-white border border-slate-200 rounded-2xl p-5">
                  No payment methods are available for this order. Please contact the merchant.
                </p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-1">
                  {enabled.map((key) => {
                    const m = METHODS[key];
                    return (
                      <button key={key}
                        onClick={() => { setSelectedMethod(key); setErrorMsg(""); }}
                        className="group w-full min-h-[76px] flex items-center gap-4 p-4 bg-white border-2 border-transparent rounded-2xl shadow-sm ring-1 ring-slate-200 hover:ring-0 active:scale-[0.99] text-left transition-all focus-visible:outline-none focus-visible:ring-2"
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = m.color)}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}>
                        <div className="w-14 h-14 rounded-xl grid place-items-center shrink-0 p-1.5" style={{ background: m.soft }}>
                          <img src={m.logo} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-slate-900 block text-base">{m.name}</span>
                          <span className="text-xs text-slate-500">Send Money · takes about a minute</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {selectedMethod && brand && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <button type="button"
                onClick={() => { setSelectedMethod(null); setTxnId(""); setErrorMsg(""); }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 py-1 transition-colors">
                <ChevronLeft size={16} /> Change method
              </button>

              <section className="rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-200">
                <div className="px-5 sm:px-6 py-4 flex items-center gap-3 text-white" style={{ background: brand.color }}>
                  <img src={brand.logo} alt="" className="w-9 h-9 rounded-lg bg-white p-1 object-contain" />
                  <div>
                    <p className="font-bold leading-tight">{brand.name} Send Money</p>
                    <p className="text-xs text-white/80">Send exactly ৳ {session.amount}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 grid gap-5 sm:gap-6 xl:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">Send to this number</p>
                    <button type="button" onClick={() => copy("number", number)}
                      aria-label="Copy number"
                      className="mt-2 w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left active:scale-[0.99] transition"
                      style={{ background: brand.soft }}>
                      <span className="text-xl sm:text-2xl font-extrabold tracking-wider font-mono text-slate-900 break-all">{number}</span>
                      <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-white rounded-lg px-3 py-2"
                            style={{ background: brand.color }}>
                        {copied === "number" ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                      </span>
                    </button>
                  </div>

                  <ol className="space-y-3 text-sm text-slate-600">
                    {[
                      <>Open the <b className="text-slate-900">{brand.name}</b> app and choose <b className="text-slate-900">Send Money</b>.</>,
                      <>Paste the number above.</>,
                      <>Enter <b className="text-slate-900">৳ {session.amount}</b>, the exact amount.</>,
                      <>Confirm, then copy the <b className="text-slate-900">TrxID</b> from the confirmation message.</>,
                    ].map((text, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-5 h-5 rounded-full text-[11px] font-bold grid place-items-center shrink-0 mt-0.5"
                              style={{ background: brand.soft, color: brand.color }}>{i + 1}</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <form id="trx-form" onSubmit={handleVerify}
                    className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <label htmlFor="trxid" className="block text-sm font-bold text-slate-800 mb-2">Enter your TrxID</label>
                <div className="relative">
                  <input id="trxid" type="text" autoComplete="off" autoCapitalize="characters" spellCheck={false}
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value.toUpperCase().replace(/\s/g, ""))}
                    placeholder="e.g. 9BK3L2X7QA"
                    className="w-full pl-4 pr-28 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 font-mono text-base sm:text-lg font-bold tracking-wider focus:outline-none focus:bg-white transition-colors placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400"
                    style={{ borderColor: txnId ? brand.color : undefined }}
                    required />
                  <button type="button" onClick={handlePaste}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg px-3 py-2.5 transition-colors">
                    <ClipboardPaste size={14} /> Paste
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">You’ll find it in the SMS or the app’s transaction history.</p>

                <button type="submit" disabled={isVerifying || !txnValid}
                  className="hidden lg:flex w-full mt-5 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed items-center justify-center gap-2"
                  style={{ background: brand.color, boxShadow: `0 10px 24px -10px ${brand.color}` }}>
                  {submitLabel}
                </button>
              </form>
            </div>
          )}

          <p className="lg:hidden text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5 pt-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            Secured by <Link to="/" className="font-bold text-slate-600">AaronPay</Link>
          </p>
        </main>
      </div>

      {selectedMethod && brand && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-20 bg-white/95 backdrop-blur border-t border-slate-200 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto max-w-md sm:max-w-xl">
            <button type="submit" form="trx-form" disabled={isVerifying || !txnValid}
              className="w-full text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: brand.color }}>
              {submitLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}