import { Card } from "@/components/ui/Card";
import { Smartphone } from "lucide-react";

export default function AndroidConnectionPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Android App Connection</h1>
      </div>
      <Card className="text-center py-12">
        <Smartphone size={40} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800">App Not Connected</h3>
        <p className="text-sm text-gray-500">Install the AaronPay Android app to start forwarding transactions.</p>
      </Card>
    </div>
  );
}