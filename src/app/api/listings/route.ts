import { NextRequest, NextResponse } from "next/server";
import { filterListings } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const params: Record<string, string | undefined> = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const result = filterListings(params);

  return NextResponse.json(result);
}
