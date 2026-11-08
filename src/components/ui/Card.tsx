import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  hover?: boolean;
}

export function Card({ padded = true, hover, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-xl shadow-sm",
        padded && "p-6",
        hover && "hover:shadow-md hover:border-gray-300 transition-all duration-200",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}