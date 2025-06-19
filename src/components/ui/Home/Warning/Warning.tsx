import { ContextApi } from "@/lib/provider/Providers";
import { warning } from "@/lib/store/Index";
import Image from "next/image";
import React, { useContext } from "react";

const Warning = () => {
  const context = useContext(ContextApi);
  if (!context) {
    return;
  }
  const { assets } = context;
  // console.log(assets?.social);

  const affiliate = assets?.social?.find(
    (social: any) => social.name === "Affiliate"
  );
  const affiliateLink = affiliate?.link || "/";

  return (
    <div className="flex items-center gap-5">
      {warning.map((warning) => (
        <div key={warning.id} className="cursor-pointer">
          <Image
            className="size-8"
            src={warning.image}
            alt="warning"
            width={100}
            height={100}
          />
        </div>
      ))}
      {affiliate && (
        <a
          href={`https://${affiliateLink}`}
          target="_blank"
          className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#67f0c2] via-[#017d7d] to-[#000000] group-hover:from-[#000000] group-hover:via-[#017d7d] group-hover:to-[#67f0c2] absolute"></span>
          <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-white">Affiliate</span>
          </span>
        </a>
      )}
    </div>
  );
};

export default Warning;
