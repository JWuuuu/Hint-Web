import { useState } from "react";
import type { AnimalSpiritData } from "../../shared/data/tarot";
import { TarotCardFlip } from "../../shared/components/TarotCardFlip";
import "./animal-tarot.css";

export interface AnimalTarotProps {
  spirit: AnimalSpiritData;
  onReveal?: (spirit: AnimalSpiritData) => void;
}

/**
 * Animal Tarot — the reader's spirit animal as a glowing, aqua-haloed card
 * with orbiting sigil rings and floating sparks. Tap to turn and meet it.
 */
export function AnimalTarot({ spirit, onReveal }: AnimalTarotProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="hint-animal">
      <div className="hint-animal__stage">
        <div className="hint-animal__aura" aria-hidden />
        <div className="hint-animal__orbit hint-animal__orbit--a" aria-hidden />
        <div className="hint-animal__orbit hint-animal__orbit--b" aria-hidden />

        <div className="hint-animal__card">
          <TarotCardFlip
            image={spirit.image}
            name={spirit.spirit}
            width={212}
            glow="aqua"
            badge="Spirit"
            flipped={revealed}
            onFlip={(f) => {
              setRevealed(f);
              if (f) onReveal?.(spirit);
            }}
          />
        </div>

        <span className="hint-animal__spark hint-animal__spark--1" aria-hidden />
        <span className="hint-animal__spark hint-animal__spark--2" aria-hidden />
      </div>

      <p className="hint-animal__name">{revealed ? spirit.spirit : "Your night companion"}</p>
      {spirit.blurb && (
        <p className="hint-animal__blurb" data-hidden={!revealed}>
          {spirit.blurb}
        </p>
      )}
    </div>
  );
}
