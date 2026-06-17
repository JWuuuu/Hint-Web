// Barrel exports for the ported Hint features.
// Import from the feature folders, e.g.:
//   import { RareCardUnlock } from "@/product/collection";

// shared
export { Sigil } from "./shared/components/Sigil";
export { TarotCardFlip } from "./shared/components/TarotCardFlip";
export { useReducedMotion } from "./shared/hooks/useReducedMotion";
export { useCountUp } from "./shared/hooks/useCountUp";
export * from "./shared/data/tarot";

// product · collection
export { RareCardUnlock } from "./product/collection/RareCardUnlock";
export { CollectionGrid } from "./product/collection/CollectionGrid";
export { useCollection } from "./product/collection/useCollection";

// product · daily
export { DailyEnergyScore } from "./product/daily/DailyEnergyScore";
export { DailyTarot } from "./product/daily/DailyTarot";
export { EnergyTask } from "./product/daily/EnergyTask";

// product · rituals
export { SkyDeckDraw } from "./product/sky-deck/SkyDeckDraw";
export { AnimalTarot } from "./product/animal-tarot/AnimalTarot";
export { TarotRoom } from "./product/tarot/TarotRoom";

// site
export { FeatureCarousel } from "./site/FeatureCarousel";
export type { FeatureSlide } from "./site/FeatureCarousel";
