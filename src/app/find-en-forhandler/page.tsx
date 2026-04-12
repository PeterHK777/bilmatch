import { getDealerships } from "@/lib/mock-data";
import { REGIONS } from "@/lib/constants";
import Link from "next/link";
import { Building2, MapPin, Car, Star, ExternalLink } from "lucide-react";
import { slugify } from "@/lib/utils";

export default function FindDealerPage() {
  const dealers = getDealerships();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Find en forhandler</h1>
      <p className="text-gray-500 mb-8">Find din lokale bilforhandler blandt {dealers.length} forhandlere</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dealers.map((dealer) => (
          <Link
            key={dealer.id}
            href={`/forhandler/${slugify(dealer.companyName)}`}
            className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {dealer.companyName}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {dealer.user.city}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{dealer.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-gray-500">
                <Car className="w-4 h-4" />
                {dealer.listingCount} biler
              </span>
              <span className="flex items-center gap-1 text-warning">
                <Star className="w-4 h-4 fill-current" />
                {(3.5 + Math.random() * 1.5).toFixed(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
