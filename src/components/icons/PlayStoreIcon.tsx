import React, { useState } from "react";

interface PlayStoreIconProps {
  active?: boolean;
  color?: string;
  width?: number;
  height?: number;
}

const PlayStoreIcon: React.FC<PlayStoreIconProps> = ({ 
  active = false, 
  color = "#643BD8", 
  width = 35, 
  height = 35 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 35 35" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <circle 
        cx="17.0861" 
        cy="17.0861" 
        r="16.7374" 
        stroke={active || isHovered ? color : "#181A25"} 
        strokeWidth="0.697391"
      />
      <path 
        d="M9.99597 9.72638V25.1434C9.99601 25.2576 10.0261 25.3698 10.0833 25.4688C10.1404 25.5677 10.2226 25.6498 10.3215 25.7069C10.4205 25.764 10.5327 25.7941 10.6469 25.7941C10.7612 25.7941 10.8734 25.764 10.9723 25.7069L24.5687 17.8775C24.6465 17.8326 24.7111 17.7681 24.7561 17.6903C24.801 17.6125 24.8247 17.5242 24.8247 17.4344C24.8247 17.3446 24.801 17.2563 24.7561 17.1786C24.7111 17.1008 24.7465 17.0362 24.5687 16.9913L10.9723 9.16289C10.8733 9.10573 10.761 9.07565 10.6467 9.07568C10.5324 9.07572 10.4201 9.10585 10.3211 9.16307C10.2221 9.22028 10.14 9.30256 10.0829 9.40161C10.0258 9.50066 9.99584 9.61206 9.99597 9.72638Z" 
        fill={active || isHovered ? color : "#181A25"} 
        stroke="white" 
        strokeWidth="0.929855" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20.2245 14.6453L10.4611 25.3386" 
        stroke="white" 
        strokeWidth="0.929855" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10.4611 9.53101L20.2245 20.2243" 
        stroke="white" 
        strokeWidth="0.929855" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayStoreIcon;
