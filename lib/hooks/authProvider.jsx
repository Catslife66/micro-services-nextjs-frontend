"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const USER_STATUS_KEY = "isLoggedIn";
const USER_NAME_KEY = "userName";
const USER_EMAIL_KEY = "userEmail";
const LOGIN_REQUIRED_URL = "/login";
const LOGIN_REDIRECT_URL = "/";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter();
  const searchParam = useSearchParams();

  const login = (email, username) => {
    localStorage.setItem(USER_STATUS_KEY, "1");
    localStorage.setItem(USER_NAME_KEY, username);
    localStorage.setItem(USER_EMAIL_KEY, email);
    setUser({ email: email, username: username });
    setIsLoggedIn(true);
    const nextUrl = searchParam.get("next");
    const invalidNextUrl = ["/login", "/logout"];
    const validNextUrl =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);
    if (validNextUrl) {
      router.replace(nextUrl);
      return;
    } else {
      router.replace(LOGIN_REDIRECT_URL);
      return;
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_STATUS_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    setUser({ email: "", username: "" });
    setIsLoggedIn(false);
    router.replace(LOGIN_REQUIRED_URL);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await axios.get("/api/session");
        setIsLoggedIn(true);
        const userState = localStorage.getItem(USER_STATUS_KEY);
        if (userState == 1) {
          const userEmail = localStorage.getItem(USER_EMAIL_KEY);
          const userName = localStorage.getItem(USER_NAME_KEY);
          setUser({ email: userEmail, username: userName });
        }
      } catch (e) {
        console.log(e);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
