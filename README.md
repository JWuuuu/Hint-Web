# Hint Web

This folder is now organized as one combined Hint web project.

## Main Project

- `app/` - the real Hint website/app workspace.
- `app/artifacts/hint/src/modules/landing/` - public landing page.
- `app/artifacts/hint/src/modules/home/` - original app home/dashboard, available at `/app`.
- `app/artifacts/hint/src/modules/features/` - feature routes such as daily pull, astrology, dream, and journal.
- `app/artifacts/hint/src/modules/tarot/` and `app/artifacts/hint/src/modules/hold/` - Tarot Room and ritual flow.
- `app/artifacts/hint/public/assets/` - landing tarot, lucky, and brand assets.

## Archived Prototype Files

- `prototype-archive/` - old standalone HTML/CSS prototype, screenshots, generated zips, and earlier standalone Vite prototype files. Keep this for reference, but edit the live website in `app/`.

## Run

From this folder:

```sh
pnpm dev
```

Or from `app/`:

```sh
pnpm dev:web
```

The public landing page opens at `/`.
The original app website opens at `/app`.
