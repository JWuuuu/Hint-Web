import { useState } from "react";
import type { TarotCardData } from "../../shared/data/tarot";
import { useReducedMotion } from "../../shared/hooks/useReducedMotion";
import { Sigil } from "../../shared/components/Sigil";
import "./sky-deck-draw.css";

type Phase = "fanned" | "drawing" | "revealed";

export interface SkyDeckDrawProps {
  /** The pile to draw from. */
  deck: TarotCardData[];
  /** Resolve which card the draw lands on. Default: random. */
  pick?: (deck: TarotCardData[]) => TarotCardData;
  /** Fires when the drawn card turns face-up. Use to trigger rare unlock. */
  onDraw?: (card: TarotCardData) => void;
  /** How many backs to fan. Default 5 (clamped to deck length). */
  fan?: number;
}

const randomPick = (deck: TarotCardData[]) => deck[Math.floor(Math.random() * deck.length)];

/**
 * Sky Deck — the daily *draw ritual*: a fanned arc of card-backs the reader
 * taps to pull one card, which rises to center and flips. This is the
 * active, ceremonial draw (distinct from the gentle <DailyTarot> surface).
 * When the drawn card is rare, hand it to <RareCardUnlock> via onDraw.
 */
export function SkyDeckDraw({
  deck,
  pick = randomPick,
  onDraw,
  fan = 5,
}: SkyDeckDrawProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("fanned");
  const [card, setCard] = useState<TarotCardData | null>(null);

  const count = Math.min(fan, deck.length);
  const backs = Array.from({ length: count });

  const draw = () => {
    if (phase !== "fanned") return;
    const drawn = pick(deck);
    setCard(drawn);
    setPhase("drawing");
    const delay = reduced ? 0 : 620;
    window.setTimeout(() => {
      setPhase("revealed");
      onDraw?.(drawn);
    }, delay);
  };

  const reset = () => {
    setPhase("fanned");
    setCard(null);
  };

  return (
    <div className={`hint-sky phase-${phase}`}>
      <div className="hint-sky__aura" aria-hidden />

      {phase === "revealed" && card ? (
        <div className="hint-sky__result">
          <div className="hint-sky__drawn">
            <img src={card.image} alt={card.name} draggable={false} />
            {card.rarity !== "common" && <span className="hint-sky__rare">Rare</span>}
          </div>
          <p className="hint-sky__name">{card.name}</p>
          {card.blurb && <p className="hint-sky__blurb">{card.blurb}</p>}
          <button type="button" className="hint-sky__again" onClick={reset}>
            Return to the deck
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="hint-sky__fan"
          onClick={draw}
          disabled={phase !== "fanned"}
          aria-label="Draw tonight's card"
        >
          {backs.map((_, i) => {
            const mid = (count - 1) / 2;
            const angle = (i - mid) * 9;
            const lift = Math.abs(i - mid) * 8;
            return (
              <span
                key={i}
                className="hint-sky__back"
                style={{
                  transform: `rotate(${angle}deg) translateY(${lift}px)`,
                  zIndex: count - Math.abs(i - mid),
                }}
              >
                <Sigil size={46} />
              </span>
            );
          })}
          <span className="hint-sky__hint">{phase === "drawing" ? "Drawing…" : "Tap to draw"}</span>
        </button>
      )}
    </div>
  );
}
