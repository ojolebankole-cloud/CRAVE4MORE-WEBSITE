# CRAVE4MORE — Koledev

Premium editorial restaurant website foundation with a coordinated 3D visual-study slider and a responsive, accessible page shell.

## Stack

- React 19 + TypeScript + Vite 8
- Three.js + React Three Fiber + Drei
- GSAP for coordinated slider transitions and ScrollTrigger for editorial reveals
- Motion for React for isolated interface transitions
- React Router with route-level lazy loading

Dependencies are pinned to exact package versions in `package.json`. Generate and commit the lockfile after the first successful install on the project machine.

## Run locally

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Create a production build:

```bash
npm run typecheck
npm run build
npm run preview -- --host 0.0.0.0
```

On Android/Termux, open the local Vite address shown by the terminal in Chrome. Keep the original `public/assets/` source folders unchanged. Vite serves only `public-site/`; production GLB derivatives belong in `public-site/assets/models/optimized/` after the licence and optimization gate is passed.

## Routes

- `/` — cinematic home and coordinated visual-study slider (neutral 3D plate until approved model derivatives are ready)
- `/menu` — searchable catalogue shell (intentionally empty until the real menu is confirmed)
- `/menu/:slug` — reserved product-detail route
- `/checkout` — cart/checkout preview; payments are disabled
- `/order/:reference` — verified order-status route placeholder
- `/about`, `/contact`
- `/privacy`, `/terms`, `/refunds` — explicitly marked draft policy pages

## Content and release gates

`src/content/catalogue.ts` is intentionally empty. Do not populate it with guessed dishes, descriptions, ingredients, allergens, prices or currency. Business address, hours, contact details, fulfilment settings, payment provider and social URLs are also unset in `src/content/site.ts`.

The homepage slider keeps one React Three Fiber canvas mounted while switching scene configuration. It supports manual previous/next and pagination controls, touch swipe on the visual stage, and reduced-motion behavior. Static host routing fallback is provided by `public-site/_redirects`. The opening visual sequence does not load original food models. A procedural ceramic-plate study is shown until a commercially licensed, Blender-validated and optimized GLB derivative plus static poster are approved. Scene definitions keep their intended optimized model paths disabled until that gate is passed. See `docs/BUILD-STATUS.md`, `docs/ASSET-PRODUCTION-GATE.md`, `docs/TERMUX-SETUP.md` and the v4.0 master plan.

The initial build is marked `noindex,nofollow` until owner-supplied menu, legal and business content is ready for launch. No checkout request, payment intent, customer-data submission or live order is sent by this foundation. A real transactional backend must validate prices server-side and verify the payment provider's webhook before an order can be shown as paid.
