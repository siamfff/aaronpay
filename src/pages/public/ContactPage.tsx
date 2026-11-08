import { useState } from "react";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
        Contact us
      </h1>
      <p className="mt-3 text-gray-500">
        We usually respond within one business day.
      </p>

      <div className="mt-10 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-xl border border-gray-200 p-5">
            <Mail size={20} className="text-gray-800" />
            <div className="mt-3 text-sm font-semibold text-gray-800">Email</div>
            <div className="text-xs text-gray-500">support@aaronpay.cyou</div>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <MessageSquare size={20} className="text-gray-800" />
            <div className="mt-3 text-sm font-semibold text-gray-800">Support</div>
            <div className="text-xs text-gray-500">
              Logged-in merchants can open a support ticket from the dashboard.
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <MapPin size={20} className="text-gray-800" />
            <div className="mt-3 text-sm font-semibold text-gray-800">Location</div>
            <div className="text-xs text-gray-500">Dhaka, Bangladesh</div>
          </div>
        </div>

        <div className="md:col-span-3 rounded-xl border border-gray-200 p-6 bg-white">
          {sent ? (
            <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
              Thanks! Your message has been recorded locally. Full submission will
              be enabled once the support endpoint is live.
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Input label="Your name" name="name" placeholder="Jane Doe" required />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition"
                  placeholder="How can we help?"
                />
              </div>
              <Button type="submit">Send message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}