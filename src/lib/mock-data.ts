import { CAR_MAKES, REGIONS, EQUIPMENT_LIST, COLORS } from "./constants";

// Deterministic seeded random
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function pick<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickN<T>(arr: readonly T[] | T[], n: number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

function randomInt(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

// Car images mapped by body type and color
const carImages: Record<string, string[]> = {
  SEDAN: ["/cars/sedan-dark.svg", "/cars/sedan-light.svg", "/cars/sedan-blue.svg", "/cars/sedan-red.svg"],
  SUV: ["/cars/suv-dark.svg", "/cars/suv-silver.svg", "/cars/suv-white.svg", "/cars/suv-green.svg"],
  HATCHBACK: ["/cars/hatchback-red.svg", "/cars/hatchback-blue.svg", "/cars/hatchback-white.svg"],
  MIKRO: ["/cars/hatchback-red.svg", "/cars/hatchback-blue.svg", "/cars/hatchback-white.svg"],
  COUPE: ["/cars/coupe-black.svg", "/cars/coupe-red.svg"],
  CABRIOLET: ["/cars/coupe-black.svg", "/cars/coupe-red.svg"],
  STATIONCAR: ["/cars/wagon-gray.svg", "/cars/wagon-blue.svg"],
  MPV: ["/cars/suv-silver.svg", "/cars/suv-white.svg", "/cars/wagon-gray.svg"],
  CUV: ["/cars/suv-dark.svg", "/cars/suv-green.svg"],
};

const colorToImage: Record<string, string> = {
  Sort: "dark", Hvid: "white", Sølv: "silver", Grå: "gray", Blå: "blue",
  Rød: "red", Grøn: "green", Antracit: "dark",
};

function getCarImage(bodyType: string, color: string): string {
  const images = carImages[bodyType] || carImages.SEDAN;
  // Try to match color
  const colorKey = colorToImage[color];
  if (colorKey) {
    const match = images.find((img) => img.includes(colorKey));
    if (match) return match;
  }
  return images[Math.floor(Math.abs(bodyType.length + color.length) % images.length)];
}

function getInteriorImage(bodyType: string): string {
  const interiors = ["/cars/sedan-dark.svg", "/cars/suv-dark.svg", "/cars/coupe-black.svg"];
  return interiors[Math.abs(bodyType.length) % interiors.length];
}

function getRearImage(bodyType: string): string {
  const rears: Record<string, string> = {
    SEDAN: "/cars/sedan-light.svg",
    SUV: "/cars/suv-silver.svg",
    HATCHBACK: "/cars/hatchback-white.svg",
    COUPE: "/cars/coupe-red.svg",
    STATIONCAR: "/cars/wagon-blue.svg",
  };
  return rears[bodyType] || "/cars/sedan-light.svg";
}

const fuelTypes = ["BENZIN", "DIESEL", "EL", "HYBRID", "PLUGIN_HYBRID"] as const;
const bodyTypes = ["SEDAN", "STATIONCAR", "SUV", "COUPE", "CABRIOLET", "MPV", "HATCHBACK"] as const;
const transmissions = ["MANUAL", "AUTOMATIC"] as const;
const categories = ["PERSONBIL"] as const;
const packageTiers = ["BASIS", "BASIS", "BASIS", "BASIS", "PLUS", "PLUS", "PREMIUM"] as const;

const firstNames = ["Anders", "Lars", "Peter", "Mette", "Sofie", "Karen", "Henrik", "Thomas", "Marie", "Camilla", "Mikkel", "Rasmus", "Christina", "Line", "Jonas", "Emil", "Louise", "Frederik", "Anna", "Niels"];
const lastNames = ["Jensen", "Nielsen", "Hansen", "Pedersen", "Andersen", "Christensen", "Larsen", "Sørensen", "Rasmussen", "Petersen", "Madsen", "Olsen", "Thomsen", "Møller", "Johansen"];

const dealerNames = [
  "AutoCenter København",
  "Nordsjællands Bilhus",
  "Fyn Biler A/S",
  "Jyllands Auto",
  "Bilhuset Aarhus",
  "Premium Cars Denmark",
  "Sjælland Autocenter",
  "Dansk Bilsalg",
  "Top Biler Odense",
  "Aalborg Bilcenter",
];

export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: "PRIVATE" | "DEALER";
  dealership?: MockDealership;
}

export interface MockDealership {
  id: string;
  companyName: string;
  cvr: string;
  description: string;
  logo: string | null;
  website: string;
}

export interface MockListing {
  id: string;
  userId: string;
  make: string;
  model: string;
  variant: string | null;
  year: number;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  category: string;
  color: string;
  doors: number;
  horsepower: number;
  engineSize: number;
  owners: number;
  towbar: boolean;
  region: string;
  zipCode: string;
  title: string;
  description: string;
  status: string;
  packageTier: string;
  createdAt: string;
  images: { url: string; sortOrder: number }[];
  equipment: { name: string; category: string }[];
  dealershipName: string | null;
  dealershipId: string | null;
  priceType: string;
}

// Generate users
export const mockUsers: MockUser[] = [];
for (let i = 0; i < 50; i++) {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const isDealer = i < 10;
  const user: MockUser = {
    id: `user-${i + 1}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.dk`,
    phone: `+45 ${randomInt(20, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)} ${randomInt(10, 99)}`,
    city: pick(REGIONS),
    role: isDealer ? "DEALER" : "PRIVATE",
  };
  if (isDealer) {
    user.dealership = {
      id: `dealer-${i + 1}`,
      companyName: dealerNames[i] || `Auto ${firstName}`,
      cvr: `${randomInt(10000000, 99999999)}`,
      description: `Vi er en af Danmarks førende bilforhandlere med mange års erfaring. Vi tilbyder et bredt udvalg af kvalitetsbiler til konkurrencedygtige priser.`,
      logo: null,
      website: `https://www.${dealerNames[i]?.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "") || "auto"}.dk`,
    };
  }
  mockUsers.push(user);
}

// Generate listings
export const mockListings: MockListing[] = [];

for (let i = 0; i < 250; i++) {
  const makeKeys = Object.keys(CAR_MAKES);
  const make = pick(makeKeys);
  const models = CAR_MAKES[make];
  const model = pick(models);
  const year = randomInt(2010, 2025);
  const mileage = year >= 2024 ? randomInt(0, 15000) : randomInt(5000, 300000 - (year - 2010) * 10000);
  const fuelType = pick(fuelTypes);
  const bodyType = pick(bodyTypes);
  const transmission = pick(transmissions);
  const region = pick(REGIONS);
  const color = pick(COLORS);
  const userIndex = randomInt(0, 49);
  const user = mockUsers[userIndex];
  const isDealer = user.role === "DEALER";
  const tier = pick(packageTiers);
  const doors = bodyType === "COUPE" || bodyType === "CABRIOLET" ? 2 : pick([4, 5]);
  const hp = fuelType === "EL" ? randomInt(150, 500) : randomInt(90, 350);
  const engineSize = fuelType === "EL" ? 0 : parseFloat((randomInt(10, 40) / 10).toFixed(1));
  const owners = randomInt(1, 4);

  // Price logic
  let basePrice = 50000;
  if (make === "Porsche" || make === "Land Rover" || make === "Jaguar") basePrice = 300000;
  else if (make === "BMW" || make === "Mercedes-Benz" || make === "Audi") basePrice = 150000;
  else if (make === "Tesla") basePrice = 200000;
  else if (make === "Volvo") basePrice = 130000;
  else if (make === "Dacia" || make === "Suzuki" || make === "MG") basePrice = 60000;

  const yearFactor = 1 + (year - 2010) * 0.06;
  const price = Math.round((basePrice * yearFactor + randomInt(-30000, 80000)) / 1000) * 1000;
  const clampedPrice = Math.max(25000, Math.min(price, 1500000));

  const equipmentCount = randomInt(5, 20);
  const equipment = pickN(EQUIPMENT_LIST, equipmentCount);

  const daysAgo = randomInt(0, 28);
  const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();

  const variants = ["1.0 TSI", "2.0 TDI", "1.6 TFSI", "3.0 V6", "Sport", "Comfort", "Business", null, null];
  const variant = fuelType === "EL" ? pick(["Long Range", "Standard Range", "Performance", null]) : pick(variants);

  const listing: MockListing = {
    id: `listing-${i + 1}`,
    userId: user.id,
    make,
    model,
    variant,
    year,
    mileage: Math.max(0, mileage),
    price: clampedPrice,
    fuelType,
    transmission,
    bodyType,
    category: pick(categories),
    color,
    doors,
    horsepower: hp,
    engineSize,
    owners,
    towbar: rand() > 0.7,
    region,
    zipCode: `${randomInt(1000, 9999)}`,
    title: `${make} ${model}${variant ? ` ${variant}` : ""} - ${year}`,
    description: generateDescription(make, model, year, mileage, fuelType, color, equipment),
    status: "ACTIVE",
    packageTier: tier,
    createdAt,
    images: [
      { url: getCarImage(bodyType, color), sortOrder: 0 },
      { url: getInteriorImage(bodyType), sortOrder: 1 },
      { url: getRearImage(bodyType), sortOrder: 2 },
    ],
    equipment,
    dealershipName: isDealer ? user.dealership!.companyName : null,
    dealershipId: isDealer ? user.dealership!.id : null,
    priceType: "RETAIL",
  };

  mockListings.push(listing);
}

function generateDescription(make: string, model: string, year: number, mileage: number, fuelType: string, color: string, equipment: { name: string; category: string }[]): string {
  const fuelText = fuelType === "EL" ? "elektrisk" : fuelType === "DIESEL" ? "diesel" : fuelType === "HYBRID" ? "hybrid" : "benzin";
  const topEquip = equipment.slice(0, 5).map((e) => e.name).join(", ");
  return `Velholdt ${make} ${model} fra ${year} i ${color.toLowerCase()} med kun ${mileage.toLocaleString("da-DK")} km. ` +
    `Denne ${fuelText}bil er i rigtig fin stand og kører upåklageligt. ` +
    `Bilen er udstyret med bl.a. ${topEquip}. ` +
    `Bilen har fået ny service og er klar til levering. ` +
    `Kontakt os for prøvekørsel eller yderligere information.`;
}

// Helper to filter listings
export function filterListings(params: Record<string, string | undefined>): {
  listings: MockListing[];
  total: number;
} {
  let filtered = mockListings.filter((l) => l.status === "ACTIVE");

  if (params.category) filtered = filtered.filter((l) => l.category === params.category);
  if (params.make) filtered = filtered.filter((l) => l.make === params.make);
  if (params.model) filtered = filtered.filter((l) => l.model === params.model);
  if (params.fuelType) filtered = filtered.filter((l) => l.fuelType === params.fuelType);
  if (params.bodyType) filtered = filtered.filter((l) => l.bodyType === params.bodyType);
  if (params.transmission) filtered = filtered.filter((l) => l.transmission === params.transmission);
  if (params.color) filtered = filtered.filter((l) => l.color === params.color);
  if (params.region) filtered = filtered.filter((l) => l.region === params.region);
  if (params.yearFrom) filtered = filtered.filter((l) => l.year >= parseInt(params.yearFrom!));
  if (params.yearTo) filtered = filtered.filter((l) => l.year <= parseInt(params.yearTo!));
  if (params.priceFrom) filtered = filtered.filter((l) => l.price >= parseInt(params.priceFrom!));
  if (params.priceTo) filtered = filtered.filter((l) => l.price <= parseInt(params.priceTo!));
  if (params.mileageFrom) filtered = filtered.filter((l) => l.mileage >= parseInt(params.mileageFrom!));
  if (params.mileageTo) filtered = filtered.filter((l) => l.mileage <= parseInt(params.mileageTo!));
  if (params.hpFrom) filtered = filtered.filter((l) => l.horsepower >= parseInt(params.hpFrom!));
  if (params.hpTo) filtered = filtered.filter((l) => l.horsepower <= parseInt(params.hpTo!));
  if (params.sellerType === "PRIVATE") filtered = filtered.filter((l) => !l.dealershipId);
  if (params.sellerType === "DEALER") filtered = filtered.filter((l) => !!l.dealershipId);

  // Sort
  const sort = params.sort || "newest";
  switch (sort) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "mileage_asc":
      filtered.sort((a, b) => a.mileage - b.mileage);
      break;
    case "year_desc":
      filtered.sort((a, b) => b.year - a.year);
      break;
    case "newest":
    default:
      // Premium first, then by date
      filtered.sort((a, b) => {
        const tierOrder = { PREMIUM: 0, PLUS: 1, BASIS: 2 };
        const tierDiff = (tierOrder[a.packageTier as keyof typeof tierOrder] || 2) - (tierOrder[b.packageTier as keyof typeof tierOrder] || 2);
        if (tierDiff !== 0) return tierDiff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  const total = filtered.length;
  const page = parseInt(params.page || "1");
  const perPage = 30;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return { listings: paginated, total };
}

export function getListingById(id: string): MockListing | undefined {
  return mockListings.find((l) => l.id === id);
}

export function getSimilarListings(listing: MockListing, limit = 6): MockListing[] {
  return mockListings
    .filter((l) => l.id !== listing.id && l.status === "ACTIVE" && (l.make === listing.make || Math.abs(l.price - listing.price) < 50000))
    .slice(0, limit);
}

export function getFeaturedListings(limit = 8): MockListing[] {
  return mockListings
    .filter((l) => l.status === "ACTIVE" && l.packageTier === "PREMIUM")
    .slice(0, limit);
}

export function getLatestListings(limit = 8): MockListing[] {
  return [...mockListings]
    .filter((l) => l.status === "ACTIVE")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getPrivateListings(limit = 8): MockListing[] {
  return mockListings
    .filter((l) => l.status === "ACTIVE" && !l.dealershipId)
    .slice(0, limit);
}

export function getDealerships() {
  return mockUsers.filter((u) => u.role === "DEALER").map((u) => ({
    ...u.dealership!,
    user: u,
    listingCount: mockListings.filter((l) => l.dealershipId === u.dealership!.id).length,
  }));
}

export function getDealershipById(id: string) {
  const user = mockUsers.find((u) => u.dealership?.id === id);
  if (!user?.dealership) return null;
  return {
    ...user.dealership,
    user,
    listings: mockListings.filter((l) => l.dealershipId === id),
  };
}
