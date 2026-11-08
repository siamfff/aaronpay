import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

const points = [
  "Full access to every feature",
  "No credit card required",
  "Verified payments live on your site before you pay",
];

export default function TrialSection() {
  return (
    <section className="bg-emerald-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Try AaronPay free for 7 days
          </h2>
          <ul className="mt-6 space-y-3 text-sm md:text-base text-emerald-50">
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

        <div className="md:justify-self-end w-full md:max-w-xs">
          <LinkButton to="/register" variant="secondary" size="lg" fullWidth>
            Claim your free trial
          </LinkButton>
          <p className="mt-3 text-xs text-emerald-100/60">
            One trial per eligible merchant.
          </p>
        </div>
      </div>
    </section>
  );
}