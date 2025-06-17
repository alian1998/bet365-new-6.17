import { Images } from "@/lib/store/Index";
import Image from "next/image";
import React from "react";

const GamingLicense = () => {
  return (
    <div>
      <Image className="w-24" src={Images.gamingSLicense} alt="img" />
    </div>
  );
};

export default GamingLicense;
