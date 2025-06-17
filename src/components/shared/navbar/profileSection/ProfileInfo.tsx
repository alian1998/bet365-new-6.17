import { profileInfo } from "@/lib/store/Index";
import Image from "next/image";
import React from "react";
import { CiTrophy } from "react-icons/ci";
import { MdDownhillSkiing } from "react-icons/md";
import { IoGift } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";

const ProfileInfo = ({
  handlePersonalInfo,
}: {
  handlePersonalInfo: (e: string) => void;
}) => {


  // asad 1
  return (


     <>
      <div className="mt-8 text-white rounded-xl  cardColor2 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
        <p className="font-medium   text-3xl mb-4">My Info</p>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {profileInfo.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePersonalInfo(item.id)}
              className="cursor-pointer p-1 cardColor2 text-white rounded-md border border-black flex flex-col items-center transition-transform duration-200 ease-in-out
              shadow-[0_2px_4px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.25)]
              "
            >
              <div
                className="p-2 rounded-full"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="h-6 w-6"
                />
              </div>
              <span className="text-[9px] xxs:text-sm text-center font-semibold text-white break-words whitespace-normal w-full">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-1">

          <div onClick={() => handlePersonalInfo("5")} className="cursor-pointer cardColor2  rounded-md border border-black flex flex-col items-center transition-transform duration-200 ease-in-out
        shadow-[0_2px_4px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.25)]">
            <CiTrophy className="text-secondary stroke-[2] h-8 text-2xl" />
            <span className="text-[9px] xxs:text-sm text-center font-semibold text-white break-words whitespace-normal w-full">Total Win</span>
          </div>

          <div onClick={() => handlePersonalInfo("6")} className="cursor-pointer cardColor2  rounded-md border border-black flex flex-col items-center transition-transform duration-200 ease-in-out
        shadow-[0_2px_4px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.25)]">
            <MdDownhillSkiing className="text-secondary h-8 text-2xl" />
            <span className="text-[9px] xxs:text-sm text-center font-semibold text-white break-words whitespace-normal w-full">Total Loss</span>
          </div>

          <div onClick={() => handlePersonalInfo("7")} className="cursor-pointer cardColor2  rounded-md border border-black flex flex-col items-center transition-transform duration-200 ease-in-out
        shadow-[0_2px_4px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.25)]">
            <IoGift className="text-secondary stroke-[2] h-8 text-2xl" />
            <span className="text-[9px] xxs:text-sm text-center font-semibold text-white break-words whitespace-normal w-full">Bonus</span>
          </div>

          {/* transaction */}
          <div onClick={() => handlePersonalInfo("8")} className="cursor-pointer cardColor2  rounded-md border border-black flex flex-col items-center transition-transform duration-200 ease-in-out
        shadow-[0_2px_4px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.25)]">
            <GrTransaction className="text-secondary h-8 text-2xl" />
            <span className="text-[9px] xxs:text-sm text-center font-semibold text-white break-words whitespace-normal w-full">Transaction</span>
          </div>
        </div>
      </div>

    </>


    //   <div className="mt-8 bg-[#0f1f17] rounded-lg p-4 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
    //   <p className="font-medium">My Info</p>
    //   <div className="grid xs:grid-cols-4 grid-cols-4 items-start">
    //     {profileInfo.map((item) => (
    //       <div
    //         onClick={() => handlePersonalInfo(item.id)}
    //         key={item.id}
    //         className="flex flex-col justify-center items-center mt-3"
    //       >
    //         <div className="size-10 bg-[#2D3434] flex justify-center items-center rounded-full cursor-pointer">
    //           <Image
    //             className="size-6"
    //             src={item.image}
    //             alt="image"
    //             width={100}
    //             height={100}
    //           />
    //         </div>
    //         <p className="text-center xs:text-[14px] text-[12px]">{item.title}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ProfileInfo;
