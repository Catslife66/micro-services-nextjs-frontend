"use client";

import { useAuth } from "@/lib/hooks/authProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [isMonthlyPrice, setIsMonthlyPrice] = useState(true);
  const [plans, setPlans] = useState([]);
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function getPlans() {
      try {
        const res = await axios.get("api/plans");
        setPlans(res.data.plans);
      } catch (e) {
        console.log("error is", e);
      }
    }
    getPlans();
  }, []);

  const handleClick = async (price_id) => {
    if (auth.isLoggedIn) {
      try {
        const res = await axios.post("/api/checkouts", {
          useremail: auth.user.email,
          price_id: price_id,
        });
        router.push(res.data.checkoutUrl);
      } catch (e) {
        console.log(e);
      }
    } else {
      router.push("/login?next=/pricing");
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="flex items-center justify-center mb-8">
            <span className="mr-3 text-gray-600">Monthly</span>
            <div
              onClick={() => setIsMonthlyPrice(!isMonthlyPrice)}
              className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors ${
                isMonthlyPrice ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform transform ${
                  isMonthlyPrice ? "translate-x-0" : "translate-x-8"
                }`}
              ></div>
            </div>
            <span className="ml-3 text-gray-600">Yearly</span>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {plans.map((plan, idx) => {
              let interval = isMonthlyPrice ? "month" : "year";
              const price = plan.prices.find((p) => p.interval === interval);
              return (
                <div
                  key={idx}
                  className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
                >
                  <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
                  <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    {plan.descriptions
                      ? plan.descriptions
                      : "Best option for personal use & for your next project."}
                  </p>
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">
                      £{price.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /{isMonthlyPrice ? "month" : "year"}
                    </span>
                  </div>

                  {/* plan features */}
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Individual configuration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>No setup, or hidden fees</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>
                        Team size:{" "}
                        <span className="font-semibold">1 developer</span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>
                        Premium support:{" "}
                        <span className="font-semibold">6 months</span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>
                        Free updates:{" "}
                        <span className="font-semibold">6 months</span>
                      </span>
                    </li>
                  </ul>

                  <button
                    onClick={() => handleClick(price.stripe_id)}
                    className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-blue-900"
                  >
                    Buy plan
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
