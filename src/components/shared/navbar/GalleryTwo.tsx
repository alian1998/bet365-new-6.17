import { gallery2 } from "@/lib/store/Index";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction,   } from "react";

type IProps = {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};

const GalleryTwo = ({ setShowMenu }: IProps) => {
  return (
    <div>
      <div className="cardColor2 p-4 grid grid-cols-3 gap-2 py-3 rounded-md">
        {gallery2.map((gallery) => (
          <Link
            onClick={() => setShowMenu(false)}
            href={gallery.link}
            key={gallery.id}
            className="cardColor2  border-2 border-black flex flex-col items-center justify-start gap-1 py-1 rounded-md"
          >
            <Image className="size-6" src={gallery.image} alt="gallery" height={100} width={100} />
            <h6 className="text-white1 font-medium text-[9px] xxs:text-xs">{gallery.item}</h6>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryTwo;
