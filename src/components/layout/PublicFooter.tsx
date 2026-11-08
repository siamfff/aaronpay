import { Link } from "react-router-dom";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Pricing", to: "/pricing" },
      { label: "How it works", to: "/#how-it-works" },
      { label: "Payment methods", to: "/#payment-methods" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Merchant agreement", to: "/merchant-agreement" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Refund & Cancellation", to: "/refund-policy" },
      { label: "Acceptable Use", to: "/acceptable-use" },
    ],
  },
];

const wallets = [
  { name: "bKash", color: "#E2136E" },
  { name: "Nagad", color: "#F6921E" },
  { name: "Rocket", color: "#8C3494" },
];

export default function PublicFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Call to action */}
      <div className="max-w-6xl mx-auto px-6 pt-14">
        <div className="rounded-2xl bg-gray-900 px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Stop checking payments by hand.
            </h2>
            <p className="mt-3 text-sm md:text-base text-gray-400 leading-relaxed">
              AaronPay matches bKash, Nagad and Rocket payments to your orders
              automatically, so you can ship faster.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/pricing"
              className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              View pricing
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-semibold text-white hover:border-gray-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>

      {/* Brand + links */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
        <div className="col-span-2">
          <Link
            to="/"
            className="text-2xl font-extrabold text-gray-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
          >
            Aaron<span className="text-gray-400">Pay</span>
          </Link>
          <p className="mt-3 text-sm text-gray-500 max-w-sm leading-relaxed">
            Automated payment verification for Bangladeshi merchants. Build
            faster, verify smarter.
          </p>

          <p className="mt-6 text-sm font-medium text-gray-800">Works with</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {wallets.map((w) => (
              <li
                key={w.name}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700"
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: w.color }}
                />
                {w.name}
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-gray-900 hover:underline underline-offset-4 rounded transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-gray-500 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
          <span>© {new Date().getFullYear()} AaronPay. All rights reserved.</span>
          <span className="md:max-w-md md:text-right leading-relaxed">
            Not affiliated with bKash, Nagad, or Rocket. Payment verification is
            based on merchant device records.
          </span>
        </div>
      </div>
    </footer>
  );
}