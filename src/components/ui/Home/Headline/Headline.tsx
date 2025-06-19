"use client";
import { ContextApi } from "@/lib/provider/Providers";
import { Images } from "@/lib/store/Index";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Headline.module.css";

const Headline = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { assets } = context;

  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(5);

  useEffect(() => {
    if (trackRef.current) {
      const textWidth = trackRef.current.offsetWidth;
      const speed = 80; // pixels per second
      const newDuration = textWidth / speed;
      setDuration(newDuration);
    }
  }, [assets?.latestUpdates]);

  return (
    <div className="bgColor flex items-center gap-3 py-2 px-3 mb-[3px]">
      <Image
        className="size-6"
        src={Images.mike}
        alt="headline"
        height={100}
        width={100}
        priority
      />
      <div className={styles.marquee}>
        <div
          ref={trackRef}
          className={styles.track}
          style={{ animationDuration: `${duration}s` }}
        >
          <p className={styles.text}>{assets?.latestUpdates}</p>
        </div>
      </div>
    </div>
  );
};

export default Headline;
