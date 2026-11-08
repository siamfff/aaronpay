import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Copy, Code2, Server, Webhook, Check, TriangleAlert } from "lucide-react";

export default function ApiIntegrationPage() {
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);

  const codeSnippet = `// 1. From your server (Node.js/PHP)
const response = await fetch("https://aaronpay.cyou/api/create-session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${profile?.apiKey || "YOUR_API_KEY"}"
  },
  body: JSON.stringify({
    merchantId: "${profile?.merchantId || "merchant_xxx"}",
    orderId: "ORDER-1001",
    amount: 500
  })
});

const { checkoutUrl } = await response.json();
// Redirect customer to checkoutUrl
`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // UI-only: step content
  const steps = [
    { icon: Server, title: "Send a request", text: "Create a payment session from your server with the order details." },
    { icon: Code2, title: "Redirect to checkout", text: "Use the checkoutUrl in the response to send your customer to pay." },
    { icon: Webhook, title: "Confirm by webhook", text: "Wait for the payment success webhook before fulfilling the order." },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-0 pb-10">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">API Integration</h1>
        <p className="text-sm text-gray-500 mt-1.5 max-w-xl leading-relaxed">
          Connect your website to AaronPay in three steps. Start with the example request below.
        </p>
      </div>

      {/* Steps */}
      <ol className="grid md:grid-cols-3 gap-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={s.title}>
              <Card className="h-full border-gray-200 py-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                    <Icon size={18} />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{s.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">{s.text}</p>
              </Card>
            </li>
          );
        })}
      </ol>

      {/* Code block */}
      <Card className="bg-gray-900 border-none p-0 overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <h3 className="text-sm font-semibold text-white truncate">Node.js example</h3>
          </div>
          <button
            onClick={copyCode}
            aria-label="Copy code"
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
              copied
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
        <pre className="px-4 py-4 sm:px-5 text-xs sm:text-[13px] leading-relaxed text-gray-300 font-mono overflow-x-auto max-h-[28rem]">
          {codeSnippet}
        </pre>
      </Card>

      {/* Notes */}
      <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 leading-relaxed">
        <TriangleAlert size={16} className="mt-0.5 shrink-0" />
        <p>
          Run this request from your server only. The snippet can include your live API key, so don't paste it into client-side code or share it publicly.
        </p>
      </div>
    </div>
  );
}