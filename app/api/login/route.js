import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/authService";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const URL_PREFIX =
    process.env.ENVIRONMENT_STAGE == 0
      ? process.env.LOCAL_BACKEN_URL_PREFIX
      : process.env.CONTAINER_BACKEND_URL_PREFIX;
  const BACKENDAPI_AUTH_URL = `${URL_PREFIX}/token/pair`;

  try {
    const requestData = await request.json();
    const res = await axios.post(BACKENDAPI_AUTH_URL, requestData);
    const { refresh, access, user } = res.data;
    await setAccessToken(access);
    await setRefreshToken(refresh);
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: e.response?.data?.detail },
      { status: e.response?.status || 400 }
    );
  }
}
