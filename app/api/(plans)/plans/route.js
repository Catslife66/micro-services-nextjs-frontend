import axios from "axios";
import { NextResponse } from "next/server";
import { getUrlPrefix } from "@/lib/utils/helpers";

const URL_PREFIX = getUrlPrefix();

export async function GET(request) {
  const BACKENDAPI_PLAN_URL = `${URL_PREFIX}/subscriptions`;
  try {
    const res = await axios.get(BACKENDAPI_PLAN_URL);
    return NextResponse.json(
      { plans: res.data },
      { status: res.status || 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e.response?.data?.error || "Failed to connect the server." },
      { status: e.response?.data?.error || 400 }
    );
  }
}
