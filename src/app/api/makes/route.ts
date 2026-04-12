import { NextRequest, NextResponse } from "next/server";
import { CAR_MAKES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const make = request.nextUrl.searchParams.get("make");

  if (make) {
    const models = CAR_MAKES[make] || [];
    return NextResponse.json({ make, models });
  }

  const makes = Object.keys(CAR_MAKES).sort();
  return NextResponse.json({ makes });
}
