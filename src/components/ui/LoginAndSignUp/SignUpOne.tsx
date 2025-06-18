import Form from "@/components/Form/Form";
import FormInputField from "@/components/Form/FormInputField";
import FormSelectField from "@/components/Form/FormSelectField";
import LoadingAndButton3d from "@/components/shared/LoadingAndButton/LoadingAndButton3d";
import axiosInstance from "@/utils/axiosConfig";
import { postData } from "@/utils/postData/postAction/PostAction";
import { ErrorToastAlert, ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import { setGameToken } from "@/utils/token";
// import { setGameTokenInCookie } from "@/utils/token/tokenManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { PhoneInput } from "react-international-phone";
import styles from "./PhoneInputCustom.module.css";

import { z } from "zod";

export const validationSchema = z.object({
  userName: z.string().min(1, "This field is required."),
  password: z.string().min(1, "This field is required."),
  confirmPassword: z.string().min(1, "This field is required."),
  adminId: z.string().min(1, "This field is required."),
  affiliateReferalId: z.string().optional(),
});

const SignUpOne = ({ reffferal, agentOption, affiliateReferalId }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [phone, setPhone] = useState<any>();

  const router = useRouter();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCTogglePassword = () => {
    setShowCPassword(!showCPassword);
  };

  const checkUser = async (username: string) => {
    try {
      const res = await axiosInstance.get("/auth/check-user-name", {
        params: { userName: username },
      });
      if (res) {
        setIsValid(true);
      }
    } catch {
      setIsValid(false);
    }
  };

  // Debounced function
  const debouncedCheckUser = debounce((value: string) => {
    if (value.length >= 5) {
      checkUser(value);
    }
  }, 3000);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedCheckUser(value);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (signUpData: FieldValues) => {
      signUpData.referCode = reffferal;
      const response = await postData({
        data: signUpData,
        postUrl: "/auth/register",
      });
      console.log(response);
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
        ErrorToastAlert(data?.message);
      }
    },
  });
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
     data.phone = phone
    mutate(data);
  };

  return (
    <div>
      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          userName: "",
          password: "",
          confirmPassword: "",
          adminId: agentOption && agentOption[0]?.value,
          referCode: reffferal ?? "",
          affiliateReferalId: affiliateReferalId ?? "",
        }}
      >
        <div className="space-y-1 font-medium mt-3">
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
            <div className="absolute z-50  right-5 font-bold top-[33px] flex items-center gap-2">
              {showPassword ? (
                <GoEye
                  onClick={handleTogglePassword}
                  className="text-white1  stroke-[2] size-6 cursor-pointer"
                />
              ) : (
                <GoEyeClosed
                  onClick={handleTogglePassword}
                  className="text-white1  stroke-[2] size-6 cursor-pointer"
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
            <div className="absolute z-50  right-5 font-bold top-[33px] flex items-center gap-2">
              {showCPassword ? (
                <GoEye
                  onClick={handleCTogglePassword}
                  className="text-white1  stroke-[2] size-6 cursor-pointer"
                />
              ) : (
                <GoEyeClosed
                  onClick={handleCTogglePassword}
                  className="text-white1  stroke-[2] size-6 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="mt-2">
            <PhoneInput
              defaultCountry="bd"
              value={""}
              name="phone"
              required
              onChange={(phone: string) => setPhone(phone)}
              className={`${styles.wrapper}`}
              inputClassName={styles.inputShadow}
              // countrySelectorStyleProps={{ className: styles.countrySelector }}
              // dialCodePreviewStyleProps={{ className: styles.dialCode }}
              placeholder="Your phone number"
            />
          </div>

          <div>
            <p className="mb-1 text-white1 font-semibold text-[14px] ">
              Select Agent <span className="text-red-500">*</span>
            </p>
            <FormSelectField
              name="adminId"
              className="bg-transperant signup-select pb-10"
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
            className="px-3 bg-transperant text-whtie"
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

export default SignUpOne;
