"use client";

import { usePreventZoom } from "@/utils/usePreventZoom";
import Loading from "@/app/loading";
import { useContext, useEffect, useState } from "react";
import { ContextApi } from "@/lib/provider/Providers";
import { useSearchParams } from "next/navigation";
import { setGameToken } from "@/utils/token";
import Cookies from "js-cookie";
import { Suspense } from "react";


function ClientWrapperContent({ children }: { children: React.ReactNode }) {

  usePreventZoom();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const context = useContext(ContextApi);

  if (!context) {
    throw new Error("Something went wrong");
  }

  const { assets } = context;
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setGameToken(token);
      Cookies.set("gameToken", token, {
        expires: 1, // 1 day
        secure: true,
        sameSite: "lax",
      });
      window.history.replaceState({}, "", window.location.pathname); // Clean the URL
      window.location.reload();

    }
  }, [token]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (assets == null) {
      setShowLoading(false);
      timer = setTimeout(() => setShowLoading(true), 500);
    } else {
      setShowLoading(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [assets]);

  // Show loading only if assets are null and 500ms have passed
  if (assets == null && showLoading) {
    return <Loading />;
  }

  return <div className="">{children}</div>;
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <ClientWrapperContent>{children}</ClientWrapperContent>
    </Suspense>
  );
}