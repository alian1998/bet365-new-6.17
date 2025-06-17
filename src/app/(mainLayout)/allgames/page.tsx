"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { baseUrl } from "@/utils/api";

const AllGames = () => {
  const router = useRouter();
  const [games, setGames] = useState<any[]>([]);
  const [selectedGameType, setSelectedGameType] = useState<string | null>(null);
  const [filteredGames, setFilteredGames] = useState<any[]>([]);

  // Fetch from /awclist/games
  useEffect(() => {
    fetch(`${baseUrl}/awclist/games`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGames(data.data || []);
          const firstType = data.data?.[0]?.gameType;
          if (firstType) setSelectedGameType(firstType);
        } else {
          console.error("Failed to fetch AWC games:", data.message);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const filterGamesByType = useCallback((type: string) => {
    const filtered = games.filter(g => g.gameType === type);
    setFilteredGames(filtered);
  }, [games]);

  useEffect(() => {
    if (selectedGameType) {
      filterGamesByType(selectedGameType);
    }
  }, [selectedGameType, filterGamesByType]);

  const formatGameType = (type: string) => type.replace(/_/g, " ");

  const handleGameTypeClick = (type: string) => {
    setSelectedGameType(type);
  };

const handlePlatformClick = (platForm: string, gameType: string) => {
  const encodedType = encodeURIComponent(gameType);
  router.push(`/games/${platForm}?gameType=${encodedType}`);
};


  // Group by gameType
  const groupByGameType = () => {
    const map: { [key: string]: any[] } = {};
    for (const game of games) {
      if (!map[game.gameType]) map[game.gameType] = [];
      map[game.gameType].push(game);
    }
    return map;
  };

  // Get unique platforms for current gameType
  const getPlatforms = () => {
    const platforms = new Set<string>();
    for (const g of filteredGames) {
      if (g.platForm) platforms.add(g.platForm);
    }
    return Array.from(platforms);
  };

  return (
    <div className="pt-4 px-4 pb-16 text-white1">
      {/* Game Type Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-4">
        {Object.keys(groupByGameType()).map(gameType => (
          <button
            key={gameType}
            className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors ${
              selectedGameType === gameType
                ? 'bg-primary text-white1'
                : 'bg-deepslate1 text-slateFont hover:bg-primary2 hover:text-white1'
            }`}
            onClick={() => handleGameTypeClick(gameType)}
          >
            {formatGameType(gameType)}
          </button>
        ))}
      </div>

      {/* Platform List */}
      <div className="grid grid-cols-2 gap-4">
        {getPlatforms().length === 0 ? (
          <p className="text-slateFont"></p>
        ) : (
          getPlatforms().map((platform, index) => (
            <div
              key={index}
              className="bg-deepslate1 rounded-lg shadow-md p-4 cursor-pointer hover:bg-deepPrimary transition-colors"
              onClick={() => handlePlatformClick(platform, selectedGameType!)}
            >
              <h3 className="text-lg font-semibold text-white1">{platform}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllGames;
