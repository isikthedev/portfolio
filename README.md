# Muhammad Zaohar Daud — Portfolio

A Next.js + Tailwind portfolio with:
- **Glass Agency Hero** (shaders.com WebGPU): Swirl → ChromaFlow → FlutedGlass → FilmGrain, recolored to the site's green palette instead of the reference's indigo. Cursor-reactive bloom is built into the library — no event wiring needed.
- Glass morphism cards throughout
- RGB animated-edge buttons with a 360° rotating arrow on hover
- Scroll-triggered Framer Motion reveals + entrance `.reveal` animations
- Typewriter role text
- Working mobile menu (slide-in overlay, triggered by the header toggle)
- Light/dark theme (auto-detects OS preference, manual toggle)
- Testimonials section + working contact form (client-side only — wire `handleSubmit` in `components/Contact.tsx` to a real backend/email service)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

**WebGPU note:** the hero shader needs a WebGPU-capable browser (recent Chrome/Edge, or Safari Technology Preview). If the browser doesn't support it, `ShaderHero.tsx`'s fallback gradient keeps the section fully legible — text and buttons remain unaffected either way.

## Build for production

```bash
npm run build
npm run start
```

## Notes

- Fonts (Space Grotesk, Inter, JetBrains Mono) load via Google Fonts `<link>` tags in `app/layout.tsx`. If you self-host or want next/font instead, swap that out — this project builds in offline sandboxes without it thanks to a system-font fallback in `globals.css`.
- Replace placeholder content: hero copy in `components/ShaderHero.tsx`, experience/stack/process in `components/BentoGrid.tsx`, projects in `components/Work.tsx`, testimonials in `components/Testimonials.tsx`, contact/socials in `components/Contact.tsx`.
- Shader colors/props live at the top of `components/ShaderHero.tsx` inside the `<Shader>` tree (`Swirl`, `ChromaFlow`, `FlutedGlass`, `FilmGrain`) — tweak `baseColor`/`downColor`/`leftColor`/`rightColor`/`upColor` on `ChromaFlow` to retune the bloom color.
- Theme tokens (colors) live at the top of `app/globals.css` under `:root` and `[data-theme="light"]`.
- Location text (Bhitarbanda, Nageshwari, Kurigram) appears in two places: `components/ShaderHero.tsx` (desktop "Based in" strip) and the map card in `components/BentoGrid.tsx`.
