"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";

export default function page({ searchParams }) {
  const { session_id } = use(searchParams);
  const router = useRouter();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!session_id) {
      notFound();
    }
    async function finiliseCheckout() {
      try {
        const res = await axios.get(`/api/checkouts/success/${session_id}`);
        console.log(res.data.data.isSuccess);
        if (res.data.data.isSuccess) {
          setMsg(res.data.message);
          router.push("/account/billing");
        }
      } catch (e) {
        setMsg(e.response?.data?.message);
        console.log(e);
      }
    }
    finiliseCheckout();
  }, []);

  return <div>{msg}</div>;
}
