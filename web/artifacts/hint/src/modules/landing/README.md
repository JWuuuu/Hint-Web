# Landing Module

This module owns the public marketing/preview landing page at `/`.

## Edit Map

- `LandingPage.tsx` - page structure, copy, routes, and section order.
- `styles/landing.css` - layout and visual styling for the landing page.
- `styles/tokens/` - landing-specific design tokens copied from the prototype.
- `components/experience-kit/` - self-contained interactive prototype widgets used by the landing page, including Daily Pull, score, collection, and Tarot Room preview components.
- `public/assets/` - shared tarot, lucky, and brand images referenced by the landing page.

The playable website preview remains available at `/preview`. Deep CTAs should point to the separate full Hint app through `VITE_HINT_APP_URL`.
