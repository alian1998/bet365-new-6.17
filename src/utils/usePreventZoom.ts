import { useEffect } from "react";

export const usePreventZoom = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768; // Example mobile breakpoint
    if (!isMobile) return;

    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventZoom, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventZoom);
    };
  }, []);
};
