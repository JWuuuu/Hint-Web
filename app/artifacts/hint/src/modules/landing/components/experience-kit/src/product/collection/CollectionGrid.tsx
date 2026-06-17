import type { TarotCardData } from "../../shared/data/tarot";
import "./collection-grid.css";

export interface CollectionGridProps {
  /** Every card in the deck (the full set). */
  deck: TarotCardData[];
  /** ids the reader owns. */
  unlocked: string[];
  /** Tap an owned card. */
  onSelect?: (card: TarotCardData) => void;
}

/**
 * The collection wall: owned cards show their art (rare ones gold-edged);
 * unowned cards are dim sigil backs. Pairs with useCollection().
 */
export function CollectionGrid({ deck, unlocked, onSelect }: CollectionGridProps) {
  const owned = new Set(unlocked);
  const rareCount = deck.filter((c) => owned.has(c.id) && c.rarity !== "common").length;

  return (
    <section className="hint-col">
      <header className="hint-col__head">
        <div>
          <span className="hint-col__eyebrow">Collection</span>
          <p className="hint-col__count">
            {owned.size} <span>/ {deck.length}</span>
          </p>
        </div>
        {rareCount > 0 && <span className="hint-col__rare">{rareCount} rare</span>}
      </header>

      <div className="hint-col__grid">
        {deck.map((card) => {
          const has = owned.has(card.id);
          const rare = card.rarity !== "common";
          return (
            <button
              key={card.id}
              type="button"
              className={`hint-col__card${has ? " is-owned" : ""}${rare ? " is-rare" : ""}`}
              onClick={() => has && onSelect?.(card)}
              aria-label={has ? card.name : "Locked card"}
              disabled={!has}
            >
              {has ? (
                <img src={card.image} alt={card.name} draggable={false} />
              ) : (
                <span className="hint-col__lock" aria-hidden />
              )}
              {has && rare && <span className="hint-col__badge">Rare</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
