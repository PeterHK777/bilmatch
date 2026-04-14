"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CarCard } from "@/components/ui/CarCard";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { MockListing } from "@/lib/mock-data";
import { getAllUserListings } from "@/lib/listings-store";
import { formatPrice, formatMileage } from "@/lib/utils";
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS, LISTINGS_PER_PAGE } from "@/lib/constants";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface Props {
  listings: MockListing[];
  total: number;
  currentPage: number;
  currentSort: string;
}

function filterUserListings(all: MockListing[], params: URLSearchParams): MockListing[] {
  let filtered = all.filter((l) => l.status === "ACTIVE");
  const get = (key: string) => params.get(key) || undefined;
  if (get("make")) filtered = filtered.filter((l) => l.make === get("make"));
  if (get("model")) filtered = filtered.filter((l) => l.model === get("model"));
  if (get("fuelType")) filtered = filtered.filter((l) => l.fuelType === get("fuelType"));
  if (get("bodyType")) filtered = filtered.filter((l) => l.bodyType === get("bodyType"));
  if (get("transmission")) filtered = filtered.filter((l) => l.transmission === get("transmission"));
  if (get("color")) filtered = filtered.filter((l) => l.color === get("color"));
  if (get("region")) filtered = filtered.filter((l) => l.region === get("region"));
  if (get("yearFrom")) filtered = filtered.filter((l) => l.year >= parseInt(get("yearFrom")!));
  if (get("yearTo")) filtered = filtered.filter((l) => l.year <= parseInt(get("yearTo")!));
  if (get("priceFrom")) filtered = filtered.filter((l) => l.price >= parseInt(get("priceFrom")!));
  if (get("priceTo")) filtered = filtered.filter((l) => l.price <= parseInt(get("priceTo")!));
  return filtered;
}

export function SearchResults({ listings: serverListings, total: serverTotal, currentPage, currentSort }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [userListings, setUserListings] = useState<MockListing[]>([]);

  useEffect(() => {
    const all = getAllUserListings();
    if (all.length > 0) {
      setUserListings(filterUserListings(all, searchParams));
    }
  }, [searchParams]);

  // Merge user listings at the top of results on page 1
  const mergedListings = currentPage === 1
    ? [...userListings, ...serverListings]
    : serverListings;
  const total = serverTotal + userListings.length;
  const totalPages = Math.ceil(total / LISTINGS_PER_PAGE);

  function handleSort(sort: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.delete("page");
    router.push(`/brugt/bil?${params.toString()}`);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/brugt/bil?${params.toString()}`);
  }

  return (
    <div>
      {/* Sort & View Toggle */}
      <div className="flex items-center justify-between mb-4 bg-white rounded-lg border border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sortér:</label>
          <select
            value={currentSort}
            onChange={(e) => handleSort(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="newest">Nyeste først</option>
            <option value="price_asc">Pris (laveste først)</option>
            <option value="price_desc">Pris (højeste først)</option>
            <option value="mileage_asc">Km (laveste først)</option>
            <option value="year_desc">Årgang (nyeste først)</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-400 hover:text-gray-600"}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded ${viewMode === "list" ? "bg-primary text-white" : "text-gray-400 hover:text-gray-600"}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      {mergedListings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Ingen biler fundet med de valgte filtre.</p>
          <p className="text-gray-400 text-sm mt-2">Prøv at justere dine filtre for at se flere resultater.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {mergedListings.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              make={car.make}
              model={car.model}
              variant={car.variant}
              year={car.year}
              mileage={car.mileage}
              price={car.price}
              fuelType={car.fuelType}
              transmission={car.transmission}
              region={car.region}
              imageUrl={car.images[0]?.url}
              packageTier={car.packageTier}
              dealershipName={car.dealershipName}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {mergedListings.map((car) => (
            <Link
              key={car.id}
              href={`/brugt/bil/${slugify(car.make)}/${slugify(car.model)}/${car.id}`}
              className="flex bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="w-48 h-32 shrink-0 bg-gray-100">
                <img
                  src={car.images[0]?.url}
                  alt={car.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{car.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                    <span>{car.year}</span>
                    <span>{formatMileage(car.mileage)}</span>
                    <span>{FUEL_TYPE_LABELS[car.fuelType]}</span>
                    <span>{TRANSMISSION_LABELS[car.transmission]}</span>
                    <span>{car.region}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-primary">{formatPrice(car.price)}</p>
                  {car.dealershipName ? (
                    <span className="text-xs px-2 py-0.5 bg-primary-light text-primary rounded font-medium">
                      {car.dealershipName}
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">Privat</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let page: number;
            if (totalPages <= 7) {
              page = i + 1;
            } else if (currentPage <= 4) {
              page = i + 1;
            } else if (currentPage >= totalPages - 3) {
              page = totalPages - 6 + i;
            } else {
              page = currentPage - 3 + i;
            }
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
