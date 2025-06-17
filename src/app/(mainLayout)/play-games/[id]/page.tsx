import GamesGallery from "@/components/ui/games/gamesGallery/GamesGallery";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const name = params.id;

  const cookieStore = cookies();
  const token = cookieStore.get("gameToken");
  const tokenId = token?.value;

  // const gameToken = await fetchWithToken(
  //   `${baseUrl}/game-items/get-active-game`,
  //   {
  //     cache: "no-store",
  //   }
  // );
  // game-items/get-active-game

  return (
    <div className="p-3">
      <h6 className="text-white font-medium my-3 text-[18px]">{name}</h6>
      <GamesGallery name={name} tokenId={tokenId} />
    </div>
  );
};

export default page;
