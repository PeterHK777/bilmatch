"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, BellOff, Trash2 } from "lucide-react";
import { getSavedSearches, deleteSavedSearch, toggleSearchNotify, type SavedSearch } from "@/lib/saved-searches-store";

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);

  useEffect(() => {
    setSearches(getSavedSearches());
  }, []);

  function handleDelete(id: string) {
    deleteSavedSearch(id);
    setSearches((prev) => prev.filter((s) => s.id !== id));
  }

  function handleToggleNotify(id: string) {
    toggleSearchNotify(id);
    setSearches((prev) => prev.map((s) => s.id === id ? { ...s, notify: !s.notify } : s));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Gemte søgninger</h1>
      <p className="text-gray-500 mb-6">Gem dine søgninger for hurtig adgang senere</p>

      {searches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Du har ingen gemte søgninger.</p>
          <p className="text-sm text-gray-400 mt-1">Brug &quot;Gem søgning&quot;-knappen på søgesiden.</p>
          <Link href="/brugt/bil" className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            Søg efter biler
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {searches.map((search) => (
            <div key={search.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">{search.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Gemt {new Date(search.createdAt).toLocaleDateString("da-DK")}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/brugt/bil?${search.filters}`}
                  className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Se resultater
                </Link>
                <button
                  onClick={() => handleToggleNotify(search.id)}
                  className={`p-2 rounded-lg border ${search.notify ? "border-primary text-primary" : "border-gray-300 text-gray-400"} hover:bg-gray-50`}
                >
                  {search.notify ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(search.id)}
                  className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
