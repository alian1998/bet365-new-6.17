"use client";

import Form from "@/components/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { z } from "zod";
import "react-international-phone/style.css";
import Link from "next/link";
import axiosInstance from "@/utils/axiosConfig";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { setGameToken } from "@/utils/token";
import { postData } from "@/utils/postData/postAction/PostAction";
import { ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import Cookies from "js-cookie";
import FormInputField from "@/components/Form/FormInputField";
import FormSelectField from "@/components/Form/FormSelectField";
import styles from "./PhoneInputCustom.module.css";
import LoadingAndButton3d from "@/components/shared/LoadingAndButton/LoadingAndButton3d";
import { PhoneInput } from "react-international-phone";
// import Button3d from "../Button3d";

export const validationSchema = z.object({
  userName: z.string().min(1, "This field is required."),
  fullName: z.string().min(1, "This field is required."),
  email: z.string().min(1, "This field is required."),
  password: z.string().min(1, "This field is required."),
  confirmPassword: z.string().min(1, "This field is required."),
  adminId: z.string().min(10, "This field is required."),
  referCode: z.string().optional(),
  affiliateReferalId: z.string().optional(),
});

const SignUpTwo = ({ reffferal, agentOption, affiliateReferalId }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [phone, setPhone] = useState<any>();
  const router = useRouter();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCPassword = () => {
    setShowCPassword(!showCPassword);
  };
  const [isValid, setIsValid] = useState<boolean>(true);
  const checkUser = async (username: string) => {
    try {
      const res = await axiosInstance.get("/auth/check-user-name", {
        params: { userName: username },
      });

      if (res) {
        setIsValid(true);
      }
    } catch (error: any) {
      setIsValid(false);
      console.log(error);
    }
  };

  const debouncedCheckUser = debounce((value: string) => {
    if (value.length >= 5) {
      checkUser(value);
    }
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedCheckUser(value);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (signUpData: FieldValues) => {
      const response = await postData({
        data: signUpData,
        postUrl: "/auth/register",
      });
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success == true) {
        setGameToken(data?.data?.token);
        Cookies.set("gameToken", data?.data?.token, { expires: 10 });
        router.push("/");
        window.location.reload();
        ToastAlert("Sign Up Successfull");
      } else {
        ToastAlert(data?.message);
      }
    },
  });
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { referCode, ...rest } = data;
    const payload = referCode ? { ...data } : { ...rest };
    mutate(payload);
  };

  return (
    <div>
      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          userName: "",
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          adminId: agentOption[0].value,
          referCode: reffferal ?? "",
          affiliateReferalId: affiliateReferalId ?? "",
        }}
      >
        <div className="font-medium">
          <FormInputField
            title="User Name"
            name="userName"
            type="text"
            className="px-3 bg-transperant"
            placeholder="User Name"
            onChange={handleChange}
          />

          <span>
            {isValid ? (
              <span className="text-green"> </span>
            ) : (
              <span className="text-red-500">already exist user name</span>
            )}
          </span>
          <div className="relative">
            <FormInputField
              title="Password"
              name="password"
              type={!showPassword ? "password" : "text"}
              className="px-3 bg-transperant"
              placeholder="Password"
            />
            <div className=" absolute right-3 font-bold top-[30px] flex items-center gap-2">
              {showPassword ? (
                <GoEye
                  onClick={handleTogglePassword}
                  className="text-white1 size-6 stroke-[2] cursor-pointer"
                />
              ) : (
                <GoEyeClosed
                  onClick={handleTogglePassword}
                  className="text-white1 size-6 stroke-[2] cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="relative">
            <FormInputField
              title="Confirm Password"
              name="confirmPassword"
              type={!showCPassword ? "password" : "text"}
              className="px-3 bg-transperant"
              placeholder="confirm Password"
            />
            <div className=" absolute right-3 font-bold top-[30px] flex items-center gap-2">
              {showCPassword ? (
                <GoEye
                  onClick={handleToggleCPassword}
                  className="text-white1 size-6 stroke-[2] cursor-pointer"
                />
              ) : (
                <GoEyeClosed
                  onClick={handleToggleCPassword}
                  className="text-white1 size-6 stroke-[2] cursor-pointer"
                />
              )}
            </div>
          </div>
          <FormInputField
            title="Full Name"
            name="fullName"
            type="text"
            className="px-3 bg-transperant"
            placeholder="Enter Your Full Name"
          />

          <div className="mt-2">
            <p className="text-gray-100 font-semibold text-[14px]">
              {"Mobile"}
            </p>
            <PhoneInput
              defaultCountry="bd"
              value={phone}
              onChange={(phone: string) => setPhone(phone)}
              className={`${styles.wrapper}  w-full `}
              inputClassName={styles.inputShadow}
              countrySelectorStyleProps={{ className: styles.countrySelector }}
              dialCodePreviewStyleProps={{ className: styles.dialCode }}
              placeholder="Your phone number"
            />
          </div>

          <FormInputField
            title="Email"
            name="email"
            type="email"
            className="px-3 bg-transperant"
            placeholder="Enter Your E-Mail"
          />
          <div>
            <p className="mb-1 text-white1 font-semibold text-[15px]">
              Select Agent <span className="text-red-500">*</span>
            </p>
            <FormSelectField
              name="adminId"
              className="bg-transperant signup-select"
              options={agentOption}
              type="string"
              defaultValue={0}
              readonly={!!reffferal}
            />
          </div>
          <FormInputField
            title="Refer Code (Optional)"
            name="referCode"
            type="text"
            className="px-3 bg-transperant"
            placeholder="Enter If You Have One"
            readOnly={!!reffferal}
          />
          <LoadingAndButton3d isPending={isPending} buttonName="Sign Up" />

          <div className="text-white text-xl">
            You have an account?{" "}
            <Link href="/login" className="text-[#fff900]">
              Log in
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUpTwo;
