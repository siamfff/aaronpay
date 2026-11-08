import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowLeftRight } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Transactions</h1>
      </div>
      <Card>
        <EmptyState icon={<ArrowLeftRight />} title="No transactions yet" description="Verified payments will appear here." />
      </Card>
    </div>
  );
}