import React from "react";
import CanPlayUser from "./CanPlayUser";
import GlobalGame from "./GlobalGame";

const ActiveGallery = ({
  activeCard,
  gamingData,
  tokenId,
}: {
  activeCard: string;
  gamingData: any;
  tokenId: string | undefined;
}) => {
  const filter = gamingData?.find(
    (item: any) => item?.name.toLowerCase() == activeCard.toLowerCase()
  );
  return (
    <div className="px-3">
      {filter === undefined ? (
        <p className="text-[24px] text-white">Coming Soon</p>
      ) : (
        <>
          {tokenId ? (
            <CanPlayUser
              activeCard={activeCard}
              gamingData={gamingData}
              tokenId={tokenId}
            />
          ) : (
            <GlobalGame activeCard={activeCard} gamingData={gamingData} />
          )}
        </>
      )}
    </div>
  );
};

export default ActiveGallery;
