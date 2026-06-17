import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { ACCENT } from "../modules/hold/atmosphere";
import { useLanguage, type HintLanguage } from "../lib/i18n";

interface Props {
  className?: string;
  compact?: boolean;
  menuPlacement?: "top" | "bottom";
}

const LANGUAGE_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Hanken Grotesk", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR", system-ui, sans-serif';
const LANGUAGE_BADGES: Record<HintLanguage, string> = {
  en: "EN",
  zh: "ZH",
  es: "ES",
  ja: "JP",
  ko: "KR",
};

export function LanguageToggle({ className = "", compact = false, menuPlacement = "top" }: Props) {
  const { language, languages, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeLanguage = languages.find((option) => option.code === language) ?? languages[0]!;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const chooseLanguage = (nextLanguage: HintLanguage) => {
    setLanguage(nextLanguage);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`pointer-events-auto relative ${className || "inline-flex"}`}>
      <button
        type="button"
        aria-label={t("language.switchAria")}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={t("language.switchAria")}
        onClick={() => setOpen((current) => !current)}
        className={
          compact
            ? "relative inline-flex size-9 items-center justify-center rounded-full border px-0 font-sans text-[10px] font-black uppercase tracking-normal transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 lg:size-11"
            : "inline-flex h-10 items-center gap-2 rounded-full border px-3 font-sans text-[12px] font-semibold tracking-normal transition-[transform,box-shadow,border-color] hover:-translate-y-0.5"
        }
        style={{
          color: "var(--hint-text)",
          fontFamily: LANGUAGE_FONT,
          background: open
            ? "radial-gradient(circle at 34% 24%, rgba(142,226,212,0.24), rgba(243,207,130,0.16) 48%, var(--hint-nav-bg))"
            : "linear-gradient(145deg, color-mix(in srgb, var(--hint-nav-bg) 94%, white), color-mix(in srgb, var(--hint-surface-soft) 88%, transparent))",
          borderColor: open ? "rgba(228, 198, 138, 0.58)" : "var(--hint-border)",
          boxShadow: open
            ? "0 0 0 1px rgba(228,198,138,0.18), 0 0 26px rgba(142,226,212,0.18), var(--hint-nav-shadow)"
            : "inset 0 1px 0 rgba(255,255,255,0.10), var(--hint-nav-shadow)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
        data-testid="button-language-toggle"
      >
        {compact ? (
            <Globe2 size={18} strokeWidth={1.85} style={{ color: open ? ACCENT.gold : ACCENT.aqua }} />
        ) : (
          <>
            <Globe2 size={16} strokeWidth={1.8} style={{ color: ACCENT.aqua }} />
            <span
              className="rounded-full border px-2 py-0.5"
              style={{
                borderColor: "rgba(228,198,138,0.32)",
                background: "rgba(228,198,138,0.08)",
                color: "var(--hint-text)",
                fontSize: 11,
                lineHeight: "14px",
                fontWeight: 700,
              }}
            >
              {activeLanguage.shortLabel}
            </span>
            <ChevronDown
              size={13}
              strokeWidth={2}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
              style={{ color: "var(--hint-faint)" }}
            />
          </>
        )}
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={t("language.switchAria")}
          className={`absolute right-0 z-[70] w-[260px] overflow-hidden rounded-[18px] border p-2 ${
            menuPlacement === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
          style={{
            fontFamily: LANGUAGE_FONT,
            background:
              "linear-gradient(145deg, color-mix(in srgb, var(--hint-nav-bg) 92%, black), color-mix(in srgb, var(--hint-surface-soft) 84%, transparent))",
            borderColor: "rgba(228,198,138,0.24)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div
            className="mb-1 flex items-center gap-3 rounded-[14px] px-3 py-2.5"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full border"
              style={{
                borderColor: "rgba(142,226,212,0.26)",
                background: "radial-gradient(circle at 34% 26%, rgba(142,226,212,0.22), rgba(228,198,138,0.10) 58%, transparent)",
              }}
            >
              <Globe2 size={16} strokeWidth={1.8} style={{ color: ACCENT.aqua }} />
            </span>
            <span className="min-w-0">
              <span
                className="block"
                style={{ color: "var(--hint-text)", fontSize: 13, lineHeight: "16px", fontWeight: 700 }}
              >
                Language
              </span>
              <span
                className="block"
                style={{ color: "var(--hint-muted)", fontSize: 11, lineHeight: "14px", fontWeight: 500 }}
              >
                Choose display language
              </span>
            </span>
          </div>
          {languages.map((option) => {
            const selected = option.code === language;
            return (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => chooseLanguage(option.code)}
                className="flex h-11 w-full items-center justify-between rounded-[12px] px-3 text-left transition-colors"
                style={{
                  color: selected ? "var(--hint-text)" : "var(--hint-muted)",
                  background: selected
                    ? "linear-gradient(135deg, rgba(228,198,138,0.16), rgba(142,226,212,0.10))"
                    : "transparent",
                  fontFamily: LANGUAGE_FONT,
                }}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className="grid h-6 w-9 shrink-0 place-items-center rounded-full border"
                    style={{
                      borderColor: selected ? "rgba(228,198,138,0.44)" : "rgba(255,255,255,0.10)",
                      background: selected ? "rgba(228,198,138,0.14)" : "rgba(255,255,255,0.04)",
                      color: selected ? ACCENT.gold : "var(--hint-faint)",
                      fontSize: 10,
                      lineHeight: "12px",
                      fontWeight: 800,
                    }}
                  >
                    {LANGUAGE_BADGES[option.code]}
                  </span>
                  <span
                    className="truncate"
                    style={{
                      color: selected ? "var(--hint-text)" : "var(--hint-muted)",
                      fontSize: 13,
                      lineHeight: "18px",
                      fontWeight: selected ? 700 : 600,
                      letterSpacing: 0,
                    }}
                  >
                    {option.label}
                  </span>
                </span>
                {selected ? <Check size={14} strokeWidth={2} style={{ color: ACCENT.aqua }} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
