import axios from "axios";
import { getRefreshToken } from "@/lib/authService";
import { NextResponse } from "next/server";

export async function POST(request) {
  const URL_PREFIX =
    process.env.ENVIRONMENT_STAGE == 0
      ? process.env.LOCAL_BACKEN_URL_PREFIX
      : process.env.CONTAINER_BACKEND_URL_PREFIX;
  const VERIFY_REFRESH_TOKEN_URL = "token/refresh";
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return NextResponse.json({ isLoggedIn: false }, { status: 400 });
  } else {
    try {
      const res = await axios.post(
        `${URL_PREFIX}/${VERIFY_REFRESH_TOKEN_URL}`,
        { refresh: refreshToken }
      );
      return NextResponse.json({ isLoggedIn: true }, { status: res.status });
    } catch (e) {
      console.error("Error fetching session:", e);
      return NextResponse.json(
        { isLoggedIn: false },
        { status: e.response?.status || 400 }
      );
    }
  }
}
