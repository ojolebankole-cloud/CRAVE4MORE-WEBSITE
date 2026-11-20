export interface SceneStudy {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  modelPath: string;
  posterPath: string;
  assetState: "awaiting-licensed-derivative" | "ready";
  background: string;
  visualNote: string;
}

/**
 * Art-direction studies only. These are not published menu products and carry
 * no dish name, price, ingredient, allergen or availability claim.
 * `modelPath` and `posterPath` always point to future optimized derivatives, never
 * the source GLB/PNG. Keep `assetState` on awaiting-licensed-derivative until the licence,
 * Blender, optimization, poster and production-loader gates have all passed.
 */
export const sceneStudies: readonly SceneStudy[] = [
  {
    id: "form",
    index: "01",
    label: "FORM / 3D STUDY",
    title: "A little more\nto love.",
    description: "A first look at the Crave4more visual world: warm light, tactile detail and one clear focal point.",
    modelPath: "/assets/models/optimized/pizza.glb",
    posterPath: "/assets/images/optimized/pizza-poster.webp",
    assetState: "awaiting-licensed-derivative",
    background: "#241A16",
    visualNote: "FORM · LIGHT · COMPOSITION",
  },
  {
    id: "indulgence",
    index: "02",
    label: "TEXTURE / 3D STUDY",
    title: "Made to\nlinger.",
    description: "A second study in contrast, material and the small details that make a scene feel considered.",
    modelPath: "/assets/models/optimized/chocolate_marshmallow_cupcake.glb",
    posterPath: "/assets/images/optimized/chocolate-marshmallow-cupcake-poster.webp",
    assetState: "awaiting-licensed-derivative",
    background: "#30211C",
    visualNote: "TEXTURE · CONTRAST · COMPOSITION",
  },
  {
    id: "finish",
    index: "03",
    label: "DETAIL / 3D STUDY",
    title: "Every detail\nhas a place.",
    description: "A final composition focused on shape, balance and a quieter kind of visual indulgence.",
    modelPath: "/assets/models/optimized/cake.glb",
    posterPath: "/assets/images/optimized/cake-poster.webp",
    assetState: "awaiting-licensed-derivative",
    background: "#2B241F",
    visualNote: "SHAPE · BALANCE · COMPOSITION",
  },
];
