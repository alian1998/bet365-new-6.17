"use client";
import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { ContextApi } from "@/lib/provider/Providers";
import { getGameToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getGameToken();
    if (token) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const context = useContext(ContextApi);
  if (!context) {
    console.error("something wrong");
    return;
  }
  const { assets } = context;

  return (
    <div className=" w-full bg-[url('/bg.jpg')] h-screen bg-cover bg-center bg-no-repeat">
      <div className="relative w-full h-20 flex items-center px-5 z-10">
        <Link href={"/"} className="absolute left-3">
          <button
            className="bgColor w-12 h-12 flex justify-center items-center bg-primary text-white rounded-full 
                outline-none relative z-0
                border-[5px] border-primary "
          >
            <FaArrowLeft className="text-2xl text-[#ddd]" />
          </button>
        </Link>
      </div>
      <div className="relative w-full  flex items-center px-4">
        {/* Centered Logo */}
        <div className="mx-auto h-12">
          <Link href="/">
            {assets?.mainLogo && (
              <Image
                className="sm:w-52 w-44 mx-auto"
                src={assets?.mainLogo}
                alt=""
                width={500}
                height={100}
                priority
                lazyBoundary="2px"
                blurDataURL={assets?.mainLogo}
              />
            )}
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center  ">
        <div className="w-full mt-[100px] px-4  z-10">
          <div className=" w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
