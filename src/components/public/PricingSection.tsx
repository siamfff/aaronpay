import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

const plans = [
  {
    name: "Monthly",
    price: 500,
    months: 1,
    duration: "month",
    features: [
      "Unlimited payment sessions",
      "All 3 payment methods",
      "API + webhook",
      "Email support",
    ],
    cta: "Start monthly",
  },
  {
    name: "Quarterly",
    price: 1350,
    months: 3,
    duration: "3 months",
    highlight: true,
    features: [
      "Everything in Monthly",
      "Priority support",
      "Advanced webhook history",
      "Device re-registration help",
    ],
    cta: "Start quarterly",
  },
  {
    name: "Yearly",
    price: 5450,
    months: 12,
    duration: "year",
    features: [
      "Everything in Quarterly",
      "Dedicated onboarding",
      "Priority webhook retries",
      "Early feature access",
    ],
    cta: "Start yearly",
  },
];

const fmt = (n) => "৳" + Math.round(n).toLocaleString("en-US");
const monthlyPrice = plans[0].price;

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            One price, every feature
          </h2>
          <p className="mt-4 text-base md:text-lg text-stone-600 leading-relaxed">
            Every plan starts with a 7-day free trial. No credit card required.
            Pay for longer and the monthly cost drops.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4 items-stretch">
          {plans.map((p) => {
            const saved = monthlyPrice * p.months - p.price;
            const perMonth = p.price / p.months;
            const dark = p.highlight;

            return (
              <div
                key={p.name}
                className={`rounded-2xl border p-6 md:p-8 flex flex-col ${
                  dark
                    ? "bg-emerald-950 border-emerald-950 text-white"
                    : "bg-white border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`text-lg font-semibold ${
                      dark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {p.name}
                  </h3>
                  {saved > 0 && (
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        dark
                          ? "bg-emerald-400/15 text-emerald-200"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      Save {fmt(saved)}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      dark ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {fmt(p.price)}
                  </span>
                  <span
                    className={`text-sm ${
                      dark ? "text-emerald-100/70" : "text-stone-500"
                    }`}
                  >
                    / {p.duration}
                  </span>
                </div>
                <p
                  className={`mt-1 text-sm ${
                    dark ? "text-emerald-100/70" : "text-stone-500"
                  }`}
                >
                  {fmt(perMonth)} per month
                </p>

                <ul
                  className={`mt-8 space-y-3 text-sm flex-1 ${
                    dark ? "text-emerald-50" : "text-stone-600"
                  }`}
                >
                  {p.features.map((f) => {
                    const inherits = f.startsWith("Everything in");
                    return (
                      <li key={f} className="flex items-start gap-3">
                        <Check
                          size={16}
                          aria-hidden="true"
                          className={`mt-0.5 shrink-0 ${
                            dark ? "text-emerald-300" : "text-emerald-600"
                          }`}
                        />
                        <span className={inherits ? "font-medium" : ""}>
                          {f}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8">
                  <LinkButton
                    to="/register"
                    variant={dark ? "secondary" : undefined}
                    fullWidth
                  >
                    {p.cta}
                  </LinkButton>
                  <p
                    className={`mt-3 text-center text-xs ${
                      dark ? "text-emerald-100/60" : "text-stone-500"
                    }`}
                  >
                    7-day free trial first
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}