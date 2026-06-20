import { useMemo, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { CalendarDays, Cat, History, Library, Moon, Sparkles, Star, SunMedium } from "lucide-react";
import { AppGateCTA, LockedInsightCard, OpenAppButton, PreviewTextBlock, ViewMoreGate } from "../../components/web/AppGate";
import { AppScreen, GlassPanel, ScreenHeader, SectionLabel } from "../../components/web/AppChrome";
import { getAnonId } from "../../lib/identity";
import { useLanguage } from "../../lib/i18n";
import { getDailyReport } from "../home/data/dailyReport";
import { getTarotCardImage } from "../tarot/logic/cardImageMap";

const tarotImage = (file: string) => `/assets/tarot/${file}`;

const tarotLiteCards = [
  {
    id: "star",
    name: "The Star",
    image: tarotImage("17-TheStar.jpg"),
    reading:
      "Something you have been quietly tending still has water in it. Do not rush the proof. Keep pouring where the day already feels honest.",
  },
  {
    id: "sun",
    name: "The Sun",
    image: tarotImage("19-TheSun.jpg"),
    reading:
      "Warmth is trying to reach you through something simple. Let one easy thing count instead of turning the whole day into a test.",
  },
  {
    id: "moon",
    name: "The Moon",
    image: tarotImage("18-TheMoon.jpg"),
    reading:
      "Not every unclear feeling needs an answer tonight. Name the fog, move slowly, and wait for the shape underneath it.",
  },
];

const animalCards = [
  {
    animal: "Wolf",
    card: "Nocturnal path",
    image: tarotImage("18-TheMoon.jpg"),
    meaning: "The Wolf reads the room through scent, distance, and the shape of the pack. Its symbol is alert instinct before movement.",
    prompt: "Signals: night travel, pack memory, quiet leadership, and choosing the clean path before the loud one.",
  },
  {
    animal: "Sun Deer",
    card: "Open field",
    image: tarotImage("19-TheSun.jpg"),
    meaning: "The Sun Deer stands where warmth is visible and escape routes stay open. Its symbol is gentleness with fast awareness.",
    prompt: "Signals: dawn grazing, soft confidence, quick ears, and knowing when a place is safe enough to stay.",
  },
];

const collectionCards = [
  { name: "The Star", image: tarotImage("17-TheStar.jpg"), new: true },
  { name: "The Moon", image: tarotImage("18-TheMoon.jpg") },
  { name: "The Sun", image: tarotImage("19-TheSun.jpg") },
  { name: "The World", image: tarotImage("21-TheWorld.jpg") },
];

function LiteCardImage({ image, name }: { image: string; name: string }) {
  return (
    <div
      className="relative mx-auto aspect-[46/71] w-[150px] overflow-hidden rounded-[14px] border sm:w-[178px]"
      style={{
        borderColor: "color-mix(in srgb, var(--hint-gold, #cba866) 50%, var(--hint-border))",
        boxShadow: "0 26px 54px rgba(0,0,0,0.34), 0 0 38px rgba(203,168,102,0.14)",
      }}
    >
      <img src={image} alt={name} className="h-full w-full object-cover" draggable={false} />
    </div>
  );
}

function FeaturedDailyCard({
  image,
  name,
  revealed,
  onReveal,
}: {
  image: string;
  name: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.currentTarget.blur();
        onReveal();
      }}
      onMouseDown={(event) => event.preventDefault()}
      className="group relative mx-auto flex w-full max-w-[260px] flex-col items-center text-left outline-none sm:max-w-[300px] md:max-w-[320px] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hint-gold)_72%,white)]"
      aria-label={revealed ? `Daily tarot card: ${name}` : "Tap to reveal today's tarot card"}
    >
      <span
        aria-hidden
        className="absolute inset-x-[-18%] top-[9%] h-[74%] rounded-full opacity-80 blur-3xl transition duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--hint-gold) 30%, transparent), color-mix(in srgb, var(--hint-rose) 18%, transparent) 42%, transparent 72%)",
        }}
      />
      <span
        className="relative block aspect-[46/71] w-full overflow-hidden rounded-[18px] border transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.015]"
        style={{
          borderColor: revealed
            ? "color-mix(in srgb, var(--hint-gold) 72%, var(--hint-border))"
            : "color-mix(in srgb, var(--hint-gold) 46%, var(--hint-border))",
          boxShadow: revealed
            ? "0 30px 72px rgba(0,0,0,0.42), 0 0 54px color-mix(in srgb, var(--hint-gold) 28%, transparent)"
            : "0 24px 60px rgba(0,0,0,0.36), 0 0 34px color-mix(in srgb, var(--hint-gold) 14%, transparent)",
        }}
      >
        <img src={image} alt={name} className="h-full w-full object-cover" draggable={false} />
      </span>
      <span
        className="relative mt-4 inline-flex min-h-10 items-center justify-center rounded-full border px-5 text-center font-sans text-[12px] font-semibold"
        style={{
          color: revealed ? "var(--hint-special-action-text, #24172a)" : "var(--hint-text)",
          background: revealed ? "var(--hint-special-action-bg)" : "var(--hint-surface-soft)",
          borderColor: revealed ? "var(--hint-special-action-border, var(--hint-gold))" : "var(--hint-border-strong)",
        }}
      >
        {revealed ? "Card revealed" : "Tap to reveal today's sample card"}
      </span>
    </button>
  );
}

