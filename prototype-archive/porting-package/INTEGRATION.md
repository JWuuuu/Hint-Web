# Hint — Porting Package → Codex Integration Guide

Implementation-ready React + TypeScript for a **Vite + React + TS + Wouter** app.
No `x-dc`, no `support.js`, no `{{ }}` templates, no custom runtime. Plain `.tsx`
+ co-located `.css`, normal state / props / handlers.

> Copy the contents of this package's `src/` straight into your project's `src/`.
> Paths already match your `site / product / shared` layout.

---

## 0. One-time setup

1. **Copy the tree.** Merge `porting-package/src/**` into your `src/**`.
   Nothing here overwrites your files — every path is new
   (`shared/styles`, `shared/hooks`, `shared/components`, `shared/data`,
   `product/{collection,daily,sky-deck,animal-tarot,tarot}`, `site`).

2. **Import the global keyframes once**, at your app root (e.g. `src/main.tsx`
   or `src/App.tsx`):

   ```ts
   import "@/shared/styles/animations.css";
   ```

3. **Tokens.** These components read CSS variables (`--accent-gold`,
   `--score-love`, `--grad-ember`, `--font-serif`, …). Your app already defines
   them in `src/index.css`. If any are missing, also import the fallback layer
   (it is wrapped in `@layer hint-fallback`, so your real tokens always win):

   ```ts
   import "@/shared/styles/hint-tokens.css";
   ```

4. **Fonts.** Ensure Fraunces + Hanken Grotesk are loaded (you already do this
   in the real app). No binaries are vendored here.

5. **Path alias.** Examples use `@/` → `src/`. If you don't have that alias, use
   relative imports (the files internally already use relative imports, so they
   work as-is).

6. **Assets.** Components take image URLs via props/data — they don't hard-code
   asset paths. Point `image` fields at your bundled tarot art / lucky pngs.
   The sample data in `shared/data/tarot.ts` uses `/tarot/*.jpg` and
   `/lucky/*.png` placeholders under `public/` — swap for your imports.

---

## 1. What each feature is, and where it lives

| Feature | File(s) | Use it for |
|---|---|---|
| **Rare card unlock** (the pop-out moment) | `product/collection/RareCardUnlock.tsx` + `.css` | Burst rings + aura + back→front flip reveal |
| **Collection system** | `product/collection/useCollection.ts`, `CollectionGrid.tsx` + `.css` | Persistent owned-cards state + the wall |
| **Sky Deck daily draw** | `product/sky-deck/SkyDeckDraw.tsx` + `.css` | The ceremonial fan-and-pull draw ritual |
| **Daily Tarot** | `product/daily/DailyTarot.tsx` + `.css` | The gentle one-card surface (turn to read) |
| **Daily Energy Score** | `product/daily/DailyEnergyScore.tsx` + `.css` | Five astrology rings that fill + count up |
| **Energy Task** | `product/daily/EnergyTask.tsx` + `.css` | Tonight's ritual checklist + reward |
| **Animal Tarot** | `product/animal-tarot/AnimalTarot.tsx` + `.css` | Spirit-animal card w/ orbits + sparks |
| **Tarot Room** | `product/tarot/TarotRoom.tsx` + `.css` | Immersive candlelit Ask thread |
| **Feature carousel** (landing) | `site/FeatureCarousel.tsx` + `.css` | Public feature-tour ad carousel |
| **Shared primitives** | `shared/components/{TarotCardFlip,Sigil}.tsx`, `shared/hooks/{useReducedMotion,useCountUp}.ts`, `shared/data/tarot.ts`, `shared/styles/*` | Reused by everything above |

**Separation rule:** the landing `FeatureCarousel` is a *showcase* (no real draw).
The actual rituals (`SkyDeckDraw`, `DailyTarot`, `RareCardUnlock`, …) live in
`src/product` and mount under your `/app` routes.

---

## 2. Wire the rare-unlock + collection (the headline interaction)

Create/locate your collection route, e.g. `src/product/collection/CollectionPage.tsx`:

```tsx
import { useCollection } from "./useCollection";
import { CollectionGrid } from "./CollectionGrid";
import { RareCardUnlock } from "./RareCardUnlock";
import { SAMPLE_DECK, SAMPLE_RARE_CARD } from "@/shared/data/tarot";

export function CollectionPage() {
  const col = useCollection();

  return (
    <>
      <button onClick={() => col.unlock(SAMPLE_RARE_CARD)}>Open tonight's reward</button>

      <CollectionGrid deck={SAMPLE_DECK} unlocked={col.unlocked} onSelect={(c) => col.unlock(c)} />

      <RareCardUnlock
        open={!!col.pending}
        card={col.pending ?? SAMPLE_RARE_CARD}
        onRevealed={col.commit}   // adds to collection once the front pops in
        onClose={col.dismiss}     // tap / Esc / CTA / auto-close
      />
    </>
  );
}
```

