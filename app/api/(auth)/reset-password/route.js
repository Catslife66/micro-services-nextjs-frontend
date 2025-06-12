import axios from "axios";
import { NextResponse } from "next/server";

const URL_PREFIX =
  process.env.ENVIRONMENT_STAGE == 0
    ? process.env.LOCAL_BACKEN_URL_PREFIX
    : process.env.CONTAINER_BACKEND_URL_PREFIX;
const BACKENDAPI_RESET_PASSWORD_URL = `${URL_PREFIX}/users/reset-password`;

export async function POST(request) {
  try {
    const requestData = await request.json();
    const res = await axios.post(BACKENDAPI_RESET_PASSWORD_URL, requestData);
    return NextResponse.json({ data: res.data }, { status: res.status });
  } catch (e) {
    return NextResponse.json(
      { error: e.response?.data?.error || "Cannot reset password." },
      { status: e.response?.data?.status || 400 }
    );
  }
}
