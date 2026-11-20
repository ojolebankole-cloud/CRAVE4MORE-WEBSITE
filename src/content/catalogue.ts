import type { Category, Product } from "../types/catalogue";

/**
 * Intentionally empty until the owner confirms the real menu, exact dish names,
 * ingredients, allergens, prices, currency and commercial asset permissions.
 * Draft visual assets are not treated as proof of a product being sold.
 */
export const categories: readonly Category[] = [];
export const products: readonly Product[] = [];

export const publishedProducts = products.filter(
  (product) => product.status === "published" && product.available,
);
