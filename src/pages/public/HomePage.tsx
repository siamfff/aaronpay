import HeroSection from "@/components/public/HeroSection";
import IntroSection from "@/components/public/IntroSection";
import HowItWorksSection from "@/components/public/HowItWorksSection";
import PaymentMethodsSection from "@/components/public/PaymentMethodsSection";
import BenefitsSection from "@/components/public/BenefitsSection";
import IntegrationSection from "@/components/public/IntegrationSection";
import SecuritySection from "@/components/public/SecuritySection";
import PricingSection from "@/components/public/PricingSection";
import FAQSection from "@/components/public/FAQSection";
import ContactSection from "@/components/public/ContactSection";
import TrialSection from "@/components/public/TrialSection";

// Order follows a merchant's questions:
// what is it -> how does it work -> why use it -> can I build on it
// -> is it safe -> what does it cost -> what's left to ask -> start.
// The trial CTA comes last, right before the footer, so it closes the page
// instead of repeating the pricing section's free-trial message.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />

      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <PaymentMethodsSection />
      <BenefitsSection />

      <div id="developers">
        <IntegrationSection />
      </div>
      <div id="security">
        <SecuritySection />
      </div>

      <PricingSection /> {/* has its own id="pricing" */}
      <FAQSection /> {/* has its own id="faq" */}
      <ContactSection />
      <TrialSection />
    </>
  );
}