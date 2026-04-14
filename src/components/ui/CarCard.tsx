"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, MapPin, Fuel, Gauge, Calendar } from "lucide-react";
import { formatPrice, formatMileage, slugify, cn, getImagePlaceholder } from "@/lib/utils";
import { FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from "@/lib/constants";
import { isFavorite, toggleFavorite } from "@/lib/favorites-store";

interface CarCardProps {
  id: string;
  make: string;
  model: string;
  variant?: string | null;
  year: number;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  region: string;
  imageUrl?: string | null;
  packageTier?: string;
  dealershipName?: string | null;
  compact?: boolean;
}

export function CarCard({
  id,
  make,
  model,
  variant,
  year,
  mileage,
  price,
  fuelType,
  transmission,
  region,
  imageUrl,
  packageTier,
  dealershipName,
  compact,
}: CarCardProps) {
  const href = `/brugt/bil/${slugify(make)}/${slugify(model)}/${id}`;
  const isPremium = packageTier === "PREMIUM";
  const isPlus = packageTier === "PLUS";
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(id));
  }, [id]);

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(id);
    setFav(newState);
  }

  return (
    <Link
      href={href}
      className={cn(
        "group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200",
        isPremium && "border-primary ring-1 ring-primary/20",
        isPlus && "border-warning/50"
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden bg-gray-100", compact ? "h-40" : "h-48 sm:h-52")}>
        <img
          src={imageUrl || getImagePlaceholder(make)}
          alt={`${make} ${model} ${variant || ""} ${year}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {isPremium && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded">
            Fremhævet
          </span>
        )}
        {isPlus && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-warning text-white text-xs font-semibold rounded">
            Plus
          </span>
        )}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full transition-colors",
            fav ? "bg-red-50 text-red-500" : "bg-white/90 hover:bg-white text-gray-500 hover:text-red-500"
          )}
        >
          <Heart className={cn("w-4 h-4", fav && "fill-current")} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1">
            {make} {model} {variant || ""}
          </h3>
        </div>

        <p className="text-lg font-bold text-primary mb-2">{formatPrice(price)}</p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            {formatMileage(mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" />
            {FUEL_TYPE_LABELS[fuelType] || fuelType}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {region}
          </span>
          {dealershipName ? (
            <span className="px-1.5 py-0.5 bg-primary-light text-primary rounded text-xs font-medium">
              Forhandler
            </span>
          ) : (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
              Privat
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
