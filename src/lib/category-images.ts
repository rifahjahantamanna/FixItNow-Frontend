import { Droplet, Zap, Sparkles, Paintbrush, Flower2, Wrench } from "lucide-react";

export const categoryVisuals: Record<string, { icon: typeof Wrench; gradient: string }> = {
  Plumbing: { icon: Droplet, gradient: "from-blue-600 to-blue-800" },
  Electrical: { icon: Zap, gradient: "from-amber-500 to-orange-700" },
  Cleaning: { icon: Sparkles, gradient: "from-cyan-500 to-teal-700" },
  Painting: { icon: Paintbrush, gradient: "from-rose-500 to-red-700" },
  Gardening: { icon: Flower2, gradient: "from-green-500 to-emerald-700" },
};

export function getCategoryVisual(categoryName?: string) {
  return (
    (categoryName && categoryVisuals[categoryName]) || {
      icon: Wrench,
      gradient: "from-slate-600 to-slate-800",
    }
  );
}