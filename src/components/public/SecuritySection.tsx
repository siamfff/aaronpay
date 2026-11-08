import { FileLock2, Info, KeyRound, ShieldCheck, Server } from "lucide-react";

const items = [
  {
    icon: KeyRound,
    title: "Hashed API keys",
    desc: "We store only a hash of your API key. The full key is shown once, when you create it.",
  },
  {
    icon: ShieldCheck,
    title: "Replay-proof webhooks",
    desc: "Every webhook carries an HMAC signature, a timestamp, and an event ID, so a captured request can't be sent again.",
  },
  {
    icon: FileLock2,
    title: "Atomic verification",
    desc: "A Transaction ID is marked as used inside a single database transaction, so two requests can't claim it at once.",
  },
  {
    icon: Server,
    title: "Server-side authorization",
    desc: "Admin checks never run in the browser. Every privileged action is verified on our server.",
  },
];

export default function SecuritySection() {
  return (
    <section className="bg-white border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Promise */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              We never ask your customers for a PIN or OTP
            </h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Verification is based on payment records from your own
              authenticated device. Customers only share a Transaction ID.
            </p>
          </div>

          {/* Details */}
          <dl className="lg:col-span-3 divide-y divide-stone-200 border-y border-stone-200">
            {items.map((i) => (
              <div key={i.title} className="flex gap-4 py-6">
                <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <i.icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-base font-semibold text-stone-900">
                    {i.title}
                  </dt>
                  <dd className="mt-1 text-sm text-stone-600 leading-relaxed">
                    {i.desc}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Disclaimer: important, so it stays readable */}
        <div className="mt-12 flex gap-3 rounded-xl bg-stone-50 border border-stone-200 p-4 md:p-5 max-w-3xl">
          <Info
            size={18}
            className="mt-0.5 shrink-0 text-stone-500"
            aria-hidden="true"
          />
          <p className="text-sm text-stone-600 leading-relaxed">
            AaronPay is not affiliated with bKash, Nagad, or Rocket. Transaction
            data is collected from the merchant's own device with explicit
            permission. It is not an official confirmation from a payment
            provider's API.
          </p>
        </div>
      </div>
    </section>
  );
}