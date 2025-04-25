import axios from "axios";
import { NextResponse } from "next/server";

const URL_PREFIX =
  process.env.ENVIRONMENT_STAGE == 0
    ? process.env.LOCAL_BACKEN_URL_PREFIX
    : process.env.CONTAINER_BACKEND_URL_PREFIX;
const BACKENDAPI_FORGOT_PASSWORD_URL = `${URL_PREFIX}/users/forgot-password`;

export async function POST(request) {
  try {
    const requestData = await request.json();
    const res = await axios.post(BACKENDAPI_FORGOT_PASSWORD_URL, requestData);
    return NextResponse.json(
      { isSuccess: true },
      { status: res.status || 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { isSuccess: false, error: e.response?.data?.error },
      { status: e.response?.status || 400 }
    );
  }
}
