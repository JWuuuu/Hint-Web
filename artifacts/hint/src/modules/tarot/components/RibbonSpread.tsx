import { type PointerEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { RitualCard } from "../logic/createHiddenDeck";
import type { SpreadChoice } from "../../hold/useHoldFlow";
import { TarotCardVisual } from "./TarotCardVisual";
import type { TarotCardBackStyle } from "./TarotCardVisual";

type RibbonSpreadProps = {
  finalDeckOrder: RitualCard[];
  selectedCards: RitualCard[];
  maxCards: number;
  spread: SpreadChoice;
  backStyle?: TarotCardBackStyle;
  onSelect: (visualId: string) => void;
  onContinue: () => void;
};

function getFanLayout(index: number, total: number) {
  const progress = total <= 1 ? 0.5 : index / (total - 1);
  const angle = -58 + progress * 116;
  const radians = (angle * Math.PI) / 180;
  const edge = Math.abs(progress - 0.5) * 2;

  return {
    x: 50 + Math.sin(radians) * 48,
    y: 70 - Math.cos(radians) * 38 + Math.pow(edge, 1.8) * 3,
    rotate: angle * 0.74,
    centerOffsetX: -Math.sin(radians) * 540,
    centerOffsetY: 88 + Math.cos(radians) * 56,
    spreadDelay: Math.abs(progress - 0.5) * 0.1 + Math.min(index * 0.00055, 0.04),
    zIndex: Math.round(1200 - edge * 130 + index * 0.02),
  };
}

function slotSizeClass(cardCount: number) {
  if (cardCount >= 7) return "h-[58px] w-[38px] sm:h-[68px] sm:w-[44px] lg:h-[82px] lg:w-[54px]";
  if (cardCount >= 5) return "h-[82px] w-[54px] sm:h-[98px] sm:w-[64px] lg:h-[128px] lg:w-[82px]";
  return "h-[108px] w-[68px] sm:h-[128px] sm:w-[82px] lg:h-[154px] lg:w-[98px]";
}

function slotFieldClass(cardCount: number) {
  if (cardCount === 1) return "top-[51%] h-[25%] sm:top-[51%] sm:h-[27%]";
  if (cardCount === 3) return "top-[50%] h-[30%] sm:top-[49%] sm:h-[32%]";
  if (cardCount <= 5) return "top-[45%] h-[42%] sm:top-[44%] sm:h-[44%]";
  return "top-[41%] h-[52%] sm:top-[40%] sm:h-[54%]";
}

function fanCardSizeClass() {
  return "!h-[70px] !w-[45px] sm:!h-[98px] sm:!w-[63px] md:!h-[118px] md:!w-[75px]";
}

function getSlotPoint(
  point: { x: number; y: number },
  cardCount: number,
) {
  if (cardCount <= 3) {
    return {
      x: point.x,
      y: Math.min(82, Math.max(18, point.y)),
    };
  }

  if (cardCount <= 5) {
    return {
      x: Math.min(82, Math.max(18, point.x)),
      y: Math.min(78, Math.max(18, point.y)),
    };
  }

  return {
    x: Math.min(88, Math.max(12, point.x)),
    y: Math.min(88, Math.max(12, point.y)),
  };
}

function SelectedSpreadCard({
  card,
  label,
  backStyle,
  cardSizeClass,
}: {
  card: RitualCard;
  label: string;
  backStyle: TarotCardBackStyle;
  cardSizeClass: string;
}) {
  return (
    <TarotCardVisual
      card={card}
      compact
      faceDown
      revealed={false}
      backStyle={backStyle}
      positionLabel={label}
      showFrontCaption={false}
      ariaLabel={`${label}, selected face-down`}
      className={cardSizeClass}
    />
  );
}

export function RibbonSpread({
  finalDeckOrder,
  selectedCards,
  maxCards,
  spread,
  backStyle = "nocturne",
  onSelect,
  onContinue,
}: RibbonSpreadProps) {
  const reduceMotion = useReducedMotion();
  const fanRef = useRef<HTMLDivElement | null>(null);
  const hoverFrameRef = useRef<number | null>(null);
  const hoverPointerRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const hoveredVisualIdRef = useRef<string | null>(null);
  const [hoveredVisualId, setHoveredVisualId] = useState<string | null>(null);
  const [previewVisualId, setPreviewVisualId] = useState<string | null>(null);
  const selectedIds = new Set(selectedCards.map((card) => card.visualId));
  const slots = Array.from({ length: maxCards }, (_, index) => index);
  const cardSizeClass = slotSizeClass(maxCards);
  const slotField = slotFieldClass(maxCards);
  const fanCardClass = fanCardSizeClass();
  const allSelected = selectedCards.length === maxCards;

  useEffect(() => {
    if (fanRef.current) {
      fanRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    hoveredVisualIdRef.current = hoveredVisualId;
  }, [hoveredVisualId]);

  useEffect(() => {
    return () => {
      if (hoverFrameRef.current !== null) {
        window.cancelAnimationFrame(hoverFrameRef.current);
      }
    };
  }, []);

  function findNearestCard(clientX: number, clientY: number) {
    const rect = fanRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    let nearestCard: RitualCard | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const [index, card] of finalDeckOrder.entries()) {
      if (selectedIds.has(card.visualId)) continue;
      const layout = getFanLayout(index, finalDeckOrder.length);
      const cardX = rect.width * (layout.x / 100);
      const cardY = rect.height * (layout.y / 100);
      const distance = Math.hypot(x - cardX, (y - cardY) * 0.82);
      if (distance < nearestDistance) {
        nearestCard = card;
        nearestDistance = distance;
      }
    }

    const hitRadius = rect.width < 500 ? 130 : 190;
    if (!nearestCard || nearestDistance > hitRadius) return null;
    return nearestCard;
  }

  function setHoveredCard(nextVisualId: string | null) {
    if (hoveredVisualIdRef.current === nextVisualId) return;
    hoveredVisualIdRef.current = nextVisualId;
    setHoveredVisualId(nextVisualId);
  }

  function cancelHoverFrame() {
    if (hoverFrameRef.current === null) return;
    window.cancelAnimationFrame(hoverFrameRef.current);
    hoverFrameRef.current = null;
  }

  function handleFanPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (selectedCards.length >= maxCards || event.pointerType !== "mouse") return;
    hoverPointerRef.current = { clientX: event.clientX, clientY: event.clientY };
    if (hoverFrameRef.current !== null) return;
    hoverFrameRef.current = window.requestAnimationFrame(() => {
      hoverFrameRef.current = null;
      const pointer = hoverPointerRef.current;
      if (!pointer) return;
      setHoveredCard(findNearestCard(pointer.clientX, pointer.clientY)?.visualId ?? null);
    });
  }

  function handleFanPointerLeave() {
    hoverPointerRef.current = null;
    cancelHoverFrame();
    setHoveredCard(null);
  }

  function handleFanPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (selectedCards.length >= maxCards) return;
    const nearestCard = findNearestCard(event.clientX, event.clientY);
    if (!nearestCard) return;

    const needsPreviewFirst = event.pointerType !== "mouse";
    if (needsPreviewFirst && previewVisualId !== nearestCard.visualId) {
      setPreviewVisualId(nearestCard.visualId);
      return;
    }

    if (nearestCard) {
      setPreviewVisualId(null);
      setHoveredCard(null);
      onSelect(nearestCard.visualId);
    }
  }

  const activePreviewVisualId = previewVisualId ?? hoveredVisualId;

  return (
    <section className="relative h-full w-full overflow-hidden px-4 py-5 text-center sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(54,105,126,0.34),transparent_20%),radial-gradient(circle_at_50%_58%,rgba(226,190,116,0.11),transparent_32%),linear-gradient(180deg,#050816,#010207_54%,#03040c)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.65)_0_1px,transparent_1px),radial-gradient(circle_at_74%_19%,rgba(239,205,139,0.55)_0_1px,transparent_1px),radial-gradient(circle_at_68%_76%,rgba(255,255,255,0.34)_0_1px,transparent_1px)] [background-size:132px_148px]" />
      <div className="pointer-events-none absolute inset-x-[-10%] bottom-[-8%] h-[60%] bg-[radial-gradient(ellipse_at_50%_64%,rgba(78,117,145,0.28),rgba(8,18,34,0.24)_38%,transparent_70%)]" />

      <div className="relative z-30 mx-auto max-w-3xl">
        <p className="font-serif text-[30px] leading-tight text-[#f7ead0] sm:text-4xl">Spread the deck.</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[#e4c174]/78">
          <span>{spread.label} spread</span>
          <span className="h-1 w-1 rounded-full bg-[#e4c174]/45" />
          <span>{selectedCards.length} / {maxCards} selected</span>
        </div>
        <p className="mt-2 font-sans text-sm text-[#d8c7a6]/68">
          Choose {maxCards} face-down {maxCards === 1 ? "card" : "cards"} from the arc.
        </p>
      </div>

      <div className={`pointer-events-none absolute inset-x-4 ${slotField} z-20 mx-auto max-w-6xl sm:inset-x-8`}>
        <p className="absolute left-1/2 top-0 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.22em] text-[#e4c174]/58">
          Selected Hints
        </p>

        {slots.map((slotIndex) => {
          const index = slotIndex;
          const selectedCard = selectedCards[index];
          const point = spread.layout[index] ?? { n: index + 1, x: 50, y: 50 };
          const slotPoint = getSlotPoint(point, maxCards);
          const label = `Hint ${index + 1}`;
          const showOuterLabel = maxCards <= 3;
          return (
            <div
              key={`${spread.id}-hint-${index + 1}`}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${slotPoint.x}%`, top: `${slotPoint.y}%` }}
            >
              <div className="relative">
                <div
                  className={`relative ${cardSizeClass} rounded-[10px] border border-dashed border-[#e4c174]/48 bg-[#e4c174]/[0.045] shadow-[inset_0_0_22px_rgba(228,193,116,0.08)]`}
                >
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[9px] uppercase tracking-[0.16em] text-[#e4c174]/64">
                    {label}
                  </span>
                </div>
                {selectedCard && (
                  <motion.div
                    layoutId={`spread-card-${selectedCard.visualId}`}
                    initial={reduceMotion ? { opacity: 0, scale: 0.98 } : { opacity: 0, y: -104, scale: 1.08, rotate: 4 }}
                    animate={reduceMotion
                      ? { opacity: 1, scale: 1, rotate: 0 }
                      : {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotate: 0,
                        }}
                    transition={reduceMotion
                      ? { duration: 0.22, ease: "easeOut" }
                      : { type: "spring", stiffness: 132, damping: 24, mass: 0.82 }}
                    className="absolute left-0 top-0 z-50 will-change-transform"
                  >
                    {!reduceMotion && (
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-3 rounded-[16px] bg-[#e4c174]/18"
                        initial={{ opacity: 0.7, scale: 0.84 }}
                        animate={{ opacity: 0, scale: 1.3 }}
                        transition={{ duration: 0.44, ease: "easeOut" }}
                      />
                    )}
                    <SelectedSpreadCard
                      card={selectedCard}
                      backStyle={backStyle}
                      label={label}
                      cardSizeClass={cardSizeClass}
                    />
                  </motion.div>
                )}
              </div>
              {showOuterLabel && (
                <p className="max-w-[7rem] truncate font-sans text-[9px] uppercase tracking-[0.14em] text-[#d8c7a6]/72">
                  {label}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div
        ref={fanRef}
        onPointerMove={handleFanPointerMove}
        onPointerLeave={handleFanPointerLeave}
        onPointerDown={handleFanPointerDown}
        className="absolute inset-x-0 top-[9%] z-10 h-[41vh] min-h-[282px] w-full cursor-pointer touch-none overflow-visible sm:top-[8%] sm:h-[43vh] sm:min-h-[326px]"
      >
        <div className="absolute inset-x-0 top-0 mx-auto h-full max-w-[92rem]">
          <div className="pointer-events-none absolute left-1/2 top-[72%] h-[34px] w-[70%] -translate-x-1/2 rounded-full bg-black/18 blur-xl" />
          {finalDeckOrder.map((card, index) => {
            const selectedInFan = selectedIds.has(card.visualId);
            const activePreview = activePreviewVisualId === card.visualId && !selectedInFan;
            const layout = getFanLayout(index, finalDeckOrder.length);
            return (
              <div
                key={card.visualId}
                className="absolute"
                style={{
                  left: `${layout.x}%`,
                  top: `${layout.y}%`,
                  zIndex: activePreview ? layout.zIndex + 36 : layout.zIndex,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  layoutId={selectedInFan ? undefined : `spread-card-${card.visualId}`}
                  initial={{
                    opacity: 0,
                    x: layout.centerOffsetX,
                    y: layout.centerOffsetY,
                    rotate: 0,
                    scale: 0.86,
                  }}
                  animate={{
                    opacity: selectedInFan ? 0 : 1,
                    x: 0,
                    y: activePreview ? -4 : 0,
                    rotate: layout.rotate,
                    scale: activePreview ? 1.006 : 1,
                  }}
                  transition={
                    activePreview
                      ? { duration: reduceMotion ? 0.08 : 0.12, ease: "easeOut" }
                      : {
                          delay: reduceMotion ? 0 : layout.spreadDelay,
                          type: reduceMotion ? "tween" : "spring",
                          duration: reduceMotion ? 0.18 : undefined,
                          stiffness: 145,
                          damping: 24,
                          mass: 0.9,
                        }
                  }
                  style={{
                    pointerEvents: "none",
                    transformOrigin: "50% 96%",
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="pointer-events-none">
                    <TarotCardVisual
                      card={card}
                      compact
                      subtleBack={!activePreview}
                      backStyle={backStyle}
                      className={`${fanCardClass} ${activePreview ? "drop-shadow-[0_9px_12px_rgba(0,0,0,0.24)]" : "drop-shadow-[0_7px_12px_rgba(0,0,0,0.22)]"}`}
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {allSelected && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={onContinue}
                  className="absolute bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#e4c174]/58 bg-[#e4c174]/12 px-6 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-[#ffe8aa] shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:bg-[#e4c174]/18"
        >
          Reveal the Hints
        </motion.button>
      )}
    </section>
  );
}
