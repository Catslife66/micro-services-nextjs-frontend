import { getRefreshToken } from "@/lib/authService";
import { NextResponse } from "next/server";
import axios from "axios";
import { getUrlPrefix } from "@/lib/utils/helpers";

const URL_PREFIX = getUrlPrefix();
const BACKEND_CHECK_SESSION_URL = "users/session";

export async function GET(request) {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }
  try {
    const config = {
      headers: {
        refresh: refreshToken,
      },
    };
    const res = await axios.get(
      `${URL_PREFIX}/${BACKEND_CHECK_SESSION_URL}`,
      config
    );
    console.log("the response is", res);
    return NextResponse.json({ isLoggedIn: true }, { status: res.status });
  } catch (e) {
    console.log("the error is", e);
    return NextResponse.json({ isLoggedIn: false }, { status: e.status });
  }
}
