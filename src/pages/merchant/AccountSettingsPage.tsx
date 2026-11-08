import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Copy } from "lucide-react";

export default function AccountSettingsPage() {
  const { profile, user } = useAuth();
  const [realMerchantId, setRealMerchantId] = useState("Loading...");

  useEffect(() => {
    async function fetchRealId() {
      // ১. profile থেকে চেক করি
      if (profile?.merchantId) {
        setRealMerchantId(profile.merchantId);
        return;
      }
      // ২. user.uid থেকে ফায়ারবেসে খুঁজি
      if (user?.uid) {
        try {
          const snap = await getDoc(doc(db, "merchants", user.uid));
          if (snap.exists() && snap.data().merchantId) {
            setRealMerchantId(snap.data().merchantId);
          } else {
            // যদি ডকুমেন্টে merchantId না থাকে, তবে ডকুমেন্টের আইডি (uid) ই দেখাই
            setRealMerchantId(user.uid);
          }
        } catch (err) {
          setRealMerchantId(user.uid);
        }
      } else {
        setRealMerchantId("Not found");
      }
    }
    fetchRealId();
  }, [profile, user]);

  const copyMerchantId = () => {
    if (realMerchantId && realMerchantId !== "Loading...") {
      navigator.clipboard.writeText(realMerchantId);
      alert("Merchant ID copied!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Account Settings</h1>
      </div>
      
      <Card className="space-y-4 border-emerald-100 bg-emerald-50/30">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Your Merchant ID</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg font-mono text-sm text-gray-800">
              {realMerchantId}
            </div>
            <Button onClick={copyMerchantId} variant="secondary" disabled={realMerchantId === "Loading..." || realMerchantId === "Not found"}>
              <Copy size={16} className="mr-2"/> Copy
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is your unique Merchant ID. It is required if you integrate via the legacy system or for support purposes.
          </p>
        </div>
      </Card>

      <Card className="space-y-4">
        <Input label="Email" defaultValue={profile?.email || ""} disabled />
        <Input label="Owner Name" defaultValue={profile?.ownerName || profile?.displayName || ""} />
        <Button>Save Changes</Button>
      </Card>
    </div>
  );
}