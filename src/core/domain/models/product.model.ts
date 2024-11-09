export const PRODUCT_CATEGORIES = ['food', 'hygiene', 'cleaning', 'clothing_men', 'clothing_women', 'clothing_children', 'clothing_baby'] as const
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export const CLOTHING_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'] as const
export type ClothingSize = typeof CLOTHING_SIZES[number];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  size?: ClothingSize;
  active: boolean;
}