import React from "react";

type Button3dProps = {
  name: string;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button3d = ({ name, className = "", type = "submit" }: Button3dProps) => {
  return (
    <div>
      <button
        type={type}
        className={`
                    relative w-full  text-black
                     text-2xl font-bold py-2 xxs:py-3 px-6 rounded-lg 
                    bg-[linear-gradient(to_left,_#e4b21d,_#e4b21d,_#e4b21d)] 
                    hover:brightness-110 transition 
                    ${className}
                `}
      >
        {name}
      </button>
    </div>
  );
};

export default Button3d;
