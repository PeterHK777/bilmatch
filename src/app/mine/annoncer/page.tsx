import { mockListings } from "@/lib/mock-data";
import { formatPrice, formatMileage, timeAgo } from "@/lib/utils";
import Link from "next/link";
import { Plus, Edit, Trash2, RefreshCw, CheckCircle, Eye } from "lucide-react";

export default function MyListingsPage() {
  // Demo: show first user's listings
  const userListings = mockListings.filter((l) => l.userId === "user-1").slice(0, 8);
  const active = userListings.filter((l) => l.status === "ACTIVE");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mine annoncer</h1>
          <p className="text-sm text-gray-500 mt-1">{active.length} aktive annoncer</p>
        </div>
        <Link
          href="/saelg"
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Ny annonce
        </Link>
      </div>

      {userListings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">Du har ingen annoncer endnu.</p>
          <Link
            href="/saelg"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Opret din første annonce
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {userListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="w-full sm:w-40 h-28 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={listing.images[0]?.url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                    <p className="text-lg font-bold text-primary mt-1">{formatPrice(listing.price)}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                      <span>{listing.year}</span>
                      <span>{formatMileage(listing.mileage)}</span>
                      <span>{listing.region}</span>
                      <span>Oprettet {timeAgo(new Date(listing.createdAt))}</span>
                    </div>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                    listing.status === "ACTIVE"
                      ? "bg-green-50 text-green-700"
                      : listing.status === "SOLD"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {listing.status === "ACTIVE" ? "Aktiv" : listing.status === "SOLD" ? "Solgt" : "Udløbet"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                    <Eye className="w-3.5 h-3.5" />
                    Se annonce
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                    <Edit className="w-3.5 h-3.5" />
                    Rediger
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Marker som solgt
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                    <RefreshCw className="w-3.5 h-3.5" />
                    Forny
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-red-200 rounded-lg hover:bg-red-50 text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                    Slet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
