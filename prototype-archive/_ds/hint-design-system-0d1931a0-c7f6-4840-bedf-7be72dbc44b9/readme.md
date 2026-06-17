# Hint — Design System

> *"An intimate reflection app for late-night clarity — tarot, journaling, and emotional check-ins."*

Hint is a mobile-first reflection app dressed as a deck of tarot. You arrive at
night with something unspoken; Hint gives it a room to sit in. The product blends
a **daily tarot score** (a card you draw that scores Love / Wealth / Career /
Study / People from the day's sky and your birth details), an **Ask Hint** ambient
AI chat, an immersive **Tarot Room**, a **journal**, **astrology** tools, and a
library of "rooms-of-rooms." The whole thing feels like a candlelit object —
obsidian and gold, slow and quiet, never clinical.

This design system packages Hint's foundations (color, type, spacing, motion,
voice), real brand assets, reusable React primitives, and a click-through UI kit
so anyone can build new Hint surfaces — production or throwaway — that look and
read like the real thing.

## Sources
This system was reverse-engineered from the Hint frontend codebase and brand assets:
- **Codebase** — the `Hint` pnpm monorepo, frontend at `artifacts/hint` (Vite +
  React + Tailwind v4 + shadcn/ui + framer-motion + wouter + lucide-react). Token
  source of truth: `artifacts/hint/src/index.css` and
  `src/modules/hold/atmosphere/index.ts`.
- **GitHub** — <https://github.com/JWuuuu/Hint> · Explore this repo to go deeper
  than this system captures (the astrology/score engine in `dailyReport.ts`, the
  immersive Tarot Room in `modules/hold` + `modules/tarot`, i18n in `lib/i18n`).
- **Assets** — logos, tarot card art (full Rider–Waite–Smith major + minor
  arcana), three house card-backs, and ~120 pastel "lucky" object illustrations,
  all from `artifacts/hint/public`.

Don't assume a reader has access to these — everything needed is vendored here —
but they're the place to look to do an even better job.

---

## CONTENT FUNDAMENTALS — how Hint talks

Hint's voice is its soul. Get this wrong and nothing else matters.

**Stance.** Second person, always — *you*, *your*. Hint speaks **to** the reader
like a calm friend at midnight, never **about** them clinically. It observes; it
doesn't diagnose. It never says "users," "features," or "AI-powered."

**Tone.** Gentle, unhurried, a little poetic, emotionally precise. Warm but not
saccharine; mystical but grounded. It earns trust by being *specific* about feelings,
not by being grand. Think: a wise, soft-spoken person who notices the thing you
didn't say.

**Sentences.** Short. Often fragments. One idea at a time, with room around it.
A line can end on a soft beat:
- *"Say it, or just sit with it. The room is listening either way."*
- *"One card, already turned for tonight."*
- *"The parts of you that don't post."*
- *"Something you said earlier this week is still standing in the room."*

**Casing.** Sentence case everywhere in body and headlines. The **only** uppercase
is the **eyebrow** — short gold section labels, wide-tracked: `TODAY'S TAROT SCORE`,
`TONIGHT'S PULL`. Card names use Title Case ("The High Priestess").

**Prompts & questions.** Hint asks the reader questions it doesn't expect answered
out loud — *"What did today take from me that I didn't notice?"* — and frames
actions as small invitations, not commands: *"Drink a glass of water slowly,"*
*"Reply to one message you have been avoiding."* Each is paired with a soft reason.

**No-go.** No emoji, ever. No exclamation marks. No hype, no growth-speak, no
"unlock your potential." No clinical/therapy jargon. No ALL CAPS except eyebrows.
Never promise certainty — Hint offers a hint, not an answer.

**Multilingual.** The real app ships English, 中文, Español, 日本語, 한국어 — the
same gentle register in every language. Keep that softness if you localize.

---

## VISUAL FOUNDATIONS — the look

