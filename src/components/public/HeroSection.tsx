import { ArrowRight, Check, ShieldCheck, MessageSquareText, Loader2 } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

const LOGOS = {
  bkash: "https://i.postimg.cc/jS31XPDW/image.png",
  nagad: "https://i.postimg.cc/rsTZm9HV/image.png",
  rocket: "https://i.postimg.cc/qMh6qd8v/image.png",
};

const TRUST = ["Secure API", "Duplicate protection", "No PIN or OTP, ever"];

const ROWS = [
  { logo: LOGOS.bkash, order: "#1041", amount: 1250, trx: "9BK3L2X7QA", delay: "0.5s" },
  { logo: LOGOS.nagad, order: "#1042", amount: 500, trx: "74NG0P91ZD", delay: "1.1s" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* One orchestrated entrance: rows appear in order, then the last one flips to "Verified". */}
      <style>{`
        @keyframes hero-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes hero-pending { 0%, 70% { opacity: 1; } 80%, 100% { opacity: 0; } }
        @keyframes hero-done { 0%, 70% { opacity: 0; } 80%, 100% { opacity: 1; } }
        .hero-row { opacity: 0; animation: hero-in .5s ease-out forwards; }
        .hero-pending { animation: hero-pending 3.2s 1.6s ease-out forwards; }
        .hero-done { opacity: 0; animation: hero-done 3.2s 1.6s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hero-row { opacity: 1; animation: none; }
          .hero-pending { display: none; }
          .hero-done { opacity: 1; animation: none; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]">

          {/* ===== Copy ===== */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs sm:text-sm font-medium text-gray-600 border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Built for Bangladeshi merchants
            </p>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-gray-900 leading-[1.08] text-balance">
              Verify bKash, Nagad and Rocket payments automatically
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connect your website and install the AaronPay Android app. Every
              mobile-banking payment gets matched to its order, with no manual
              checking and no missed sales.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <LinkButton to="/register" size="lg">
                Start 7-day free trial <ArrowRight size={16} />
              </LinkButton>
              <LinkButton to="/pricing" variant="secondary" size="lg">
                View pricing
              </LinkButton>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-gray-500">
              {TRUST.map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-emerald-500 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Live verification preview ===== */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
            {/* soft backdrop so the card has depth without heavy decoration */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-[2rem] bg-gradient-to-br from-gray-100 to-transparent" />

            <div className="relative rounded-3xl bg-white border border-gray-200 shadow-xl shadow-gray-200/70 p-4 sm:p-5">
              {/* incoming SMS */}
              <div className="flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-100 p-3.5">
                <span className="w-8 h-8 rounded-full bg-gray-900 text-white grid place-items-center shrink-0">
                  <MessageSquareText size={15} />
                </span>
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-gray-900">New SMS on your phone</p>
                  <p className="text-gray-500 mt-0.5 leading-snug">
                    You have received Tk 500.00 from 017XXXXXXXX. TrxID{" "}
                    <span className="font-mono font-semibold text-gray-700">74NG0P91ZD</span>
                  </p>
                </div>
              </div>

              {/* matched orders */}
              <div className="mt-4 flex items-center justify-between px-1">
                <p className="text-sm font-bold text-gray-800">Payments</p>
                <p className="text-xs text-gray-400">Matched to orders</p>
              </div>

              <ul className="mt-2 space-y-2">
                {ROWS.map((r, i) => {
                  const last = i === ROWS.length - 1;
                  return (
                    <li
                      key={r.trx}
                      className="hero-row flex items-center gap-3 rounded-2xl border border-gray-100 p-3"
                      style={{ animationDelay: r.delay }}
                    >
                      <img src={r.logo} alt="" className="w-10 h-10 rounded-xl border border-gray-100 object-contain p-1 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900 tabular-nums">
                          ৳ {r.amount.toLocaleString("en-US")}
                          <span className="font-medium text-gray-400"> · Order {r.order}</span>
                        </p>
                        <p className="text-xs font-mono text-gray-400 truncate">{r.trx}</p>
                      </div>

                      {last ? (
                        <span className="relative h-7 w-[92px] shrink-0">
                          <span className="hero-pending absolute inset-0 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 rounded-full">
                            <Loader2 size={12} className="animate-spin" /> Matching
                          </span>
                          <span className="hero-done absolute inset-0 inline-flex items-center justify-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                            <Check size={13} strokeWidth={3} /> Verified
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-1 h-7 w-[92px] shrink-0 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                          <Check size={13} strokeWidth={3} /> Verified
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}