import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { sendResetEmail } from "@/lib/firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendResetEmail(email);
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Could not send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={14} /> Back to login
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h1 className="text-2xl font-extrabold text-gray-800">Reset password</h1>
          <p className="mt-1 text-sm text-gray-500">
            We'll email you a secure link to reset your password.
          </p>

          {sent ? (
            <div className="mt-6">
              <Alert tone="success">
                If an account exists for <strong>{email}</strong>, a reset link has
                been sent. Check your inbox.
              </Alert>
            </div>
          ) : (
            <>
              {error && (
                <div className="mt-4">
                  <Alert tone="error">{error}</Alert>
                </div>
              )}
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail size={16} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" fullWidth loading={loading} size="lg">
                  Send reset link
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}