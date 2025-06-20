"use client";
import React, { useContext, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import icon from "../../../../assets/images/deposit/home-page-deposticoin-icon.png";
import Image from "next/image";
import { ContextApi } from "@/lib/provider/Providers";
import Link from "next/link";
// import { IBalance } from "@/app/(mainLayout)/page";

import axiosInstance from "@/utils/axiosConfig";
import { TbCurrencyTaka } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";

const HomeBalance = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  // const [newBalance, setNewBalance] = useState<number>(balance);
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("error");
  }
  const { token } = context;

  const ProfileDataFetch = async () => {
    const response = await axiosInstance.get(`/profile/balance`);
    return response.data;
  };

  const { data: balances, refetch } = useQuery({
    queryKey: ["balance"],
    queryFn: ProfileDataFetch,
    // staleTime: 1000, // Data is considered fresh for 1 second
    // refetchInterval: 10000, // Auto refetch every 10 seconds
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!token,
  });

  const handleRefreshClick = () => {
    setIsSpinning(true);
    refetch();
  };

  const {
    setShowMenu,
    setProfile,
    setGalleryOpen,
    setPersonalInfo,
    setHistory,
  } = context;

  const handleCloseAllModal = () => {
    setShowMenu(false);
    setProfile(false);
    setGalleryOpen(false);
    setPersonalInfo("");
    setHistory("");
  };
  return (
    <div className="px-3 border-4 rounded-lg border-secondary">
      <div className=" text-white">
        <div className="">
          <div className="flex justify-between items-center gap-2">
            <div>
              <div className="flex place-items-center gap-2">
                <h6 className="text-white font-semibold ">Balance</h6>
                <LuRefreshCcw
                  className={`text-white size-6 cursor-pointer ${
                    isSpinning ? "animate-custom-spin" : ""
                  }`}
                  onClick={() => handleRefreshClick()}
                />
              </div>

              <h6 className="text-white font-semibold  flex items-center text-xl">
                <TbCurrencyTaka className="size-6" />
                {balances?.balance?.toLocaleString() ?? 0}
              </h6>
            </div>

            <div className="flex gap-2 place-items-center">
              <Image
                className="w-[60px] h-[60px]"
                width={50}
                height={50}
                src={icon}
                alt="coin-icon"
              />{" "}
              <div>
                <Link
                  href="/deposit"
                  onClick={handleCloseAllModal}
                  className="bg-yellow rounded-md px-4 py-1 font-semibold text-black"
                >
                  Deposit
                </Link>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBalance;
