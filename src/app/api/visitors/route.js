import { NextResponse } from "next/server";
import { createHash } from "crypto";

const BASE = "https://api.counterapi.dev/v1/shivabhattacharjee-portfolio";

async function counterGet(key) {
  const res = await fetch(`${BASE}/${key}/get`, { next: { revalidate: 0 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.count ?? 0;
}

async function counterUp(key) {
  const res = await fetch(`${BASE}/${key}/up`, { next: { revalidate: 0 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.count ?? null;
}

export async function GET(request) {
  try {
    const ip =
      request.headers.get("x-vercel-forwarded-for") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);
    const ipKey = `ip-${ipHash}`;

    const seen = await counterGet(ipKey);

    let count;
    if (seen === 0) {
      // New unique visitor — mark IP and increment main counter
      await counterUp(ipKey);
      count = await counterUp("visits");
    } else {
      // Returning visitor — just read current total
      count = await counterGet("visits");
    }

    return NextResponse.json({ count: count ?? null });
  } catch {
    return NextResponse.json({ count: null });
  }
}