- The unlock sequence (aura → gold+aqua burst rings → back fade-out → front
  fade + scale + rotate pop-in → gold border + Rare badge + shimmer) is fully in
  `rare-card-unlock.css`, driven by the `.is-revealed` class. Don't simplify it
  into a modal — the choreography is the product.
- `autoCloseMs` (default **4200**) controls the reset timing; pass `0` to require
  manual dismiss.

**Connect the Sky Deck draw to the unlock** so a rare pull triggers the moment:

```tsx
<SkyDeckDraw
  deck={SAMPLE_DECK}
  onDraw={(card) => { if (card.rarity !== "common") col.unlock(card); }}
/>
```

---

## 3. Mount the rest under `/app` (Wouter)

```tsx
import { Route } from "wouter";
import { DailyEnergyScore } from "@/product/daily/DailyEnergyScore";
import { DailyTarot } from "@/product/daily/DailyTarot";
import { EnergyTask } from "@/product/daily/EnergyTask";
import { AnimalTarot } from "@/product/animal-tarot/AnimalTarot";
import { TarotRoom } from "@/product/tarot/TarotRoom";
import {
  SAMPLE_SCORES, SAMPLE_DAILY_CARD, SAMPLE_ENERGY_TASKS, SAMPLE_ANIMAL_SPIRIT,
} from "@/shared/data/tarot";

<Route path="/app/score"  >{() => <DailyEnergyScore areas={SAMPLE_SCORES} overall={78} active />}</Route>
<Route path="/app/today"  >{() => <DailyTarot card={SAMPLE_DAILY_CARD} />}</Route>
<Route path="/app/ritual" >{() => <EnergyTask items={SAMPLE_ENERGY_TASKS} onComplete={() => {/* award XP */}} />}</Route>
<Route path="/app/animal" >{() => <AnimalTarot spirit={SAMPLE_ANIMAL_SPIRIT} />}</Route>
<Route path="/app/room"   >{() => <TarotRoom onAsk={yourAskHintFn} />}</Route>
```

- **`DailyEnergyScore`** — pass `active` from an in-view observer (or your "draw"
  action) so the rings fill on reveal rather than on mount.
- **`EnergyTask`** — `onComplete` fires once when the last item is checked; hook
  it to your XP / streak store.
- **`TarotRoom`** — replace the canned reply by passing
  `onAsk={(prompt) => Promise<string>}` (your real Ask Hint backend).

---

## 4. Landing page carousel (`src/site`)

In your landing page (e.g. `src/site/LandingPage.tsx`), replace the old hero with:

```tsx
import { FeatureCarousel, type FeatureSlide } from "./FeatureCarousel";
import { Link } from "wouter";

const slides: FeatureSlide[] = [
  { id: "animal", eyebrow: "Animal tarot", accent: "aqua",
    title: "Meet the creature that walks the night with you.",
    body: "A spirit guide drawn from your chart and the season.",
    ctaLabel: "Explore Animal Tarot", href: "/app/animal",
    visual: <img src="/tarot/18-TheMoon.jpg" alt="" /> },
  // …Tarot Room, Daily Energy Score, Daily Tarot, Energy Task
];

<FeatureCarousel
  slides={slides}
  renderCta={(s) => <Link href={s.href} className="hint-fc__cta">{s.ctaLabel} →</Link>}
/>
```

- Swipe, arrows, clickable progress segments, autoplay (default 5.2s, pauses on
  hover/drag) are all built in. Arrows auto-hide below 560px (swipe remains).
- `renderCta` lets the CTAs be real Wouter `<Link>`s instead of `<a>`.

---

## 5. What to REPLACE vs KEEP

**Replace**
- Any old prototype hero / draw markup on the landing page → `FeatureCarousel`.
- Any ad-hoc score rings / unlock modal you may have stubbed → these components.

**Keep unchanged**
- Your routing, app shell, nav, theme toggle, and `index.css` tokens.
- Your real Ask Hint / score / astrology backend — wire them via the props
  (`onAsk`, `areas`, `pick`, `onComplete`, `onDraw`).

---

## 6. Notes for Codex

- These are **client components** for a Vite SPA. No Next.js, no server
  components, no framework router beyond optional Wouter `<Link>`.
- CSS is plain, co-located, and **class-prefixed** (`hint-*`) to avoid
  collisions — `import "./x.css"` at the top of each component (already done).
  Convert to CSS Modules only if your lint requires it; class names are unique.
- Every component honours `prefers-reduced-motion` (via `useReducedMotion`
  and a global override in `animations.css`).
- The prototype used rAF tweens to dodge a preview-runtime quirk; that is **not**
  needed here — this package uses standard CSS transitions/animations.
- All inputs are typed; no `any`. Run `tsc --noEmit` after copying.
