import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import PublicLayout from "@/components/layout/PublicLayout";
import MerchantLayout from "@/components/layout/MerchantLayout";

// Public Pages
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

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import MerchantRegisterPage from "@/pages/auth/MerchantRegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// Merchant Pages
import OverviewPage from "@/pages/merchant/OverviewPage";
import PaymentMethodsPage from "@/pages/merchant/PaymentMethodsPage";
import ApiKeysPage from "@/pages/merchant/ApiKeysPage";
import ApiIntegrationPage from "@/pages/merchant/ApiIntegrationPage";
import SubscriptionPage from "@/pages/merchant/SubscriptionPage";
import WebsiteSettingsPage from "@/pages/merchant/WebsiteSettingsPage";
import BrandingPage from "@/pages/merchant/BrandingPage";
import WebhookSettingsPage from "@/pages/merchant/WebhookSettingsPage";
import PaymentSessionsPage from "@/pages/merchant/PaymentSessionsPage";
import TransactionsPage from "@/pages/merchant/TransactionsPage";
import AndroidConnectionPage from "@/pages/merchant/AndroidConnectionPage";
import SupportPage from "@/pages/merchant/SupportPage";
import AccountSettingsPage from "@/pages/merchant/AccountSettingsPage";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";

// Checkout Pages
import CheckoutPage from "@/pages/checkout/CheckoutPage";

// Errors
import NotFoundPage from "@/pages/errors/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES */}
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
          </Route>

          {/* PUBLIC CHECKOUT ROUTE */}
          <Route path="/checkout/:sessionId" element={<CheckoutPage />} />

          {/* ADMIN DASHBOARD ROUTE */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<MerchantRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<ProtectedRoute><VerifyEmailPage /></ProtectedRoute>} />

          {/* MERCHANT DASHBOARD ROUTES */}
          <Route path="/dashboard" element={<ProtectedRoute><MerchantLayout /></ProtectedRoute>}>
            <Route index element={<OverviewPage />} />
            <Route path="website" element={<WebsiteSettingsPage />} />
            <Route path="branding" element={<BrandingPage />} />
            <Route path="payment-methods" element={<PaymentMethodsPage />} />
            <Route path="integration" element={<ApiIntegrationPage />} />
            <Route path="api-keys" element={<ApiKeysPage />} />
            <Route path="webhooks" element={<WebhookSettingsPage />} />
            <Route path="sessions" element={<PaymentSessionsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="android" element={<AndroidConnectionPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="settings" element={<AccountSettingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}