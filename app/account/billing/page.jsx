"use client";

import { useAuth } from "@/lib/hooks/authProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [subscriptions, setSubscriptions] = useState([]);
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    async function getUserSubscriptions() {
      try {
        const res = await axios.get("/api/userplans");
        setSubscriptions(res.data.data);
        console.log(res);
      } catch (e) {
        if (e.response?.status === 401) {
          router.push("/login?next=/account/billing");
        }
        console.log("Error is ", e);
      }
    }

    getUserSubscriptions();
  }, [auth.isLoggedIn]);

  const handleCancel = async (stripe_id) => {
    const data = {
      stripe_id: stripe_id,
      cancel_at_period_end: false,
    };
    try {
      const res = await axios.post("/api/userplans/cancel", data);
      router.push("/account/billing");
    } catch (e) {
      console.log(e);
    }
    console.log(data);
  };

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Plan name
            </th>
            <th scope="col" className="px-6 py-3">
              Plan status
            </th>
            <th scope="col" className="px-6 py-3">
              Created
            </th>
            <th scope="col" className="px-6 py-3">
              Plan price
            </th>
            <th scope="col" className="px-6 py-3">
              Plan interval
            </th>
            <th scope="col" className="px-6 py-3">
              Plan start time
            </th>
            <th scope="col" className="px-6 py-3">
              Plan end time
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {subscriptions &&
            subscriptions.map((sub, idx) => (
              <tr
                key={idx}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{sub.subscription}</td>
                <td className="px-6 py-4">{sub.status}</td>
                <td className="px-6 py-4">{sub.created_at}</td>
                <td className="px-6 py-4">£ {sub.price}</td>
                <td className="px-6 py-4">{sub.interval}</td>
                <td className="px-6 py-4">{sub.current_period_start}</td>
                <td className="px-6 py-4">{sub.current_period_end}</td>
                <td className="px-6 py-4 flex flex-col space-y-2">
                  {sub.is_allow_to_cancel && (
                    <button
                      onClick={() => handleCancel(sub.stripe_id)}
                      className="p-2 bg-red-700 text-white cursor-pointer"
                    >
                      cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
