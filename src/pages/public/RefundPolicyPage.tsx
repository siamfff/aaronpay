import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="Refund & Cancellation Policy" updatedAt="Draft — 2025">
      <p>
        Subscription payments are currently verified manually by an AaronPay
        administrator. This policy describes how refunds and cancellations are
        handled in the MVP.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Free trial</h2>
      <p>
        Every eligible merchant receives one 7-day free trial. The trial is not
        automatically converted into a paid plan.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Cancellation</h2>
      <p>
        You may stop using the service at any time. Already-activated subscription
        time is not refundable unless required by applicable law.
      </p>
      <h2 className="text-lg font-semibold text-gray-800 pt-4">Refund requests</h2>
      <p>
        Refund requests can be sent to support@aaronpay.cyou within 7 days of
        payment. Each request is reviewed individually.
      </p>
    </LegalPageLayout>
  );
}