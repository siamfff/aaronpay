import { useState } from "react";
import { Check, Copy } from "lucide-react";

const snippets = {
  "Node.js": `// 1. From your server
const res = await fetch("https://api.aaronpay.cyou/v1/payment-sessions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ap_live_YOUR_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    orderId: "ORDER-1024",
    amount: 1250,
    currency: "BDT",
  }),
});

const { checkoutUrl } = await res.json();
// 2. Redirect the customer to checkoutUrl`,
  cURL: `# 1. From your server
curl https://api.aaronpay.cyou/v1/payment-sessions \\
  -X POST \\
  -H "Authorization: Bearer ap_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"orderId":"ORDER-1024","amount":1250,"currency":"BDT"}'

# 2. Redirect the customer to checkoutUrl`,
  PHP: `<?php
// 1. From your server
$ch = curl_init("https://api.aaronpay.cyou/v1/payment-sessions");
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer ap_live_YOUR_KEY",
    "Content-Type: application/json",
  ],
  CURLOPT_POSTFIELDS => json_encode([
    "orderId" => "ORDER-1024",
    "amount" => 1250,
    "currency" => "BDT",
  ]),
]);

$session = json_decode(curl_exec($ch), true);
// 2. Redirect the customer to $session["checkoutUrl"]`,
};

const response = `{
  "checkoutUrl": "https://aaronpay.cyou/checkout/sess_xxx"
}`;

const points = [
  "One shared REST API. No per-merchant setup.",
  "Separate test and live keys",
  "Works with any language that can send HTTP",
  "Webhooks signed with your own secret",
];

// Light highlighting: dim comments, tint strings. No extra dependency.
function Highlighted({ code }) {
  return code.split("\n").map((line, i) => {
    const t = line.trim();
    const isComment = t.startsWith("//") || t.startsWith("#");
    return (
      <div key={i} className="min-h-[1.5em]">
        {isComment ? (
          <span className="text-stone-500">{line}</span>
        ) : (
          line.split(/("[^"]*")/g).map((part, j) =>
            part.startsWith('"') && part.endsWith('"') && part.length > 1 ? (
              <span key={j} className="text-emerald-300">
                {part}
              </span>
            ) : (
              <span key={j}>{part}</span>
            )
          )
        )}
      </div>
    );
  });
}

export default function IntegrationSection() {
  const [lang, setLang] = useState("Node.js");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippets[lang]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Create a payment in one request
          </h2>
          <p className="mt-4 text-stone-300 leading-relaxed">
            Every merchant uses the same API base URL. Your key identifies you,
            so you can go live in minutes, not weeks.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-stone-300">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center">
                  <Check size={12} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 min-w-0">
          <div className="rounded-xl border border-white/10 bg-black/50 overflow-hidden">
            {/* Tabs + copy */}
            <div className="flex items-center justify-between border-b border-white/10 pl-2 pr-3">
              <div role="tablist" aria-label="Language" className="flex">
                {Object.keys(snippets).map((l) => (
                  <button
                    key={l}
                    role="tab"
                    aria-selected={lang === l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-3 text-sm border-b-2 -mb-px transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      lang === l
                        ? "border-emerald-400 text-white"
                        : "border-transparent text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-stone-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                {copied ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Copy size={14} aria-hidden="true" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <pre className="p-5 text-xs md:text-[13px] text-stone-100 font-mono leading-relaxed overflow-x-auto">
              <code>
                <Highlighted code={snippets[lang]} />
              </code>
            </pre>

            {/* Response */}
            <div className="border-t border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs text-stone-400">Response</p>
              <pre className="mt-2 text-xs md:text-[13px] font-mono text-stone-100 overflow-x-auto">
                <code>
                  <Highlighted code={response} />
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}