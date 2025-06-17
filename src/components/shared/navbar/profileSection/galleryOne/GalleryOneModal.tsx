"use client";

import { images, popularImg } from "@/lib/store/Index";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

interface IProps {
  galleryOpen: boolean;
  handleOpenModal: () => void;
}

const GalleryOneModal = ({ galleryOpen, handleOpenModal }: IProps) => {
  return (
    <div
      className={`${
        galleryOpen
          ? "fixed w-full min-h-screen overflow-auto md:max-w-[450px] z-[10] right-0 left-0 mx-auto top-0 border-2 border-green"
          : "-z-[101] pointer-events-none -left-full hidden"
      }`}
    >
      <div className="h-full overflow-auto  bg-black1 p-3">
        <div className="flex justify-between items-center mb-5 px-5 py-3">
          <div className="flex items-center gap-2 text-white">
            <Image src={images.gpopular} alt="" /> Popular
          </div>
          <div
            onClick={handleOpenModal}
            className="size-8 bg-[#ff1515] p-2 rounded flex justify-center items-center cursor-pointer"
          >
            <RxCross1 className="size-full " />
          </div>
        </div>
        <div className="flex justify-center pt-[14px]">
          <div className="grid grid-cols-2 gap-3 ">
            {popularImg.map((img, i) => (
              <div
                key={i}
                className={`bg-[#1B2020] w-[220px] rounded-md flex justify-center items-center
           
                `}
              >
                ``
                <Image
                  src={img}
                  alt={`Popular Image ${i}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryOneModal;

// DONT DELETE THIS

// ${
//     selectedItem === img ? "border border-yellow-500" : ""
//   }
