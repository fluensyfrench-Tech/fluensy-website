"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// Reusable NavLink with concave underline hover/tap effect
const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({
  href,
  children,
  onClick,
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="group relative text-gray-700 transition-transform duration-300 px-2 py-1
               hover:-translate-y-1 active:-translate-y-1"
  >
    {children}
    <svg
      className="absolute left-1/2 -bottom-1 w-2/3 h-2 -translate-x-1/2 scale-x-0
                 group-hover:scale-x-100 active:scale-x-100 transition-transform duration-300"
      viewBox="0 0 100 5"
      preserveAspectRatio="none"
    >
      <path
        d="M0,5 Q50,-2 100,5"
        stroke="#7148E5"
        strokeWidth="2"
        fill="transparent"
      />
    </svg>
  </Link>
);

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container */}
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl leading-[100%] tracking-[0]">
            <Link href="/">
              <span className="font-bold">fluensy</span>
              <span className="font-normal">french</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="absolute left-1/2 top-1/2 hidden md:flex -translate-x-1/2 -translate-y-1/2 space-x-5 text-base">
            <NavLink href="/meet-us">Meet us</NavLink>
            <NavLink href="/academy">The Academy</NavLink>
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-[#7148E5] focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-height Mobile Nav */}
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center space-y-6 text-lg px-4">
          {/* Close Icon inside menu */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-[#7148E5] focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Links with tap effect */}
          <NavLink href="/meet-us" onClick={() => setOpen(false)}>
            Meet us
          </NavLink>
          <NavLink href="/academy" onClick={() => setOpen(false)}>
            The Academy
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
