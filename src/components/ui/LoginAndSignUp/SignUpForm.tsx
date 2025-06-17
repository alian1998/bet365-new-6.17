"use client";

import { useSearchParams } from "next/navigation";
import SignUpOne from "./SignUpOne";
import SignUpTwo from "./SignUpTwo";
// import { getGameToken } from "@/utils/token";
// import { useRouter } from "next/navigation"; // 👈 import this
import { useEffect } from "react";
import Cookies from "js-cookie";

const SignUpForm = ({
  registrationMethod,
  setRegistrationMethod,
  data,
}: any) => {
  const agents = data?.data;

  // const token = getGameToken();

  // const router = useRouter();

  const searchParams = useSearchParams();
  const reffferal = searchParams.get("referral");
  const id = searchParams.get("id");
  const affiliateReferalId = searchParams.get("affiliateReferalId");
  const agentOption = id
    ? agents
        .filter((item: any) => item.id === id)
        .map((user: any) => ({
          label: user.whatsApp,
          value: user.id,
        }))
    : agents.map((user: any) => ({
        label: user.whatsApp,
        value: user.id,
      }));

  // Logout if referral is present
  useEffect(() => {
    if (reffferal) {
      localStorage.removeItem("gameToken");
      Cookies.remove("gameToken");
    }
  }, [reffferal]);

  // // Redirect if token exists
  // useEffect(() => {
  //   if (token) {
  //     router.replace("/");
  //   }
  // }, [token, router]);

  // useEffect(() => {
  //   if (token) {
  //     router.replace("/");
  //   }
  // }, [token, router]);

  return (
    <div className="b-2 px-0 z-40">
      <div className="flex justify-center gap-3 mb-4 mt-4 overflow-hidden">
        {["1", "2"].map((value) => (
          <div
            key={value}
            className="relative w-full max-w-[140px]  transform-gpu"
          >
            {/* Main button */}
            <button
              onClick={() => setRegistrationMethod(value)}
              className={` ${
                value == registrationMethod
                  ? "bg-emerald-800"
                  : "bg-transperant"
              } relative z-10 w-full px-3 text-white  py-2 px-2 font-semibold rounded-md text-[14px] sm:text-[16px] 
             px-2 border-2 border-white rounded-md py-2 `}
            >
              {value === "1" ? "Signup" : "Custom Signup"}
            </button>
          </div>
        ))}
      </div>
      <div className="min-h-[600px] transition-all duration-300">
        {registrationMethod == "1" && (
          <SignUpOne
            data={data}
            reffferal={reffferal}
            agentOption={agentOption}
            affiliateReferalId={affiliateReferalId}
          />
        )}
        {registrationMethod == "2" && (
          <SignUpTwo
            data={data}
            reffferal={reffferal}
            agentOption={agentOption}
            affiliateReferalId={affiliateReferalId}
          />
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
