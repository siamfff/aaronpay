import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { useAuth } from "@/lib/hooks/useAuth";
import { sendEmailVerification } from "firebase/auth";

export default function VerifyEmailPage() {
  const { user, refreshProfile, logout } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);

  async function resend() {
    setError("");
    if (!user) return;
    setSending(true);
    try {
      await sendEmailVerification(user);
    } catch (err: any) {
      setError(err?.message || "Could not resend verification.");
    } finally {
      setSending(false);
    }
  }

  async function checkVerified() {
    setError("");
    if (!user) return;
    setChecking(true);
    try {
      await user.reload();
      if (user.emailVerified) {
        await refreshProfile();
        nav("/dashboard", { replace: true });
      } else {
        setError("Email is not verified yet. Please check your inbox.");
      }
    } catch (err: any) {
      setError(err?.message || "Could not verify.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 mx-auto">
            <MailCheck size={26} />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-gray-800">Verify your email</h1>
          <p className="mt-2 text-sm text-gray-500">
            We sent a verification link to{" "}
            <strong className="text-gray-800">{user?.email}</strong>. Click the link in
            that email, then return here.
          </p>

          {error && (
            <div className="mt-5 text-left">
              <Alert tone="error">{error}</Alert>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Button onClick={checkVerified} loading={checking} fullWidth size="lg">
              I've verified my email
            </Button>
            <Button onClick={resend} loading={sending} variant="secondary" fullWidth>
              Resend verification email
            </Button>
            <Button onClick={logout} variant="ghost" fullWidth>
              Use a different account
            </Button>
          </div>

          <Link
            to="/dashboard"
            className="mt-5 inline-block text-xs text-gray-400 hover:text-gray-600"
          >
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  );
}