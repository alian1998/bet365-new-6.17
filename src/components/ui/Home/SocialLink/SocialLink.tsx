"use client";
import { ContextApi } from "@/lib/provider/Providers";
import { socialLink } from "@/lib/store/Index";
import { ISocialLink } from "@/types/SocialLing/SocialLink";
import Image from "next/image";
import React, { useContext } from "react";

const SocialLink = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { assets } = context;
  return (
    <div className="flex items-center gap-5">
      {assets?.social?.map((social: ISocialLink) => (
        <div key={social.id} className="cursor-pointer">
          <Image
            className="size-[30px]"
            src={social.image}
            alt="social"
            width={100}
            height={100}
          />
        </div>
      ))}

      {!assets?.social &&
        socialLink?.map((social: ISocialLink) => (
          <div key={social.id} className="cursor-pointer">
            <Image
              className="size-[30px]"
              src={social.image}
              alt="social"
              width={100}
              height={100}
            />
          </div>
        ))}
    </div>
  );
};

export default SocialLink;
