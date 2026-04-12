import { NextRequest, NextResponse } from "next/server";
import { getListingById, getSimilarListings, mockUsers } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const seller = mockUsers.find((u) => u.id === listing.userId);
  const similar = getSimilarListings(listing, 4);

  return NextResponse.json({
    listing,
    seller: seller ? { id: seller.id, name: seller.name, city: seller.city, role: seller.role } : null,
    similar,
  });
}
