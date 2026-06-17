import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { AnimalTarot } from "../../porting-package/src/product/animal-tarot/AnimalTarot";
import { DailyEnergyScore } from "../../porting-package/src/product/daily/DailyEnergyScore";
import { DailyTarot } from "../../porting-package/src/product/daily/DailyTarot";
import { EnergyTask } from "../../porting-package/src/product/daily/EnergyTask";
import { RareCardUnlock } from "../../porting-package/src/product/collection/RareCardUnlock";
import { SkyDeckDraw } from "../../porting-package/src/product/sky-deck/SkyDeckDraw";
import { TarotRoom } from "../../porting-package/src/product/tarot/TarotRoom";
import { FeatureCarousel, type FeatureSlide } from "../../porting-package/src/site/FeatureCarousel";
import type {
  AnimalSpiritData,
  EnergyTaskItem,
  ScoreArea,
  TarotCardData,
} from "../../porting-package/src/shared/data/tarot";

type Theme = "nocturne" | "daybreak";
type SpreadOption = {
  id: string;
  label: string;
  question: string;
  summary: string;
  positions: string[];
};

const tarot = (file: string) => `/assets/tarot/${file}`;
const lucky = (file: string) => `/assets/lucky/${file}`;

const dailyCard: TarotCardData = {
  id: "the-star",
  name: "The Star",
  image: tarot("17-TheStar.jpg"),
  arcana: "major",
  rarity: "common",
  blurb: "Something you have been quietly tending is closer to water than you think. Keep pouring.",
};

const rareCard: TarotCardData = {
  id: "the-sun",
  name: "The Sun",
  image: tarot("19-TheSun.jpg"),
  arcana: "major",
  rarity: "rare",
  blurb: "Warmth you did not ask for, arriving anyway.",
};

const animalSpirit: AnimalSpiritData = {
  id: "the-wolf",
  name: "The Moon",
  spirit: "The Wolf",
  image: tarot("18-TheMoon.jpg"),
  arcana: "major",
  rarity: "rare",
  blurb: "It shows up when you need its particular kind of courage.",
};

const deck: TarotCardData[] = [
  dailyCard,
  rareCard,
  { id: "the-moon", name: "The Moon", image: tarot("18-TheMoon.jpg"), arcana: "major", rarity: "common" },
  { id: "the-world", name: "The World", image: tarot("21-TheWorld.jpg"), arcana: "major", rarity: "common" },
  {
    id: "wheel",
    name: "Wheel of Fortune",
    image: tarot("10-WheelOfFortune.jpg"),
    arcana: "major",
    rarity: "rare",
    blurb: "The turn is already moving, even before you name it.",
  },
  { id: "the-fool", name: "The Fool", image: tarot("00-TheFool.jpg"), arcana: "major", rarity: "common" },
  {
    id: "high-priestess",
    name: "The High Priestess",
    image: tarot("02-TheHighPriestess.jpg"),
    arcana: "major",
    rarity: "common",
  },
];

const collectionPreviewDeck: TarotCardData[] = [
  rareCard,
  dailyCard,
  { id: "the-moon", name: "The Moon", image: tarot("18-TheMoon.jpg"), arcana: "major", rarity: "common" },
  { id: "the-world", name: "The World", image: tarot("21-TheWorld.jpg"), arcana: "major", rarity: "common" },
  {
    id: "wheel",
    name: "Wheel of Fortune",
    image: tarot("10-WheelOfFortune.jpg"),
    arcana: "major",
    rarity: "rare",
    blurb: "The turn is already moving, even before you name it.",
  },
  { id: "the-fool", name: "The Fool", image: tarot("00-TheFool.jpg"), arcana: "major", rarity: "common" },
  {
    id: "high-priestess",
    name: "The High Priestess",
    image: tarot("02-TheHighPriestess.jpg"),
    arcana: "major",
    rarity: "common",
  },
  { id: "locked-1", name: "Locked card", image: "", arcana: "major", rarity: "common" },
];

const scores: ScoreArea[] = [
  { key: "love", label: "Love", value: 82, toneVar: "--score-love" },
  { key: "career", label: "Career", value: 77, toneVar: "--score-career" },
  { key: "emotion", label: "Emotion", value: 68, toneVar: "--score-people" },
  { key: "luck", label: "Luck", value: 90, toneVar: "--score-wealth" },
  { key: "energy", label: "Energy", value: 74, toneVar: "--score-study" },
];

