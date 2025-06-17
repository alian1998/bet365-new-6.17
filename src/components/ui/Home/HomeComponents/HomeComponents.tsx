"use client";

import Afc from "@/components/ui/Home/Afc/Afc";
import Banner from "@/components/ui/Home/Banner/Banner";
import Card from "@/components/ui/Home/Card/Card";
import Headline from "@/components/ui/Home/Headline/Headline";
import PaymentMethod from "@/components/ui/Home/PaymentMethod/PaymentMethod";
import SocialLink from "@/components/ui/Home/SocialLink/SocialLink";
import Warning from "@/components/ui/Home/Warning/Warning";
import HomeBalance from "@/components/ui/Home/HomeBalance/HomeBalance";
import GamingLicense from "@/components/ui/Home/GamingLicense/GamingLicense";
import CopyRight from "@/components/ui/Home/Copyright.tsx/CopyRight";
import Details from "@/components/ui/Home/Details/Details";
// import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { useState } from "react";
import HelpDeskModal from "./HelpDeskModal";
// import icon from '@/assets/icon/msbutton.png'
import icon from "@/assets/icon/help.jpg";
import spinicon from "@/assets/icon/spinicon.gif";
import Image from "next/image";
import { useEffect } from "react";
import axiosInstance from "@/utils/axiosConfig";
import ChatModal from "./ChatModal";
import { useRef } from "react";
import { io } from "socket.io-client";
import { getGameToken } from "@/utils/token";
import Animation from "./Animation";
import SpinModal from "./SpinModal";
import claimBonusImage from "@/assets/claim_bonus.png";
import confetti from "canvas-confetti";

const token = getGameToken(); // ✅ user token from your auth utility

const socket = io("https://api.bet365all.live", {
  transports: ["websocket"],
  auth: {
    token,
  },
});

type IProps = {
  balance: number;
  balanceData: {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
      id: string;
      balance: number;
      createdAt: string;
      updatedAt: string;
      userId: string;
    };
  };
  tokenId: string | undefined;
};

