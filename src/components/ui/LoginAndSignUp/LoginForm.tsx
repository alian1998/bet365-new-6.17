"use client";

import Form from "@/components/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";
import { postData } from "@/utils/postData/postAction/PostAction";
import { ErrorToastAlert, ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import Cookies from "js-cookie";
import { setGameToken } from "@/utils/token";
import FormInputField from "@/components/Form/FormInputField";
import Button3d from "../Button3d";

export const validationSchema = z.object({
  userName: z.string().min(1, "This field is required."),
  password: z.string().min(1, "This field is required."),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (loginData: FieldValues) => {
      const response = await postData({
        data: loginData,
        postUrl: "/auth/login",
      });
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success == true) {
        setGameToken(data?.data?.token);
        Cookies.set("gameToken", data?.data?.token, { expires: 10 });
        router.replace("/");
        window.location.reload();
        ToastAlert("Login Successfull");
      } else {
        ErrorToastAlert(data?.message);
      }
    },
  });

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutate(data);
  };

  return (
    <div className="">
      <h2 className="text-white text-2xl font-normal mb-3">Welcome Back</h2>

      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          userName: "",
          password: "",
        }}
      >
        <div>
          <div className="relative">
            <FormInputField
              title="Username"
              name="userName"
              type="text"
              placeholder="User Name"
              className="px-3 bg-transperant"
            />
          </div>
          <div className="relative">
            <FormInputField
              title="Password"
              name="password"
              type={!showPassword ? "password" : "text"}
              className="px-3 bg-transperant"
              placeholder="Password"
            />
            <div className="absolute z-50  right-3 font-bold top-[33px] flex items-center gap-2">
              {showPassword ? (
                <GoEye
                  onClick={handleTogglePassword}
                  className="text-white1 size-6  stroke-[2] cursor-pointer"
                />
              ) : (
                <GoEyeClosed
                  onClick={handleTogglePassword}
                  className="text-white1 size-6 stroke-[2] cursor-pointer"
                />
              )}
            </div>
          </div>
          <Link href="/forgot-password" className="">
            <p className="text-white text-xl font-medium">Forgot Password</p>
          </Link>

          <div className="py-2 font-medium rounded w-full text-black1">
            {isPending ? (
              <div className="w-full bg-none border border-[#fffb00b1] py-2 rounded-md flex justify-center items-center">
                <BounceLoader color="#fff900" size={25} speedMultiplier={2} />
              </div>
            ) : (
              <div className="py-4">
                <div className="w-full">
                  {/* Forgot Password text */}
                  <div className="relative">
                    {/* Main button */}
                    <Button3d name="Log in" />
                  </div>
                </div>
              </div>
            )}
            <div className="text-white text-xl xxs:text-xl">
              Do not have an account?{"  "}
              <Link href="/sign-up" className="text-[#fff900]">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
