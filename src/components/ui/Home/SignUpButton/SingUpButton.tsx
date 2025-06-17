"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link"; 
import { ContextApi } from "@/lib/provider/Providers";


const SingUpButton = ({ token }: any) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const {
    setShowMenu,
    setProfile,
    setGalleryOpen,
    setPersonalInfo,
    setHistory,
    setActiveCard,
  } = context;
  const handleCloseAllModal = () => {
    setShowMenu(false);
    setProfile(false);
    setGalleryOpen(false);
    setPersonalInfo("");
    setHistory("");
    setActiveCard("Sports");
  };

  return (
    <div className="mainBgColor fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:max-w-[450px] text-white1">
      {!token ? (
        <div className="flex justify-between items-center w-full">
          <div className="cardColor2 w-full flex justify-center items-center py-2 gap-2">
            <div className="size-8">
              <Image
                className="rounded-full object-cover size-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78gCVIujl-NIrMruElHqA_vp2vfsHwmKZvw&s"
                alt="img"
                width={500}
                height={500}
              />
            </div>
            <p className="leading-4 font-medium text-white text-[14px]">
              BDT <br /> English
            </p>
          </div>
          <Link
            href="/login"
            className="bgColor py-3 w-full text-center font-medium text-white"
          >
            <span className="text-white">Login</span>
          </Link>
          <Link
            href="/sign-up"
            className="cardColor2 py-3 w-full text-center text-white1 font-medium"
          >
            <span>Sign Up</span>
          </Link>
        </div>
      ) : (
        <div className="bgColor text-[#fff] flex justify-between items-center w-full py-2 px-3">
          <Link
            onClick={handleCloseAllModal}
            href={"/"}
            className="text-[#fff] flex flex-col justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Red square at bottom */}
              <circle cx="16" cy="12" r="5" fill="#FF3B30" stroke="none" />
              {/* House outline */}
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h6 className="leading-4">Home</h6>
          </Link>

        <Link
            onClick={handleCloseAllModal}
            href={"/promotions"}
            className="text-[#fff] flex flex-col justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"

            >
              {/* Red circle */}
              <circle cx="16" cy="12" r="5" fill="#FF3B30" stroke="none" />
              {/* Ticket outline */}
              <path d="M3 7v2a3 3 0 1 1 0 6v2c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
            </svg>
            <h6 className="leading-4">Promotions</h6>
          </Link>
          <Link
            onClick={handleCloseAllModal}
            href={"/deposit"}
            className="text-[#fff] flex flex-col justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Red rectangle */}
              <circle cx="16" cy="12" r="5" fill="#FF3B30" stroke="none" />

              {/* Card outline */}
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />

            </svg>
            <h6 className="leading-4">Deposit</h6>
          </Link>

          <div
            onClick={() => setProfile(true)}
            className="text-[#fff] flex flex-col justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              {/* Red accent */}
              <circle cx="16" cy="12" r="5" fill="#FF3B30" stroke="none" />
              {/* User outline */}
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="5" />

            </svg>
            <h6 className="leading-4">Account</h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingUpButton;

// import Container from "@/components/shared/container/Container";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaHome, FaRegUser, FaWallet } from "react-icons/fa";
// import { BsWallet2 } from "react-icons/bs";

// const SingUpButton = () => {
//   return (
//     <>
//       <Container>
//         <div className="max-w-[450px] w-full flex justify-between items-center fixed bottom-0 bg-deepPrimary py-2 text-white1 px-3 z-1">
//           <div className="w-full flex justify-between items-center">
//             <div className="flex flex-col justify-center items-center cursor-pointer">
//               <FaHome className="size-8" />
//               <h6 className="leading-4">Home</h6>
//             </div>
//             <div className="flex flex-col justify-center items-center cursor-pointer">
//               <FaWallet className="size-8" />
//               <h6 className="leading-4">Deposit</h6>
//             </div>
//             <div className="flex flex-col justify-center items-center cursor-pointer">
//               <BsWallet2 className="size-8" />
//               <h6 className="leading-4">Withdraw</h6>
//             </div>
//             <div className="flex flex-col justify-center items-center cursor-pointer">
//               <FaRegUser className="size-8" />
//               <h6 className="leading-4">Account</h6>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default SingUpButton;

// ***************** DONT DELETE THIS FILE ***************************