**Two moods, dark-first.** Hint ships **Nocturne** (deep obsidian night, the
DEFAULT and the brand's true face) and **Daybreak** (warm parchment day). Set
`data-hint-theme="nocturne|daybreak"` on a wrapper; every semantic token re-skins
with a slow 1s cross-fade. Design for Nocturne first.

**Color.** A near-black navy ground (`#080B14`→`#131D32`) under **gold** — the
house metal — used for eyebrows, hairlines, sigils, and foil edges. **Aqua/teal**
(`#86D6C7`) is the signal color: it inks scores and glows. A bright teal
(`#40E0D0`) is reserved *only* for the Ask portal. Warm **ember** (`#F1A66B`→
`#F6C28F`) is the one warm CTA. Five fixed score tones carry the life areas
(love pink, wealth gold, career periwinkle, study cyan, people violet). Soft
**rose** and **lavender** accent relationships, dreams, and the inner self. Avoid
inventing hues — mix from these.

**Type.** Two families. **Fraunces** (serif) carries the *voice* — headlines, card
names, scores (tabular), and the italic "whispers." **Hanken Grotesk** (sans)
carries *structure* — body, labels, eyebrows, metadata. Display serif runs large
(40–72px) with slightly negative tracking; the italic whisper is the brand's
signature line. Numbers are always Fraunces, tabular, often aqua with a halo.

**Background.** Never flat. The "room" is a layered radial-glow gradient (cool
navy top-right, warm violet bottom-left) over obsidian, dusted with a faint
**starfield**, a soft moon glow, grain, and a vignette. It sits *behind* every
screen and persists across navigation (it doesn't reset on route change).

**Surfaces & cards.** Everything is **frosted glass**: translucent navy fills
(`--surface`, `--card-surface`) with a 1px inner top-highlight and a soft, wide
shadow — *never* a hard drop shadow. Nav and inputs use `backdrop-filter:
blur(24px) saturate(1.22)`. Corners are soft and large: tiles 14px, panels
18–28px, buttons/chips/nav full pills (999px).

**Depth & light.** Light, not shadow, makes depth. Gold gets a wide low-opacity
**bloom**; scores get an **aqua halo**; text gets a faint warm **halo** that keeps
glyph edges crisp. Hero/feature panels add a two-point glow wash (aqua + ember).

**Motion.** Slow and eased — fades, gentle floats, shimmer sweeps, a 0.8–1.2s
3D card **flip** on `cubic-bezier(0.6,0.05,0.2,1)`. Score bars grow on reveal.
**No bounce, no spring overshoot.** Honor `prefers-reduced-motion`.

**States.** Hover lifts elements ~1–2px (and may brighten); press settles back
with a subtle scale-down (~0.98). Active nav/segment items fill with the ember
gradient and gain a soft cast. Disabled drops to ~50% opacity. Locked ("soon")
rooms dim to ~62% and show a tracked **Soon** chip.

**Imagery.** Two registers: (1) the **tarot card art** — classic Rider–Waite–Smith
illustrations, warm and painterly, shown in the 46:71 card ratio behind gold
edges; (2) the **lucky illustrations** — soft, rounded, pastel object icons
(crystals, flowers, food, jewelry) on transparent grounds, set in little ivory
chips. Both are warm-leaning. No cold corporate photography.

**Layout.** Mobile-first single column (~`--app-max` 30rem), a floating pill nav
pinned to the top (not bottom), and an immersive full-screen mode for the Tarot
Room and Ask (which hide the nav and own their own scroll + pinned input).

---

## ICONOGRAPHY

- **Icon set: [Lucide](https://lucide.dev).** The app uses `lucide-react`
  throughout — thin (≈1.8px), rounded, line icons at 16–24px. Use Lucide and
  nothing else for UI glyphs. In static HTML, load the Lucide UMD
  (`https://unpkg.com/lucide@0.460.0/dist/umd/lucide.js`); the UI kit's
  `shell.jsx` has a small `Icon` helper that builds an SVG from a Lucide IconNode.
  Common glyphs: `sparkles`, `moon`, `sun`, `message-circle`, `arrow-right`,
  `arrow-up`, `arrow-left`, `check`, `star`, `gift`, `settings`, `layers`, `heart`.
- **Gold sigils.** Beyond UI icons, Hint draws bespoke **gold line sigils** — a
  diamond/eye/star motif — on card backs and module tiles (see
  `modules/home/data/sigils.tsx` and the SVG card-backs in `assets/tarot`). These
  are decorative brand marks, not a swappable icon font. Reuse the supplied SVGs;
  don't redraw them freehand.
- **The logo** is itself iconographic: two tarot-card rectangles forming an **H**
  with a four-point gold **spark** where they meet — gold foil on obsidian.
  `assets/brand/hint-card-logo.png` is the rounded app cardmark; pair it with the
  Fraunces "Hint" wordmark.
- **No emoji. No unicode-glyph icons.** (The `☀ ☾` fallbacks in `ThemeToggle` are
  only used if you don't pass real Lucide nodes — always pass the Lucide ones.)

---

## INDEX — what's in this system

**Foundations**
- `styles.css` — the single entry point consumers link; `@import`s only.
- `tokens/` — `colors.css` (Nocturne + Daybreak), `typography.css`, `spacing.css`,
  `effects.css` (shadows/glows/gradients/motion), `fonts.css` (Fraunces + Hanken
  via Google Fonts), `base.css`.
- `guidelines/` — 23 foundation specimen cards (Colors, Type, Spacing, Brand)
  that populate the Design System tab.

**Components** (`window.HintDesignSystem_0d1931`)
- `components/core/` — **Button**, **Eyebrow**, **Badge**, **GlassCard**
- `components/tarot/` — **TarotCard**, **ScoreMeter**, **LuckyTile**
- `components/app/` — **ChatBubble**, **ModuleTile**, **ThemeToggle**

Each has a `.jsx` implementation, a `.d.ts` props contract, a `.prompt.md` usage
note, and its directory carries a `@dsCard` demo HTML.

**UI Kit**
- `ui_kits/hint-app/` — interactive phone-framed recreation of the mobile app
  (Home / Ask / Tarot / Rooms / Me). See its `README.md`.

**Assets** (`assets/`)
- `brand/` — logos (cardmark, wordmark lockup, icons), favicon, opengraph.
- `tarot/` — three house card-backs (SVG) + a sample of card art (`cards/`).
- `lucky/` — a curated sample of pastel object illustrations (carry / flower /
  food / jewelry). The full ~120-piece set lives in the source repo.

**`SKILL.md`** — makes this folder usable as a Claude Agent Skill.

---

### Caveats
- **Fonts** are loaded from Google Fonts (Fraunces + Hanken Grotesk), matching the
  app. No binaries are vendored; drop `.woff2` into `tokens/fonts/` for offline use.
- **Assets are a sample.** Only a handful of tarot cards and lucky illustrations
  were copied (the full sets are large). Pull more from the source repo as needed.
- The UI kit is **cosmetic** — interactions are faked; there's no real score
  engine, astrology math, or backend.
