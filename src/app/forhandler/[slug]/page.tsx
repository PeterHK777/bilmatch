import { getDealerships, mockListings } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";
import { CarCard } from "@/components/ui/CarCard";
import { Building2, MapPin, Phone, Globe, Clock, Star } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DealerProfilePage({ params }: Props) {
  const { slug } = await params;
  const dealers = getDealerships();
  const dealer = dealers.find((d) => slugify(d.companyName) === slug);

  if (!dealer) notFound();

  const listings = mockListings.filter((l) => l.dealershipId === dealer.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Dealer header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
            <Building2 className="w-12 h-12 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{dealer.companyName}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {dealer.user.city}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {dealer.user.phone}
              </span>
              {dealer.website && (
                <a href={dealer.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                  <Globe className="w-4 h-4" />
                  Hjemmeside
                </a>
              )}
              <span className="flex items-center gap-1 text-warning">
                <Star className="w-4 h-4 fill-current" />
                4.2 (23 anmeldelser)
              </span>
            </div>
            <p className="text-gray-600 mt-3">{dealer.description}</p>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Man-Fre: 09:00-17:30 | Lør: 10:00-14:00
            </div>
          </div>
        </div>
      </div>

      {/* Dealer listings */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Biler til salg ({listings.length})
      </h2>
      {listings.length === 0 ? (
        <p className="text-gray-500">Ingen aktive annoncer.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {listings.map((car) => (
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
