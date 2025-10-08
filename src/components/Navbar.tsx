"use client"
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
            <Link href="/"> {/* ✅ Use Link instead of <a> */}
              <span className="font-bold">fluensy</span>
              <span className="font-normal">french</span>
            </Link>
          </div>

          {/* Desktop Nav centered */}
          <div className="absolute left-1/2 top-1/2 hidden md:flex -translate-x-1/2 -translate-y-1/2 space-x-[13px] text-base">
            <Link href="/meet-us" className="text-gray-700 hover:text-[#7148E5]">
              Meet us
            </Link>
           <Link href="#academy" className="text-gray-700 hover:text-[#7148E5]">
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

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white">
          <Link
            href="/meet-us"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Meet us
          </Link>
          <a
            href="#academy"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            The Academy
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
