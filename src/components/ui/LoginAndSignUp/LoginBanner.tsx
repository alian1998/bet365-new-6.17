import React from "react";

const LoginBanner = () => {
  return (
    <div className=" bg-primary relative h-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="rotate-180 absolute -bottom-16 z-50 "
      >
        <path
          fill="#027B5A"
          fill-opacity="1"
          d="M0,64L80,96C160,128,320,192,480,186.7C640,181,800,107,960,90.7C1120,75,1280,117,1360,138.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default LoginBanner;
