export function formatPrice(price: number): string {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("da-DK").format(num);
}

export function formatMileage(km: number): string {
  return `${formatNumber(km)} km`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Lige nu";
  if (diffMins < 60) return `${diffMins} min. siden`;
  if (diffHours < 24) return `${diffHours} timer siden`;
  if (diffDays < 7) return `${diffDays} dage siden`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} uger siden`;
  return new Date(date).toLocaleDateString("da-DK");
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getImagePlaceholder(make: string): string {
  return `https://placehold.co/800x600/e5e7eb/6b7280?text=${encodeURIComponent(make)}`;
}
