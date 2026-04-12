import { SearchPanel } from "@/components/ui/SearchPanel";
import { CarCard } from "@/components/ui/CarCard";
import { getFeaturedListings, getLatestListings, getPrivateListings, mockListings } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { Zap, Car, Users, Battery, ArrowRight } from "lucide-react";

const popularCategories = [
  { label: "Elbil", icon: Battery, href: "/brugt/bil?fuelType=EL", color: "bg-green-50 text-green-700" },
  { label: "Hybridbil", icon: Zap, href: "/brugt/bil?fuelType=HYBRID", color: "bg-blue-50 text-blue-700" },
  { label: "Familiebil", icon: Users, href: "/brugt/bil?bodyType=MPV", color: "bg-purple-50 text-purple-700" },
  { label: "SUV", icon: Car, href: "/brugt/bil?bodyType=SUV", color: "bg-orange-50 text-orange-700" },
  { label: "Mikrobil", icon: Car, href: "/brugt/bil?bodyType=MIKRO", color: "bg-pink-50 text-pink-700" },
  { label: "Stationcar", icon: Car, href: "/brugt/bil?bodyType=STATIONCAR", color: "bg-indigo-50 text-indigo-700" },
];

export default function HomePage() {
  const featured = getFeaturedListings(8);
  const latest = getLatestListings(8);
  const privateCars = getPrivateListings(8);
  const totalActive = mockListings.filter((l) => l.status === "ACTIVE").length;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              Danmarks største markedsplads for biler
            </h1>
            <p className="text-lg text-blue-100">
              Søg blandt <span className="font-semibold text-white">{formatNumber(totalActive)}</span> biler til salg
            </p>
          </div>
          <SearchPanel />
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Populære søgninger</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCategories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.color}`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sell CTA */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Sælg din bil hurtigt og nemt
              </h2>
              <p className="text-gray-600 mb-6">
                Opret en annonce på under 5 minutter og nå ud til tusindvis af potentielle
                købere. Vi hjælper dig med at sætte den rigtige pris.
              </p>
              <div>
                <Link
                  href="/saelg"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
                >
                  Sælg din bil
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="md:w-80 lg:w-96 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-8">
              <div className="text-center">
                <Car className="w-20 h-20 text-primary mx-auto mb-4" />
                <p className="text-3xl font-bold text-primary">{formatNumber(totalActive)}+</p>
                <p className="text-sm text-gray-600">aktive annoncer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Fremhævede biler</h2>
          <Link href="/brugt/bil" className="text-sm text-primary hover:underline flex items-center gap-1">
            Se alle <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((car) => (
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

      {/* Private Cars */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Brugte private biler</h2>
            <Link href="/brugt/bil?sellerType=PRIVATE" className="text-sm text-primary hover:underline flex items-center gap-1">
              Se alle <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {privateCars.map((car) => (
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
                dealershipName={null}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Cars */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Seneste biler</h2>
          <Link href="/brugt/bil?sort=newest" className="text-sm text-primary hover:underline flex items-center gap-1">
            Se alle <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.map((car) => (
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
    </>
  );
}
