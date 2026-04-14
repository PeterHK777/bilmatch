"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, CheckCircle, Eye, LogIn } from "lucide-react";
import { formatPrice, formatMileage, timeAgo, slugify } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { getUserListings, deleteListing, markListingAsSold } from "@/lib/listings-store";
import type { MockListing } from "@/lib/mock-data";

export default function MyListingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<MockListing[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/bruger/log-ind");
    }
    if (user) {
      setListings(getUserListings(user.id));
    }
  }, [user, loading, router]);

  function handleDelete(id: string) {
    deleteListing(id);
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  function handleMarkSold(id: string) {
    markListingAsSold(id);
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, status: "SOLD" } : l));
  }

  if (loading) return null;

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Log ind for at se dine annoncer</h1>
        <p className="text-gray-500 mb-6">Du skal logge ind for at administrere dine bilannoncer.</p>
        <Link href="/bruger/log-ind" className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
          Log ind
        </Link>
      </div>
    );
  }

  const active = listings.filter((l) => l.status === "ACTIVE");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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

      {listings.length === 0 ? (
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
          {listings.map((listing) => (
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
                  <Link
                    href={`/brugt/bil/${slugify(listing.make)}/${slugify(listing.model)}/${listing.id}`}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Se annonce
                  </Link>
                  {listing.status === "ACTIVE" && (
                    <button
                      onClick={() => handleMarkSold(listing.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Marker som solgt
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-red-200 rounded-lg hover:bg-red-50 text-red-600"
                  >
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
