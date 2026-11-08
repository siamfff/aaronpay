export default function IntroSection() {
  return (
    <section className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Payments in Bangladesh shouldn't need manual verification.
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Every day, merchants lose orders because a bKash SMS was missed, a Nagad
            confirmation scrolled past, or a fake Transaction ID slipped through.
            AaronPay turns your own phone into a live verification source — secure,
            real-time, and auditable.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            {[
              "One shared API for every merchant — no per-site setup",
              "Your own receiving numbers, your own records",
              "Atomic Transaction ID checks — no double-use",
              "Webhook-signed server-to-server notifications",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Example verified payment
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Order</div>
              <div className="text-base font-semibold text-gray-800">#ORDER-1024</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Amount</div>
              <div className="text-base font-semibold text-gray-800">৳ 1,250</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["bKash", "Nagad", "Rocket"].map((m) => (
              <div
                key={m}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-center text-gray-600"
              >
                {m}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 font-medium">
            ✓ Verified in 0.9 seconds
          </div>
        </div>
      </div>
    </section>
  );
}