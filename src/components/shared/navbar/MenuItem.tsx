"use client";
import DepositAndWithdrawButton from "./DepositAndWithdrawButton";
import GalleryOne from "./profileSection/galleryOne/GalleryOne";
import GalleryTwo from "./GalleryTwo";
import BalanceAndProfile from "./BalanceAndProfile";
import { useContext } from "react";
import ProfileSection from "./ProfileSection";
import ProfileSocialLink from "./profileSection/ProfileSocialLink";
import { ContextApi } from "@/lib/provider/Providers";
import axiosInstance from "@/utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import LogoutAndHomeButton from "./LogoutAndHomeButton";
export interface IProps {
  showMenu: boolean;
  handleShowMenu: () => void;
  setProfile?: () => void;
  token: any;
}
const MenuItem = ({ showMenu, handleShowMenu, token }: IProps) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("error");
  }

  const { profile, setProfile, setShowMenu, assets } = context;

  const handleProfile = () => {
    setProfile(!profile);
  };

  const ProfileDataFetch = async () => {
    const response = await axiosInstance.get(`/profile`);
    return response.data;
  };
  const { data: profileData, refetch } = useQuery({
    queryKey: ["profileData"],
    queryFn: ProfileDataFetch,
    staleTime: 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!token,
  });
  return (
    <>
      <ProfileSection
        profileData={profileData}
        profile={profile}
        handleProfile={handleProfile}
        refetch={refetch}
      />
      <div
        className={`${
          showMenu
            ? "fixed w-full min-h-screen md:max-w-[450px] overflow-auto z-[9] py-3"
            : "-z-[100] pointer-events-none -left-full"
        }`}
      >
        <div
          className={` mainBgColor  p-3 z-10 ${
            showMenu
              ? "w-full z-[101] duration-[0.4s] min-h-screen overflow-auto absolute top-0 left-0 transition-all ease-in pb-14"
              : "w-0 -left-full duration-[0.4s] min-h-screen overflow-auto absolute top-0  transition-all ease-in"
          }`}
        >
          <BalanceAndProfile
            showMenu={showMenu}
            handleShowMenu={handleShowMenu}
            handleProfile={handleProfile}
            profileData={profileData}
            token={token}
          />

          {/* deposit withdraw */}
          <DepositAndWithdrawButton />
          <GalleryOne setShowMenu={setShowMenu} />

          {/* profile */}
          <GalleryTwo  setShowMenu={setShowMenu}  />

          {/* social */}
          <ProfileSocialLink profileData={profileData} assets={assets} />

          {/* telegran */}
          {/* <SocialNav /> */}
          {token && <LogoutAndHomeButton />}

          {/* login and home button */}
          {/* <LogoutAndHomeButton /> */}
        </div>
      </div>
    </>
  );
};

export default MenuItem;
