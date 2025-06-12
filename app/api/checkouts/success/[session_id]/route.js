import { getUrlPrefix } from "@/lib/utils/helpers";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { session_id } = await params;
  const URL_PREFIX = getUrlPrefix();
  const CHECKOUT_SESSION_RETRIEVE_URL = `${URL_PREFIX}/payments/checkout-success/${session_id}`;

  try {
    const res = await axios.get(CHECKOUT_SESSION_RETRIEVE_URL);
    return NextResponse.json({ data: res.data }, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { error: e.response?.data?.error || "Failed to connect the server." },
      { status: e.response?.data?.error || 400 }
    );
  }
}
