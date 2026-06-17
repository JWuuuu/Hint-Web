import { useCallback, useEffect, useState } from "react";
import type { TarotCardData } from "../../shared/data/tarot";

const STORAGE_KEY = "hint.collection.v1";

interface CollectionState {
  /** ids of cards the reader has unlocked. */
  unlocked: string[];
}

function read(): CollectionState {
  if (typeof window === "undefined") return { unlocked: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { unlocked: [] };
    const parsed = JSON.parse(raw) as CollectionState;
    return { unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [] };
  } catch {
    return { unlocked: [] };
  }
}

export interface UseCollection {
  unlocked: string[];
  /** The card currently being revealed (drives <RareCardUnlock open>). */
  pending: TarotCardData | null;
  has: (id: string) => boolean;
  /** Begin an unlock: opens the reveal overlay for this card. */
  unlock: (card: TarotCardData) => void;
  /** Commit the pending card to the collection (call from onRevealed). */
  commit: () => void;
  /** Dismiss the overlay without re-committing (safe to call anytime). */
  dismiss: () => void;
  reset: () => void;
}

/**
 * Persistent collection + a single in-flight "pending" reveal.
 *
 *   const col = useCollection();
 *   col.unlock(SAMPLE_RARE_CARD);             // opens the moment
 *   <RareCardUnlock open={!!col.pending} card={col.pending ?? fallback}
 *      onRevealed={col.commit} onClose={col.dismiss} />
 */
export function useCollection(): UseCollection {
  const [unlocked, setUnlocked] = useState<string[]>(() => read().unlocked);
  const [pending, setPending] = useState<TarotCardData | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ unlocked }));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [unlocked]);

  const has = useCallback((id: string) => unlocked.includes(id), [unlocked]);

  const unlock = useCallback((card: TarotCardData) => setPending(card), []);

  const commit = useCallback(() => {
    setPending((card) => {
      if (card) setUnlocked((prev) => (prev.includes(card.id) ? prev : [...prev, card.id]));
      return card; // keep showing until dismiss
    });
  }, []);

  const dismiss = useCallback(() => setPending(null), []);

  const reset = useCallback(() => {
    setUnlocked([]);
    setPending(null);
  }, []);

  return { unlocked, pending, has, unlock, commit, dismiss, reset };
}
