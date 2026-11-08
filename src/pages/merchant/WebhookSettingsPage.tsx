import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function WebhookSettingsPage() {
  const { profile, user } = useAuth();
  const [webhookUrl, setWebhookUrl] = useState(profile?.webhookUrl || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    const docId = profile?.merchantId || user?.uid;
    if (!docId) return;

    setLoading(true);
    setSuccess("");

    try {
      await updateDoc(doc(db, "merchants", docId), {
        webhookUrl: webhookUrl
      });
      setSuccess("Webhook URL saved successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Webhook Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Receive payment notifications on your server.</p>
      </div>
      
      {success && <Alert tone="success">{success}</Alert>}
      
      <Card className="space-y-4">
        <Input 
          label="Webhook URL" 
          placeholder="https://yoursite.com/api/webhook" 
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          When a payment succeeds, AaronPay will send a POST request to this URL with the transaction details.
        </p>
        <Button onClick={handleSave} loading={loading}>Save Webhook URL</Button>
      </Card>
    </div>
  );
}