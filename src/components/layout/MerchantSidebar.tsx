import { NavLink } from "react-router-dom";
import { LayoutDashboard, Globe, Image as ImageIcon, CreditCard, Code2, Key, Webhook, Clock, ArrowLeftRight, ShieldCheck, Smartphone, LifeBuoy, UserCog, LogOut } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils/cn";

const menuItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/dashboard/website", icon: Globe, label: "Website Settings" },
  { to: "/dashboard/branding", icon: ImageIcon, label: "Branding" },
  { to: "/dashboard/payment-methods", icon: CreditCard, label: "Payment Methods" },
  { to: "/dashboard/integration", icon: Code2, label: "API Integration" },
  { to: "/dashboard/api-keys", icon: Key, label: "API Keys" },
  { to: "/dashboard/webhooks", icon: Webhook, label: "Webhook Settings" },
  { to: "/dashboard/sessions", icon: Clock, label: "Payment Sessions" },
  { to: "/dashboard/transactions", icon: ArrowLeftRight, label: "Transactions" },
  { to: "/dashboard/subscription", icon: ShieldCheck, label: "Subscription" },
  { to: "/dashboard/android", icon: Smartphone, label: "Android Connection" },
  { to: "/dashboard/support", icon: LifeBuoy, label: "Support" },
  { to: "/dashboard/settings", icon: UserCog, label: "Account Settings" },
];

export default function MerchantSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white min-h-screen flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-xl font-extrabold text-gray-800">Aaron<span className="text-gray-400">Pay</span></span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            <item.icon size={18} className="opacity-70" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}