import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button"; // LinkButton ইম্পোর্ট করা হলো
import { ArrowRight, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function OverviewPage() {
  const { profile } = useAuth();

  // Mock stats (Stage 9-এ ডাইনামিক হবে)
  const stats = [
    { label: "Total Transactions", value: "0", icon: ArrowRight },
    { label: "Successful", value: "0", icon: ShieldCheck },
    { label: "Pending", value: "0", icon: Clock },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">
            Welcome back, {profile?.ownerName?.split(" ")[0] || profile?.displayName?.split(" ")[0] || "Merchant"} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here is what's happening with your account today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone="warning" className="capitalize">
            {profile?.subscriptionStatus || "Trial"} Active
          </Badge>
          <LinkButton to="/dashboard/subscription" size="sm">
            Upgrade Plan <ArrowUpRight size={14} />
          </LinkButton>
        </div>
      </div>

      {/* Setup Guide */}
      <Card className="border-emerald-200 bg-emerald-50/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-800">Finish setting up your account</h3>
            <p className="text-sm text-gray-600 mt-1">
              You need to configure your bKash/Nagad numbers and generate an API key to start accepting payments.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* Linking the buttons to their respective pages */}
              <LinkButton to="/dashboard/payment-methods" size="sm" variant="primary">
                Go to Payment Settings
              </LinkButton>
              <LinkButton to="/dashboard/api-keys" size="sm" variant="secondary">
                Generate API Key
              </LinkButton>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <Card key={s.label} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{s.label}</p>
              <p className="text-2xl font-extrabold text-gray-800">{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Transactions Placeholder */}
      <Card padded={false}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800">Recent Transactions</h3>
          <LinkButton to="/dashboard/transactions" variant="ghost" size="sm">
            View All
          </LinkButton>
        </div>
        <div className="p-12 text-center text-sm text-gray-500">
          No transactions yet. Your verified payments will appear here.
        </div>
      </Card>
    </div>
  );
}