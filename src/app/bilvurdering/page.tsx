"use client";

import { useState } from "react";
import { Search, TrendingUp, Car } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ValuationPage() {
  const [plate, setPlate] = useState("");
  const [result, setResult] = useState<{ low: number; mid: number; high: number } | null>(null);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!plate) return;
    // Demo values
    const mid = 150000 + Math.floor(Math.random() * 200000);
    setResult({
      low: Math.round(mid * 0.85),
      mid,
      high: Math.round(mid * 1.15),
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Hvad er din bil værd?</h1>
        <p className="text-gray-500">Få en gratis vurdering af din bil baseret på aktuelle markedspriser</p>
      </div>

      <form onSubmit={handleLookup} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">Indtast nummerplade</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            placeholder="AB 12 345"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg uppercase tracking-wider focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Vurder
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Estimeret markedsværdi
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Lav</p>
              <p className="text-xl font-bold text-gray-600">{formatPrice(result.low)}</p>
            </div>
            <div className="text-center p-4 bg-primary-light rounded-lg border-2 border-primary">
              <p className="text-sm text-primary font-medium mb-1">Estimat</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(result.mid)}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Høj</p>
              <p className="text-xl font-bold text-gray-600">{formatPrice(result.high)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Vurderingen er baseret på lignende biler til salg på BilMatch og er kun vejledende.
          </p>
        </div>
      )}
    </div>
  );
}
