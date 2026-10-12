# Compose Bottombar website

Docs site for [Compose Bottombar](https://github.com/nameisjayant/compose-bottombar), built with Next.js (App Router) and exported as static HTML.

- **Home**: what the library is, install line, and a phone mockup cycling through every bar.
- **Docs**: *Getting started* (install, theming, colors, Navigation 3) plus one page per bar with its light/dark GIFs, usage code, sizing notes, color table and API signature.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Sync with the library

Bar content isn't written by hand. `scripts/generate_data.py` reads the library repo (`BottomBarType.kt` for the list and order, `README.md` for usage/colors, the sources for signatures) and writes `src/data/bottombar.json`, `public/gifs/` and `public/logo.svg`. After adding a bar to the library (and its README section + GIFs), run:

```bash
npm run sync -- ~/AndroidStudioProjects/ComposeBottombar
```

## Build and deploy

```bash
npm run build      # static site in out/
npm start          # preview out/ locally
```

For a GitHub Pages project site (`<user>.github.io/compose-bottombar`), build with the base path:

```bash
BASE_PATH=/compose-bottombar npm run build
```
