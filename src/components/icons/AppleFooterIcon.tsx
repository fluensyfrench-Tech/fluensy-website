interface AppleFooterIconProps {
  isHovered?: boolean;
}

const AppleFooterIcon = ({ isHovered = false }: AppleFooterIconProps) => {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200"
    >
      <path 
        d="M11.0479 9.34404C6.75992 9.34404 5.33325 13.6507 5.33325 17.2374C5.33325 21.5427 8.19059 28 11.0479 28C12.6013 27.9334 13.4466 27.2827 15.3333 27.2827C17.2079 27.2827 17.4759 28 19.6186 28C21.7613 28 25.3333 23.6947 25.3333 20.8254C25.2933 20.8107 21.8013 20.2467 21.7613 16.5187C21.7346 13.4054 25.2133 12.28 25.3333 12.2147C23.8719 10.0734 21.1173 9.39737 20.3333 9.34404C18.2866 9.18404 16.2906 10.78 15.3333 10.78C14.3613 10.78 12.6186 9.34404 11.0479 9.34404Z" 
        stroke={isHovered ? "#181A25" : "#181A25"} 
        strokeWidth="1.33333" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16 5.33329C16.7072 5.33329 17.3855 5.05234 17.8856 4.55224C18.3857 4.05215 18.6667 3.37387 18.6667 2.66663C17.9594 2.66663 17.2811 2.94758 16.781 3.44767C16.281 3.94777 16 4.62605 16 5.33329Z" 
        stroke={isHovered ? "#181A25" : "#181A25"} 
        strokeWidth="1.33333" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AppleFooterIcon;
