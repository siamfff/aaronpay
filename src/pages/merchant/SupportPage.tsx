import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LifeBuoy } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Support</h1>
      </div>
      <Card className="text-center py-12">
        <LifeBuoy size={40} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
        <p className="text-sm text-gray-500 mb-4">Contact our support team.</p>
        <Button>Open Support Ticket</Button>
      </Card>
    </div>
  );
}