import "./styles/tokens/colors.css";
import "./styles/tokens/typography.css";
import "./styles/tokens/spacing.css";
import "./styles/tokens/effects.css";
import "./components/experience-kit/src/shared/styles/animations.css";
import "./components/experience-kit/src/shared/styles/hint-tokens.css";
import "./styles/landing.css";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { DailyEnergyScore } from "./components/experience-kit/src/product/daily/DailyEnergyScore";
import { DailyTarot } from "./components/experience-kit/src/product/daily/DailyTarot";
import { TarotRoom } from "./components/experience-kit/src/product/tarot/TarotRoom";
import { FeatureCarousel, type FeatureSlide } from "./components/experience-kit/src/site/FeatureCarousel";
import type {
  ScoreArea,
  TarotCardData,
} from "./components/experience-kit/src/shared/data/tarot";
import { LanguageToggle } from "../../components/LanguageToggle";
import { type HintTheme } from "../../components/web/theme";
import { setHintThemePreference } from "../../lib/preferences";

const tarot = (file: string) => `/assets/tarot/${file}`;
const START_HERE_URL = "#birthday-score";

const dailyCard: TarotCardData = {
  id: "the-star",
  name: "The Star",
  image: tarot("17-TheStar.jpg"),
  arcana: "major",
  rarity: "common",
  blurb: "Something you have been quietly tending is closer to water than you think. Keep pouring.",
};

const scores: ScoreArea[] = [
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
  return scores.map((score, index) => ({
    ...score,
    value: Math.max(42, Math.min(98, overall + offsets[index])),
  }));
}

function CtaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="hint-site__cta" href={href}>
      {children}
      <span aria-hidden>-&gt;</span>
    </a>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => ({
        id: index,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() < 0.85 ? 1.5 : 2.5,
        color: Math.random() < 0.3 ? "var(--star-soft)" : "var(--star-ink)",
        opacity: 0.2 + Math.random() * 0.5,
        duration: 2.4 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="hint-site__stars" aria-hidden>
      {stars.map((star) => (
        <span
          key={star.id}
          style={
            {
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: star.color,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px currentColor`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Atmosphere() {
  return (
    <>
      <div className="hint-site__sky" aria-hidden />
      <div className="hint-site__wash" aria-hidden />
      <Starfield />
      <div className="hint-site__moon" aria-hidden />
      <div className="hint-site__vignette" aria-hidden />
    </>
  );
}

function Header({ theme, onToggleTheme }: { theme: HintTheme; onToggleTheme: () => void }) {
  const night = theme === "dark";

  return (
    <header className="hint-site__header">
      <nav className="hint-site__nav" aria-label="Primary">
        <a className="hint-site__brand" href="#top">
          <img src="/assets/brand/hint-cardmark-logo.png" alt="" width="30" height="30" />
          <span>Hint</span>
        </a>
        <div className="hint-site__links">
          <a href="#features">Features</a>
          <a href="/tarot">Tarot</a>
          <a href="/astrology">Charts</a>
          <a href="#how">How it works</a>
          <a href="/daily-pull">Daily pull</a>
          <a href="/collection">Collection</a>
          <a href="/animal-tarot">Animals</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="hint-site__actions">
          <LanguageToggle className="hint-site__language" menuPlacement="bottom" />
          <button className="hint-site__theme" type="button" onClick={onToggleTheme} aria-label="Toggle day and night">
            <span className={!night ? "is-active" : ""}>
              <SunIcon />
            </span>
            <span className={night ? "is-active" : ""}>
              <MoonIcon />
            </span>
          </button>
          <a className="hint-site__open" href={START_HERE_URL}>
            Open Hint Online
          </a>
        </div>
      </nav>
    </header>
  );
}

function HeroStats() {
  const stats = [
    ["5", "feature doors"],
    ["1", "daily ritual"],
    ["78", "cards to collect"],
  ];

  return (
    <div className="hint-site__stats" aria-label="Hint online features">
      {stats.map(([value, label]) => (
        <div key={label}>
          <span>{value}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function HeroActions() {
  return (
    <div className="hint-site__hero-actions">
      <CtaLink href={START_HERE_URL}>Open Hint Online</CtaLink>
      <a className="hint-site__secondary" href="#features">
        Tour Features
      </a>
    </div>
  );
}

function FeatureJumpBar() {
  const items = [
    ["Preview", "#features"],
    ["Birthday", "#birthday-score"],
    ["Daily Score", "/daily-pull"],
    ["Tarot Trial", "#tarot-trial"],
  ];

  return (
    <nav className="hint-site__jumpbar" aria-label="Open Hint features">
      {items.map(([label, href]) => (
        <a key={label} href={href}>
          {label}
        </a>
      ))}
    </nav>
  );
}

function AppPhone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="hint-phone" aria-label={`${label} app preview`}>
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
        Birth chart and sky signals help shape the daily score.
      </p>
    </div>
  );
}

function FeatureVisual({ kind }: { kind: "room" | "score" | "daily" | "astrology" }) {
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
  return (
    <AppPhone label="Daily Tarot">
      <DailyTarot card={dailyCard} defaultRevealed />
    </AppPhone>
  );
}

function HeroCarousel() {
  const slides: FeatureSlide[] = [
    {
      id: "room",
      eyebrow: "Tarot Room",
      title: "A private room for one free card reading.",
      body: "The landing page shows what the room looks like before visitors try one tarot reading on the website.",
      ctaLabel: "Try Tarot Free",
      href: "#tarot-trial",
      accent: "rose",
      visual: <FeatureVisual kind="room" />,
    },
    {
      id: "daily",
      eyebrow: "Daily Tarot",
      title: "One daily card, shown like the app.",
      body: "The preview should feel like the actual Hint experience: a card, a short reading, and a clear next step.",
      ctaLabel: "Open Daily Pull",
      href: "/daily-pull",
      accent: "gold",
      visual: <FeatureVisual kind="daily" />,
    },
    {
      id: "score",
      eyebrow: "Daily Score",
      title: "Enter a birthday to unlock today's score.",
      body: "A free sample can show love, career, emotion, luck, and energy so the visitor understands the product quickly.",
      ctaLabel: "Enter Birthday",
      href: "#birthday-score",
      accent: "gold",
      visual: <FeatureVisual kind="score" />,
    },
    {
      id: "astrology",
      eyebrow: "Astrology",
      title: "Astrology stays as part of the feature story.",
      body: "Charts support the daily score and readings, but on this page they only need a clean preview, not a full astrology section.",
      ctaLabel: "Try Daily Score",
      href: "#birthday-score",
      accent: "aqua",
      visual: <FeatureVisual kind="astrology" />,
    },
  ];

  return (
    <section className="hint-site__section hint-slider-section" id="features">
      <FeatureCarousel
        slides={slides}
        renderCta={(slide) => (
          <a className="hint-fc__cta" href={slide.href}>
            {slide.ctaLabel} <span aria-hidden>-&gt;</span>
          </a>
        )}
      />
    </section>
  );
}

function BirthdayScoreSection() {
  const [birthDate, setBirthDate] = useState("");
  const [revealed, setRevealed] = useState(false);
  const overall = birthdayScore(birthDate);
  const active = revealed && birthDate.length > 0;

  return (
    <section className="hint-site__section hint-birthday" id="birthday-score">
      <div className="hint-birthday__grid">
        <div className="hint-birthday__copy">
          <span className="hint-site__eyebrow">Try free</span>
          <h2>Enter your birthday. See today's score.</h2>
          <p>
            This is the free first moment: birthday in, today's card and score out.
            It introduces astrology without turning the page into a full chart tool.
          </p>

          <form
            className="hint-birthday__form"
            onSubmit={(event) => {
              event.preventDefault();
              setRevealed(true);
            }}
          >
            <label htmlFor="hint-birthday-input">Birthday</label>
            <div>
              <input
                id="hint-birthday-input"
                type="date"
                value={birthDate}
                onChange={(event) => {
                  setBirthDate(event.target.value);
                  setRevealed(false);
                }}
              />
              <button type="submit">See My Score</button>
            </div>
          </form>

          <div className="hint-birthday__result" aria-live="polite">
            <span>{active ? "Your sample score" : "Sample preview"}</span>
            <strong>{active ? overall : 78}</strong>
            <small>{active ? "The full daily pull opens with the real feature page." : "Enter a birthday to personalize the preview."}</small>
          </div>

          <div className="hint-birthday__actions">
            <CtaLink href="/daily-pull">Open Daily Pull</CtaLink>
            <a className="hint-site__secondary" href="#tarot-trial">
              Try Tarot
            </a>
          </div>
        </div>

        <div className="hint-birthday__phones" aria-label="Daily score app previews">
          <AppPhone label="Daily Score">
            <DailyScorePreview overall={active ? overall : 78} />
          </AppPhone>
          <AppPhone label="Daily Tarot">
            <DailyTarot card={dailyCard} defaultRevealed />
          </AppPhone>
        </div>
      </div>
    </section>
  );
}

function TarotTrialSection() {
  return (
    <section className="hint-site__section hint-trial" id="tarot-trial">
      <div className="hint-trial__copy">
        <span className="hint-site__eyebrow">Try free tarot</span>
        <h2>Let visitors try one reading on the website.</h2>
        <p>
          After the feature ads and birthday score, the next step is simple:
          open a real Tarot Room and let them try the web reading once.
        </p>
        <CtaLink href="/tarot">Enter Tarot Room</CtaLink>
      </div>
      <div className="hint-trial__visual">
        <AppPhone label="Tarot Room">
          <TarotRoom title="Tarot Room" />
        </AppPhone>
      </div>
    </section>
  );
}

function HowItWorks() {
  const items = [
    ["Preview", "Swipe through app-style screens so visitors see what Hint looks like."],
    ["Birthday", "Let them try the daily score with one simple birth date field."],
    ["Daily", "Show the daily tarot card and score as the first free result."],
    ["Tarot", "Offer one website tarot reading before deeper feature pages."],
  ];

  return (
    <section className="hint-site__section" id="how">
      <div className="hint-site__section-head">
        <span className="hint-site__eyebrow">How it works</span>
        <h2>Four quiet steps.</h2>
      </div>
      <div className="hint-site__mini-grid">
        {items.map(([title, body]) => (
          <article className="hint-site__mini-card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="hint-site__section" id="pricing">
      <div className="hint-site__pricing">
        <span className="hint-site__eyebrow">One website</span>
        <h2>Introduce first. Let them try immediately.</h2>
        <p>
          Astrology, tarot, daily score, and the room are explained through the slider.
          The free actions stay focused: birthday score first, then one tarot reading.
        </p>
        <CtaLink href="#birthday-score">Try Free</CtaLink>
      </div>
    </section>
  );
}

export function LandingPage() {
  const [theme, setTheme] = useState<HintTheme>("dark");

  useEffect(() => {
    document.documentElement.dataset.hintTheme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    setHintThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(id))?.scrollIntoView({ block: "start" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="hint-site" data-hint-theme={theme}>
      <Atmosphere />
      <Header theme={theme} onToggleTheme={() => setTheme((current) => (current === "dark" ? "bright" : "dark"))} />

      <main className="hint-site__main" id="top">
        <section className="hint-site__hero">
          <div className="hint-site__pill">
            <span />
            Inside Hint
          </div>
          <h1>
            Five doorways into <em>the night.</em>
          </h1>
          <p>
            Start with the feature tour, then use Cards, Charts, Daily Pull,
            Tarot Room, and Collection inside this same website.
          </p>
          <HeroActions />
          <HeroStats />
        </section>
        <FeatureJumpBar />
        <HeroCarousel />
        <BirthdayScoreSection />
        <TarotTrialSection />
        <HowItWorks />
        <PricingSection />
      </main>
    </div>
  );
}
