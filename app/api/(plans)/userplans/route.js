import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "@/lib/authService";
import { getUrlPrefix, checkIsRefreshTokenOk } from "@/lib/utils/helpers";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(requst) {
  const URL_PREFIX = getUrlPrefix();
  const BACKEND_USER_SUBSCRIPTION_URL = `${URL_PREFIX}/subscriptions/myplans`;
  let tokenIsOk = await checkIsRefreshTokenOk();

  if (!tokenIsOk) {
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 401 }
    );
  }

  try {
    const accessToken = await getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.get(BACKEND_USER_SUBSCRIPTION_URL, config);
    return NextResponse.json({ data: res.data }, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { error: e.response?.data?.error || "Failed to connect the server." },
      { status: e.response?.data?.error || 400 }
    );
  }
}
