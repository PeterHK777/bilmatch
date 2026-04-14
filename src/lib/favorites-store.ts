"use client";

const FAVORITES_KEY = "bilmatch_favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleFavorite(listingId: string): boolean {
  const favs = getFavorites();
  const index = favs.indexOf(listingId);
  if (index >= 0) {
    favs.splice(index, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return false; // removed
  } else {
    favs.push(listingId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return true; // added
  }
}

export function isFavorite(listingId: string): boolean {
  return getFavorites().includes(listingId);
}