function imageForCard(cardName: string): string {
  const normalized = cardName.toLowerCase();
  if (normalized.includes("sun")) return tarotImage("19-TheSun.jpg");
  if (normalized.includes("moon")) return tarotImage("18-TheMoon.jpg");
  if (normalized.includes("world")) return tarotImage("21-TheWorld.jpg");
  if (normalized.includes("fool")) return tarotImage("00-TheFool.jpg");
  if (normalized.includes("wheel")) return tarotImage("10-WheelOfFortune.jpg");
  if (normalized.includes("priestess")) return tarotImage("02-TheHighPriestess.jpg");
  return tarotImage("17-TheStar.jpg");
}

function LiteHero({
  eyebrow,
  title,
  subtitle,
  icon,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <ScreenHeader
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      sigil={() => icon}
    />
  );
}

export function TarotLitePage() {
  const [question, setQuestion] = useState("");
  const [drawn, setDrawn] = useState<(typeof tarotLiteCards)[number] | null>(null);
  const selected = drawn ?? tarotLiteCards[0];

  function drawCard() {
    const index = Math.abs((question || "hint").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % tarotLiteCards.length;
    setDrawn(tarotLiteCards[index]);
  }

  return (
    <AppScreen>
      <LiteHero
        eyebrow="Tarot Lite"
        title="Ask once. Draw one card."
        subtitle="The website gives a short one-card preview. Spreads, follow-ups, saved readings, and the full Tarot Room live in the Hint app."
        icon={<Sparkles className="size-6" />}
      />

      <GlassPanel className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <LiteCardImage image={selected.image} name={selected.name} />
        <div>
          <label className="font-sans text-[12px] font-semibold" style={{ color: "var(--hint-muted)" }} htmlFor="tarot-lite-question">
            Your question
          </label>
          <textarea
            id="tarot-lite-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What should I understand tonight?"
            className="mt-2 min-h-24 w-full resize-none rounded-[14px] border px-4 py-3 font-sans text-[14px] outline-none"
            style={{ color: "var(--hint-text)", background: "var(--hint-input-bg)", borderColor: "var(--hint-border)" }}
          />
          <button
            type="button"
            onClick={drawCard}
            className="mt-3 inline-flex h-11 items-center justify-center rounded-full px-5 font-sans text-[13px] font-semibold"
            style={{ color: "#231d2a", background: "linear-gradient(135deg, rgba(228,164,82,1), rgba(242,184,121,0.98))" }}
          >
            Draw one card
          </button>
          {drawn ? (
            <ViewMoreGate
              preview={
                <div className="mt-5">
                  <h2 className="font-serif text-[30px]" style={{ color: "var(--hint-text)" }}>{drawn.name}</h2>
                  <p className="mt-2 font-sans text-[14px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>{drawn.reading}</p>
                </div>
              }
              locked="The full spread, card positions, saved reading, and AI follow-up are waiting in the app."
              cta="Continue Full Reading in Hint App"
              appPath="/tarot"
            />
          ) : null}
        </div>
      </GlassPanel>
    </AppScreen>
  );
}

export function AnimalTarotLitePage() {
  const [index, setIndex] = useState(0);
  const animal = animalCards[index];

  return (
    <AppScreen>
      <LiteHero
        eyebrow="Animal Tarot"
        title="Meet tonight's animal guide."
        subtitle="Explore animal symbols, traits, habitats, and instinct patterns. The web preview stays focused on the animal itself."
        icon={<Cat className="size-6" />}
      />
      <GlassPanel className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <LiteCardImage image={animal.image} name={animal.animal} />
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--hint-gold)" }}>{animal.card}</p>
          <h2 className="mt-1 font-serif text-[36px]" style={{ color: "var(--hint-text)" }}>{animal.animal}</h2>
          <p className="mt-2 font-sans text-[14px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>{animal.meaning}</p>
          <PreviewTextBlock eyebrow="Animal signal" title="Behavior to watch">
            {animal.prompt}
          </PreviewTextBlock>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setIndex((value) => (value + 1) % animalCards.length)}
              className="h-11 rounded-full border px-5 font-sans text-[13px] font-semibold"
              style={{ color: "var(--hint-text)", borderColor: "var(--hint-border)", background: "var(--hint-surface-soft)" }}
            >
              Meet another animal
            </button>
            <OpenAppButton appPath="/animal-tarot">Save Animal Profile</OpenAppButton>
          </div>
        </div>
      </GlassPanel>
    </AppScreen>
  );
}

