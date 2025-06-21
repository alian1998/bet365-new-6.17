"use client";

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ContextApi } from "@/lib/provider/Providers";
import axiosInstance from "@/utils/axiosConfig";
import Image from 'next/image';                 // ← Make sure this is here
import './SplitSpinner.css';
import { baseUrl } from '@/utils/api';

export default function GameListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { product_code: platForm } = useParams();
  const gameType = searchParams.get('gameType');
  const gameCodeParam = searchParams.get('gameCode');

  const context = useContext(ContextApi);
  if (!context) throw new Error("Context not available");

  // --- All hooks declared here, unconditionally ---
  const hasAutoLaunch = useMemo(
    () => Boolean(platForm && gameType && gameCodeParam),
    [platForm, gameType, gameCodeParam]
  );

  const [games, setGames] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [autoLaunching, setAutoLaunching] = useState<boolean>(false);

  // 1) Auto-launch effect (only runs if hasAutoLaunch)
  useEffect(() => {
    if (!hasAutoLaunch) return;

    setAutoLaunching(true);
    const timer = setTimeout(async () => {
      try {
        const { data: profile } = await axiosInstance.get('/profile');
        const payload = {
          platForm,
          gameType,
          gameCode: gameCodeParam!,
          userName: profile.userName,
          currency: "BDT",
        };
        const res = await axiosInstance.post('/launch_url/game', payload);
        if (res.data.status === '0000' && res.data.url) {
          window.location.href = res.data.url;
        } else {
          console.error("Launch failed:", res.data.message);
          setAutoLaunching(false);
        }
      } catch (err) {
        console.error("Auto-launch error:", err);
        setAutoLaunching(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hasAutoLaunch, platForm, gameType, gameCodeParam]);

  // 2) Fetch game list effect (only if NOT auto-launching)
  useEffect(() => {
  if (hasAutoLaunch || !platForm || !gameType) return;

  // show a spinner if you like…
  fetch(`${baseUrl}/awclist/games`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();                // this gives your { success, data, ... }
    })
    .then(payload => {
      if (payload.success) {
        const filtered = payload.data.filter(
          (g: any) =>
            g.platForm === platForm &&
            g.gameType === gameType
        );
        setGames(filtered);
      } else {
        console.error('Game list load failed:', payload.message);
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
      // optionally set an error state so you can show a message in UI
    });
}, [hasAutoLaunch, platForm, gameType]);


  // 3) Click handler (also unconditionally declared)
  const handleGameClick = async (game: any) => {
    try {
      const { data: profile } = await axiosInstance.get('/profile');
      const payload = {
        platForm,
        gameType,
        gameCode: game.gameCode,
        userName: profile.userName,
        currency: "BDT",
      };
      const res = await axiosInstance.post('/launch_url/game', payload);
      if (res.data.status === '0000' && res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Now the conditional rendering based purely on state/params ---
  if (hasAutoLaunch || autoLaunching) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white1 flex-col gap-4">
        <figure className="split-spinner">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </figure>
      </div>
    );
  }

  // Default UI when there's no ?gameCode=
  const filteredGames = games.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen text-white1">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.back()}
          className="text-white1 bg-primary px-4 py-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="text-xl font-bold text-center flex-grow capitalize">
          {platForm}
        </h1>
        <input
          type="text"
          placeholder="Search game..."
          className="px-4 py-2 rounded-lg text-black text-sm w-[120px] bg-primary"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-[50px]">
        {filteredGames.length === 0 ? (
          <p className="col-span-3 text-center text-slateFont"></p>
        ) : (
          filteredGames.map(game => (
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
}