const tasks: EnergyTaskItem[] = [
  { id: "water", label: "Drink a glass of water slowly", done: true },
  { id: "message", label: "Reply to one message you have avoided", done: false },
  { id: "breath", label: "Step outside for three slow breaths", done: false },
];

const spreads: SpreadOption[] = [
  {
    id: "choice",
    label: "Choice",
    question: "I need to decide.",
    summary: "Three cards separate the want, the fear, and the honest next step.",
    positions: ["Want", "Fear", "Next"],
  },
  {
    id: "relationship",
    label: "Connection",
    question: "Someone is on my mind.",
    summary: "Five cards map your side, their side, what is between you, what is hidden, and what can move.",
    positions: ["You", "Them", "Between", "Hidden", "Move"],
  },
  {
    id: "shadow",
    label: "Shadow",
    question: "I keep repeating this.",
    summary: "Four cards slow the pattern down: trigger, protection, cost, and release.",
    positions: ["Trigger", "Shield", "Cost", "Release"],
  },
];

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
        color: Math.random() < 0.3 ? "#86D6C7" : "#F2ECDE",
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

function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const night = theme === "nocturne";

  return (
    <header className="hint-site__header">
      <nav className="hint-site__nav" aria-label="Primary">
        <a className="hint-site__brand" href="#top">
          <img src="/assets/brand/hint-cardmark-logo.png" alt="" width="30" height="30" />
          <span>Hint</span>
        </a>
        <div className="hint-site__links">
          <a href="#how">How it works</a>
          <a href="#daily-pull">Daily pull + score</a>
          <a href="#collection">Collection</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="hint-site__actions">
          <button className="hint-site__theme" type="button" onClick={onToggleTheme} aria-label="Toggle day and night">
            <span className={!night ? "is-active" : ""}>
              <SunIcon />
            </span>
            <span className={night ? "is-active" : ""}>
              <MoonIcon />
            </span>
          </button>
          <a className="hint-site__open" href="#tarot-room">
            Open Hint
          </a>
        </div>
      </nav>
    </header>
  );
}

