import { deleteTokens } from "@/lib/authService";
import { NextResponse } from "next/server";

export async function POST(request) {
  await deleteTokens();
  return NextResponse.json({}, { status: 200 });
}
