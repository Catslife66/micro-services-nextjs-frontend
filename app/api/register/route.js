import axios from "axios";
import { NextResponse } from "next/server";

const URL_PREFIX =
  process.env.ENVIRONMENT_STAGE == 0
    ? process.env.LOCAL_BACKEN_URL_PREFIX
    : process.env.CONTAINER_BACKEND_URL_PREFIX;
const BACKENDAPI_REGISTER_URL = `${URL_PREFIX}/users/register`;

export async function POST(request) {
  try {
    const requestData = await request.json();
    console.log(requestData);
    const res = await axios.post(BACKENDAPI_REGISTER_URL, requestData);
    return NextResponse.json({ user: res.data }, { status: res.status });
  } catch (e) {
    console.log(e.response);
    return NextResponse.json(
      {
        error:
          e.response?.data?.detail ||
          e.response?.data?.error ||
          "Cannot register. Please try again.",
      },
      { status: e.response?.status || 400 }
    );
  }
}
