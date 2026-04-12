import { getListingById, getSimilarListings, mockUsers } from "@/lib/mock-data";
import { formatPrice, formatMileage, formatNumber, timeAgo } from "@/lib/utils";
import { FUEL_TYPE_LABELS, BODY_TYPE_LABELS, TRANSMISSION_LABELS } from "@/lib/constants";
import { CarCard } from "@/components/ui/CarCard";
import { ImageGallery } from "./ImageGallery";
import { ContactSection } from "./ContactSection";
import { FinancingCalculator } from "./FinancingCalculator";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Gauge, Fuel, Cog, Palette, Users, Hash, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string; make: string; model: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return { title: "Annonce ikke fundet" };
  return {
    title: `${listing.make} ${listing.model} ${listing.variant || ""} - ${listing.year} | ${formatPrice(listing.price)}`,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const seller = mockUsers.find((u) => u.id === listing.userId);
  const similar = getSimilarListings(listing, 4);

  const specs = [
    { label: "Mærke", value: listing.make, icon: Car },
    { label: "Model", value: `${listing.model}${listing.variant ? ` ${listing.variant}` : ""}` },
    { label: "Årgang", value: String(listing.year), icon: Calendar },
    { label: "Km-stand", value: formatMileage(listing.mileage), icon: Gauge },
    { label: "Drivmiddel", value: FUEL_TYPE_LABELS[listing.fuelType] || listing.fuelType, icon: Fuel },
    { label: "Gearkasse", value: TRANSMISSION_LABELS[listing.transmission] || listing.transmission, icon: Cog },
    { label: "Karosseri", value: BODY_TYPE_LABELS[listing.bodyType] || listing.bodyType },
    { label: "HK", value: `${listing.horsepower} HK` },
    { label: "Motor", value: listing.engineSize > 0 ? `${listing.engineSize} L` : "Elektrisk" },
    { label: "Døre", value: String(listing.doors) },
    { label: "Farve", value: listing.color, icon: Palette },
    { label: "Ejere", value: String(listing.owners), icon: Users },
    { label: "Trækkrog", value: listing.towbar ? "Ja" : "Nej" },
  ];

  // Group equipment by category
  const equipmentByCategory: Record<string, string[]> = {};
  for (const eq of listing.equipment) {
    const cat = eq.category || "Andet";
    if (!equipmentByCategory[cat]) equipmentByCategory[cat] = [];
    equipmentByCategory[cat].push(eq.name);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
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
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Gallery */}
          <ImageGallery images={listing.images} title={listing.title} />

          {/* Title & Price */}
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

          {/* Key specs strip */}
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

          {/* Specifications */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Specifikationer</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between px-4 py-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}
                  >
                    <span className="text-sm text-gray-600">{spec.label}</span>
                    <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment */}
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

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Beskrivelse</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
            </div>
          </div>

          {/* Financing Calculator */}
          <div className="mt-8">
            <FinancingCalculator price={listing.price} />
          </div>
        </div>

        {/* Sidebar - Contact */}
        <aside className="lg:w-80 shrink-0">
          <div className="sticky top-20">
            <ContactSection
              seller={seller!}
              listing={listing}
            />
          </div>
        </aside>
      </div>

      {/* Similar Cars */}
      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lignende biler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similar.map((car) => (
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
        </section>
      )}
    </div>
  );
}

function Car(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  );
}
