import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function AcceptableUsePage() {
  return (
    <LegalPageLayout title="Acceptable Use Policy" updatedAt="Draft — 2025">
      <p>AaronPay may not be used for any of the following:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Illegal goods or services under Bangladesh law.</li>
        <li>Fraud, money laundering, or financing of unlawful activity.</li>
        <li>Collecting, storing, or transmitting PINs, OTPs, or credentials.</li>
        <li>Attempting to bypass security controls or rate limits.</li>
        <li>Using SMS data from devices without the merchant's explicit permission.</li>
        <li>Misrepresenting AaronPay as an official bKash, Nagad, or Rocket service.</li>
      </ul>
      <p>Violation may result in immediate suspension of the account.</p>
    </LegalPageLayout>
  );
}