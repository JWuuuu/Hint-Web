# Hint Web

This folder is now organized as one combined Hint website project.

## Main Project

- `web/` - the Hint website workspace.
- `web/artifacts/hint/src/modules/landing/` - public landing page.
- `web/artifacts/hint/src/modules/home/` - playable web preview/dashboard, available at `/preview`.
- `web/artifacts/hint/src/modules/web-lite/` - lite preview and app-gated web pages.
- `web/artifacts/hint/public/assets/` - landing tarot, lucky, and brand assets.

## Archived Prototype Files

- `prototype-archive/` - old standalone HTML/CSS prototype, screenshots, generated zips, and earlier standalone Vite prototype files. Keep this for reference, but edit the live website in `web/`.

## Run

From this folder:

```sh
pnpm dev
```

Or from `web/`:

```sh
pnpm dev:web
```

The public landing page opens at `/`.
The playable web preview opens at `/preview`.
