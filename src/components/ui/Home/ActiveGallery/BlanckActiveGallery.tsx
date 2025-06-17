import React from "react";

const BlanckActiveGallery = () => {
  return (
    <div className="w-full text-center">
      <div
        className={`relative w-full h-[73px] overflow-hidden rounded-md cursor-pointer `}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/10 mix-blend-overlay"></div>
          <div className="absolute inset-0 border-[0px] border-gray-200 rounded-md shadow-[inset_2px_2px_2px_rgba(0,0,0,0.25),inset_-2px_-2px_2px_rgba(255,255,255,0.5)]"></div>
        </div>
      </div>
    </div>
  );
};

export default BlanckActiveGallery;
