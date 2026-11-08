import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {}

const baseClass =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-gray-800 text-white hover:bg-black focus:ring-gray-800 shadow-sm",
  secondary:
    "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300",
  ghost: "text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizeClass: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseClass,
        variantClass[variant],
        sizeClass[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
);

Button.displayName = "Button";

/* ─── Link-styled Button ─── */
interface LinkButtonProps extends BaseProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({
  to,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        baseClass,
        variantClass[variant],
        sizeClass[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </Link>
  );
}