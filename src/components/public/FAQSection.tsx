import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const faqs = [
  {
    q: "Does AaronPay collect customer PINs or OTPs?",
    a: "Never. We never ask for, collect, or store any PIN, OTP, or password. Verification is based on merchant device notifications only.",
  },
  {
    q: "How does verification actually work?",
    a: "When a customer pays via bKash, Nagad, or Rocket, the merchant's Android app forwards the payment notification to Firebase. When the customer submits their Transaction ID, we match it against the merchant's records with strict checks.",
  },
  {
    q: "Is AaronPay an official payment gateway?",
    a: "No. AaronPay is a verification tool. We are not affiliated with or authorized by bKash, Nagad, or Rocket. Our data comes from the merchant's own device and is not a substitute for official payment-provider APIs.",
  },
  {
    q: "What happens if the same Transaction ID is submitted twice?",
    a: "Only the first submission succeeds. Every Transaction ID can be used exactly once. This is enforced by atomic database operations.",
  },
  {
    q: "Can I use AaronPay on multiple websites?",
    a: "Each merchant account is for one website. If you run multiple sites, you can register separate merchant accounts.",
  },
  {
    q: "Do you support test mode?",
    a: "Yes. You can create test credentials to build and test your integration before switching to live.",
  },
  {
    q: "What happens when my subscription expires?",
    a: "New payment sessions stop being created. Your dashboard and all historical records remain accessible. Once you renew, new sessions work again.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
          Questions merchants ask us
        </h2>

        <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                  >
                    <span
                      className={cn(
                        "text-base font-semibold transition-colors",
                        isOpen ? "text-emerald-800" : "text-stone-900"
                      )}
                    >
                      {f.q}
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-stone-400 transition-transform motion-reduce:transition-none",
                        isOpen && "rotate-180 text-emerald-700"
                      )}
                    />
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-sm md:text-base text-stone-600 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}