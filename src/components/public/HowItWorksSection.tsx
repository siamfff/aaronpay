import { Check, Smartphone } from "lucide-react";

const LOGOS = {
  bkash: "https://i.postimg.cc/jS31XPDW/image.png",
  nagad: "https://i.postimg.cc/rsTZm9HV/image.png",
  rocket: "https://i.postimg.cc/qMh6qd8v/image.png",
};

/* Small previews: each one shows what the step looks like, with demo data only. */
function NumbersPreview() {
  const rows: [string, string][] = [
    [LOGOS.bkash, "017•• ••• 111"],
    [LOGOS.nagad, "017•• ••• 222"],
    [LOGOS.rocket, "017•• ••• 333"],
  ];
  return (
    <ul className="space-y-1.5">
      {rows.map(([logo, num]) => (
        <li key={num} className="flex items-center gap-2.5 rounded-lg bg-gray-50 border border-gray-100 px-2.5 py-1.5">
          <img src={logo} alt="" className="w-5 h-5 object-contain" />
          <span className="font-mono text-xs text-gray-600">{num}</span>
        </li>
      ))}
    </ul>
  );
}

function KeysPreview() {
  return (
    <div className="rounded-lg bg-gray-900 px-3 py-2.5 font-mono text-[11px] leading-relaxed text-gray-300 overflow-x-auto">
      <p><span className="text-gray-500">API_KEY=</span>ap_live_••••••••</p>
      <p><span className="text-gray-500">WEBHOOK_SECRET=</span>whsec_••••••</p>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5">
      <span className="w-7 h-7 rounded-lg bg-gray-900 text-white grid place-items-center shrink-0">
        <Smartphone size={14} />
      </span>
      <div className="min-w-0 text-xs">
        <p className="font-semibold text-gray-800">AaronPay</p>
        <p className="text-gray-500 truncate">Payment forwarded securely</p>
      </div>
    </div>
  );
}

function VerifiedPreview() {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5">
      <span className="font-mono text-xs text-gray-600 truncate">9BK3L2X7QA</span>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1 shrink-0">
        <Check size={12} strokeWidth={3} /> Verified
      </span>
    </div>
  );
}

const steps = [
  {
    title: "Register and configure",
    desc: "Create your merchant account and add your bKash, Nagad and Rocket receiving numbers.",
    preview: <NumbersPreview />,
  },
  {
    title: "Generate API keys",
    desc: "Get your API key and webhook secret, with ready-to-use code examples to copy.",
    preview: <KeysPreview />,
  },
  {
    title: "Install the Android app",
    desc: "Install AaronPay on your phone. It securely forwards payment notifications.",
    preview: <PhonePreview />,
  },
  {
    title: "Start verifying payments",
    desc: "Customers pay and enter their Transaction ID. AaronPay verifies it in milliseconds.",
    preview: <VerifiedPreview />,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-gray-50/70 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-balance">
            From signup to automatic verification in four steps
          </h2>
          <p className="mt-3 text-gray-500">
            Set it up once. After that, every payment is checked for you.
          </p>
        </div>

        <ol className="mt-12 md:mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={s.title} className="relative pl-12 lg:pl-0 lg:pt-12">
                {/* number marker */}
                <span className="absolute left-0 top-0 z-10 w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold grid place-items-center ring-4 ring-gray-50">
                  {i + 1}
                </span>

                {/* connector: vertical on mobile, horizontal on desktop */}
                {!last && (
                  <>
                    <span aria-hidden className="lg:hidden absolute left-4 top-8 -bottom-10 w-px -translate-x-1/2 bg-gray-300" />
                    <span aria-hidden className="hidden lg:block absolute left-8 top-4 h-px w-[calc(100%+2rem-2rem)] bg-gray-300" />
                  </>
                )}

                <h3 className="text-base font-bold text-gray-900 leading-8 lg:leading-normal">{s.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed max-w-sm">{s.desc}</p>
                <div className="mt-4 max-w-sm">{s.preview}</div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}