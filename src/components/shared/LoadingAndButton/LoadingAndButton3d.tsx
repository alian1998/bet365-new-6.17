import React from "react";
import { BounceLoader } from "react-spinners";
interface IProps {
  isPending: boolean;
  buttonName: string;
}
const LoadingAndButton3d = ({ isPending, buttonName }: IProps) => {
  return (
    <div className="py-2 font-medium rounded w-full text-black1">
      {isPending ? (
        <div
          className="relative justify-center w-full bg-[#ffc107] text-[#004d28] text-2xl font-bold py-3 px-6 rounded-lg
                     border-l-[5px] border-[#d9a400]
                     "
        >
          <BounceLoader color="#fff900" size={25} speedMultiplier={2} />
        </div>
      ) : (
        <button
          disabled={isPending}
          type="submit"
          className="  relative w-full  text-white
                    text-black text-2xl font-bold py-2 xxs:py-3 px-6 rounded-lg 
                    bg-[linear-gradient(to_left,_#e4b21d,_#e4b21d,_#e4b21d)] 
                    hover:brightness-110 transition "
        >
          {buttonName}
        </button>
      )}
    </div>
  );
};

export default LoadingAndButton3d;
