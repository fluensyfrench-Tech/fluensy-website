"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

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
          <div className="absolute left-1/2 top-1/2 hidden md:flex -translate-x-1/2 -translate-y-1/2 space-x-[13px] text-base">
            <Link href="/meet-us" className="text-gray-700 hover:text-[#7148E5]">
              Meet us
            </Link>
            <Link href="/academy" className="text-gray-700 hover:text-[#7148E5]">
              The Academy
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-[#7148E5] focus:outline-none"
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

    {/* Navigation Links */}
    <Link
      href="/meet-us"
      className="text-gray-700 hover:text-[#7148E5]"
      onClick={() => setOpen(false)}
    >
      Meet us
    </Link>
    <Link
      href="#academy"
      className="text-gray-700 hover:text-[#7148E5]"
      onClick={() => setOpen(false)}
    >
      The Academy
    </Link>
  </div>
)}

    </nav>
  );
};

export default Navbar;
