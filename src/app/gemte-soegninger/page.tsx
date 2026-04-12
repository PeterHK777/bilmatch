import Link from "next/link";
import { Search, Bell, BellOff, Trash2 } from "lucide-react";

const demoSearches = [
  { id: "1", name: "Audi A4 under 200.000", filters: "make=Audi&model=A4&priceTo=200000", notify: true, count: 12 },
  { id: "2", name: "Elbiler i København", filters: "fuelType=EL&region=København", notify: true, count: 34 },
  { id: "3", name: "BMW SUV 2020+", filters: "make=BMW&bodyType=SUV&yearFrom=2020", notify: false, count: 8 },
];

export default function SavedSearchesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Gemte søgninger</h1>
      <p className="text-gray-500 mb-6">Få besked når der kommer nye biler, der matcher dine søgninger</p>

      {demoSearches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Du har ingen gemte søgninger.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {demoSearches.map((search) => (
            <div key={search.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">{search.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{search.count} matchende biler</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/brugt/bil?${search.filters}`}
                  className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Se resultater
                </Link>
                <button className={`p-2 rounded-lg border ${search.notify ? "border-primary text-primary" : "border-gray-300 text-gray-400"} hover:bg-gray-50`}>
                  {search.notify ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                </button>
                <button className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:text-red-500 hover:bg-gray-50">
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
