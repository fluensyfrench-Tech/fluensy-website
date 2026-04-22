import React, { useState } from "react";

interface AppStoreIconProps {
  active?: boolean;
  color?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
}

const AppStoreIcon: React.FC<AppStoreIconProps> = ({ 
  active = false, 
  color = "#643BD8", 
  width = 35, 
  height = 35,
  disabled = false
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
      style={{ 
        pointerEvents: disabled ? "none" : "auto",
        cursor: disabled ? "not-allowed" : "auto"
      }}
    >
      <circle 
        cx="17.0861" 
        cy="17.0861" 
        r="16.7374" 
        stroke={disabled ? "#A1A4AD" : (active || isHovered ? color : "#181A25")} 
        strokeWidth="0.697391"
      />
      <path 
        d="M13.9812 12.793C10.9908 12.793 9.99585 15.7965 9.99585 18.2978C9.99585 21.3003 11.9885 25.8036 13.9812 25.8036C15.0645 25.7571 15.654 25.3033 16.9698 25.3033C18.2771 25.3033 18.464 25.8036 19.9583 25.8036C21.4526 25.8036 23.9437 22.8011 23.9437 20.8C23.9158 20.7898 21.4805 20.3964 21.4526 17.7966C21.434 15.6254 23.86 14.8406 23.9437 14.795C22.9246 13.3016 21.0035 12.8302 20.4567 12.793C19.0294 12.6814 17.6374 13.7945 16.9698 13.7945C16.2919 13.7945 15.0766 12.793 13.9812 12.793Z" 
        fill={disabled ? "#A1A4AD" : (active || isHovered ? color : "#181A25")} 
        stroke={disabled ? "#A1A4AD" : "#181A25"} 
        strokeWidth="0.929855" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M17.4347 9.99594C17.9279 9.99594 18.4009 9.80001 18.7497 9.45124C19.0985 9.10248 19.2944 8.62946 19.2944 8.13623C18.8012 8.13623 18.3282 8.33216 17.9794 8.68093C17.6306 9.02969 17.4347 9.50272 17.4347 9.99594Z" 
        stroke={disabled ? "#A1A4AD" : "#181A25"} 
        strokeWidth="0.929855" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AppStoreIcon;
