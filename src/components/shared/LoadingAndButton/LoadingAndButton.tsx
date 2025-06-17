import React from "react";
import { BounceLoader } from "react-spinners";
interface IProps {
  isPending: boolean;
  buttonName: string;
}
const LoadingAndButton = ({ isPending, buttonName }: IProps) => {
  return (
    <div className="py-2 font-medium rounded w-full text-black1">
      {isPending ? (
        <div className="w-full bg-none border border-[#fffb00b1] py-2 rounded-md flex justify-center items-center">
          <BounceLoader color="#fff900" size={25} speedMultiplier={2} />
        </div>
      ) : (
        <button className="bg-secondary font-medium rounded w-full py-2">
          {buttonName}
        </button>
      )}
    </div>
  );
};

export default LoadingAndButton;
