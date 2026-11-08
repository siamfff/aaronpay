import { Check } from "lucide-react";

const methods = [
  {
    name: "bKash",
    logo: "https://i.postimg.cc/jS31XPDW/image.png",
    color: "#E2136E",
    soft: "#FDEEF5",
    tagline: "Bangladesh's most-used mobile wallet",
    bullets: ["Send Money flow", "Automatic Transaction ID capture", "Exact amount matching"],
  },
  {
    name: "Nagad",
    logo: "https://i.postimg.cc/rsTZm9HV/image.png",
    color: "#F7941D",
    soft: "#FEF4E6",
    tagline: "Fast, accessible mobile payments",
    bullets: ["Send Money flow", "Real-time notification parsing", "Duplicate-safe verification"],
  },
  {
    name: "Rocket",
    logo: "https://i.postimg.cc/qMh6qd8v/image.png",
    color: "#8C3494",
    soft: "#F5ECF6",
    tagline: "Trusted by millions across Bangladesh",
    bullets: ["Send Money flow", "Merchant-scoped device records", "Instant webhook trigger"],
  },
];

export default function PaymentMethodsSection() {
  return (
    <section id="payment-methods" className="scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-balance">
            One integration for the three wallets your customers use
          </h2>
          <p className="mt-3 text-gray-500">
            bKash, Nagad and Rocket are supported out of the box, each with its own verification rules.
          </p>
        </div>

        <div className="mt-12 md:mt-14 grid gap-5 md:grid-cols-3">
          {methods.map((m) => (
            <article
              key={m.name}
              className="group flex flex-col rounded-3xl bg-white border-2 border-gray-200 overflow-hidden transition-colors duration-200 hover:border-[var(--brand)]"
              style={{ ["--brand" as string]: m.color }}
            >
              {/* brand header with the real logo */}
              <div className="px-6 pt-6 pb-5" style={{ background: m.soft }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-black/5 grid place-items-center p-2 shrink-0">
                    <img
                      src={m.logo}
                      alt={`${m.name} logo`}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-extrabold text-gray-900">{m.name}</h3>
                    <p className="text-sm text-gray-600 mt-0.5 leading-snug">{m.tagline}</p>
                  </div>
                </div>
              </div>

              {/* capabilities */}
              <ul className="flex-1 p-6 space-y-3 text-sm text-gray-700">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full grid place-items-center shrink-0 text-white"
                      style={{ background: m.color }}
                    >
                      <Check size={12} strokeWidth={3.5} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}