import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updatedAt="Draft — 2025">
      <p>
        AaronPay collects only the information necessary to operate a payment
        verification service. This draft describes what we collect and how we use
        it.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Information we collect</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Merchant account details (business name, email, phone, website).</li>
        <li>Payment settings (receiving numbers) you configure.</li>
        <li>Payment session and transaction records created through our API.</li>
        <li>Device registration and connection status for the Android app.</li>
      </ul>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Information we do not collect</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Customer PINs, OTPs, or passwords.</li>
        <li>Unrelated SMS messages from the merchant's device.</li>
        <li>Any data not necessary for verification.</li>
      </ul>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Contact</h2>
      <p>Privacy inquiries: privacy@aaronpay.cyou</p>
    </LegalPageLayout>
  );
}