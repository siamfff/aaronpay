import { Check, Clock, Lock, TrendingUp, Webhook, X } from "lucide-react";

function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

function IconBadge({ icon: Icon, dark = false }) {
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        dark ? "bg-white/10 text-emerald-300" : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <Icon size={20} aria-hidden="true" />
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="bg-stone-50">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            Stop checking SMS by hand
          </h2>
          <p className="mt-4 text-base md:text-lg text-stone-600 leading-relaxed">
            Customers pay, you get a confirmed order. No screenshots, no
            copy-pasting Transaction IDs, no double-claimed payments.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {/* Featured: instant verification */}
          <Card className="lg:col-span-2 bg-emerald-950 border-emerald-950 text-white justify-between gap-10 md:flex-row md:items-center">
            <div className="md:max-w-sm">
              <IconBadge icon={Clock} dark />
              <h3 className="mt-5 text-xl font-semibold">
                Instant verification
              </h3>
              <p className="mt-2 text-sm md:text-base text-emerald-100/80 leading-relaxed">
                Customers get confirmation in under a second. No more manual
                SMS checking.
              </p>
            </div>

            {/* Illustrative verification result */}
            <div
              aria-hidden="true"
              className="w-full md:w-72 shrink-0 rounded-xl bg-white/5 border border-white/10 p-4"
            >
              <p className="text-xs text-emerald-100/60">Transaction ID</p>
              <p className="mt-1 font-mono text-sm tracking-wide">
                9K3L2M7QX4
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-400/15 px-3 py-2 text-sm text-emerald-200">
                <Check size={16} />
                Payment verified
              </div>
            </div>
          </Card>

          {/* Duplicate-safe */}
          <Card className="bg-white border-stone-200 justify-between gap-8">
            <div>
              <IconBadge icon={Lock} />
              <h3 className="mt-5 text-lg font-semibold text-stone-900">
                Duplicate-safe
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Atomic Transaction ID protection. The same ID can never be used
                twice.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              <X size={16} />
              <span className="font-mono">9K3L2M7QX4</span>
              <span className="text-red-600/80">already used</span>
            </div>
          </Card>

          {/* Signed webhooks */}
          <Card className="bg-white border-stone-200 justify-between gap-8">
            <div>
              <IconBadge icon={Webhook} />
              <h3 className="mt-5 text-lg font-semibold text-stone-900">
                Signed webhooks
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                HMAC-signed server-to-server webhooks keep your order state
                authoritative.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="rounded-lg bg-stone-900 px-3 py-2 font-mono text-xs text-stone-300 overflow-x-auto whitespace-nowrap"
            >
              X-Signature: sha256=…
            </div>
          </Card>

          {/* Analytics */}
          <Card className="lg:col-span-2 bg-white border-stone-200 justify-between gap-8 md:flex-row md:items-center">
            <div className="md:max-w-sm">
              <IconBadge icon={TrendingUp} />
              <h3 className="mt-5 text-lg font-semibold text-stone-900">
                Real analytics
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                See your successful, failed, and pending transactions. No fake
                numbers.
              </p>
            </div>
            <ul className="w-full md:w-72 shrink-0 space-y-3 text-sm">
              {[
                { label: "Successful", w: "w-5/6", color: "bg-emerald-600" },
                { label: "Pending", w: "w-1/4", color: "bg-amber-500" },
                { label: "Failed", w: "w-1/6", color: "bg-red-500" },
              ].map((r) => (
                <li key={r.label} className="flex items-center gap-3">
                  <span className="w-20 text-stone-600">{r.label}</span>
                  <span
                    aria-hidden="true"
                    className="flex-1 h-2 rounded-full bg-stone-100"
                  >
                    <span
                      className={`block h-2 rounded-full ${r.w} ${r.color}`}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}