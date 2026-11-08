import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

const NAV_LINKS = [
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2";

export default function PublicNavbar() {
  const { user, profile, loading } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const firstName = profile?.displayName?.split(" ")[0] || "Dashboard";
  const initial = firstName.charAt(0).toUpperCase();

  // shadow/border only after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // lock body scroll + Escape to close (and return focus to the toggle)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // close menu if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${focusRing} ${
      isActive
        ? "text-stone-900"
        : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 motion-reduce:transition-none ${
          scrolled || open
            ? "bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm"
            : "bg-white border-b border-transparent"
        }`}
      >
        <nav
          className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
          aria-label="Main"
        >
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-2.5 shrink-0 rounded-lg ${focusRing}`}
            aria-label="AaronPay home"
          >
            <span className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-300 grid place-items-center">
              <ShieldCheck size={17} aria-hidden="true" />
            </span>
            <span className="text-xl font-bold tracking-tight text-stone-900">
              Aaron<span className="text-emerald-700">Pay</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={desktopLink}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span className="absolute left-3 right-3 -bottom-[13px] h-0.5 rounded-full bg-emerald-600" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2 min-w-[150px] justify-end">
            {loading ? (
              <div className="h-9 w-32 rounded-lg bg-stone-100 animate-pulse" />
            ) : user ? (
              <Link
                to="/dashboard"
                className={`inline-flex items-center gap-2.5 text-sm font-semibold bg-stone-900 text-white pl-1.5 pr-4 py-1.5 rounded-full hover:bg-stone-800 active:scale-[0.97] transition ${focusRing}`}
              >
                <span className="w-7 h-7 rounded-full bg-emerald-400/20 text-emerald-200 grid place-items-center text-xs font-bold">
                  {initial}
                </span>
                {firstName}
                <LayoutDashboard size={14} className="opacity-70" aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 px-4 py-2 rounded-lg transition ${focusRing}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`group inline-flex items-center gap-1.5 text-sm font-semibold bg-stone-900 text-white px-5 py-2 rounded-lg hover:bg-stone-800 active:scale-[0.97] transition ${focusRing}`}
                >
                  Start free trial
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="group-hover:translate-x-0.5 transition-transform motion-reduce:transition-none"
                  />
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`md:hidden w-10 h-10 -mr-2 grid place-items-center rounded-lg text-stone-700 hover:bg-stone-100 active:bg-stone-200 transition ${focusRing}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-4 sm:px-6 pt-2 pb-5 space-y-5 max-h-[calc(100dvh-4rem)] overflow-y-auto">
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      tabIndex={open ? 0 : -1}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${focusRing} ${
                          isActive
                            ? "bg-emerald-50 text-emerald-900"
                            : "text-stone-600 hover:bg-stone-50 active:bg-stone-100"
                        }`
                      }
                    >
                      {l.label}
                      <ArrowRight size={16} className="text-stone-300" aria-hidden="true" />
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-stone-100 space-y-2.5">
                {loading ? (
                  <div className="h-12 rounded-xl bg-stone-100 animate-pulse" />
                ) : user ? (
                  <Link
                    to="/dashboard"
                    tabIndex={open ? 0 : -1}
                    className={`flex items-center justify-center gap-2 w-full bg-stone-900 text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition ${focusRing}`}
                  >
                    <LayoutDashboard size={17} aria-hidden="true" /> Go to dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      tabIndex={open ? 0 : -1}
                      className={`flex items-center justify-center gap-2 w-full bg-stone-900 text-white font-semibold py-3.5 rounded-xl active:scale-[0.98] transition ${focusRing}`}
                    >
                      Start free trial <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Link
                      to="/login"
                      tabIndex={open ? 0 : -1}
                      className={`flex items-center justify-center w-full border border-stone-200 text-stone-800 font-semibold py-3.5 rounded-xl hover:bg-stone-50 active:scale-[0.98] transition ${focusRing}`}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop behind the mobile menu */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
}