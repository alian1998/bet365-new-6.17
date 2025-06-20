"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useContext } from "react";
import SignUpForm from "./SignUpForm";
import { ContextApi } from "@/lib/provider/Providers";
const SignUp = ({ data }: any) => {
  const [registrationMethod, setRegistrationMethod] = useState<"1" | "2">("1");

  // useEffect(() => {
  //   if (registrationMethod === "1") {
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = "";
  //     };
  //   }
  // }, [registrationMethod]);

  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { assets } = context;

  return (
    <div className="w-full min-h-screen overflow-y-auto items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat ">
      <div className=" ">
        <div className="w-full">
          <Link href="/">
            {assets?.mainLogo && (
              <Image
                className="sm:w-52 w-44 absolute top-[30px] right-0 left-0 mx-auto"
                src={assets?.mainLogo}
                alt="logo"
                width={500}
                height={100}
                priority
                lazyBoundary="2px"
              />
            )}
          </Link>
        </div>
        <div className={`${registrationMethod === "1" ? "" : ""}`}>
          <div className="px-3 w-full pt-20 h-full">
            <h2 className="mt-2 text-center pt-10 text-white text-2xl mb-2">
              Create New Account
            </h2>
            <SignUpForm
              data={data}
              registrationMethod={registrationMethod}
              setRegistrationMethod={setRegistrationMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
