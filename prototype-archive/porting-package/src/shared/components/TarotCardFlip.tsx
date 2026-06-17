import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { Sigil } from "./Sigil";
import "./tarot-card-flip.css";

export interface TarotCardFlipProps {
  image: string;
  name: string;
  /** Controlled flip state. Omit to let the card manage its own. */
  flipped?: boolean;
  /** Initial state when uncontrolled. Default false (back showing). */
  defaultFlipped?: boolean;
  /** Fires with the next flip state on user toggle. */
  onFlip?: (flipped: boolean) => void;
  /** Card width in px; height follows the 46:71 house ratio. Default 220. */
  width?: number;
  /** Glow color around the card. Default "gold". */
  glow?: "gold" | "aqua" | "none";
  /** Optional corner ribbon, e.g. "Today" / "Spirit" / "Rare". */
  badge?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Flip-to-reveal tarot card in Hint's 46:71 ratio: gold sigil back,
 * image front, 0.8s 3D flip on the house easing. Works controlled
 * (pass `flipped` + `onFlip`) or uncontrolled.
 */
export function TarotCardFlip({
  image,
  name,
  flipped,
  defaultFlipped = false,
  onFlip,
  width = 220,
  glow = "gold",
  badge,
  className,
  style,
}: TarotCardFlipProps) {
  const [internal, setInternal] = useState(defaultFlipped);
  const isControlled = flipped !== undefined;
  const isFlipped = isControlled ? flipped : internal;

  const toggle = () => {
    const next = !isFlipped;
    if (!isControlled) setInternal(next);
    onFlip?.(next);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <button
      type="button"
      className={`hint-flip${isFlipped ? " is-flipped" : ""} glow-${glow}${className ? ` ${className}` : ""}`}
      style={{ width, ...style }}
      onClick={toggle}
      onKeyDown={onKey}
      aria-pressed={isFlipped}
      aria-label={isFlipped ? name : `Turn card to reveal ${name}`}
    >
      <span className="hint-flip__inner">
        <span className="hint-flip__face hint-flip__back">
          <Sigil size={Math.round(width * 0.4)} />
        </span>
        <span className="hint-flip__face hint-flip__front">
          <img src={image} alt={name} draggable={false} />
          {badge && <span className="hint-flip__badge">{badge}</span>}
        </span>
      </span>
    </button>
  );
}
