"use client";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AudioPlayer({ url, name }: { url: string; name: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerId = useRef(uuidv4()).current;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // Pause all others by broadcasting
      window.dispatchEvent(new CustomEvent("global-audio-play", { detail: playerId }));
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleGlobalPlay = (e: CustomEvent) => {
      if (e.detail !== playerId) {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
        setIsPlaying(false); // ✅ Reset icon
      }
    };

    audio.addEventListener("ended", handleEnded);
    window.addEventListener("global-audio-play", handleGlobalPlay as EventListener);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("global-audio-play", handleGlobalPlay as EventListener);
    };
  }, [playerId]);

  return (
    <div
      onClick={togglePlay}
      className="mt-1 p-2 rounded bg-yellow-100 inline-flex items-center cursor-pointer gap-2 text-sm w-full max-w-xs"
    >
      <span>{isPlaying ? "⏸️" : "▶️"} {name}</span>
      <audio ref={audioRef} src={url} preload="auto" />
    </div>
  );
}
