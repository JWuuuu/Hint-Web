import type { ReactNode } from "react";
import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";

type ButtonTone = "gold" | "aqua" | "quiet";

export function OpenAppButton({
  children = "Open Hint Online",
  appPath = "",
  tone = "gold",
  className = "",
}: {
  children?: ReactNode;
  appPath?: string;
  tone?: ButtonTone;
  className?: string;
}) {
  const styles =
    tone === "aqua"
      ? {
          color: "#071216",
          background: "linear-gradient(135deg, rgba(122,226,214,0.98), rgba(178,244,230,0.92))",
          boxShadow: "0 18px 34px rgba(122,226,214,0.18)",
        }
      : tone === "quiet"
        ? {
            color: "var(--hint-text)",
            background: "var(--hint-surface-soft)",
            boxShadow: "inset 0 0 0 1px var(--hint-border)",
          }
        : {
            color: "#231d2a",
            background: "linear-gradient(135deg, rgba(228,164,82,1), rgba(242,184,121,0.98))",
            boxShadow: "0 18px 34px rgba(219,142,85,0.22)",
          };

  return (
    <a
      href={appPath || "/preview"}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-sans text-[13px] font-semibold transition hover:-translate-y-0.5 ${className}`}
      style={styles}
    >
      {children}
      <ArrowRight className="size-4" />
    </a>
  );
}

export function AppGateCTA({
  title,
  body,
  cta = "Open Hint Online",
  appPath = "",
}: {
  title: string;
  body: string;
  cta?: string;
  appPath?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[18px] border p-4"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--hint-surface-soft) 88%, transparent), color-mix(in srgb, var(--hint-input-bg) 78%, transparent))",
        borderColor: "color-mix(in srgb, var(--hint-gold, #cba866) 34%, var(--hint-border))",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(228,198,138,0.7), transparent)" }}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--hint-gold)" }}>
            <LockKeyhole className="size-3.5" />
            Website feature
          </p>
          <h3 className="mt-1 font-serif text-[22px] leading-tight" style={{ color: "var(--hint-text)" }}>
            {title}
          </h3>
          <p className="mt-1 max-w-2xl font-sans text-[13px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>
            {body}
          </p>
        </div>
        <OpenAppButton appPath={appPath} className="shrink-0">
          {cta}
        </OpenAppButton>
      </div>
    </div>
  );
}

export function ViewMoreGate({
  preview,
  locked,
  cta,
  appPath = "",
}: {
  preview: ReactNode;
  locked: string;
  cta: string;
  appPath?: string;
}) {
  return (
    <div className="relative">
      <div>{preview}</div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: "linear-gradient(180deg, transparent, var(--hint-surface) 82%)" }}
      />
      <div className="relative mt-3 rounded-[16px] border p-3" style={{ borderColor: "var(--hint-border)", background: "var(--hint-surface-soft)" }}>
        <p className="font-sans text-[13px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>
          {locked}
        </p>
        <OpenAppButton appPath={appPath} className="mt-3 w-full sm:w-auto">
          {cta}
        </OpenAppButton>
      </div>
    </div>
  );
}

export function LockedInsightCard({
  title,
  body,
  cta,
  appPath = "",
}: {
  title: string;
  body: string;
  cta: string;
  appPath?: string;
}) {
  return (
    <article
      className="relative overflow-hidden rounded-[18px] border p-4"
      style={{
        background: "color-mix(in srgb, var(--hint-input-bg) 78%, transparent)",
        borderColor: "var(--hint-border)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full border" style={{ borderColor: "var(--hint-border)", color: "var(--hint-gold)", background: "var(--hint-surface-soft)" }}>
          <Sparkles className="size-4" />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-[20px] leading-tight" style={{ color: "var(--hint-text)" }}>
            {title}
          </h3>
          <p className="mt-1 font-sans text-[13px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>
            {body}
          </p>
          <OpenAppButton appPath={appPath} tone="quiet" className="mt-3">
            {cta}
          </OpenAppButton>
        </div>
      </div>
    </article>
  );
}

export function PreviewTextBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[18px] border p-4" style={{ background: "var(--hint-surface-soft)", borderColor: "var(--hint-border)" }}>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--hint-gold)" }}>
        {eyebrow}
      </p>
      <h3 className="mt-1 font-serif text-[24px] leading-tight" style={{ color: "var(--hint-text)" }}>
        {title}
      </h3>
      <div className="mt-2 font-sans text-[13px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>
        {children}
      </div>
    </div>
  );
}
