"use client";

const SEARCHES_KEY = "bilmatch_saved_searches";

export interface SavedSearch {
  id: string;
  name: string;
  filters: string;
  notify: boolean;
  createdAt: string;
}

export function getSavedSearches(): SavedSearch[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SEARCHES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSearch(name: string, filters: string): SavedSearch {
  const searches = getSavedSearches();
  const search: SavedSearch = {
    id: "search-" + Date.now().toString(36),
    name,
    filters,
    notify: true,
    createdAt: new Date().toISOString(),
  };
  searches.push(search);
  localStorage.setItem(SEARCHES_KEY, JSON.stringify(searches));
  return search;
}

export function deleteSavedSearch(id: string) {
  const searches = getSavedSearches().filter((s) => s.id !== id);
  localStorage.setItem(SEARCHES_KEY, JSON.stringify(searches));
}

export function toggleSearchNotify(id: string) {
  const searches = getSavedSearches();
  const search = searches.find((s) => s.id === id);
  if (search) {
    search.notify = !search.notify;
    localStorage.setItem(SEARCHES_KEY, JSON.stringify(searches));
  }
}
