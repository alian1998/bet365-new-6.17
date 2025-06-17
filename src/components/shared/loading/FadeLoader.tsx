import React from "react";
import FadeLoader from "react-spinners/ClipLoader";

const FadeLoaderSpin = () => {
  return (
    <div className="mainBgColor min-h-screen overflow-auto flex justify-center  w-full">
      <div className="mt-20">
        <FadeLoader color="#36D7B7" size={50} />
      </div>
    </div>
  );
};

export default FadeLoaderSpin;
