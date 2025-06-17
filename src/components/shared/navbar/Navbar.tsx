"use client";

import React, { useContext } from "react";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import { ContextApi } from "@/lib/provider/Providers";

const Navbar = ({ token }: any) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { assets, showMenu, setShowMenu } = context;
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <MenuItem
        showMenu={showMenu}
        handleShowMenu={handleShowMenu}
        token={token}
      />
      <div className="bgColor flex justify-between items-center px-3  py-1">
        <div
          onClick={handleShowMenu}
          className=" rounded-md size-10 flex justify-center items-center cursor-pointer"
        >
          <FiMenu className="text-white text-4xl" />
        </div>
        <div className=" w-44 h-10">
          <Link href="/">
            {" "}
            {assets?.mainLogo && (
              <Image
                className="h-full w-full cursor-pointer"
                src={assets?.mainLogo}
                alt="logo"
                width={100}
                height={100}
                priority
                lazyBoundary="2px"
              />
            )}
          </Link>
        </div>

        <a href="/bet365all.apk" download>
          <div className="rounded cursor-pointer flex flex-col items-center">
            {/* <Image
            className="size-10"
            src={Images.navAppDownload}
            alt="navImg"
            width={100}
            height={100}
          /> */}
            <MdOutlineFileDownload className="text-white text-4xl" />

            <p className="text-white1 text-[12px] font-medium leading-3">App</p>
          </div>
        </a>
      </div>
    </>
  );
};

export default Navbar;
