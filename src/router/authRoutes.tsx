import { Route } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export const authRoutes = (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route
      path="/verify-email"
      element={
        <ProtectedRoute>
          <VerifyEmailPage />
        </ProtectedRoute>
      }
    />
  </>
);