export function DailyPullLitePage() {
  const { language } = useLanguage();
  const report = useMemo(() => getDailyReport({ anonId: getAnonId(), language }), [language]);
  const [revealed, setRevealed] = useState(false);
  const dailyCardImage = getTarotCardImage(report.card.cardId) ?? imageForCard(report.card.cardName);
  function revealDailyCard() {
    if (revealed) return;
    const scrollFrame = document.querySelector("[data-web-screen]");
    const scrollTop = scrollFrame instanceof HTMLElement ? scrollFrame.scrollTop : window.scrollY;
    setRevealed(true);
    const restoreScroll = () => {
      if (scrollFrame instanceof HTMLElement) {
        scrollFrame.scrollTop = scrollTop;
      } else {
        window.scrollTo({ top: scrollTop });
      }
    };
    window.requestAnimationFrame(() => window.requestAnimationFrame(restoreScroll));
    window.setTimeout(restoreScroll, 80);
  }
  const scorePreview = [
    { label: "Overall", value: report.overallScore },
    { label: "Love", value: report.scores.find((score) => score.key === "love")?.score ?? 78 },
    { label: "Career", value: report.scores.find((score) => score.key === "career")?.score ?? 74 },
    { label: "Emotion", value: report.scores.find((score) => score.key === "people")?.score ?? 71 },
    { label: "Luck", value: report.scores.find((score) => score.key === "wealth")?.score ?? 80 },
    { label: "Energy", value: report.scores.find((score) => score.key === "study")?.score ?? 73 },
  ];

  return (
    <AppScreen>
      <LiteHero
        eyebrow="Daily Pull + Score Lite"
        title="Draw once. Read a short score."
        subtitle="This web version previews one daily card, a score snapshot, and a short hint. Full explanation, sky evidence, history, and saving stay in the app."
        icon={<CalendarDays className="size-6" />}
      />
      <GlassPanel
        data-lite-daily-panel
        className="grid min-h-[430px] gap-5 p-4 sm:p-5 md:grid-cols-[minmax(250px,0.9fr)_minmax(0,1.1fr)] md:items-stretch lg:min-h-[520px] lg:grid-cols-[minmax(310px,0.92fr)_minmax(0,1.08fr)] lg:gap-7 lg:p-7"
      >
        <div
          className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[22px] border px-4 py-7 md:min-h-0 lg:px-6"
          style={{
            background:
              "radial-gradient(circle at 50% 24%, color-mix(in srgb, var(--hint-gold) 20%, transparent), transparent 42%), linear-gradient(155deg, color-mix(in srgb, var(--hint-plum) 54%, transparent), color-mix(in srgb, var(--hint-surface) 82%, transparent))",
            borderColor: "color-mix(in srgb, var(--hint-gold) 28%, var(--hint-border))",
          }}
        >
          <FeaturedDailyCard
            image={dailyCardImage}
            name={report.card.cardName}
            revealed={revealed}
            onReveal={revealDailyCard}
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4">
          {revealed ? (
            <ViewMoreGate
              preview={
                <div className="rounded-[22px] border p-4 sm:p-5" style={{ borderColor: "var(--hint-border)", background: "var(--hint-surface-soft)" }}>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--hint-gold)" }}>Today’s card</p>
                  <h2 className="mt-1 font-serif text-[38px] leading-none sm:text-[44px]" style={{ color: "var(--hint-text)" }}>{report.card.cardName}</h2>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>{report.card.whisper}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {scorePreview.map((score) => (
                      <div key={score.label} className="rounded-[16px] border p-3.5" style={{ borderColor: "var(--hint-border)", background: "color-mix(in srgb, var(--hint-input-bg) 74%, transparent)" }}>
                        <p className="font-serif text-[32px] leading-none" style={{ color: "var(--hint-score-ink)", textShadow: "var(--hint-score-shadow)" }}>{score.value}</p>
                        <p className="mt-1 font-sans text-[11px] font-semibold" style={{ color: "var(--hint-muted)" }}>{score.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              }
              locked="Score explanation, sky evidence, saved daily result, and daily history unlock inside the full app."
              cta="Unlock Full Daily Reading in Hint App"
              appPath="/daily"
            />
          ) : (
            <>
              <div className="rounded-[22px] border p-4 sm:p-5" style={{ borderColor: "var(--hint-border)", background: "var(--hint-surface-soft)" }}>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--hint-gold)" }}>Website demo</p>
                <h2 className="mt-1 font-serif text-[34px] leading-tight sm:text-[40px]" style={{ color: "var(--hint-text)" }}>
                  One draw opens the day.
                </h2>
                <p className="mt-3 font-sans text-[15px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>
                  Tap the tarot card to reveal today’s web preview, then the score snapshot appears here beside the card.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {scorePreview.map((score) => (
                  <div key={score.label} className="rounded-[16px] border p-3.5 opacity-80" style={{ borderColor: "var(--hint-border)", background: "color-mix(in srgb, var(--hint-input-bg) 60%, transparent)" }}>
                    <p className="font-serif text-[30px] leading-none" style={{ color: "var(--hint-faint)" }}>--</p>
                    <p className="mt-1 font-sans text-[11px] font-semibold" style={{ color: "var(--hint-muted)" }}>{score.label}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </GlassPanel>
    </AppScreen>
  );
}

function sunSignFromDate(value: string): string | null {
  const [, monthRaw, dayRaw] = value.match(/^(\d{4})-(\d{2})-(\d{2})$/) ?? [];
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  if (!month || !day) return null;
  const dateKey = month * 100 + day;
  if (dateKey >= 321 && dateKey <= 419) return "Aries";
  if (dateKey >= 420 && dateKey <= 520) return "Taurus";
  if (dateKey >= 521 && dateKey <= 620) return "Gemini";
  if (dateKey >= 621 && dateKey <= 722) return "Cancer";
  if (dateKey >= 723 && dateKey <= 822) return "Leo";
  if (dateKey >= 823 && dateKey <= 922) return "Virgo";
  if (dateKey >= 923 && dateKey <= 1022) return "Libra";
  if (dateKey >= 1023 && dateKey <= 1121) return "Scorpio";
  if (dateKey >= 1122 && dateKey <= 1221) return "Sagittarius";
  if (dateKey >= 1222 || dateKey <= 119) return "Capricorn";
  if (dateKey >= 120 && dateKey <= 218) return "Aquarius";
  return "Pisces";
}

export function AstrologyLitePage() {
  const [birthday, setBirthday] = useState("");
  const sign = sunSignFromDate(birthday);

  return (
    <AppScreen>
      <LiteHero
        eyebrow="Astrology Preview Lite"
        title="Start with your Sun sign."
        subtitle="The website gives a simple sign preview. Moon, rising, houses, transits, and reports stay in the app."
        icon={<SunMedium className="size-6" />}
      />
      <GlassPanel>
        <label className="font-sans text-[12px] font-semibold" style={{ color: "var(--hint-muted)" }} htmlFor="birthday-lite">
          Birthday
        </label>
        <input
          id="birthday-lite"
          type="date"
          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          className="mt-2 h-12 w-full rounded-[14px] border px-4 font-sans text-[14px]"
          style={{ color: "var(--hint-text)", background: "var(--hint-input-bg)", borderColor: "var(--hint-border)" }}
        />
        <ViewMoreGate
          preview={
            <div className="mt-5">
              <h2 className="font-serif text-[34px]" style={{ color: "var(--hint-text)" }}>
                {sign ? `Sun in ${sign}` : "Enter a birthday"}
              </h2>
              <p className="mt-2 font-sans text-[14px] leading-relaxed" style={{ color: "var(--hint-muted)" }}>
                {sign
                  ? `Your ${sign} Sun preview: your attention moves toward one clear pattern today. Keep your words simple and your timing honest.`
                  : "Use the web preview for a simple Sun-sign reading only."}
              </p>
            </div>
          }
          locked="Moon sign, rising sign, full birth chart, houses, transits, compatibility, and deeper daily astrology unlock in the app."
          cta="Unlock Moon, Rising, and Full Chart in Hint App"
          appPath="/astrology"
        />
      </GlassPanel>
    </AppScreen>
  );
}

export function CollectionPreviewPage() {
  return (
    <AppScreen>
      <LiteHero
        eyebrow="Collection Preview"
        title="A small look at the deck."
        subtitle="The website can preview cards and locked silhouettes. Real saving, unlock history, streak rewards, and account collection stay in the app."
        icon={<Library className="size-6" />}
      />
      <GlassPanel>
        <SectionLabel>Sample binder</SectionLabel>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {collectionCards.map((card) => (
            <div key={card.name} className="relative">
              <LiteCardImage image={card.image} name={card.name} />
              {card.new ? (
                <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full px-3 py-1 font-sans text-[10px] font-bold" style={{ color: "#231d2a", background: "var(--hint-gold)" }}>
                  New
                </span>
              ) : null}
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-[46/71] rounded-[14px] border" style={{ borderColor: "var(--hint-border)", background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(0,0,0,0.28))" }} />
          ))}
        </div>
        <AppGateCTA
          title="Build the real deck in the app"
          body="The web preview does not save collection state. Start your collection in the full Hint app when you want cards, streak rewards, and unlock history to persist."
          cta="Start Your Collection in Hint App"
          appPath="/collection"
        />
      </GlassPanel>
    </AppScreen>
  );
}

export function PricingPreviewPage() {
  return (
    <AppScreen>
      <LiteHero
        eyebrow="Pricing Preview"
        title="Two ways to go deeper."
        subtitle="Use the website to try Hint. Use the app when you want tokens, daily memory, collection, and membership."
        icon={<Star className="size-6" />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <LockedInsightCard
          title="Tokens"
          body="For one-time questions, extra readings, follow-ups, and deeper unlocks."
          cta="Get Tokens in Hint App"
          appPath="/pricing"
        />
        <LockedInsightCard
          title="Membership"
          body="For daily users who want Daily Hint, history, collection, astrology, and included tokens."
          cta="View Membership in Hint App"
          appPath="/pricing"
        />
      </div>
    </AppScreen>
  );
}

export function RoomsLitePage() {
  return (
    <AppScreen>
      <LiteHero
        eyebrow="Rooms Preview"
        title="Choose a doorway, then continue in app."
        subtitle="Web previews the room types. Full Tarot Room, saved readings, and long-form follow-up stay inside Hint."
        icon={<Moon className="size-6" />}
      />
      <div className="grid gap-4">
        <LockedInsightCard title="Tarot Room" body="Preview a one-card draw on web. Multi-card spreads and full ritual open in app." cta="Continue Full Reading" appPath="/tarot" />
        <LockedInsightCard title="Animal Tarot" body="Meet one animal here. Save animal profiles and track your animal history in app." cta="Save This Animal in Hint App" appPath="/animal-tarot" />
        <LockedInsightCard title="Astrology Room" body="Try a Sun-sign preview here. Full chart and transits belong in app." cta="Unlock Full Chart" appPath="/astrology" />
      </div>
    </AppScreen>
  );
}

export function HistoryGatePage() {
  return (
    <AppScreen>
      <LiteHero
        eyebrow="Saved History"
        title="History lives in the app."
        subtitle="This website does not save full readings or daily receipts. Open Hint app for saved readings, daily history, and follow-ups."
        icon={<History className="size-6" />}
      />
      <AppGateCTA title="Open your saved readings" body="Reading history is a full-app feature so it can stay tied to your account and collection." cta="View More in Hint App" appPath="/readings" />
    </AppScreen>
  );
}

export function AccountGatePage() {
  return (
    <AppScreen>
      <LiteHero
        eyebrow="Account"
        title="Accounts belong in the app."
        subtitle="HINT Web is a public playable preview. Login, profile, membership, tokens, and saved data live in Hint app."
        icon={<Sparkles className="size-6" />}
      />
      <AppGateCTA title="Continue in Hint app" body="Open the full app for account setup, saved data, tokens, membership, and personalization." cta="Open Hint App" />
    </AppScreen>
  );
}

export function GenericAppGatePage({
  title = "This unlocks in Hint app.",
  body = "The web version gives a short preview first. The full feature, saving, and deeper explanation live in the app.",
  cta = "Open Hint App",
  appPath = "",
}: {
  title?: string;
  body?: string;
  cta?: string;
  appPath?: string;
}) {
  return (
    <AppScreen>
      <ScreenHeader eyebrow="Hint app" title={title} subtitle={body} />
      <div className="grid gap-4">
        <AppGateCTA title={title} body={body} cta={cta} appPath={appPath} />
        <Link className="font-sans text-[13px] font-semibold" style={{ color: "var(--hint-muted)" }} href="/preview">
          ← Back to web preview
        </Link>
      </div>
    </AppScreen>
  );
}
