import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ content: "This is the About page from API." });
}
