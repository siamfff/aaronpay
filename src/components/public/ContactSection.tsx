import { Mail } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export default function ContactSection() {
  return (
    <section className="bg-stone-50 border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            Still have a question?
          </h2>
          <p className="mt-4 text-base md:text-lg text-stone-600 leading-relaxed">
            Our team replies within one business day. For integration
            questions, the merchant API docs are available after you register.
          </p>
        </div>

        <div className="md:justify-self-end w-full md:max-w-sm space-y-6">
          <a
            href="mailto:support@aaronpay.cyou"
            className="group flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span className="w-10 h-10 shrink-0 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Mail size={20} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-stone-900">
                Email support
              </span>
              <span className="block text-sm text-stone-600 truncate">
                support@aaronpay.cyou
              </span>
            </span>
          </a>

          <div>
            <LinkButton to="/contact" fullWidth>
              Send us a message
            </LinkButton>
            <p className="mt-3 text-xs text-stone-500">
              Prefer a form? We get the same details either way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}