import { useEffect, useRef, useState } from "react";
import type { TarotCardData } from "../../shared/data/tarot";
import { useReducedMotion } from "../../shared/hooks/useReducedMotion";
import { Sigil } from "../../shared/components/Sigil";
import "./rare-card-unlock.css";

export interface RareCardUnlockProps {
  /** The card being revealed. */
  card: TarotCardData;
  /** Mounts + plays the sequence when true. */
  open: boolean;
  /** Called on dismiss (tap, Esc, CTA, or auto-close). */
  onClose: () => void;
  /** Fired once when the front has finished popping in. */
  onRevealed?: (card: TarotCardData) => void;
  /** Auto-dismiss after this many ms. 0 disables. Default 4200. */
  autoCloseMs?: number;
  /** CTA label. Default "Add to collection". */
  ctaLabel?: string;
}

/**
 * The rare-card unlock moment. Preserves the prototype's feeling exactly:
 *   1. scrim fades in, radial aura glow blooms
 *   2. gold + aqua burst rings shock outward
 *   3. the card-back fades out as the front fades + scales + rotates in
 *   4. gold foil border, "Rare" badge, shimmer sweep
 *
 * Driven by a two-step state machine (mounted → revealed) so CSS handles
 * all easing. Honours prefers-reduced-motion (instant final state).
 */
export function RareCardUnlock({
  card,
  open,
  onClose,
  onRevealed,
  autoCloseMs = 4200,
  ctaLabel = "Add to collection",
}: RareCardUnlockProps) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const raf = useRef<number>(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clearAll = () => {
      cancelAnimationFrame(raf.current);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    if (!open) {
      setRevealed(false);
      return clearAll;
    }

    // Kick the reveal on the next frame so the entry transitions run.
    raf.current = requestAnimationFrame(() => setRevealed(true));

    // Notify once the front has popped in (matches the 0.8s front transition).
    timers.current.push(
      window.setTimeout(() => onRevealed?.(card), reduced ? 0 : 850),
    );

    if (autoCloseMs > 0) {
      timers.current.push(window.setTimeout(onClose, autoCloseMs));
    }

    return clearAll;
  }, [open, autoCloseMs, reduced, card, onClose, onRevealed]);

  // Esc to dismiss.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="hint-rcu"
      role="dialog"
      aria-modal="true"
      aria-label={`Rare card unlocked: ${card.name}`}
      onClick={onClose}
    >
      <div className="hint-rcu__scrim" aria-hidden />

      <div
        className={`hint-rcu__stage${revealed ? " is-revealed" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hint-rcu__aura" aria-hidden />

        {revealed && !reduced && (
          <>
            <span className="hint-rcu__ring hint-rcu__ring--gold" aria-hidden />
            <span className="hint-rcu__ring hint-rcu__ring--aqua" aria-hidden />
          </>
        )}

        <span className="hint-rcu__eyebrow">Rare card unlocked</span>

        <div className="hint-rcu__card">
          <div className="hint-rcu__face hint-rcu__back" aria-hidden>
            <Sigil size={92} />
          </div>
          <div className="hint-rcu__face hint-rcu__front">
            <img src={card.image} alt={card.name} draggable={false} />
            <span className="hint-rcu__shimmer" aria-hidden />
            <span className="hint-rcu__badge">Rare</span>
          </div>
        </div>

        <p className="hint-rcu__name">{card.name}</p>
        {card.blurb && <p className="hint-rcu__blurb">{card.blurb}</p>}

        <button type="button" className="hint-rcu__cta" onClick={onClose}>
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
