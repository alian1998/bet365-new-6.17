import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const GlobalGame = ({ activeCard, gamingData }: any) => {
  const router = useRouter();
  const handleGameClick = () => {
    router.push("/login");
  };
  const filter = gamingData?.find(
    (item: any) =>
      item?.name.toLocaleLowerCase() === activeCard.toLocaleLowerCase()
  );
  console.log(activeCard);
  
  return (
     <div
      className={`grid ${activeCard == "JetX" || activeCard == "Sports"
        ? "grid-cols-2 gap-2"
        : "grid-cols-3 gap-2"
        }`}
    >
      {filter?.gameItems?.map((item: any) => (
        <div onClick={handleGameClick} key={item.id} className=" w-full text-center">
          <div  className={`cardAmination ${activeCard == "JetX" || activeCard == "Sports" ? "p-1" : ""
                }  cursor-pointer`}>
            <div
              className={`relative w-full h-[110px] overflow-hidden rounded-md ${activeCard == "JetX" || activeCard == "Sports" ? "" : "p-1"
                }`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="w-full h-full rounded-md hover:scale-105 duration-300"
              />
              <div className="border-anim-right"></div>
              <div className="border-anim-left"></div>


              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/10 mix-blend-overlay"></div>
                <div className="absolute inset-0 border-[0px] border-gray-200 rounded-md shadow-[inset_2px_2px_2px_rgba(0,0,0,0.25),inset_-2px_-2px_2px_rgba(255,255,255,0.5)]"></div>
              </div>

            </div>
          </div>
            {activeCard !== "Sports" && (
              <p className="text-white1 mt-1 xs:text-[14px] text-[12px] text-wrap capitalize">
                {item.name}
              </p>
            )}
        </div>
      ))}
    </div>
  );
};

export default GlobalGame;
