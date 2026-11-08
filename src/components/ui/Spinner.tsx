import { cn } from "@/lib/utils/cn";

export function Spinner({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}