function HeroStats() {
  const stats = [
    ["5", "ritual surfaces"],
    ["78", "cards ready"],
    ["1", "quiet room"],
  ];

  return (
    <div className="hint-site__stats" aria-label="Hint preview scope">
      {stats.map(([value, label]) => (
        <div key={label}>
          <span>{value}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function FeatureVisual({ kind }: { kind: "animal" | "room" | "score" | "daily" | "task" }) {
  if (kind === "animal") return <AnimalTarot spirit={animalSpirit} />;
  if (kind === "room") return <TarotRoom title="Tarot Room" />;
  if (kind === "score") return <DailyEnergyScore areas={scores} overall={78} active />;
  if (kind === "daily") return <DailyTarot card={dailyCard} defaultRevealed />;
  return <EnergyTask items={tasks} rewardImage={lucky("lavender.png")} />;
}

function HeroCarousel() {
  const slides: FeatureSlide[] = [
    {
      id: "animal",
      eyebrow: "Animal Tarot",
      title: "Meet the creature that walks the night with you.",
      body: "Every reader carries an animal spirit. Hint draws yours from your chart, a quiet companion for the dark hours.",
      ctaLabel: "Explore Animal Tarot",
      href: "#animal",
      accent: "aqua",
      visual: <FeatureVisual kind="animal" />,
    },
    {
      id: "room",
      eyebrow: "Tarot Room",
      title: "A candlelit room that only opens for you.",
      body: "A private space where the cards are laid slowly and an unhurried voice reads them with you.",
      ctaLabel: "Enter Tarot Room",
      href: "#tarot-room",
      accent: "rose",
      visual: <FeatureVisual kind="room" />,
    },
    {
      id: "score",
      eyebrow: "Daily Pull",
      title: "Read where the day left your energy.",
      body: "After the pull, Hint reads five currents from tonight's sky and your chart. A gentle read, never a grade.",
      ctaLabel: "Open Daily Pull",
      href: "#daily-pull",
      accent: "gold",
      visual: <FeatureVisual kind="score" />,
    },
    {
      id: "daily",
      eyebrow: "Daily Pull",
      title: "One card, turned fresh for tonight.",
      body: "Each evening a single card surfaces first, then the score reads how the same day is moving through you.",
      ctaLabel: "Draw Daily Pull",
      href: "#daily-pull",
      accent: "gold",
      visual: <FeatureVisual kind="daily" />,
    },
    {
      id: "task",
      eyebrow: "Energy Task",
      title: "A small ritual, matched to the weather inside you.",
      body: "Hint gives you one thing to do tonight, just enough to let the air move again.",
      ctaLabel: "See Tonight's Ritual",
      href: "#ritual",
      accent: "aqua",
      visual: <FeatureVisual kind="task" />,
    },
  ];

  return (
    <FeatureCarousel
      slides={slides}
      renderCta={(slide) => (
        <a className="hint-fc__cta" href={slide.href}>
          {slide.ctaLabel} <span aria-hidden>-&gt;</span>
        </a>
      )}
    />
  );
}

function HowItWorks() {
  const items = [
    ["Ask", "Bring a question, a worry, or a half-formed thought."],
    ["Draw", "Tonight's sky and your chart fold into one card."],
    ["Read", "The room answers gently, with space around the answer."],
    ["Return", "The card joins your collection. The deck remembers."],
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

function CollectionPreview({
  collectedIds,
  newCardId,
  total,
  message,
}: {
  collectedIds: string[];
  newCardId: string | null;
  total: number;
  message: string;
}) {
  const owned = new Set(collectedIds);
  const ordered = useMemo(() => {
    const preview = collectionPreviewDeck.filter((card) => card.id !== "locked-1");
    const recent = newCardId ? preview.find((card) => card.id === newCardId) : null;
    const rest = preview.filter((card) => card.id !== newCardId);
    return [...(recent ? [recent] : []), ...rest, { id: "locked-1", name: "Locked card", image: "", arcana: "major" as const, rarity: "common" as const }];
  }, [newCardId]);

  return (
    <section className="collection-preview" id="collection" aria-label="Card collection preview">
      <header className="collection-preview__head">
        <div>
          <span className="hint-site__eyebrow">Card collection</span>
          <h3>
            Collected {collectedIds.length} <span>/ {total}</span>
          </h3>
        </div>
        {message && <p>{message}</p>}
      </header>

      <div className="collection-preview__grid">
        {ordered.map((card, index) => {
          const isOwned = owned.has(card.id);
          const isNew = card.id === newCardId && isOwned;
          return (
            <button
              key={`${card.id}-${index}`}
              type="button"
              className={`collection-preview__slot${isOwned ? " is-owned" : ""}${isNew ? " is-new" : ""}`}
              aria-label={isOwned ? card.name : "Locked card"}
              disabled={!isOwned}
            >
              {isOwned && card.image ? (
                <>
                  <img src={card.image} alt={card.name} draggable={false} />
                  {isNew && <span>New</span>}
                </>
              ) : (
                <i aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DailyPullSection() {
  const [rareOpen, setRareOpen] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);

  const handleDailyDraw = (card: TarotCardData) => {
    setScoreVisible(true);
    if (card.rarity !== "common") setRareOpen(true);
  };

  return (
    <section className="hint-site__section daily-pull" id="daily-pull">
      <div className="hint-site__section-head daily-pull__head">
        <span className="hint-site__eyebrow">Daily Pull + Score</span>
        <h2>One draw, held in the sky.</h2>
        <p>
          This is the original card-fan ritual: tap the fan, let the card rise, then read
          the score from the same daily moment.
        </p>
      </div>

      <div className="daily-pull__ritual-surface">
        <div className="daily-pull__original-draw">
          <SkyDeckDraw
            deck={deck}
            pick={() => rareCard}
            onDraw={handleDailyDraw}
          />
        </div>
      </div>

      {scoreVisible ? (
        <div className="daily-pull__score is-visible" id="score">
          <div className="daily-pull__score-head">
            <span className="hint-site__eyebrow">Daily Pull score</span>
            <h3>Five ways the day landed.</h3>
          </div>
          <div className="hint-site__score-grid">
            <div className="hint-site__panel hint-site__score-panel">
              <DailyEnergyScore areas={scores} overall={78} active />
            </div>
            <div className="hint-site__panel hint-site__score-panel" id="ritual">
              <EnergyTask items={tasks} rewardImage={lucky("lavender.png")} rewardLabel="New moon badge" />
            </div>
          </div>
        </div>
      ) : (
        <div className="daily-pull__score-lock" id="score">
          <span>Draw your daily card first.</span>
          <strong>The score opens after the pull.</strong>
        </div>
      )}

      <RareCardUnlock
        card={rareCard}
        open={rareOpen}
        onClose={() => setRareOpen(false)}
        ctaLabel="Added to collection"
      />
    </section>
  );
}

function RewardsSection() {
  const collectedIds = ["the-star", "the-moon", "the-world", "the-fool", "high-priestess", "wheel"];

  return (
    <section className="hint-site__section hint-site__rewards" id="rewards">
      <div className="hint-site__section-head">
        <span className="hint-site__eyebrow">Collection</span>
        <h2>Your deck.</h2>
        <p>
          A quick look at saved cards after the daily ritual.
        </p>
      </div>
      <CollectionPreview
        collectedIds={collectedIds}
        newCardId={null}
        total={78}
        message="Cards you keep return here."
      />
    </section>
  );
}

function SpreadGuide() {
  const [selected, setSelected] = useState(spreads[0]);

  return (
    <div className="hint-spread">
      <div className="hint-spread__head">
        <span className="hint-site__eyebrow">Spread guide</span>
        <h3>{selected.label}</h3>
      </div>

      <div className="hint-spread__questions" aria-label="Choose a question type">
        {spreads.map((spread) => (
          <button
            key={spread.id}
            type="button"
            className={spread.id === selected.id ? "is-active" : ""}
            onClick={() => setSelected(spread)}
          >
            {spread.question}
          </button>
        ))}
      </div>

      <div className="hint-spread__body">
        <div className={`hint-spread__diagram count-${selected.positions.length}`}>
          {selected.positions.map((position, index) => (
            <span key={position} style={{ "--i": index } as CSSProperties}>
              <b>{index + 1}</b>
              <small>{position}</small>
            </span>
          ))}
        </div>
        <p>{selected.summary}</p>
      </div>
    </div>
  );
}

function TarotRoomSection() {
  return (
    <section className="hint-site__section hint-site__room-showcase" id="tarot-room">
      <div className="hint-site__section-head hint-site__room-intro">
        <span className="hint-site__eyebrow">Tarot Room</span>
        <h2>The room recommends the spread before the deck opens.</h2>
        <p>
          The public page can stay simple. The room should carry the serious ritual:
          choose the right spread, explain the positions, then open the deck with intention.
        </p>
        <div className="hint-site__chips" aria-label="Tarot room priorities">
          <span>Guided spreads</span>
          <span>78-card ritual</span>
          <span>Real reading flow</span>
        </div>
      </div>
      <div className="hint-site__room-stack">
        <div className="hint-site__room-card hint-site__spread-panel">
          <SpreadGuide />
        </div>
        <div className="hint-site__room-card hint-site__room-panel">
          <TarotRoom
            title="Tarot Room"
            onAsk={async (prompt) =>
              `I hear: "${prompt}". The room would recommend a spread first, then read the cards against the question.`
            }
          />
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="hint-site__section" id="pricing">
      <div className="hint-site__pricing">
        <span className="hint-site__eyebrow">Next shape</span>
        <h2>Start softly. Let the real room get deeper.</h2>
        <p>
          Keep the tour lightweight for the first visit. Put the detail, memory, and careful reading
          into the Tarot Room where the reader is ready to slow down.
        </p>
        <CtaLink href="#top">Back to the tour</CtaLink>
      </div>
    </section>
  );
}

export function App() {
  const [theme, setTheme] = useState<Theme>("nocturne");

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
      <Header theme={theme} onToggleTheme={() => setTheme((current) => (current === "nocturne" ? "daybreak" : "nocturne"))} />

      <main className="hint-site__main" id="top">
        <section className="hint-site__hero">
          <div className="hint-site__pill">
            <span />
            Inside Hint
          </div>
          <h1>
            Five doorways into <em>the night.</em>
          </h1>
          <p>Tarot, a private room, your daily energy. Drift through what Hint opens each evening.</p>
          <HeroStats />
        </section>
        <HeroCarousel />
        <HowItWorks />
        <DailyPullSection />
        <RewardsSection />
        <TarotRoomSection />
        <PricingSection />
      </main>
    </div>
  );
}
