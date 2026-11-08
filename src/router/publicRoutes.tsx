import { Route } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import HomePage from "@/pages/public/HomePage";
import AboutPage from "@/pages/public/AboutPage";
import PricingPage from "@/pages/public/PricingPage";
import ContactPage from "@/pages/public/ContactPage";
import FAQPage from "@/pages/public/FAQPage";
import PrivacyPolicyPage from "@/pages/public/PrivacyPolicyPage";
import TermsPage from "@/pages/public/TermsPage";
import RefundPolicyPage from "@/pages/public/RefundPolicyPage";
import AcceptableUsePage from "@/pages/public/AcceptableUsePage";
import MerchantAgreementPage from "@/pages/public/MerchantAgreementPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";

// useRoutes() সরাসরি এক্সপেক্ট করে <Route> বা <Fragment> 
export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/privacy" element={<PrivacyPolicyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="/refund-policy" element={<RefundPolicyPage />} />
    <Route path="/acceptable-use" element={<AcceptableUsePage />} />
    <Route path="/merchant-agreement" element={<MerchantAgreementPage />} />
    
    {/* 404 Page */}
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);