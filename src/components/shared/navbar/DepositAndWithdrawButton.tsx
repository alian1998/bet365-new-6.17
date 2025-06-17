"use client";

import { ContextApi } from "@/lib/provider/Providers";
import Link from "next/link";
import React, { useContext } from "react";
import { BsArrowDown } from "react-icons/bs";

export type IProps = {
  handleShowMenu: () => void;
};

const DepositAndWithdrawButton = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { token, setProfile, setShowMenu } = context;
  const handleCloseModal = () => {
    setShowMenu(false);
    setProfile(false);
  };
  return (
    <>
      {token ? (
        <div className="grid grid-cols-2 items-center gap-3 mt-5">
          <Link onClick={handleCloseModal} href={"/deposit"} className="w-full">
            <button
              className="bg-[linear-gradient(to_left,_#e4b21d,_#e4b21d,_#e4b21d)] 
                    hover:brightness-110 transition  w-full text-black py-4 px-6 rounded-md text-sm xxs:text-xl font-bold flex items-center justify-center shadow-[0_4px_10px_rgba(240,196,25,0.3)]"
            >
              Deposit
              <BsArrowDown className="h-5 w-6 ms-2 font-bold stroke-[1.5]" />
            </button>
          </Link>

          <Link
            href={"/withdraw"}
            onClick={handleCloseModal}
            className="w-full"
          >
            <button
              className="bg-[linear-gradient(to_left,_#e4b21d,_#e4b21d,_#e4b21d)] 
                    hover:brightness-110 transition  w-full text-black py-4 px-6 rounded-md text-sm xxs:text-xl font-bold flex items-center justify-center shadow-[0_4px_10px_rgba(240,196,25,0.3)]"
            >
              Withdraw
              <BsArrowDown className="h-5 w-6 ms-2 font-bold stroke-[1.5]" />
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 items-center gap-3 mt-5">
          <Link href={"/login"} className="w-full">
            <button className="bg-[linear-gradient(to_left,_#e4b21d,_#e4b21d,_#e4b21d)]  w-full text-black py-4 px-6 rounded-md text-sm xxs:text-xl font-bold flex items-center justify-center shadow-[0_4px_10px_rgba(240,196,25,0.3)]">
              Login
            </button>
          </Link>
          <Link href={"/sign-up"} className="w-full">
            <button className=" bg-[linear-gradient(to_left,_#e4b21d,_#e4b21d,_#e4b21d)] hover:brightness-110 transition  w-full text-black py-4 px-6 rounded-md text-sm xxs:text-xl font-bold flex items-center justify-center shadow-[0_4px_10px_rgba(240,196,25,0.3)]">
              Sign Up
              <BsArrowDown className="h-5 w-6 ms-2 font-bold stroke-[1.5]" />
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default DepositAndWithdrawButton;
