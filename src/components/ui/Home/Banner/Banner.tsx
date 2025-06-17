"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import { Autoplay, Scrollbar } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ContextApi } from "@/lib/provider/Providers";

const Banner = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { assets } = context;

  return (
    <div className="">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar, Autoplay]}
        className="mySwiper"
      >
        {assets?.banner?.map((imgs: { image: string; id: string }) => {
          return (
            <SwiperSlide key={imgs?.id}>
              <div className="h-[170px]">
                <Link href="/">
                  <Image
                    className="w-full h-full"
                    src={imgs.image}
                    alt="banner"
                    width={500}
                    height={500}
                    priority
                  />
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
        {/* {!assets?.banner && (
          <SwiperSlide>
            <div className="h-[170px]">
              <Link href="/">
                <Image
                  className="w-full h-full"
                  src={Images.banner1}
                  alt="banner"
                  width={500}
                  height={500}
                />
              </Link>
            </div>
          </SwiperSlide>
        )} */}
      </Swiper>
    </div>
  );
};

export default Banner;

// ********************** DO NOT DELETE THIS ITEM ON THE TOP *******************************
// "use client";
// import { Images } from "@/lib/store/Index";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { LuRefreshCcw } from "react-icons/lu";

// const Banner = () => {
//   const [isSpinning, setIsSpinning] = useState(false);

//   const handleRefreshClick = () => {
//     setIsSpinning(true);
//     setTimeout(() => {
//       setIsSpinning(false);
//     }, 500);
//   };

//   return (
//     <div className="py-[30px] flex items-center justify-between w-full bg-primary px-3">
//       <div className="">
//         <div className="flex items-center gap-2">
//           <h5 className="text-slate1">Main Balance</h5>
//           <LuRefreshCcw
//             className={`text-slate1 size-6 cursor-pointer ${
//               isSpinning ? "animate-custom-spin" : ""
//             }`}
//             onClick={handleRefreshClick}
//           />
//         </div>
//         <h6 className="text-white1 font-medium text-[24px]">$654</h6>
//       </div>
//       <Image className="size-[145px]" src={Images.coin} alt="banner" />
//       <Link
//         href="/deposit"
//         className="bg-secondary font-medium px-4 py-1 rounded-md text-[18px]"
//       >
//         <button>Deposit</button>
//       </Link>
//     </div>
//   );
// };

// export default Banner;
