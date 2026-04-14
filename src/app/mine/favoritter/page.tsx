"use client";

import { useState, useEffect } from "react";
import { mockListings } from "@/lib/mock-data";
import { getAllUserListings } from "@/lib/listings-store";
import { getFavorites, toggleFavorite } from "@/lib/favorites-store";
import { CarCard } from "@/components/ui/CarCard";
import { Heart } from "lucide-react";
import Link from "next/link";
import type { MockListing } from "@/lib/mock-data";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<MockListing[]>([]);

  useEffect(() => {
    const favIds = getFavorites();
    const userListings = getAllUserListings();
    const allListings = [...userListings, ...mockListings];
    const favListings = favIds
      .map((id) => allListings.find((l) => l.id === id))
      .filter((l): l is MockListing => !!l);
    setFavorites(favListings);
  }, []);

  function handleRemove(id: string) {
    toggleFavorite(id);
    setFavorites((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Favoritter</h1>
        <p className="text-sm text-gray-500 mt-1">{favorites.length} gemte biler</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Heart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Du har ikke gemt nogen biler endnu.</p>
          <p className="text-sm text-gray-400 mt-1">Tryk på hjertet på en annonce for at gemme den.</p>
          <Link href="/brugt/bil" className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            Søg efter biler
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {favorites.map((car) => (
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
      )}
    </div>
  );
}
