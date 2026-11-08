export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
        About AaronPay
      </h1>
      <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
        <p>
          AaronPay is a payment verification SaaS built for Bangladeshi merchants.
          We help websites, stores, and service providers verify bKash, Nagad, and
          Rocket payments automatically — without manual SMS checking.
        </p>
        <p>
          Our approach is simple: your own phone is the source of truth. The
          AaronPay Android app forwards relevant payment notifications to your
          merchant account, and our checkout verifies customer-submitted Transaction
          IDs against those records — safely and atomically.
        </p>
        <p>
          We believe payment infrastructure for smaller merchants should be simple,
          affordable, and honest. We do not claim affiliation with bKash, Nagad, or
          Rocket, and we never ask customers for PINs or OTPs.
        </p>
      </div>
    </div>
  );
}