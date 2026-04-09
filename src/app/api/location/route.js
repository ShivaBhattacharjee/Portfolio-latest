import { NextResponse } from "next/server";

export async function GET(request) {
  const city = request.headers.get("x-vercel-ip-city") || "";
  const country = request.headers.get("x-vercel-ip-country-region") || "";
  const countryName = request.headers.get("x-vercel-ip-country") || "";

  return NextResponse.json({
    city: decodeURIComponent(city),
    country: countryName,
  });
}
