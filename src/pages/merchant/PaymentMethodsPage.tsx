import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function PaymentMethodsPage() {
  const { profile, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [methods, setMethods] = useState({
    bkash: { enabled: false, number: "" },
    nagad: { enabled: false, number: "" },
    rocket: { enabled: false, number: "" },
  });

  // পেজ লোড হলে আগের ডেটা নিয়ে আসা
  useEffect(() => {
    const docId = profile?.merchantId || user?.uid;
    if (!docId) return;

    async function loadData() {
      try {
        const snap = await getDoc(doc(db, "merchants", docId));
        if (snap.exists()) {
          const data = snap.data();
          if (data.paymentMethods) {
            setMethods(data.paymentMethods);
          }
        }
      } catch (err) {
        console.error("Error loading payment methods:", err);
      }
    }
    loadData();
  }, [profile, user]);

  async function handleSave() {
    // merchantId না থাকলে uid ব্যবহার করব
    const docId = profile?.merchantId || user?.uid;

    if (!docId) {
      setError("User ID not found. Please re-login.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // setDoc with merge ব্যবহার করছি যাতে ডকুমেন্ট না থাকলে তৈরি হয়
      await setDoc(doc(db, "merchants", docId), {
        paymentMethods: methods,
        uid: user?.uid,
        email: user?.email
      }, { merge: true });

      setSuccess("Payment methods saved successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to save settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Payment Methods</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure the receiving numbers where you want to get paid.
        </p>
      </div>

      {success && <Alert tone="success">{success}</Alert>}
      {error && <Alert tone="error">{error}</Alert>}

      <div className="grid gap-6">
        {/* bKash */}
        <Card className="border-l-4 border-l-[#E2136E]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">bKash</h3>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={methods.bkash.enabled}
                onChange={(e) => setMethods({ ...methods, bkash: { ...methods.bkash, enabled: e.target.checked } })}
                className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
              />
              Enable bKash
            </label>
          </div>
          <Input
            label="bKash Receiving Number"
            placeholder="01XXXXXXXXX"
            value={methods.bkash.number}
            onChange={(e) => setMethods({ ...methods, bkash: { ...methods.bkash, number: e.target.value } })}
            disabled={!methods.bkash.enabled}
          />
        </Card>

        {/* Nagad */}
        <Card className="border-l-4 border-l-[#F7941D]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Nagad</h3>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={methods.nagad.enabled}
                onChange={(e) => setMethods({ ...methods, nagad: { ...methods.nagad, enabled: e.target.checked } })}
                className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
              />
              Enable Nagad
            </label>
          </div>
          <Input
            label="Nagad Receiving Number"
            placeholder="01XXXXXXXXX"
            value={methods.nagad.number}
            onChange={(e) => setMethods({ ...methods, nagad: { ...methods.nagad, number: e.target.value } })}
            disabled={!methods.nagad.enabled}
          />
        </Card>

        {/* Rocket */}
        <Card className="border-l-4 border-l-[#8C3494]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Rocket</h3>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={methods.rocket.enabled}
                onChange={(e) => setMethods({ ...methods, rocket: { ...methods.rocket, enabled: e.target.checked } })}
                className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
              />
              Enable Rocket
            </label>
          </div>
          <Input
            label="Rocket Receiving Number"
            placeholder="01XXXXXXXXX"
            value={methods.rocket.number}
            onChange={(e) => setMethods({ ...methods, rocket: { ...methods.rocket, number: e.target.value } })}
            disabled={!methods.rocket.enabled}
          />
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} loading={loading}>
          Save Payment Settings
        </Button>
      </div>
    </div>
  );
}