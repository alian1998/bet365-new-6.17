import Form from "@/components/Form/Form";
import FormInputField from "@/components/Form/FormInputField";
import PersonalInfocontainer from "@/components/shared/container/PersonalInfocontainer";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GoChevronUp, GoEye, GoEyeClosed } from "react-icons/go"; 
import { z } from "zod";
import { PiWarningCircle } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";
import axiosInstance from "@/utils/axiosConfig";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import { useMutation } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";
import { logout } from "@/utils/auth";
import SidebarPageHeader from "../SidebarPageHeader";

export const validationSchema = z.object({
  oldPassword: z.string().min(1, "This field is required."),
  newPassword: z.string().min(1, "This field is required."),
  confirmPassword: z.string().min(1, "This field is required."),
});

const ResetPassword = ({
  handlePersonalInfo,
}: {
  handlePersonalInfo: (e: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [showPassword3, setShowPassword3] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FieldValues) => {
      const response = await axiosInstance.post(`/auth/change-password`, data);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success == true) {
        ToastAlert("Password Reset Successfully");
        logout();
        router.push("/");
      }
    },
    onError(err: any) {
      ToastAlert(err?.message);
    },
  });
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await Swal.fire({
      text: "You want to rest password?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        popup: "custom-swal-modal",
      },
    });
    if (result.isConfirmed) {
      mutate(data);
    }
  };

  return (
    <PersonalInfocontainer>
      <div className="min-h-screen overflow-auto mainBgColor">
        <SidebarPageHeader
          title="Reset Password"
          handleClose={handlePersonalInfo}
        ></SidebarPageHeader>
        <div className="mainBgColor w-full px-3 h-[calc(100vh-10px)]">
          <Form
            onSubmit={formSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
          >
            <div className="space-y-4 pt-4">
              <div className="relative">
                <FormInputField
                  title="Current Password"
                  name="oldPassword"
                  type={!showPassword1 ? "password" : "text"}
                  className="px-3 cardColor2  placeholder:text-white2"
                  placeholder="Password"
                />
                <div className=" absolute right-2 top-[34px] flex items-center gap-2">
                  {showPassword1 ? (
                    <GoEye
                      onClick={() => setShowPassword1(!showPassword1)}
                      className="text-white1 size-6  stroke-[1] cursor-pointer"

                    />
                  ) : (
                    <GoEyeClosed
                      onClick={() => setShowPassword1(!showPassword1)}
                      className="text-white1 size-6  stroke-[1] cursor-pointer"

                    />
                  )}
                </div>
              </div>
              <div className="relative">
                <FormInputField
                  title="New Password"
                  name="newPassword"
                  type={!showPassword2 ? "password" : "text"}
                  className="px-3 cardColor2  placeholder:text-white2"
                  placeholder="New Password"
                />
                <div className=" absolute right-2 top-[34px] flex items-center gap-2">
                  {showPassword2 ? (
                    <GoEye
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="text-white1 size-6  stroke-[1] cursor-pointer"

                    />
                  ) : (
                    <GoEyeClosed
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="text-white1 size-6  stroke-[1] cursor-pointer"

                    />
                  )}
                </div>
              </div>
              <div className="relative">
                <FormInputField
                  title="Confirm Password"
                  name="confirmPassword"
                  type={!showPassword3 ? "password" : "text"}
                  className="px-3 cardColor2  placeholder:text-white2"
                  placeholder="New Password"
                />
                <div className=" absolute right-2 top-[34px] flex items-center gap-2">
                  {showPassword3 ? (
                    <GoEye
                      onClick={() => setShowPassword3(!showPassword3)}
                      className="text-white1 size-6  stroke-[1] cursor-pointer"

                    />
                  ) : (
                    <GoEyeClosed
                      onClick={() => setShowPassword3(!showPassword3)}
                      className="text-white1 size-6  stroke-[1] cursor-pointer"

                    />
                  )}
                </div>
              </div>
              <div className="text-white1 cardColor2 rounded p-3">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={toggleOpen}
                >
                  <div className="flex items-center gap-3">
                    <PiWarningCircle className="text-[24px]" />{" "}
                    <p className="font-medium">Password Requirement</p>
                  </div>
                  {isOpen ? (
                    <GoChevronUp className="text-[24px]" />
                  ) : (
                    <GoChevronDown className="text-[24px]" />
                  )}
                </div>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                  <ul className="list-decimal list-inside mt-3">
                    <li>Must be between 6-20 characters long.</li>
                    <li>
                      Must contain at least one English letter and one numeric.
                    </li>
                    <li>Allow uppercase and lowercase letters.</li>
                    <li>Must contain at least one number (0-9).</li>
                    <li>Special characters (@ $) are allowed.</li>
                  </ul>
                </div>
              </div>
              <div className="py-2 font-medium rounded w-full text-black1">
                {isPending ? (
                  <div className="w-full bg-none border border-[#fffb00b1] py-2 rounded-md flex justify-center items-center">
                    <BounceLoader
                      color="#fff900"
                      size={25}
                      speedMultiplier={2}
                    />
                  </div>
                ) : (
                  <button className="cardColor text-white font-medium rounded w-full py-2">
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </PersonalInfocontainer>
  );
};

export default ResetPassword;
