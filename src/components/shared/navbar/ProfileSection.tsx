"use client";
import React, { useContext, useEffect } from "react";
import ProfileAndBalance from "./profileSection/ProfileAndBalance";
import DepositAndWithdrawButton from "./DepositAndWithdrawButton";
import SocialNav from "./SocialNav";
import ProfileHistory from "./profileSection/ProfileHistory";
import ProfileInfo from "./profileSection/ProfileInfo";
import Bettingrecord from "./profileSection/history/BattingRecord";
import TernOver from "./profileSection/history/TernOver";
import PersonalInfo from "./profileSection/myInfo/PersonalInfo";
import ResetPassword from "./profileSection/myInfo/ResetPassword";
import Mailbox from "./profileSection/myInfo/Mailbox";
import Referral from "./profileSection/myInfo/Referral";
import { ContextApi } from "@/lib/provider/Providers";
import DepositHistory from "./profileSection/history/DepositHistory";
import { RxExit } from "react-icons/rx";
import { logout } from "@/utils/auth";
import { UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosConfig";
import TotalWin from "./profileSection/myInfo/TotalWin";
import TotalLoss from "./profileSection/myInfo/TotalLoss";
import Bonus from "./profileSection/myInfo/Bonus";
import Transaction from "./profileSection/myInfo/Transaction";
import Withdrawhistory from "./profileSection/history/Withdrawhistory";


interface IProps {
  profile: boolean;
  handleProfile: () => void;
  profileData: any;
  refetch: UseQueryResult["refetch"];
}

const ProfileSection = ({
  profileData,
  profile,
  handleProfile,
  refetch,
}: IProps) => {
  const context = useContext(ContextApi);

  if (!context) {
    throw new Error("something wrong");
  }

  const { token, history, setHistory, personalInfo, setPersonalInfo } = context;
  const handleHistory = (e: string) => {
    setHistory(e);
  };
  const handlePersonalInfo = (e: string) => {
    setPersonalInfo(e);
  };

  useEffect(() => {
    if (!token || !profile) return;

    const triggerActions = async () => {
      try {
        const [gscRes, cricketRes] = await Promise.all([
          axiosInstance.get('/gsclaunch/gscTransferWithdrawal'),
          axiosInstance.get('/cricketv1/betmandu/betmanduTransferWithdrawal'),
        ]);

        console.log("🔁 GSC Transfer Withdrawal Response:", gscRes);
        console.log("🏏 Cricket Launch Exchange Response:", cricketRes);
      } catch (err) {
        console.error("❌ Error calling APIs:", err);
      }
    };

    triggerActions();
  }, [profile, token]); // 👈 Triggers only when profile or token changes



  return (
    <div>
      {history == "1" ? (
        <Bettingrecord handleHistory={handleHistory} />
      ) : history == "2" ? (
        <TernOver handleHistory={handleHistory} />
      ) : history == "3" ? (
        <DepositHistory handleHistory={handleHistory} />
      ) : history == "4" ? (
        <Withdrawhistory handleHistory={handleHistory} />
      ) : (
        ""
      )}

      {personalInfo == "1" ? (
        <PersonalInfo
          refetch={refetch}
          profileData={profileData}
          handlePersonalInfo={handlePersonalInfo}
        />
      ) : (
        ""
      )}
      {personalInfo == "2" ? (
        <ResetPassword handlePersonalInfo={handlePersonalInfo} />
      ) : (
        "" 
      )}
      {personalInfo == "3" ? (
        <Mailbox handlePersonalInfo={handlePersonalInfo} />
      ) : (
        ""
      )}
      {personalInfo == "4" ? (
        <Referral handlePersonalInfo={handlePersonalInfo} />
      ) : (
        ""
      )}

      {personalInfo == "5" ? (
        <TotalWin handlePersonalInfo={handlePersonalInfo} />
      ) : (
        ""
      )}
      {/* total win / total loss / bonus / transaction modal */}

      {personalInfo == "6" ? (
        <TotalLoss handlePersonalInfo={handlePersonalInfo} />
      ) : (
        ""
      )}

      {personalInfo == "7" ? (
        <Bonus handlePersonalInfo={handlePersonalInfo} />
      ) : (
        ""
      )}
      {personalInfo == "8" ? (
        <Transaction handlePersonalInfo={handlePersonalInfo} />
      ) : (
        ""
      )}

      {/* total win / total loss / bonus / transaction modal */}


      <div
        className={`${profile
          ? "fixed w-full min-h-screen overflow-auto md:max-w-[450px] z-[10]"
          : "-z-[101] pointer-events-none -left-full hidden"
          }`}
      >
        <div className="mainBgColor overflow-auto p-2 h-screen pb-20">
          <ProfileAndBalance
            profileData={profileData}
            handleProfile={handleProfile}
          //  send get fun
          />
          <DepositAndWithdrawButton />
          <ProfileInfo handlePersonalInfo={handlePersonalInfo} />
          <ProfileHistory handleHistory={handleHistory} />
          <SocialNav />

          {/* {token && (
            <div className="mb-2">
              <div
                onClick={() => logout()}

                className="flex-1 bg-deepSlate flex flex-row-reverse justify-center items-center gap-3 xs:py-3 py-2 rounded-md cursor-pointer"
              >
                <p className="text-white1 font-medium text-[14px]">Log Out</p>
                <RxExit className="text-secondary rotate-180 size-5" />
              </div>
            </div>
          )} */}
          {
            token &&
            <button onClick={() => logout()} className="mt-8 w-full bg-[#0f1f17] text-white py-3 rounded-md text-xl font-bold flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
              {/* <LogOut className="h-6 w-6 mr-2" /> */}
              <RxExit className="stroke-[1] rotate-180 size-5 mr-2" />

              Log Out
            </button>
          }

        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
