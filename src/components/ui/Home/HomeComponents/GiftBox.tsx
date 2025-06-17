import React from 'react';

interface GiftBoxProps {
  width?: number;
  height?: number;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ width = 40, height = 40 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Box bottom */}
      <rect x="20" y="45" width="60" height="40" rx="4" fill="#FFFFFF" />
      
      {/* Box top */}
      <rect x="15" y="30" width="70" height="20" rx="4" fill="#FFFFFF" />
      
      {/* Ribbon vertical */}
      <rect x="45" y="15" width="10" height="70" rx="2" fill="#ffb70a" />
      
      {/* Ribbon horizontal */}
      <rect x="15" y="40" width="70" height="10" rx="2" fill="#ffb70a" />
      
      {/* Top ribbon bow - left */}
      <path d="M45 25C45 20 35 15 30 25C25 35 40 30 45 25Z" fill="#ffb70a" />
      
      {/* Top ribbon bow - right */}
      <path d="M55 25C55 20 65 15 70 25C75 35 60 30 55 25Z" fill="#ffb70a" />
      
      {/* Box shadows for 3D effect */}
      <rect x="20" y="45" width="60" height="5" fill="#EEEEEE" />
      <rect x="15" y="30" width="70" height="5" fill="#EEEEEE" />
      
      {/* Box outline */}
      <rect x="20" y="45" width="60" height="40" rx="4" stroke="#FF9F1C" strokeWidth="1.5" fill="none" />
      <rect x="15" y="30" width="70" height="20" rx="4" stroke="#FF9F1C" strokeWidth="1.5" fill="none" />
      
      {/* Sparkles */}
      <circle cx="25" cy="25" r="2" fill="#FFEB3B" />
      <circle cx="80" cy="35" r="2" fill="#FFEB3B" />
      <circle cx="75" cy="70" r="2" fill="#FFEB3B" />
      <circle cx="15" cy="60" r="2" fill="#FFEB3B" />
    </svg>
  );
};
