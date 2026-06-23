import "../../landing/styles/tokens/colors.css";
import "../../landing/styles/tokens/typography.css";
import "../../landing/styles/tokens/spacing.css";
import "../../landing/styles/tokens/effects.css";
import "../../landing/components/experience-kit/src/shared/styles/animations.css";
import "../../landing/components/experience-kit/src/shared/styles/hint-tokens.css";
import "../../landing/styles/landing.css";
import { useState, type ReactNode } from "react";
import { DailyEnergyScore } from "../../landing/components/experience-kit/src/product/daily/DailyEnergyScore";
import { DailyTarot } from "../../landing/components/experience-kit/src/product/daily/DailyTarot";
import { TarotRoom } from "../../landing/components/experience-kit/src/product/tarot/TarotRoom";
import { FeatureCarousel, type FeatureSlide } from "../../landing/components/experience-kit/src/site/FeatureCarousel";
import type {
  ScoreArea,
  TarotCardData,
} from "../../landing/components/experience-kit/src/shared/data/tarot";

const tarot = (file: string) => `/assets/tarot/${file}`;

const dailyCard: TarotCardData = {
  id: "the-star",
  name: "The Star",
  image: tarot("17-TheStar.jpg"),
  arcana: "major",
  rarity: "common",
  blurb: "Something you have been quietly tending is closer to water than you think. Keep pouring.",
};

const previewScores: ScoreArea[] = [
  { key: "love", label: "Love", value: 82, toneVar: "--score-love" },
  { key: "career", label: "Career", value: 77, toneVar: "--score-career" },
  { key: "emotion", label: "Emotion", value: 68, toneVar: "--score-people" },
  { key: "luck", label: "Luck", value: 90, toneVar: "--score-wealth" },
  { key: "energy", label: "Energy", value: 74, toneVar: "--score-study" },
];

function birthdayScore(date: string) {
  if (!date) return 78;
  const seed = date.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return 64 + (seed % 29);
}

function scoreSet(overall: number): ScoreArea[] {
  const offsets = [4, -2, 6, 11, -7];
  return previewScores.map((score, index) => ({
    ...score,
    value: Math.max(42, Math.min(98, overall + offsets[index])),
  }));
}

function AppPhone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="hint-phone" aria-label={`${label} preview`}>
      <div className="hint-phone__hardware">
        <span className="hint-phone__speaker" aria-hidden />
        <div className="hint-phone__screen">
          <div className="hint-phone__topbar">
            <img src="/assets/brand/hint-cardmark-logo.png" alt="" />
            <span>{label}</span>
          </div>
          <div className="hint-phone__content">{children}</div>
        </div>
      </div>
    </div>
  );
}

function DailyScorePreview({ overall = 78 }: { overall?: number }) {
  return (
    <div className="hint-phone-score">
      <p className="hint-phone-kicker">Today Score</p>
      <DailyEnergyScore areas={scoreSet(overall)} overall={overall} active />
    </div>
  );
}

