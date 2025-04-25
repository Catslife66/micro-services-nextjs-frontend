"use client";

import { useAuth } from "@/lib/hooks/authProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page() {
  const auth = useAuth();
  const route = useRouter();
  const LOGIN_URL = "login";

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/logout");
      auth.logout();
      route.push(LOGIN_URL);
    } catch (e) {
      console.log("Error is", e);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
