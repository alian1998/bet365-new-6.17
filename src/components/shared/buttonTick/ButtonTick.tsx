import React from "react";

const ButtonTick = ({ className }: { className: string }) => {
  return (
    <div
      className={className}
      style={{
        clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
      }}
    >
      <div className="relative size-full bg-[#ffb50a]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#FFF"
          className="size-4 absolute right-0 bottom-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default ButtonTick;
