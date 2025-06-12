import { getAccessToken } from "@/lib/authService";
import { checkIsRefreshTokenOk, getUrlPrefix } from "@/lib/utils/helpers";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(resquest) {
  let tokenIsOk = await checkIsRefreshTokenOk();
  const URL_PREFIX = getUrlPrefix();
  const BACKEND_USER_SUBSCRIPTION_CANCEL_URL = `${URL_PREFIX}/subscriptions/cancel`;

  if (!tokenIsOk) {
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 401 }
    );
  }
  try {
    const requestData = await resquest.json();
    const accessToken = await getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(requestData);
    const res = await axios.post(
      BACKEND_USER_SUBSCRIPTION_CANCEL_URL,
      requestData,
      config
    );
    return NextResponse.json({ data: res.data }, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { error: e.response?.data?.error || "Failed to connect the server." },
      { status: e.response?.data?.error || 400 }
    );
  }
}
