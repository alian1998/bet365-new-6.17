"use client";

import { ContextApi } from "@/lib/provider/Providers";
import { IProfileData } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { GoArrowRight } from "react-icons/go";

export interface IProps {
  showMenu: boolean;
  handleShowMenu: () => void;
  handleProfile?: () => void;
  profileData: IProfileData | any;
  token: string | null;
}

const BalanceAndProfile = ({
  token,
  showMenu,
  handleShowMenu,
  handleProfile,
  profileData,
}: IProps) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("error");
  }
  const { setShowMenu, assets } = context;
  const handleCloseModal = () => {
    // setProfile(false);
    setShowMenu(false);
    // setGalleryOpen(false);
  };

  return (
    <>
      <div className="flex justify-between text-white">
        <div className="flex justify-between py-2 items-center rounded bgColor w-4/5 pr-2">
          <Link href="/" onClick={handleCloseModal}>
            <Image
              className="xs:w-[200px] w-[120px] h-[50px]"
              src={assets?.mainLogo}
              alt="logo"
              height={500}
              width={500}
            />
          </Link>

          {!token ? (
            ""
          ) : (
            <div>
              <h6 className="text-white font-semibold capitalize">
                {profileData?.userName}
              </h6>
              <button
                onClick={handleProfile}
                className="bg-primary2 text-white px-3 py-1 xs:text-[14px] text-[10px] rounded-md   mt-1"
              >
                Profile
              </button>
            </div>
          )}
        </div>
        <div
          onClick={handleShowMenu}
          className="size-7 bg-black rounded flex justify-center items-center cursor-pointer "
        >
          <GoArrowRight
            className={`size-full ${showMenu ? "" : "rotate-180"}`}
          />
        </div>
      </div>
    </>
  );
};

export default BalanceAndProfile;
