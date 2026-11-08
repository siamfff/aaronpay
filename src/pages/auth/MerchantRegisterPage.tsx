import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { signUpWithEmail } from "@/lib/firebase/auth";
import { createMerchant } from "@/lib/firebase/merchant";

const categories = ["E-commerce", "Digital Service", "Education", "Health", "Food", "Other"];

export default function MerchantRegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    websiteUrl: "",
    category: "E-commerce",
    country: "Bangladesh",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const user = await signUpWithEmail(form.email, form.password, form.ownerName);
      
      await createMerchant(user.uid, {
        businessName: form.businessName,
        ownerName: form.ownerName,
        email: form.email,
        phone: form.phone,
        websiteUrl: form.websiteUrl,
        category: form.category,
        country: form.country,
        paymentMethods: {
          bkash: { enabled: false, number: "" },
          nagad: { enabled: false, number: "" },
          rocket: { enabled: false, number: "" },
        },
      });

      nav("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-extrabold text-gray-800">
            Aaron<span className="text-gray-400">Pay</span>
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-800">Create Merchant Account</h1>
          <p className="mt-1 text-sm text-gray-500">Start your 7-day free trial today.</p>
        </div>

        {error && <div className="mb-6"><Alert tone="error">{error}</Alert></div>}

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Business Name" name="businessName" placeholder="Your Store" value={form.businessName} onChange={handleChange} required />
            <Input label="Owner Name" name="ownerName" placeholder="John Doe" value={form.ownerName} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            <Input label="Phone Number" name="phone" placeholder="017XXXXXXXX" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Website URL" name="websiteUrl" placeholder="https://yourstore.com" value={form.websiteUrl} onChange={handleChange} required />
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1.5">Business Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <Input label="Country" name="country" value={form.country} onChange={handleChange} readOnly className="bg-gray-50 text-gray-500" />
             <Input label="Password" type="password" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required />
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Create Account & Start Trial
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="font-semibold text-gray-800 hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}