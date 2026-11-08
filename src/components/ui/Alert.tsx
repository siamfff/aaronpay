import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Tone = "info" | "success" | "error";

const toneMap: Record<Tone, { cls: string; Icon: typeof Info }> = {
  info: { cls: "bg-blue-50 border-blue-200 text-blue-700", Icon: Info },
  success: { cls: "bg-emerald-50 border-emerald-200 text-emerald-700", Icon: CheckCircle2 },
  error: { cls: "bg-red-50 border-red-200 text-red-700", Icon: AlertCircle },
};

export function Alert({
  tone = "info",
  children,
}: {
  tone?: Tone;
  children: React.ReactNode;
}) {
  const { cls, Icon } = toneMap[tone];
  return (
    <div className={cn("flex items-start gap-2 rounded-lg border px-4 py-3 text-sm", cls)}>
      <Icon size={16} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}