"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { passwordValidator } from "@/lib/utils/validators";
import axios from "axios";
import { useAuth } from "@/lib/hooks/authProvider";

const ResetPassworForm = ({ uidb64, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState([]);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValidPassword, errors } = passwordValidator(password, password2);

    if (isValidPassword) {
      try {
        const postData = {
          uidb64,
          token,
          email,
          password,
        };
        const res = await axios.post("/api/reset-password", postData);
        auth.login(res.data.email, res.data.username);
      } catch (e) {
        console.log(e);
        const errMsg =
          e.response?.data?.error || "Cannot change password. Try again later.";
        setErr([errMsg]);
      }
    } else {
      setErr(errors);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Reset Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            {err.length > 0 && (
              <ul className="bg-red-200 p-2">
                {err.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr([]);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErr([]);
                }}
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  setErr([]);
                }}
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default function page() {
  const [isValidLink, setIsValidLink] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  useEffect(() => {
    if (uidb64 && token) {
      setIsValidLink(true);
    } else {
      router.replace("/forgot-password");
    }
  }, []);

  return (
    <>
      {!isValidLink ? (
        <div>Invalid Request. Please send request again.</div>
      ) : (
        <ResetPassworForm uidb64={uidb64} token={token} />
      )}
    </>
  );
}