const HomeComponents = ({ balanceData, balance, tokenId }: IProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminName, setAdminName] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [threadId, setThreadId] = useState<string | null>(null);
  useEffect(() => {
    console.log("📌 threadId:", threadId);
  }, [threadId]);

  const lastJoinedThreadId = useRef<string | null>(null);
  const [spinModalOpen, setSpinModalOpen] = useState(false);
  const [spinAvailable, setSpinAvailable] = useState(false);
  const [spinCount, setSpinCount] = useState<number>(0);
  const [eligibleDeposits, setEligibleDeposits] = useState<string[]>([]);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [turnovers, setTurnovers] = useState<any[]>([]);
  const [isClaiming, setIsClaiming] = useState(false);
  // Temporary log to avoid unused variable warning
  console.log({ loading, isRefreshing, turnovers });

  useEffect(() => {
    if (!tokenId) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/profile");
        const data = res.data;
        setUserName(data.userName);
        setAdminId(data.adminId);
        setAdminName(data.admin?.name);

        // ✅ Check if any spin is available
        const hasAvailableSpin = data.DailySpin?.some(
          (spin: any) => !spin.isUsed
        );
        const countSpins =
          data.DailySpin?.filter((spin: any) => !spin.isUsed).length || 0;
        setSpinAvailable(hasAvailableSpin);
        setSpinCount(countSpins);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [tokenId]);

  const joinThreadIfNeeded = (id: string | null) => {
    if (id && id !== lastJoinedThreadId.current) {
      socket.emit("joinThread", { threadId: id });
      lastJoinedThreadId.current = id;
      console.log("✅ Joined thread:", id);
    }
  };

  useEffect(() => {
    if (!adminId) return;

    const fetchUnreadCount = async () => {
      try {
        const res = await axiosInstance.post(`/chat/unread-count`, {
          adminId,
        });

        const count = res.data?.count || 0;
        const threadId = res.data?.threadId || null;

        setUnreadCount(count);
        setThreadId(threadId);

        console.log("📬 Initial unread:", count, "Thread ID:", threadId);
        joinThreadIfNeeded(threadId);
      } catch (error) {
        console.error("Failed to fetch unread count:", error);
      }
    };

    fetchUnreadCount();
  }, [adminId]);

  useEffect(() => {
    if (!adminId || !token) return;

    const handleNewMessage = async (msg: any) => {
      if (msg.from === "admin") {
        console.log("📥 New admin message received");

        try {
          const res = await axiosInstance.post(`/chat/unread-count`, {
            adminId,
          });
          const count = res.data?.count || 0;
          const threadId = res.data?.threadId || null;

          setUnreadCount(count);
          setThreadId(threadId);
          joinThreadIfNeeded(threadId);
        } catch (error) {
          console.error("❌ Failed to update unread count:", error);
        }
      }
    };

    socket.on("newMessage", handleNewMessage);

    // ✅ Always return a cleanup function
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [adminId, token]); // ✅ No conditional return

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (!tokenId) return; // 🔐 Do nothing if user is not logged in

    const triggerActions = async () => {
      try {
        const [gscRes, cricketRes] = await Promise.all([
          axiosInstance.get("/gsclaunch/gscTransferWithdrawal"),
          axiosInstance.get("/cricketv1/betmandu/betmanduTransferWithdrawal"),
        ]);

        console.log("🔁 GSC Transfer Withdrawal Response:", gscRes);
        console.log("🏏 Cricket Launch Exchange Response:", cricketRes);
      } catch (err) {
        console.error("❌ Error calling APIs:", err);
      }
    };

    triggerActions();
  }, [tokenId]); // ✅ both API calls triggered when tokenId is available

  console.log(balance);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeTo8PM = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(20, 0, 0, 0); // Today at 8:00 PM

      // If already past 8 PM, set target to 8 PM tomorrow
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      const seconds = Math.floor((target.getTime() - now.getTime()) / 1000);
      return seconds;
    };

    setTimeLeft(calculateTimeTo8PM());

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleChatOpen = () => {
    setUnreadCount(0); // ✅ clear badge locally
  };

  const handleChatClose = async () => {
    setChatOpen(false); // close the modal

    // ✅ Fetch latest unread count from server
    try {
      const res = await axiosInstance.post(`/chat/unread-count`, {
        adminId,
      });
      setUnreadCount(res.data?.count || 0);
      console.log("📦 Unread count after chat closed:", res.data?.count);
    } catch (error) {
      console.error("❌ Failed to fetch unread count after chat close", error);
    }
  };

  const fetchTurnoverData = async (days: number = 7) => {
    if (!tokenId) return;
    try {
      const res = await axiosInstance.get(`/user-turnover?days=${days}`);
      const records = Array.isArray(res?.data) ? res.data : res?.data?.data;

      if (Array.isArray(records)) {
        setTurnovers(records);

        const eligible = records
          .filter(
            (item) =>
              !item.bonusClaimed &&
              item.turnoverComplete &&
              item.profitLoss <= 0
          )
          .map((item) => item.depositId);

        setEligibleDeposits(eligible);
        setShowClaimModal(eligible.length > 0);
      }
    } catch (error) {
      console.error("❌ Error fetching turnover data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTurnoverData(7);
    const interval = setInterval(() => {
      fetchTurnoverData(7);
    }, 30 * 60 * 1000); // 30 mins
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      zIndex: 9999,
    });
  };

  const handleClaimAllBonuses = async () => {
    setIsClaiming(true);
    try {
      await Promise.all(
        eligibleDeposits.map((depositId) =>
          axiosInstance.post("/user-turnover/claim", {
            depositId,
            days: 7,
          })
        )
      );

      triggerConfetti();
      setTimeout(() => setShowClaimModal(false), 2000);
      await fetchTurnoverData(7);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <>
      {openModal && (
        <HelpDeskModal
          handleModal={() => setOpenModal(false)}
          openModal={openModal}
          openChat={() => setChatOpen(true)}
          unreadCount={unreadCount} // ✅ make sure this is passed
        />
      )}
      <ChatModal
        isOpen={chatOpen}
        onClose={handleChatClose}
        onOpen={handleChatOpen}
        username={userName}
        adminId={adminId}
        adminName={adminName}
      />
      <SpinModal
        isOpen={spinModalOpen}
        onClose={() => setSpinModalOpen(false)}
        availableSpins={spinAvailable ? spinCount : 0}
        setSpinCount={setSpinCount}
        setSpinAvailable={setSpinAvailable}
      />
      <div className="mainBgColor overflow-hidden">
        <Banner />

        <Headline />

        {balanceData && <HomeBalance />}
        <div className=" border-b-2">
          <Card tokenId={tokenId} />
        </div>

        <div className="mainBgColor">
          <div className="bg-slate-900/40 bg-opacity-50 relative px-3 pb-10 mb-10">
            <Animation />
            <div className="relative ">
              <div className="border-[#586261]">
                <Afc />
              </div>
              <div className="border-y-2 border-[#586261]">
                <PaymentMethod />
              </div>
              <div className="border-b-2 border-[#586261] py-3">
                <Warning />
              </div>
              <div className="border-b-2 border-[#586261] py-2">
                <SocialLink />
              </div>
              <div className="border-b-2 border-[#586261] py-2">
                <GamingLicense />
              </div>
              <div className="border-b-2 border-[#586261] py-2">
                <Details />
              </div>
              <div>
                <CopyRight />
              </div>
            </div>
          </div>
        </div>

        {/* footer section end */}
      </div>{" "}
      <div
        onClick={handleModal}
        className="fixed h-[100px] bottom-[60px] sm:left-[65.5%] left-[90%] transform -translate-x-1/2 md:max-w-[470px] p-1 pt-2 rounded-xl w-[70px] cursor-pointer flex items-center justify-center "
      >
        <Image
          alt=""
          src={icon}
          width={100}
          height={100}
          className="rounded-full  border border-2 border-white rounded-full rounded-full "
        />

        {/* 🔴 Unread badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-1.5 -left-1.5 bg-red-600 rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center z-10">
            <span className="text-white text-[10px] font-semibold leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </div>
        )}
      </div>
      <div
        onClick={() => setSpinModalOpen(true)}
        className="fixed bottom-[60px] sm:left-[38%] left-[11%] transform -translate-x-1/2 w-[80px] flex flex-col items-center"
      >
        <div className="relative">
          {/* Glowing background */}
          <div className="absolute inset-0 rounded-full blur-xl bg-yellow-400 opacity-50 z-0"></div>

          {/* Spin image */}
          <div className="relative z-10">
            <Image
              alt="Spin Icon"
              src={spinicon}
              width={100}
              height={100}
              className="rounded-full"
            />

            {/* 🟡 Spin Count Badge */}
            {spinAvailable && spinCount > 0 && (
              <div className="absolute -top-1.5 -left-1 bg-red-600 text-black rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center z-10">
                <span className="text-xs font-semibold leading-none">
                  {spinCount > 9 ? "9+" : spinCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Spin status text */}
        {tokenId &&
          (spinAvailable ? (
            <div className="font-bold text-white text-xs bg-black/60 px-2 py-1 rounded-md">
              Open Spin
            </div>
          ) : (
            <div className="font-bold text-white text-xs bg-black/60 px-2 py-1 rounded-md">
              {formatTime(timeLeft)}
            </div>
          ))}
      </div>
      {showClaimModal && eligibleDeposits.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="relative bg-transparent">
            {/* Close Button */}
            <button
              onClick={() => setShowClaimModal(false)}
              className="absolute top-0 right-0 text-white text-xl font-bold z-10"
            >
              ✕
            </button>

            {/* Image */}
            <Image
              src={claimBonusImage}
              alt="Claim Bonus"
              width={300}
              height={300}
              className="mx-auto"
            />

            {/* Claim Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClaimAllBonuses}
                disabled={isClaiming}
                className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full shadow-lg ${
                  isClaiming ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isClaiming ? "Claiming..." : "Click Here To Claim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeComponents;
