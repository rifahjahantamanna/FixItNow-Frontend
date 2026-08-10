// Maps category names to a representative image.
// Using Unsplash's source API with fixed seeds so each category always gets the same image.
const categoryImageMap: Record<string, string> = {
  Plumbing: "https://images.unsplash.com/photo-1607472829122-7efe1e2e3a52?w=600&h=400&fit=crop",
  Electrical: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
  Cleaning: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
  Painting: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop",
  Gardening: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop";

export function getCategoryImage(categoryName?: string): string {
  if (!categoryName) return fallbackImage;
  return categoryImageMap[categoryName] ?? fallbackImage;
}