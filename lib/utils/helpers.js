import { getRefreshToken, setAccessToken } from "../authService";
import axios from "axios";

export const getUrlPrefix = () => {
  const url_prefix =
    process.env.ENVIRONMENT_STAGE == 0
      ? process.env.LOCAL_BACKEN_URL_PREFIX
      : process.env.CONTAINER_BACKEND_URL_PREFIX;
  return url_prefix;
};

export const checkIsRefreshTokenOk = async () => {
  const URL_PREFIX = getUrlPrefix();
  const VERIFY_USER_STATUS_URL = `${URL_PREFIX}/token/refresh`;
  const refreshToken = await getRefreshToken();
  let tokenIsOk;
  try {
    const res = await axios.post(VERIFY_USER_STATUS_URL, {
      refresh: refreshToken,
    });
    await setAccessToken(res.data.access);
    tokenIsOk = true;
  } catch (e) {
    tokenIsOk = false;
  }
  return tokenIsOk;
};
