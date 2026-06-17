import { StrictMode } from "react";
import type { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import "../../porting-package/src/shared/styles/animations.css";
import "../../porting-package/src/shared/styles/hint-tokens.css";
import { FeatureCarousel, type FeatureSlide } from "../../porting-package/src/site/FeatureCarousel";
import "./preview.css";

function TarotRoomVisual() {
  return (
    <div className="preview-phone preview-phone--room" aria-hidden>
      <div className="preview-candle preview-candle--left" />
      <div className="preview-candle preview-candle--right" />
      <div className="preview-card-stack">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-orbit" />
      <div className="preview-thread">
        <span>What should I notice tonight?</span>
        <b>The Moon asks for quiet proof.</b>
      </div>
    </div>
  );
}

function EnergyVisual() {
  return (
    <div className="preview-score" aria-hidden>
      {[
        ["Love", "82"],
        ["Career", "76"],
        ["Study", "69"],
        ["Wealth", "88"],
        ["People", "73"],
      ].map(([label, score], index) => (
        <div className="preview-ring" key={label} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
          <span>{score}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function CollectionVisual() {
  return (
    <div className="preview-collection" aria-hidden>
      {Array.from({ length: 9 }, (_, index) => (
        <span className={index === 4 ? "is-rare" : ""} key={index}>
          <i />
        </span>
      ))}
    </div>
  );
}

function SkyDeckVisual() {
  return (
    <div className="preview-deck" aria-hidden>
      {Array.from({ length: 7 }, (_, index) => (
        <span key={index} style={{ "--i": index - 3, "--lift": Math.abs(index - 3) } as CSSProperties} />
      ))}
    </div>
  );
}

function AnimalVisual() {
  return (
    <div className="preview-animal" aria-hidden>
      <div className="preview-animal__moon" />
      <div className="preview-animal__body">
        <span />
        <span />
      </div>
      <div className="preview-animal__constellation" />
    </div>
  );
}

const slides: FeatureSlide[] = [
  {
    id: "tarot-room",
    eyebrow: "Tarot Room",
    title: "Ask into a candlelit room built for one honest question.",
    body: "The landing tour previews Hint's guided tarot ritual before users enter the real reading flow.",
    ctaLabel: "Enter Tarot Room",
    href: "/app/room",
    accent: "gold",
    visual: <TarotRoomVisual />,
  },
  {
    id: "daily-energy",
    eyebrow: "Daily Energy",
    title: "See the shape of today before the day gets loud.",
    body: "Five astrology areas fill into a compact score surface for love, work, study, wealth, and people.",
    ctaLabel: "View Daily Score",
    href: "/app/score",
    accent: "aqua",
    visual: <EnergyVisual />,
  },
  {
    id: "rare-unlock",
    eyebrow: "Collection",
    title: "Turn rare pulls into a collection moment worth keeping.",
    body: "A card wall, unlock burst, and saved collection state make the reward feel visible and durable.",
    ctaLabel: "Open Collection",
    href: "/app/collection",
    accent: "rose",
    visual: <CollectionVisual />,
  },
  {
    id: "sky-deck",
    eyebrow: "Sky Deck",
    title: "Draw from the sky deck with a ritual that feels alive.",
    body: "A fan-and-pull motion frames the daily draw as a small ceremony instead of a plain random card.",
    ctaLabel: "Draw a Card",
    href: "/app/today",
    accent: "gold",
    visual: <SkyDeckVisual />,
  },
  {
    id: "animal-tarot",
    eyebrow: "Animal Tarot",
    title: "Meet the creature walking with your season.",
    body: "A spirit-animal card adds another emotional entry point into chart-based guidance.",
    ctaLabel: "Meet the Guide",
    href: "/app/animal",
    accent: "aqua",
    visual: <AnimalVisual />,
  },
];

function LandingPreview() {
  return (
    <main className="preview-shell">
      <header className="preview-header">
        <a className="preview-brand" href="/">
          Hint
        </a>
        <nav aria-label="Primary">
          <a href="/app/today">Today</a>
          <a href="/app/room">Tarot</a>
          <a href="/app/score">Astrology</a>
        </nav>
      </header>

      <section className="preview-hero">
        <p>Personal astrology and tarot, shaped into daily rituals.</p>
        <h1>Hint</h1>
      </section>

      <FeatureCarousel
        slides={slides}
        renderCta={(slide) => (
          <a className="hint-fc__cta" href={slide.href}>
            {slide.ctaLabel} <span aria-hidden>{"->"}</span>
          </a>
        )}
      />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LandingPreview />
  </StrictMode>,
);
