import { Images } from "@/lib/store/Index";
import Image from "next/image";
import React from "react";

const Afc = () => {
  return (
    <div className="flex justify-between items-center text-white1 pt-3">
      <div className="flex items-start flex-1">
        <div className="size-[46px]">
          <Image
            className="size-full"
            src={Images.afc1}
            alt="img"
            width={100}
            height={100}
          />
        </div>
        <div>
          <h6 className="text-[14px]">AFC Bournemouth</h6>
          <h6 className="text-[10px]">Đối Tác Áo Đấu </h6>
          <h6 className="text-[10px]">2024 - 2025</h6>
        </div>
      </div>
      <div className="flex items-start flex-1">
        <div className="size-[46px]">
          <Image
            className="size-full"
            src={Images.afc2}
            alt="img"
            width={100}
            height={100}
          />
        </div>
        <div>
          <h6 className="text-[14px]">AFC Bournemouth</h6>
          <h6 className="text-[10px]">Đối Tác Áo Đấu </h6>
          <h6 className="text-[10px]">2024 - 2025</h6>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="size-12">
          <Image
            className="size-full"
            src={Images.afc3}
            alt="img"
            width={300}
            height={300}
          />
        </div>
        <div>
          <h6 className="text-[12px]">2024 - 2025</h6>
        </div>
      </div>
    </div>
  );
};

export default Afc;
