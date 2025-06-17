import { ContextApi } from "@/lib/provider/Providers";
import axiosInstance from "@/utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";

interface Wallet {
  balance?: number;
}

interface ProfileData {
  wallet?: Wallet;
}

interface ProfileAndBalanceProps {
  handleProfile: () => void;
  profileData: ProfileData;
}

const ProfileAndBalance: React.FC<ProfileAndBalanceProps> = ({
  handleProfile,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("error");
  }

  const { token, setProfile, setShowMenu, setGalleryOpen, assets } = context;
  const handleCloseModal = () => {
    setProfile(false);
    setShowMenu(false);
    setGalleryOpen(false);
  };
  const ProfileDataFetch = async () => {
    const response = await axiosInstance.get(`/profile/balance`);
    return response.data;
  };

  const { data: balance, refetch } = useQuery({
    queryKey: ["balance"],
    queryFn: ProfileDataFetch,
    staleTime: 1000, // Data is considered fresh for 1 second
    refetchInterval: 10000, // Auto refetch every 10 seconds
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!token,
  });

  const handleRefreshClick = () => {
    setIsSpinning(true);
    refetch();
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  };


  return (
    <>
      <div className="flex justify-between">
        <div className="bgColor flex justify-between items-center gap-5 pr-3 py-3 rounded  w-full h-fit">
          <div className="flex items-center gap-2">
            <Link href={"/"} onClick={handleCloseModal}>
              <Image
                className="xs:w-[200px] w-[120px] h-fit"
                src={assets?.mainLogo}
                alt="logo"
                width={500}
                height={500}
              />
            </Link>
          </div>
          <div
            onClick={handleProfile}
            className="xs:size-8 size-6 bg-[#ff1515] xs:p-2 p-1 rounded flex justify-center items-center cursor-pointer"
          >
            <RxCross1 className="size-full " />
          </div>
        </div>
      </div>
      <div className="my-3">
        <div className="flex items-center gap-2">
          <h6 className="text-white">Balance</h6>
          <LuRefreshCcw
            className={`text-white size-6 cursor-pointer ${isSpinning ? "animate-custom-spin" : ""
              }`}
            onClick={handleRefreshClick}
          />
        </div>
        <h6 className="font-semibold text-white text-[24px]">
          ৳ {balance?.balance.toLocaleString() ?? 0}
        </h6>
      </div>
    </>
  );
};

export default ProfileAndBalance;
