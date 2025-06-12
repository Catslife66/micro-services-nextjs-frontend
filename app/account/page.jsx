"use client";

import axios from "axios";
import { useEffect } from "react";

export default function page() {
  useEffect(() => {
    checkStatus();
    async function checkStatus() {
      try {
        const res = await axios.get("/api/session");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return <div>user login required page.</div>;
}
