import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { ContextApi } from "@/lib/provider/Providers";
import Link from "next/link";
import { gamesItem } from "@/lib/store/gaming/gamingData";

type IProps = {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};

const GalleryOne = ({ setShowMenu }: IProps) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  return (
    <>
      <div className="cardColor2 my-5 mt-8 text-black rounded-xl  p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
        <div className="grid xs:grid-cols-3 grid-cols-3 gap-2">
          {gamesItem.map((item: any) => (
            <Link
              onClick={() => setShowMenu(false)}
              href={`/play-games/${item?.item.toLowerCase()}`}
              key={item?.id}
              className="flex items-center p-1 cardColor2 border-2 border-black flex-col transition-transform duration-200 ease-in-out
        shadow-[0_2px_4px_rgba(0,0,0,0.2),_0_6px_12px_rgba(0,0,0,0.3),_0_10px_20px_rgba(0,0,0,0.25)]
        rounded-md cursor-pointer"
            >
              <Image
                className="size-5"
                src={item?.image}
                alt={`Image for ${item?.item}`}
                height={100}
                width={100}
              />
              <h6 className="text-white1 font-medium xs:text-[16px] text-[14px]">
                {item?.item}
              </h6>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GalleryOne;
