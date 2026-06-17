/* ───────────────────────────────────────────────────────────────
   Hint · shared tarot / score domain types + sample data

   Images are passed as URLs so the data layer stays asset-agnostic.
   In your app, point `image` at your bundled assets, e.g.
       import theMoon from "@/shared/assets/tarot/18-TheMoon.jpg";
   or a /public path: "/tarot/18-TheMoon.jpg".
   ─────────────────────────────────────────────────────────────── */

export type Arcana = "major" | "minor";
export type Rarity = "common" | "rare" | "mythic";

export interface TarotCardData {
  id: string;
  /** Title-case display name, e.g. "The High Priestess". */
  name: string;
  /** Resolved image URL for the card front. */
  image: string;
  arcana: Arcana;
  rarity: Rarity;
  /** Short serif "whisper" shown under the card. */
  blurb?: string;
}

export interface AnimalSpiritData extends TarotCardData {
  /** The spirit animal this card embodies, e.g. "The Wolf". */
  spirit: string;
}

export type ScoreKey = "love" | "career" | "emotion" | "luck" | "energy";

export interface ScoreArea {
  key: ScoreKey;
  label: string;
  /** 0–100. */
  value: number;
  /** CSS custom property name carrying this area's tone. */
  toneVar: string;
}

export interface EnergyTaskItem {
  id: string;
  label: string;
  done: boolean;
}

/* ── sample data (replace `image` paths with your real assets) ── */

export const SAMPLE_DAILY_CARD: TarotCardData = {
  id: "the-star",
  name: "The Star",
  image: "/tarot/17-TheStar.jpg",
  arcana: "major",
  rarity: "common",
  blurb:
    "Something you've been quietly tending is closer to water than you think. Keep pouring.",
};

export const SAMPLE_RARE_CARD: TarotCardData = {
  id: "the-sun",
  name: "The Sun",
  image: "/tarot/19-TheSun.jpg",
  arcana: "major",
  rarity: "rare",
  blurb: "Warmth you didn't ask for, arriving anyway.",
};

export const SAMPLE_ANIMAL_SPIRIT: AnimalSpiritData = {
  id: "the-wolf",
  name: "The Moon",
  spirit: "The Wolf",
  image: "/tarot/18-TheMoon.jpg",
  arcana: "major",
  rarity: "rare",
  blurb: "It shows up when you need its particular kind of courage.",
};

export const SAMPLE_SCORES: ScoreArea[] = [
  { key: "love",    label: "Love",    value: 82, toneVar: "--score-love" },
  { key: "career",  label: "Career",  value: 77, toneVar: "--score-career" },
  { key: "emotion", label: "Emotion", value: 68, toneVar: "--score-people" },
  { key: "luck",    label: "Luck",    value: 90, toneVar: "--score-wealth" },
  { key: "energy",  label: "Energy",  value: 74, toneVar: "--score-study" },
];

export const SAMPLE_ENERGY_TASKS: EnergyTaskItem[] = [
  { id: "water",   label: "Drink a glass of water slowly",       done: true },
  { id: "message", label: "Reply to one message you've avoided",  done: false },
  { id: "breath",  label: "Step outside for three slow breaths",  done: false },
];

/** A small draw pile for the Sky Deck demo. */
export const SAMPLE_DECK: TarotCardData[] = [
  SAMPLE_DAILY_CARD,
  { id: "the-moon",  name: "The Moon",  image: "/tarot/18-TheMoon.jpg",  arcana: "major", rarity: "common" },
  { id: "the-world", name: "The World", image: "/tarot/21-TheWorld.jpg", arcana: "major", rarity: "common" },
  { id: "wheel",     name: "Wheel of Fortune", image: "/tarot/10-WheelOfFortune.jpg", arcana: "major", rarity: "rare" },
  { id: "the-fool",  name: "The Fool",  image: "/tarot/00-TheFool.jpg",  arcana: "major", rarity: "common" },
];
