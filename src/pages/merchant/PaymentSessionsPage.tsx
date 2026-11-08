import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Clock } from "lucide-react";

export default function PaymentSessionsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Payment Sessions</h1>
      </div>
      <Card>
        <EmptyState icon={<Clock />} title="No sessions yet" description="Payment sessions will appear here." />
      </Card>
    </div>
  );
}