import { mockListings } from "@/lib/mock-data";
import { CarCard } from "@/components/ui/CarCard";

export default function FavoritesPage() {
  // Demo: show random cars as "favorites"
  const favorites = mockListings.slice(10, 18);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Favoritter</h1>
        <p className="text-sm text-gray-500 mt-1">{favorites.length} gemte biler</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">Du har ikke gemt nogen biler endnu.</p>
          <p className="text-sm text-gray-400 mt-1">Tryk på hjertet på en annonce for at gemme den.</p>
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
