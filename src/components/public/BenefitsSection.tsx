import { Clock, Lock, TrendingUp, Webhook, LucideIcon } from "lucide-react";

const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Clock, title: "Instant verification", desc: "Customers get confirmation in under a second." },
  { icon: Lock, title: "Duplicate-safe", desc: "Atomic Transaction ID protection." },
  { icon: Webhook, title: "Signed webhooks", desc: "HMAC-signed server-to-server webhooks." },
  { icon: TrendingUp, title: "Real analytics", desc: "See your successful, failed, and pending transactions." },
];

export default function BenefitsSection() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Built for merchants who value time
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800">
                <b.icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-800">{b.title}</h3>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}