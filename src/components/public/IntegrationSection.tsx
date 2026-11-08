import { Copy } from "lucide-react";
import { useState } from "react";

// snippets-এ টাইপ ডেফিনিশন দেওয়া হলো
const snippets: Record<string, string> = {
  "Node.js": `// 1. From your server (Node.js)
const response = await fetch("https://aaronpay.cyou/api/create-session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    orderId: "ORDER-1024",
    amount: 1250,
    apiKey: "ap_live_YOUR_API_KEY"
  })
});
const { checkoutUrl } = await response.json();`,
  cURL: `curl -X POST https://aaronpay.cyou/api/create-session \\
  -H "Content-Type: application/json" \\
  -d '{"orderId":"ORDER-1024","amount":1250,"apiKey":"ap_live_YOUR_API_KEY"}'`,
  PHP: `<?php
$data = ["orderId" => "ORDER-1024", "amount" => 1250, "apiKey" => "ap_live_YOUR_API_KEY"];
$ch = curl_init("https://aaronpay.cyou/api/create-session");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
echo curl_exec($ch);
?>`,
};

const tabs = ["Node.js", "cURL", "PHP"];

export default function IntegrationSection() {
  const [active, setActive] = useState("Node.js");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // টাইপ এরর ঠিক করতে সরাসরি snippets[active] ব্যবহার করা হলো
    navigator.clipboard.writeText(snippets[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            One API, every merchant
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            All merchants share the same API base URL. Your unique API key identifies you, so you can integrate in minutes.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-300">
            {[
              "Shared REST API — no per-merchant infrastructure",
              "API Key authentication",
              "REST-friendly — works with any language",
              "Webhook signed with your unique secret",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="flex items-center gap-1 border-b border-white/10 bg-black/40 px-2 py-2 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                  active === t ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
            <div className="ml-auto">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white px-2 py-1.5 rounded transition"
              >
                <Copy size={12} /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <pre className="p-4 text-xs overflow-x-auto text-gray-100 font-mono leading-relaxed max-h-[320px]">
            {snippets[active]}
          </pre>
        </div>
      </div>
    </section>
  );
}