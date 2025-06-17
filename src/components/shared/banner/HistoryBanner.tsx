import React from "react";
import { RxCross1 } from "react-icons/rx";

const HistoryBanner = ({
  handleHistory,
}: {
  handleHistory: (e: string) => void;
}) => {
  return (
    <div className="relative bg-black1 pb-5 h-[100px] p-3 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <h6 className="text-white1 font-bold">Transaction Record</h6>
        <div
          onClick={() => handleHistory("")}
          className="size-8 rounded bg-[#ff1515] p-2 absolute right-5 cursor-pointer"
        >
          <RxCross1 className="size-full" />
        </div>
      </div>
    </div>
  );
};

export default HistoryBanner;
