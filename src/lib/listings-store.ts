"use client";

import type { MockListing } from "./mock-data";

const LISTINGS_KEY = "bilmatch_user_listings";

export interface CreateListingData {
  make: string;
  model: string;
  variant: string;
  year: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  doors: string;
  horsepower: string;
  engineSize: string;
  owners: string;
  equipment: string[];
  title: string;
  description: string;
  price: string;
  region: string;
  zipCode: string;
  packageTier: string;
  uploadedImages?: string[];
}

// Car images mapped by body type
const carImageMap: Record<string, string> = {
  SEDAN: "/cars/sedan-blue.svg",
  SUV: "/cars/suv-dark.svg",
  HATCHBACK: "/cars/hatchback-red.svg",
  COUPE: "/cars/coupe-black.svg",
  CABRIOLET: "/cars/coupe-red.svg",
  STATIONCAR: "/cars/wagon-gray.svg",
  MPV: "/cars/suv-silver.svg",
  MIKRO: "/cars/hatchback-blue.svg",
  CUV: "/cars/suv-green.svg",
};

export function getUserListings(userId: string): MockListing[] {
  if (typeof window === "undefined") return [];
  try {
    const all: MockListing[] = JSON.parse(localStorage.getItem(LISTINGS_KEY) || "[]");
    return all.filter((l) => l.userId === userId);
  } catch {
    return [];
  }
}

export function getAllUserListings(): MockListing[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LISTINGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function createListing(userId: string, data: CreateListingData): MockListing {
  const id = "listing-u-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const bodyType = data.bodyType || "SEDAN";
  const fallbackImage = carImageMap[bodyType] || "/cars/sedan-blue.svg";

  // Use uploaded images if available, otherwise fall back to SVG placeholders
  const images = data.uploadedImages && data.uploadedImages.length > 0
    ? data.uploadedImages.map((url, i) => ({ url, sortOrder: i }))
    : [
        { url: fallbackImage, sortOrder: 0 },
        { url: "/cars/sedan-dark.svg", sortOrder: 1 },
        { url: "/cars/sedan-light.svg", sortOrder: 2 },
      ];

  const listing: MockListing = {
    id,
    userId,
    make: data.make,
    model: data.model,
    variant: data.variant || null,
    year: parseInt(data.year) || new Date().getFullYear(),
    mileage: parseInt(data.mileage) || 0,
    price: parseInt(data.price) || 0,
    fuelType: data.fuelType || "BENZIN",
    transmission: data.transmission || "MANUAL",
    bodyType,
    category: "PERSONBIL",
    color: data.color || "Sort",
    doors: parseInt(data.doors) || 4,
    horsepower: parseInt(data.horsepower) || 0,
    engineSize: parseFloat(data.engineSize) || 0,
    owners: parseInt(data.owners) || 1,
    towbar: false,
    region: data.region || "København",
    zipCode: data.zipCode || "",
    title: data.title || `${data.make} ${data.model} - ${data.year}`,
    description: data.description || "",
    status: "ACTIVE",
    packageTier: data.packageTier || "BASIS",
    createdAt: new Date().toISOString(),
    images,
    equipment: data.equipment.map((name) => ({ name, category: "Andet" })),
    dealershipName: null,
    dealershipId: null,
    priceType: "RETAIL",
  };

  const all = getAllUserListings();
  all.push(listing);
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(all));

  return listing;
}

export function deleteListing(id: string) {
  const all = getAllUserListings();
  const filtered = all.filter((l) => l.id !== id);
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(filtered));
}

export function markListingAsSold(id: string) {
  const all = getAllUserListings();
  const listing = all.find((l) => l.id === id);
  if (listing) {
    listing.status = "SOLD";
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(all));
  }
}
