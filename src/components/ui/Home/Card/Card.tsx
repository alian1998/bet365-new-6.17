"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import ActiveGallery from "../ActiveGallery/ActiveGallery";
import { gamesItem } from "@/lib/store/gaming/gamingData";
import { ContextApi } from "@/lib/provider/Providers";
import { useGetData } from "@/utils/fetchData/FetchData/FetchData";

type ICard = {
  id: string;
  item: string;
  image: string;
};
const Card = ({ tokenId }: { tokenId: string | undefined }) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { activeCard, setActiveCard } = context;
  const containerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCard.toLowerCase() == "jetx" && containerRef.current) {
      containerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [activeCard]);

  const queryKey = `gamingData , ${activeCard}`;
  const url = tokenId
    ? `/game-items/get-active-game ` // If tokenId exists, fetch active games
    : `/game-categorys/get-all`; // If no tokenId, fetch all categories

  const { data: gamingData } = useGetData(queryKey, url);

  return (
    <>
      <div className="cardBorder p-1">
        <div
          ref={containerRef}
          className="bg-gradient-to-r from-[#fde047] via-[#fde047] to-[#2cc09d]  px-3 py-5 rounded-lg   text-white1 flex items-center overflow-auto gap-2 hide-scrollbar "
        >
          {gamesItem.map((card: ICard) => (
            <div
              ref={card.item.toLowerCase() == "jetx" ? firstItemRef : null}
              className="borderColorRoted p-[3px] z-auto group min-w-20 h-20 cursor-pointer flex items-center justify-center"
              key={card.id}
              onClick={() => setActiveCard(card.item)}
            >
              <div className="cardColor relative z-10 flex flex-col items-center justify-center h-full w-full p-2   rounded-md border border-[#396d4e] shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                <Image
                  className="size-8 duration-300 transform group-hover:scale-125 group-hover:opacity-80"
                  src={card.image}
                  alt={card.item}
                  height={100}
                  width={100}
                />
                <h4
                  className={`text-[16px] font-medium ${
                    activeCard.toLowerCase() == card?.item?.toLowerCase()
                      ? "text-secondary"
                      : "text-white1"
                  }`}
                >
                  {card.item}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" mainBgColor bg-opacity-20 pb-2">
        <div className="flex justify-between place-items-center  items-center mb-2 mt-[6px] px-3 pt-2">
          <div className="text-textColor font-bold xs:text-[20px] text-[16px] capitalize">
            {activeCard}
          </div>
          <button className="px-3  bg-secondary text-white rounded-md font-medium  xs:text-[16px] text-[16px]">
            View All
          </button>
        </div>
        <ActiveGallery
          activeCard={activeCard}
          tokenId={tokenId}
          gamingData={tokenId ? gamingData : gamingData}
        />
      </div>
    </>
  );
};

export default Card;
