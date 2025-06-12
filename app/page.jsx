"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/authProvider";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth, isLoggedIn]);

  return (
    <div>
      <h1>Homepage</h1>
      {isLoggedIn ? auth.user.username : "not logged in"}
    </div>
  );
}