function AstrologyPreview() {
  const placements = [
    ["Sun", "Taurus"],
    ["Moon", "Cancer"],
    ["Rising", "Leo"],
  ];

  return (
    <div className="hint-astro-preview">
      <p className="hint-phone-kicker">Astrology</p>
      <div className="hint-astro-preview__orb" aria-hidden>
        <span />
        <i />
      </div>
      <div className="hint-astro-preview__rows">
        {placements.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <p className="hint-astro-preview__copy">
        Charts help shape the daily score, without making Today feel like a separate astrology page.
      </p>
    </div>
  );
}

function CollectionPreview() {
  const cards = ["The Star", "The Moon", "The Sun"];

  return (
    <div className="grid w-full gap-3">
      <p className="hint-phone-kicker">Collection</p>
      <div
        className="rounded-[18px] border p-3"
        style={{
          background: "color-mix(in srgb, var(--hint-surface-soft) 88%, transparent)",
          borderColor: "var(--hint-border)",
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-sans text-[11px] font-semibold" style={{ color: "var(--hint-text)" }}>
            Today's card saved
          </span>
          <span className="font-sans text-[10px] font-semibold" style={{ color: "var(--hint-gold)" }}>
            12 / 78
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {cards.map((card) => (
            <div
              key={card}
              className="grid min-h-[92px] place-items-end rounded-[12px] border p-2 text-center"
              style={{
                background: "var(--hint-deck-card-bg)",
                borderColor: "color-mix(in srgb, var(--hint-gold) 28%, transparent)",
              }}
            >
              <span className="font-serif text-[12px] leading-tight" style={{ color: "var(--hint-deck-label)" }}>
                {card}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-sans text-[11px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>
          Daily cards become a visible path, not a separate feature people need to find later.
        </p>
      </div>
    </div>
  );
}

function FeatureVisual({ kind }: { kind: "room" | "score" | "daily" | "astrology" | "collection" }) {
  if (kind === "room") {
    return (
      <AppPhone label="Tarot Room">
        <TarotRoom title="Tarot Room" />
      </AppPhone>
    );
  }
  if (kind === "score") {
    return (
      <AppPhone label="Daily Score">
        <DailyScorePreview />
      </AppPhone>
    );
  }
  if (kind === "astrology") {
    return (
      <AppPhone label="Charts">
        <AstrologyPreview />
      </AppPhone>
    );
  }
  if (kind === "collection") {
    return (
      <AppPhone label="Collection">
        <CollectionPreview />
      </AppPhone>
    );
  }
  return (
    <AppPhone label="Daily Tarot">
      <DailyTarot card={dailyCard} defaultRevealed />
    </AppPhone>
  );
}

function BirthdayPreviewPanel() {
  const [birthDate, setBirthDate] = useState("");
  const [revealed, setRevealed] = useState(false);
  const overall = birthdayScore(birthDate);
  const active = revealed && birthDate.length > 0;

  return (
    <div
      id="daily-score"
      className="mt-5 grid gap-4 rounded-[22px] border p-4 sm:p-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center"
      style={{
        background: "var(--hint-card-surface)",
        borderColor: "var(--hint-border)",
        boxShadow: "var(--hint-elevated-shadow)",
      }}
    >
      <div>
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--hint-gold)" }}>
          Try free
        </p>
        <h3 className="mt-2 font-serif text-[28px] leading-tight sm:text-[34px]" style={{ color: "var(--hint-text)" }}>
          Enter your birthday. See today's score.
        </h3>
        <p className="mt-3 max-w-xl font-sans text-[13px] leading-relaxed sm:text-[14px]" style={{ color: "var(--hint-muted)" }}>
          This stays inside Today: birthday in, sample score out, then the daily card is already above you on this same page.
        </p>

        <form
          className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            setRevealed(true);
          }}
        >
          <label className="sr-only" htmlFor="hint-preview-birthday">
            Birthday
          </label>
          <input
            id="hint-preview-birthday"
            type="date"
            value={birthDate}
            onChange={(event) => {
              setBirthDate(event.target.value);
              setRevealed(false);
            }}
            className="h-12 rounded-full border px-4 font-sans text-[14px] outline-none"
            style={{
              color: "var(--hint-text)",
              background: "color-mix(in srgb, var(--hint-input-bg) 86%, transparent)",
              borderColor: "var(--hint-border)",
            }}
          />
          <button
            type="submit"
            className="h-12 rounded-full px-5 font-sans text-[14px] font-semibold"
            style={{
              color: "var(--hint-special-action-text)",
              background: "var(--hint-special-action-bg)",
              boxShadow: "0 12px 26px rgba(244, 175, 203, 0.22)",
            }}
          >
            See My Score
          </button>
        </form>
      </div>

      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <div
          className="grid min-h-[132px] place-items-center rounded-[18px] border px-5 py-4 text-center"
          style={{
            background: "color-mix(in srgb, var(--hint-surface-soft) 82%, transparent)",
            borderColor: "var(--hint-border)",
          }}
        >
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--hint-gold)" }}>
            {active ? "Your sample score" : "Sample score"}
          </span>
          <strong className="mt-2 font-serif text-[64px] leading-none tabular-nums" style={{ color: "var(--hint-score-ink)", textShadow: "var(--hint-score-shadow)" }}>
            {active ? overall : 78}
          </strong>
          <small className="mt-2 font-sans text-[12px]" style={{ color: "var(--hint-muted)" }}>
            {active ? "Personalized preview" : "Add a birthday to personalize it."}
          </small>
        </div>
        <DailyScorePreview overall={active ? overall : 78} />
      </div>
    </div>
  );
}

function TarotTrialPanel() {
  return (
    <div
      id="tarot-trial"
      className="mt-5 grid gap-5 rounded-[24px] border p-4 sm:p-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center"
      style={{
        background: "var(--hint-surface-strong)",
        borderColor: "var(--hint-border-strong)",
        boxShadow: "var(--hint-elevated-shadow)",
      }}
    >
      <div>
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--hint-gold)" }}>
          Try tarot here
        </p>
        <h3 className="mt-2 font-serif text-[28px] leading-tight sm:text-[36px]" style={{ color: "var(--hint-text)" }}>
          Ask one question without leaving Preview.
        </h3>
        <p className="mt-3 max-w-xl font-sans text-[13px] leading-relaxed sm:text-[14px]" style={{ color: "var(--hint-muted)" }}>
          The full Tarot Room still exists, but the first try should happen here so visitors understand the product in one scroll.
        </p>
      </div>
      <div
        className="rounded-[22px] border p-3"
        style={{
          background: "color-mix(in srgb, var(--hint-surface-soft) 86%, transparent)",
          borderColor: "var(--hint-border)",
        }}
      >
        <TarotRoom title="Tarot Trial" />
      </div>
    </div>
  );
}

export function HintPreviewSection() {
  const slides: FeatureSlide[] = [
    {
      id: "daily",
      eyebrow: "Daily Tarot",
      title: "Draw today's card on this page.",
      body: "Daily and Today now live in the same preview flow: explain first, then let people draw the real daily card below.",
      ctaLabel: "Draw Today",
      href: "#today",
      accent: "gold",
      visual: <FeatureVisual kind="daily" />,
    },
    {
      id: "score",
      eyebrow: "Daily Score",
      title: "Birthday unlocks the score preview.",
      body: "The visitor can enter a birthday and see the score here, without opening a separate daily page.",
      ctaLabel: "Try Birthday",
      href: "#daily-score",
      accent: "rose",
      visual: <FeatureVisual kind="score" />,
    },
    {
      id: "room",
      eyebrow: "Tarot Room",
      title: "Try tarot without leaving Preview.",
      body: "The room preview is usable here first, then the full Tarot Room can stay as a deeper page.",
      ctaLabel: "Try Tarot Here",
      href: "#tarot-trial",
      accent: "rose",
      visual: <FeatureVisual kind="room" />,
    },
    {
      id: "astrology",
      eyebrow: "Astrology",
      title: "Astrology supports the reading.",
      body: "Charts explain why the score and reading feel personal, but they stay part of the preview story.",
      ctaLabel: "See Score",
      href: "#daily-score",
      accent: "aqua",
      visual: <FeatureVisual kind="astrology" />,
    },
    {
      id: "collection",
      eyebrow: "Collection",
      title: "Daily cards become progress.",
      body: "After the draw, the card should feel saved and collectible, so the preview explains the longer loop too.",
      ctaLabel: "Draw Today",
      href: "#today",
      accent: "gold",
      visual: <FeatureVisual kind="collection" />,
    },
  ];

  return (
    <section id="hint-preview" className="mb-10 scroll-mt-28 pt-2 lg:mb-12 lg:pt-4">
      <div className="mb-5 px-1 sm:mb-6">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--hint-gold)" }}>
          Hint Preview
        </p>
        <h1 className="mt-2 max-w-5xl font-serif text-[38px] leading-[1.02] sm:text-[56px] lg:text-[72px]" style={{ color: "var(--hint-text)", textShadow: "0 0 34px rgba(255,248,242,0.18), 0 2px 16px rgba(0,0,0,0.28)" }}>
          Preview Hint, then use it here.
        </h1>
        <p className="mt-4 max-w-3xl font-sans text-[14px] leading-relaxed sm:text-[17px]" style={{ color: "color-mix(in srgb, var(--hint-text) 80%, transparent)" }}>
          This page explains the product and lets people try the important parts in one place: draw today's card, see a daily score, preview tarot, and understand astrology.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            className="inline-flex h-12 items-center justify-center rounded-full px-5 font-sans text-[14px] font-semibold"
            href="#today"
            style={{
              color: "var(--hint-special-action-text)",
              background: "var(--hint-special-action-bg)",
              boxShadow: "0 12px 26px rgba(244, 175, 203, 0.22)",
            }}
          >
            Draw Today's Card
          </a>
          <a
            className="inline-flex h-12 items-center justify-center rounded-full border px-5 font-sans text-[14px] font-semibold"
            href="#daily-score"
            style={{
              color: "var(--hint-text)",
              background: "color-mix(in srgb, var(--hint-surface-soft) 82%, transparent)",
              borderColor: "var(--hint-border)",
            }}
          >
            Enter Birthday
          </a>
        </div>
      </div>

      <FeatureCarousel
        slides={slides}
        renderCta={(slide) => (
          <a className="hint-fc__cta" href={slide.href}>
            {slide.ctaLabel} <span aria-hidden>-&gt;</span>
          </a>
        )}
      />

      <BirthdayPreviewPanel />
      <TarotTrialPanel />
    </section>
  );
}
