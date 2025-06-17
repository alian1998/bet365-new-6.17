import React from "react";
import { RxExit } from "react-icons/rx";
 import { logout } from "@/utils/auth";

const LogoutAndHomeButton = () => {
  return (
    <div className=" justify-between items-center gap-3 my-3">
      <div
        onClick={() => logout()}
        className=" bg-deepSlate flex flex-row-reverse justify-center items-center gap-3 xs:py-3 py-2 rounded-md cursor-pointer"
      >
        <p className="text-white1 font-semibold text-[14px]">Log Out</p>
        <RxExit className="text-secondary rotate-180 size-5 stroke-[2]" />
      </div>
      {/* <div className="flex-1 bg-deepSlate flex flex-row-reverse justify-center items-center gap-3 xs:py-3 py-2 rounded-md cursor-pointer">
        <p className="text-white1 font-semibold text-[14px]">Telegram</p>
        <FaTelegram className="text-secondary size-5" />
      </div> */}
    </div>
  );
};

export default LogoutAndHomeButton;
