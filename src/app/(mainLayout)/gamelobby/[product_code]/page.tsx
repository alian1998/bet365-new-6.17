"use client";

import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "@/utils/api";
import { ContextApi } from "@/lib/provider/Providers";
import axiosInstance from "@/utils/axiosConfig";
import Image from 'next/image';

const LobbyList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { product_code: platForm } = useParams();
  const gameType = searchParams.get('gameType');
  const gameCodeParam = searchParams.get('gameCode');

  const context = useContext(ContextApi);
  if (!context) throw new Error("Context not available");

  const [games, setGames] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [launching, setLaunching] = useState<boolean>(false);

  const hasOpenGameParam = !!(platForm && gameType && gameCodeParam);

  useEffect(() => {
    if (!platForm || !gameType) return;

    fetch(`${baseUrl}/awclist/games`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const filtered = data.data.filter(
            (g: any) =>
              g.platForm === platForm && g.gameType === gameType
          );
          setGames(filtered);

          if (hasOpenGameParam) {
            const gameToLaunch = filtered.find(
              (g: any) => g.gameCode === gameCodeParam
            );
            if (gameToLaunch) {
              setLaunching(true);
              handleGameClick(gameToLaunch);
            }
          }
        } else {
          console.error("Game list load failed:", data.message);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [platForm, gameType, gameCodeParam]);

 const handleGameClick = async (game: any) => {
  try {
    const profileRes = await axiosInstance.get('/profile');
    const userName = profileRes.data?.userName;
    if (!userName) throw new Error("Profile not available");

    const payload = {
      platForm,
      gameType,
      gameCode: game.gameCode,
      userName,
      currency: "BDT",
    };

    const launchRes = await axiosInstance.post('/launch_url/gamelobby', payload);
    const data = launchRes.data;

    console.log("Launch API response:", data);

    if (data?.status === '0000' && typeof data?.url === 'string') {
      window.location.href = data.url;
    } else {
      console.error("Launch failed:", data?.message || 'Unknown error');
      setLaunching(false);
    }
  } catch (error) {
    console.error("Launch error:", error);
    setLaunching(false);
  }
};


  const filteredGames = games.filter((game: any) =>
    game.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (launching) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white1 flex-col gap-4">
        <figure className="split-spinner">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</figure>

      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen text-white1">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => router.back()} className="text-white1 bg-primary px-4 py-2 rounded-lg">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-xl font-bold text-center flex-grow capitalize">{platForm}</h1>
        <input
          type="text"
          placeholder="Search game..."
          className="px-4 py-2 rounded-lg text-black text-sm w-[120px] bg-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-[50px]">
        {filteredGames.length === 0 ? (
          <p className="text-slateFont col-span-3 text-center"></p>
        ) : (
          filteredGames.map((game) => (
            <div
              key={game.gameCode}
              className="relative w-full h-full overflow-hidden rounded-md cursor-pointer transition-colors"
              onClick={() => handleGameClick(game)}
            >
              <Image
                src={game.image}
                alt={game.gameCode}
                width={100}
                height={100}
                className="w-full h-[100px] rounded-md hover:scale-105 duration-300"
              />
              <div className="mt-1 text-white text-center text-sm truncate capitalize">
                {game.name}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LobbyList;
