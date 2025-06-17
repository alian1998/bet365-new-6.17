import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="md:max-w-[450px] w-full mx-auto overflow-hidden">{children}</div>;
};

export default Container;
