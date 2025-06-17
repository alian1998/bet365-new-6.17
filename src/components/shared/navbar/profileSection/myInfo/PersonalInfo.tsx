"use client";

import Form from "@/components/Form/Form";
import FormInputField from "@/components/Form/FormInputField";
import PersonalInfocontainer from "@/components/shared/container/PersonalInfocontainer";
import { Images } from "@/lib/store/Index";
import { IProfileData } from "@/types/common";
import axiosInstance from "@/utils/axiosConfig";
import { formatDate } from "@/utils/fromatDate";
import { ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form"; 
import Swal from "sweetalert2";
import { z } from "zod";
import SidebarPageHeader from "../SidebarPageHeader";

export const validationSchema = z.object({
  mobile: z
    .string()
    .min(1, "This field is required.")
    .refine((value) => !isNaN(Number(value)), "Must be a valid number")
    .transform((value) => Number(value)),
  email: z.string().email("").optional(),
  birthday: z.string().min(1, "This field is required."),
});

const PersonalInfo = ({
  handlePersonalInfo,
  profileData,
  refetch,
}: {
  handlePersonalInfo: (e: string) => void;
  profileData: IProfileData;
  refetch: UseQueryResult["refetch"];
}) => {
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  const [readon, setReadOn] = useState<boolean>(false);
  const [phoneValue, setPhoneValue] = useState<{ phone?: string }>({});
  const [emailValue, setEmailValue] = useState<{ email?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneValue((prev) => ({ ...prev, phone: value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue((prev) => ({ ...prev, email: value }));
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(profileData);
  const { mutate, isPending } = useMutation({
    mutationFn: async (phoneUpdateData: FieldValues) => {
      const response = await axiosInstance.patch(
        "/profile/update-user",
        phoneUpdateData
      );
      console.log(response);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success == true) {
        ToastAlert("Update Successfull");
        setReadOn(false);
        refetch();
      }
    },
  });
  const handleClick = async () => {
    const result = await Swal.fire({
      text: "You want to update phone?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-modal",
      },
    });
    if (result.isConfirmed) {
      mutate(phoneValue);
    }
  };

  const handleEmailUpdate = async () => {
    if (emailValue?.email) {
      if (!emailRegex.test(emailValue?.email)) {
        return;
      }
    }

    const result = await Swal.fire({
      text: "You want to update email?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-modal",
      },
    });
    if (result.isConfirmed) {
      mutate(emailValue);
    }
  };

  return (
    <PersonalInfocontainer>
      <SidebarPageHeader
        title="Personal Information"
        handleClose={handlePersonalInfo}
      ></SidebarPageHeader>

      <div className="mainBgColor w-full text-white1 px-3 pb-20">
        <div className="w-full py-4 flex flex-col justify-center items-center gap-3">
          <div className="size-[150px] border-4 border-white1 rounded-full">
            <Image
              className="size-full rounded-full object-cover"
              src={profileData?.profileImage ?? ""}
              alt="img"
              width={500}
              height={500}
            />
          </div>
          <h6 className="font-medium">{profileData?.fullName}</h6>
        </div>
        <div className="mainBgColor  w-full h-fit p-3 rounded">
          <div className="flex justify-between items-center text-white2 font-semibold">
            <div className="">
              <h6>User Name</h6>
              <p className="text-[12px] ">
                {profileData?.userName}
              </p>
            </div>
            <p className=" text-[14px]">
              Date Registered: {formatDate(profileData.createdAt)}
            </p>
          </div>
          <Form
            onSubmit={formSubmit}
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              mobile: profileData?.phone,
              email: profileData?.email || "",
              whatsapp: profileData?.admin?.whatsApp,
              username: profileData?.admin?.name,
            }}
          >
            <div className="space-y-4 mt-4">
              <div className="relative">
                <FormInputField
                  title="Mobile Number"
                  name="mobile"
                  type="string"
                  className="px-3 cardColor2 placeholder:text-white2"
                  placeholder="Mobile"
                  readOnly={!readon}
                  onChange={handleChange}
                />
                {!readon ? (
                  <h6
                    onClick={() => setReadOn(true)}
                    className="bg-black text-white px-2 cursor-pointer py-[4px] rounded text-black1 w-fit absolute top-[34px] right-1 text-[10px]"
                  >
                    Edit Phone
                  </h6>
                ) : (
                  <div className="flex items-center gap-3  absolute top-[34px] right-1 text-[10px]">
                    <button
                      disabled={
                        !phoneValue.phone || phoneValue.phone.length < 11
                      }
                      type="submit"
                      onClick={handleClick}
                      className={`bg-black px-2 py-[4px] rounded text-white w-fit ${!phoneValue.phone || phoneValue.phone.length < 11
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                        }`}
                    >
                      {!isPending ? "Update" : "Updating..."}
                    </button>
                    <button
                      type="submit"
                      onClick={() => setReadOn(false)}
                      className={`bg-black px-2 py-[4px] rounded text-white w-fit cousor-pointer`}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <FormInputField
                  title="Email"
                  name="email"
                  type="email"
                  className="px-3 cardColor2 placeholder:text-white2"
                  onChange={handleEmailChange}
                  placeholder={
                    profileData?.email ? "Email" : "Enter your email"
                  }
                  readOnly={!!profileData?.email} // Make it readonly if email exists
                />
                {!profileData?.email && (
                  <button
                    type="submit"
                    // disabled={!isEmailValid} // Disable button if email is invalid
                    onClick={handleEmailUpdate}
                    className="bg-black px-4 py-[4px] rounded text-white w-fit absolute top-[34px] right-1 text-[10px]"
                  >
                    Save
                  </button>
                )}
              </div>
              <div className="relative">
                <FormInputField
                  title="Agent WhatsApp"
                  name="whatsapp"
                  type="text"
                  className="px-3 cardColor2"
                  readOnly
                />
                <div
                  onClick={() => {
                    window.open(
                      `https://wa.me/${profileData?.admin?.whatsApp}`,
                      "_blank"
                    );
                  }}
                  className="w-fit absolute top-[30px] right-1 cursor-pointer"
                >
                  <Image
                    className="size-8"
                    src={Images.socialBanner1}
                    alt="WhatsApp"
                  />
                </div>
              </div>

              <FormInputField
                title="Agent Name"
                name="username"
                type="text"
                className="px-3 cardColor2"
                readOnly
              />
              <p>
                {`For privacy and security, Information can't modified after
                confirmation. Please contact`}
                <span className="text-[#134b33]"> customer service.</span>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </PersonalInfocontainer>
  );
};

export default PersonalInfo;
