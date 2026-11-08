import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" updatedAt="Draft — 2025">
      <p>
        By using AaronPay you agree to these terms. This is a draft and will be
        replaced with the final text before commercial launch.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Service description</h2>
      <p>
        AaronPay provides payment verification software. It is not a payment
        gateway and is not affiliated with bKash, Nagad, or Rocket. Verification is
        based on merchant device records.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Merchant obligations</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Keep API keys and webhook secrets confidential.</li>
        <li>Use the service only for lawful purposes.</li>
        <li>Never request customer PINs or OTPs through any integration.</li>
      </ul>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">No warranty</h2>
      <p>
        The service is provided "as is". We do not guarantee any specific level of
        uptime or accuracy.
      </p>
    </LegalPageLayout>
  );
}