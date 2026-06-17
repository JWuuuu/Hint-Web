import { useState } from "react";
import type { TarotCardData } from "../../shared/data/tarot";
import { TarotCardFlip } from "../../shared/components/TarotCardFlip";
import "./daily-tarot.css";

export interface DailyTarotProps {
  card: TarotCardData;
  /** Start face-up. Default false (reader turns it). */
  defaultRevealed?: boolean;
  onReveal?: (card: TarotCardData) => void;
}

/**
 * Daily Tarot — a single card for tonight with its serif whisper. This is
 * the *gentle* daily surface (one card, turn to read) — NOT the Sky Deck
 * draw ritual. Use <SkyDeckDraw> for the pick-from-the-deck moment.
 */
export function DailyTarot({ card, defaultRevealed = false, onReveal }: DailyTarotProps) {
  const [revealed, setRevealed] = useState(defaultRevealed);

  return (
    <div className="hint-daily">
      <span className="hint-daily__eyebrow">Today's tarot</span>
      <div className="hint-daily__card">
        <TarotCardFlip
          image={card.image}
          name={card.name}
          width={220}
          flipped={revealed}
          badge="Today"
          onFlip={(f) => {
            setRevealed(f);
            if (f) onReveal?.(card);
          }}
        />
      </div>
      <p className="hint-daily__name">{card.name}</p>
      {card.blurb && (
        <p className="hint-daily__blurb" data-hidden={!revealed}>
          {card.blurb}
        </p>
      )}
    </div>
  );
}
