import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function MerchantAgreementPage() {
  return (
    <LegalPageLayout title="Merchant Agreement" updatedAt="Draft — 2025">
      <p>
        This agreement is between you ("Merchant") and AaronPay. It governs your use
        of the platform.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">1. Account</h2>
      <p>
        You are responsible for the accuracy of your business information and for
        all activity under your account.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">2. API keys</h2>
      <p>
        Your API key and webhook secret are confidential. If they are leaked, you
        must rotate them immediately. AaronPay is not responsible for losses caused
        by leaked keys that were not rotated.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">3. Data</h2>
      <p>
        You permit AaronPay to store transaction records necessary for verification.
        You confirm you have permission to forward payment notifications from your
        device.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">4. Suspension</h2>
      <p>
        AaronPay may suspend accounts that violate the Acceptable Use Policy or
        applicable law.
      </p>
    </LegalPageLayout>
  );
}