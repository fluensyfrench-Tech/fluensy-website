"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

type MotionButtonProps = HTMLMotionProps<"button"> & {
  href?: string;
  className?: string;
};

const MotionButton: React.FC<MotionButtonProps> = ({
  href,
  className = "",
  children,
  ...props
}) => {
  const base =
    "bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-base text-white px-6 py-3.5 h-[66px] w-full max-w-[378px] rounded-md text-center font-medium hover:opacity-95 transition";
  const classes = `${base} ${className}`.trim();

  if (href) {
    return (
      <Link href={href}>
        <motion.a className={classes} {...(props as HTMLMotionProps<"a">)}>
          {children}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      className={classes}
      {...(props as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
