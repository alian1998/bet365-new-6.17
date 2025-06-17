"use client";
// import Form from "@/components/Form/Form";
// import FormInputField from "@/components/Form/FormInputField";
import HistoryContainer from "@/components/shared/container/HistoryContainer";
import FadeLoaderSpin from "@/components/shared/loading/FadeLoader";
import { ContextApi } from "@/lib/provider/Providers";
import { Images } from "@/lib/store/Index";
import axiosInstance from "@/utils/axiosConfig";
import { copyToClipboard } from "@/utils/copyButton/CopyButton";
import { getGameToken } from "@/utils/token";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
// import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaCopy } from "react-icons/fa";
import { z } from "zod";
import RaferralModal from "./ReferralModal";
// import { motion } from "framer-motion";
import { mainDomain } from "@/utils/api";
import { useGetData } from "@/utils/fetchData/FetchData/FetchData";
import { ITransaction } from "@/types/refer/refer";
import SidebarPageHeader from "../SidebarPageHeader";

export const validationSchema = z.object({
  from: z.string().min(1, "This field is required."),
  to: z.string().min(1, "This field is required."),
});

// type IReferralUser = {
//   id: string;
//   fullName: string;
//   userName: string;
//   email: string;
//   phone: string | null;
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
// };

const Referral = ({
  handlePersonalInfo,
}: {
  handlePersonalInfo: (e: string) => void;
}) => {
  const [toggle, setToggle] = useState<string>("1");

  const token = getGameToken();
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }

  const { copyTime, setCopyTime } = context;

  const ProfileDataFetch = async () => {
    const response = await axiosInstance.get(`/profile`);
    return response.data;
  };

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: ProfileDataFetch,
    staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!token,
  });
  const profile = profileData;
  const shareLink = `${mainDomain}/sign-up?referral=${profile?.myReferalCode}&id=${profile?.adminId}`;
   
  const handleCopyTimeOut = () => {
     
    copyToClipboard(shareLink);
    setCopyTime(true);
    setTimeout(() => {
      setCopyTime(false);
    }, 1000);
  };

  const [shareModal, setShareModal] = useState(false);
  const handleShareModal = () => {
    setShareModal(!shareModal);
  };

  const [selectedDays, setSelectedDays] = useState("7");
  const {
    data,
    isLoading,
    refetch: referRefetch,
  } = useGetData(
    "refferbonushistory",
    `/player-deposit/get-all-reffer-bonus-history?days=${selectedDays}`
  );
  const referralDatas = data?.data?.result;
  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const days = e.target.value;
    await setSelectedDays(days);
    referRefetch();
  };

  useEffect(() => {
    referRefetch();
  }, [selectedDays, referRefetch]);


  return (
    <>
      <HistoryContainer>
        <RaferralModal
          data={shareLink}
          shareModal={shareModal}
          handleShareModal={handleShareModal}
        />
        <div className="min-h-screen overflow-auto font-semibold">

          <SidebarPageHeader
            title="Referral"
            handleClose={handlePersonalInfo}
          ></SidebarPageHeader>
          <div className="mainBgColor relative p-3 h-[100px] flex flex-col justify-center gap-5">
            {/* <div className=" flex justify-center items-center px-5">
              <h6 className="text-white1 font-bold">Referral</h6>
              <div
                onClick={() => handlePersonalInfo("")}
                className="size-8 p-2 rounded bg-[#ff1515] absolute right-5 cursor-pointer"
              >
                <RxCross1 className="size-full" />
              </div>
            </div> */}
            <div className="flex justify-between items-center px-14">
              <h6
                className={`${toggle == "1"
                  ? "text-secondary settled relative"
                  : " text-white cursor-pointer"
                  }`}
                onClick={() => setToggle("1")}
              >
                My Referral
              </h6>
              <h6
                className={`${toggle == "2"
                  ? "text-secondary settled relative"
                  : " text-white cursor-pointer"
                  }`}
                onClick={() => setToggle("2")}
              >
                History
              </h6>
            </div>
          </div>
          {profileLoading && isLoading ? (
            <FadeLoaderSpin />
          ) : (
            <div className="mainBgColor w-full h-[calc(100vh-100px)] text-white1 px-3 pt-5 ">
              {toggle == "1" ? (
                <div className=" space-y-3">
                  <div className="relative">
                    <div className="absolute cardColor rounded-full right-0 left-0 top-[55px] size-fit mx-auto">
                      <Image
                        className="size-[120px]"
                        src={Images.giftBox}
                        alt="img"
                        width={500}
                        height={500}
                      />{" "}
                    </div>
                    <div className=" w-full rounded-md cardColor2">
                      <div className="py-14 "></div>
                      <div className="  py-20 px-3  rounded-b-lg">
                        <div className="flex items-center gap-2 h-[54px]">
                          <div className="w-3/4 flex items-center justify-between  h-[54px]">
                            <div className="h-full px-1 rounded-none cardColor w-5/6 flex items-center justify-center  rounded-l-lg">
                              <h6 className=" text-[10px]">
                                {profile?.myReferalCode}
                              </h6>
                            </div>
                            <div
                              onClick={() => handleCopyTimeOut()}
                              className="cardColor2 w-1/6  h-full flex items-center justify-center rounded-r-lg cursor-pointer"
                            >
                              {copyTime ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#000"
                                  className="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              ) : (
                                <FaCopy className="size-6 text-white" />
                              )}
                            </div>
                          </div>
                          <button
                            onClick={handleShareModal}
                            className="text-white cardColor py-2 w-1/4 rounded-md h-full font-medium"
                          >
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cardColor2 w-full py-5 px-3 rounded-lg">
                    <h6>Referral Stats</h6>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1 items-center flex-1">
                        <h6 className="text-secondary text-[32px]">
                          {profile?.totalRefer}
                        </h6>
                        <p>Player joined</p>
                      </div>
                      <div className="flex flex-col gap-1 items-center flex-1">
                        <h6 className="text-secondary text-[32px]">
                          ৳{" "}
                          {data?.data?.totalReferBonus
                            ? data?.data?.totalReferBonus
                            : "0"}
                        </h6>
                        <p>Refer bonus</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="rounded-md flex justify-between items-center p-2">
                    <select
                      name="daysFilter"
                      id="daysFilter"
                      className="cardColor2 rounded-md py-1 font-medium text-white px-4"
                      value={selectedDays}
                      onChange={handleSelectChange}
                    >
                      <option className="text-white bg-black1" value="7">Last 7 Days</option>
                      <option className="text-white bg-black1" value="14">Last 14 Days</option>
                      <option className="text-white bg-black1" value="30">Last 30 Days</option>
                    </select>

                  </div>
                  <div className="w-full mt-5 overflow-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="cardColor2 text-white font-normal  sticky top-0">
                          <th className="text-left px-2 py-2 font-normal ">
                            Date
                          </th>
                          <th className="px-2 py-2 text-center font-normal ">
                            Player Name
                          </th>
                          <th className="px-2 py-2 text-right font-normal ">
                            Bonus Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {referralDatas?.map((item: ITransaction) => (
                          <tr
                            key={item.id}
                            className="cardColor2 borderColor"
                          >
                            <td className="px-2 py-2 text-white1">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-2 py-2 text-center text-white1">
                              {item.depositor.userName}
                            </td>
                            <td className="px-2 py-2 text-right">
                              ৳ {item.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </HistoryContainer>
    </>
  );
};

export default Referral;
