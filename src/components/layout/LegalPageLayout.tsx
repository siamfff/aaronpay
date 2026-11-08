import type { ReactNode } from "react";

export default function LegalPageLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm text-gray-400">Last updated: {updatedAt}</p>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
        This is a draft policy. It must be reviewed by a qualified Bangladesh legal
        professional before commercial launch.
      </div>
      <div className="mt-8 prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
}