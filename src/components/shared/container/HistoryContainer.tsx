import React from "react";

interface HistoryContainerProps {
  children: React.ReactNode;
  className?: string;
}

const HistoryContainer = ({
  children,
  className = "",
}: HistoryContainerProps) => {
  return (
    <div
      className={`w-full min-h-screen overflow-auto fixed overflow-hidden right-0 left-0 max-w-[450px] mx-auto z-20 ${className}`}
    >
      <div className="w-full h-full overflow-auto">{children}</div>
    </div>
  );
};

export default HistoryContainer;
