"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_NAME = "Access-Token";
const REFRESH_TOKEN_NAME = "Refresh-Token";

export const setAccessToken = async (token) => {
  const cookieStore = await cookies();
  return cookieStore.set({
    name: ACCESS_TOKEN_NAME,
    value: token,
    httpOnly: true,
  });
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_NAME);
  return token?.value;
};

export const setRefreshToken = async (token) => {
  const cookieStore = await cookies();
  return cookieStore.set({
    name: REFRESH_TOKEN_NAME,
    value: token,
    httpOnly: true,
  });
};

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(REFRESH_TOKEN_NAME);
  return token?.value;
};

export const deleteTokens = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
};
