"use client";

import { useEffect, useState } from "react";
import { getAllUserListings } from "@/lib/listings-store";
import { formatPrice, formatMileage, timeAgo } from "@/lib/utils";
import { FUEL_TYPE_LABELS, BODY_TYPE_LABELS, TRANSMISSION_LABELS } from "@/lib/constants";
import { ImageGallery } from "./ImageGallery";
import { FinancingCalculator } from "./FinancingCalculator";
import { MapPin, Calendar, Gauge, Fuel, Cog, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { MockListing } from "@/lib/mock-data";

export function UserListingDetail({ id }: { id: string }) {
  const [listing, setListing] = useState<MockListing | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const all = getAllUserListings();
    const found = all.find((l) => l.id === id);
    if (found) {
      setListing(found);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Annonce ikke fundet</h1>
        <p className="text-gray-500 mb-6">Denne annonce findes ikke eller er blevet fjernet.</p>
        <Link href="/brugt/bil" className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
          Søg efter biler
        </Link>
      </div>
    );
  }

  if (!listing) return null;

  const specs = [
    { label: "Mærke", value: listing.make },
    { label: "Model", value: `${listing.model}${listing.variant ? ` ${listing.variant}` : ""}` },
    { label: "Årgang", value: String(listing.year) },
    { label: "Km-stand", value: formatMileage(listing.mileage) },
    { label: "Drivmiddel", value: FUEL_TYPE_LABELS[listing.fuelType] || listing.fuelType },
    { label: "Gearkasse", value: TRANSMISSION_LABELS[listing.transmission] || listing.transmission },
    { label: "Karosseri", value: BODY_TYPE_LABELS[listing.bodyType] || listing.bodyType },
    { label: "HK", value: `${listing.horsepower} HK` },
    { label: "Døre", value: String(listing.doors) },
    { label: "Farve", value: listing.color },
    { label: "Ejere", value: String(listing.owners) },
  ];

  const equipmentByCategory: Record<string, string[]> = {};
  for (const eq of listing.equipment) {
    const cat = eq.category || "Andet";
    if (!equipmentByCategory[cat]) equipmentByCategory[cat] = [];
    equipmentByCategory[cat].push(eq.name);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/brugt/bil" className="hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Tilbage til søgning
        </Link>
        <span>/</span>
        <Link href={`/brugt/bil?make=${encodeURIComponent(listing.make)}`} className="hover:text-primary">
          {listing.make}
        </Link>
        <span>/</span>
        <span className="text-gray-700">{listing.model}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <ImageGallery images={listing.images} title={listing.title} />

          <div className="mt-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{listing.title}</h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {listing.region}
                  </span>
                  <span>Oprettet {timeAgo(new Date(listing.createdAt))}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{formatPrice(listing.price)}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Årgang", value: String(listing.year), icon: Calendar },
              { label: "Km-stand", value: formatMileage(listing.mileage), icon: Gauge },
              { label: "Drivmiddel", value: FUEL_TYPE_LABELS[listing.fuelType], icon: Fuel },
              { label: "Gearkasse", value: TRANSMISSION_LABELS[listing.transmission], icon: Cog },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-3 text-center">
                <s.icon className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="font-semibold text-gray-900 text-sm">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Specifikationer</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {specs.map((spec, i) => (
                  <div key={spec.label} className={`flex justify-between px-4 py-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}>
                    <span className="text-sm text-gray-600">{spec.label}</span>
                    <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {listing.equipment.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Udstyr</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {Object.entries(equipmentByCategory).map(([category, items]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-accent shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {listing.description && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Beskrivelse</h2>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
              </div>
            </div>
          )}

          <div className="mt-8">
            <FinancingCalculator price={listing.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
