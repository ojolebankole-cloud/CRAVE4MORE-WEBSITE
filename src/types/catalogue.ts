export type PublicationStatus = "draft" | "published";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  enabled: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  dietaryTags: string[];
  /** Price stored in the smallest currency unit (for example, kobo). */
  priceMinor: number;
  currency: string;
  image?: string;
  poster?: string;
  model?: string;
  available: boolean;
  featuredOrder?: number;
  status: PublicationStatus;
}
