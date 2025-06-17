//import { Images } from "@/lib/store/Index";
import Image from "next/image";
import React from "react";

type SocialLink = {
  id: string;
  name: string;
  link: string;
  key: string;
  desc: string | null;
  number: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const ProfileSocialLink = ({ assets }: any) => {
  const social = assets?.social || [];
 
  return (
    <div className="cardColor2 rounded-md p-3 my-5 text-white1">
      <p className="font-medium text-black">Social</p>
      <div className="grid grid-cols-12 items-start gap-1">
        <div className="col-span-8 flex items-center justify-start">
          {social.map((item: SocialLink) => (
            <a href={`https://${item?.link}`} target="_blank" key={item.id}>
              <div className="flex flex-col justify-center items-center mt-3 ">
                <div className="xs:size-10 p-2 size-8 bg-[#2D3434] flex justify-center items-center rounded-full">
                  <Image
                    className="size-full"
                    src={item.image}
                    alt="image"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-center xs:text-[14px] text-[12px] font-semibold">
                  {item.name}
                </p>
              </div>
            </a>
          ))}
        </div>
        {/* <div className="col-span-4 flex justify-end">
          <div
            onClick={() => {
              window.open(
                `https://wa.me/${profileData?.admin?.whatsApp}`,
                "_blank"
              );
            }}
            className="flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="xs:size-10 p-1 size-8 bg-[#2D3434] flex justify-center items-center rounded-full">
              <Image
                className="size-full"
                src={Images.socialBanner1}
                alt="image"
                width={100}
                height={100}
              />
            </div>
            <p className="text-center xs:text-[14px] text-[12px] font-semibold">
              Agent
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileSocialLink;
