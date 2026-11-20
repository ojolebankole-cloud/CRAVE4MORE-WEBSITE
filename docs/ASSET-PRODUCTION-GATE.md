# Crave4more asset production gate

The repository already contains original GLBs, PNGs and textures in `public/assets/`. These are source files, not production exports. This Vite application sets `publicDir` to `public-site`, so the existing `public/assets/` source collection is not automatically copied into the production build or exposed as the public asset directory. The original files are preserved unchanged.

Only optimized, commercially licensed and approved derivatives may be placed in `public-site/assets/models/optimized/` or `public-site/assets/images/optimized/` and referenced by `src/content/sceneStudies.ts`. Each active 3D slide must have both its GLB derivative and a matching static poster. Before switching any `SceneStudy` to `assetState: "ready"`, complete the licence record, Blender validation, material/texture inspection, geometry and texture optimization, static poster export, and browser-loader QA.

The current stage uses a small procedural ceramic-plate study while no production derivative is approved. It is deliberately not a fake food product and does not imply a menu item.
