# Crave4more build status — foundation pass

## Implemented in this pass

- React + TypeScript + Vite application shell.
- Responsive warm-editorial design tokens and typography pairing.
- Sticky desktop navigation, accessible mobile navigation and footer. Page routes and the 3D stage are lazy-loaded to keep the initial shell lighter.
- Home page with a three-slide GSAP-directed visual-study framework, one persistent React Three Fiber canvas with coordinated copy/background/model configuration, keyboard-operable controls and a neutral procedural 3D plate while approved model derivatives are pending.
- GSAP/ScrollTrigger reveal system with a reduced-motion bypass and cleanup.
- Manual slide navigation with keyboard-operable previous/next and pagination controls, plus mobile horizontal swipe navigation; no autoplay.
- Route shells for menu, product, checkout, order status, about, contact and policy pages, with route-aware title and description metadata.
- Typed catalogue schema and an intentionally empty published catalogue.
- Cart state with guarded localStorage persistence.
- Clear pre-launch messaging where owner-supplied business or legal facts are still missing.

## Current content boundaries

- Original GLBs are not loaded by the production app. The slider currently uses a procedural ceramic-plate study; no model is presented as a sellable menu item.
- No dish names, ingredients, allergens, dietary claims, prices, currency, opening hours, address, phone, email, testimonials or delivery promises have been invented.
- Menu publication and live ordering remain disabled until the owner supplies and confirms the required data.
- The checkout UI does not connect to a payment provider and cannot claim payment success.
- Social links are omitted because no verified social URLs are configured.

## Asset gate still open

The repository currently stores original source files under `public/assets/`. Those files remain untouched and are excluded from Vite public copying by `publicDir: "public-site"`. Only optimized derivatives may be copied into `public-site/assets/models/optimized/`. Before production release:

1. Record commercial-use and modification rights for every selected GLB, image, texture and font.
2. Keep excluded and unapproved originals in the non-served source archive; never copy them into `public-site/`.
3. Inspect source models in Blender, normalize pivots and scale, validate materials, and create documented derived exports.
4. Optimize model geometry and textures; test the result using the production R3F loader on Android and desktop.
5. Create static posters and ensure the experience remains complete without WebGL.

## Not implemented yet

- Final owner-approved menu and product detail content.
- Model-backed multi-product GSAP choreography using licensed, optimized food derivatives and static posters. The visual-study slider already has manual controls and mobile swipe; model-backed product sequencing remains gated by asset approval.
- Optimized and licensed GLB derivatives/posters.
- Backend, admin/content management, stock/availability and server-side price quote.
- Pickup/delivery zones, fees and timings.
- Paystack/Flutterwave (or other provider) adapter, signed webhook verification and idempotency.
- Verified order database and tracking.
- Final privacy, terms, refunds, contact and legal copy.
- Playwright, axe-core, Lighthouse and real-device QA evidence.

This foundation is a development preview, not a production-ready ordering site. Dependency installation and a real Vite production build have not been completed in this environment, so runtime and browser QA remain outstanding.
