import { profileHistory } from "@/lib/store/Index";
import Image from "next/image";
import React from "react";
interface ProfileHistoryProps {
  handleHistory: (id: string) => void;
}
const ProfileHistory = ({ handleHistory }: ProfileHistoryProps) => {
  return (

    <div className="cardColor2 mt-5 rounded-xl  text-white p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
      <p className="font-medium text-3xl mb-4">History</p>

      <div className="grid grid-cols-4 gap-1 mb-5 items-start">
        {profileHistory.map((item) => (
          <div
            onClick={() => handleHistory(item.id)}
            key={item.id}
            // className="flex flex-col justify-center items-center mt-3 cursor-pointer text-center"
            className="bgColor2 h-full justify-center mt-3 cursor-pointer text-center p-1 rounded-md border border-black flex flex-col items-center transition-transform duration-200 ease-in-out
        shadow-[0_2px_4px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.25)]
        "
          >
            <div className="size-10 bg-[#2D3434] rounded-full flex justify-center items-center">
              <Image
                className="size-6"
                src={item.image}
                alt="image"
                width={100}
                height={100}
              />
            </div>
            <p className="font-medium xxs:text-[14px] text-[10px] capitalize">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileHistory;
