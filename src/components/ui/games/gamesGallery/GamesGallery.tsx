"use client";

import { useGetData } from "@/utils/fetchData/FetchData/FetchData";
// import { useGetDataWithToken } from "@/utils/fetchData/FetchData/FetchDataWithToken";
import React from "react";
import CanPlayUser from "../../Home/ActiveGallery/CanPlayUser";
import GlobalGame from "../../Home/ActiveGallery/GlobalGame";
import { FadeLoader } from "react-spinners";

const GamesGallery = ({
  name,
  tokenId,
}: {
  name: string;
  tokenId: string | undefined;
}) => {
  const queryKey = `gamingData , ${name}`;
  const url = tokenId
    ? `/game-items/get-active-game?categoryName=${name}` // If tokenId exists, fetch active games
    : `/game-categorys/get-all?categoryName=${name}`; // If no tokenId, fetch all categories

  const { data: gamingData, isLoading, error } = useGetData(queryKey, url);

  if (isLoading)
    return (
      <div className="text-white mx-auto flex justify-center">
        {/* <Loading /> */}

        <FadeLoader />
      </div>
    );
  if (error) return <p className="text-red-500">Error loading games.</p>;

  // const filter = gamingData?.find(
  //   (item: any) => item?.name.toLowerCase() == name.toLowerCase()
  // );

  return (
    <div>
      <>
        {tokenId ? (
          <CanPlayUser
            activeCard={name}
            gamingData={gamingData}
            tokenId={tokenId}
          />
        ) : (
          <GlobalGame activeCard={name} gamingData={gamingData} />
        )}
      </>
    </div>
  );
};

export default GamesGallery;
