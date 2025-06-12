import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "@/lib/authService";
import { checkIsRefreshTokenOk, getUrlPrefix } from "@/lib/utils/helpers";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const URL_PREFIX = getUrlPrefix();
  const BACKENDAPI_CHECKOUT_URL = `${URL_PREFIX}/payments/create-checkout-session`;
  let tokenIsOk = await checkIsRefreshTokenOk();

  if (!tokenIsOk) {
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 401 }
    );
  }

  try {
    const requestData = await request.json();
    const accessToken = await getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const res = await axios.post(BACKENDAPI_CHECKOUT_URL, requestData, config);
    return NextResponse.json({ checkoutUrl: res.data }, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { error: e.response?.data?.error || "Failed to connect the server." },
      { status: e.response?.data?.error || 400 }
    );
  }
}
