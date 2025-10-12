"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const AcademyNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [logoWidth, setLogoWidth] = useState<number | null>(null);

  useEffect(() => {
    if (logoRef.current) {
      setLogoWidth(logoRef.current.offsetWidth);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: fluensyfrench + academy */}
          <div className="flex flex-col leading-tight">
            <Link
              href="/"
              ref={logoRef}
              className="text-base font-bold text-[#181A25]"
            >
              fluensyfrench
            </Link>
            <span
              className="text-sm font-medium text-white bg-[#7148E5] px-2 py-1 rounded flex items-center justify-center"
              style={{ width: logoWidth ? `${logoWidth}px` : "auto" }}
            >
              Academy
            </span>
          </div>

          {/* Right: Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/program" className="text-[#7148E5] font-light">
              Program
            </Link>
            <Link
              href="/"
              className="text-[#181A25] px-8 py-2 rounded-md font-normal bg-transparent border border-[#C7CAD1] transition-all duration-300 hover:border-[#7148E5] hover:text-[#7148E5]"
            >
              Back to Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
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
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center space-y-6 text-lg px-4">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-[#7148E5]"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <Link
            href="/program"
            className="text-[#7148E5] font-medium"
            onClick={() => setOpen(false)}
          >
            Program
          </Link>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-[#181A25] px-8 py-2 rounded-md font-normal bg-transparent border border-[#C7CAD1] transition-all duration-300 hover:border-[#7148E5] hover:text-[#7148E5]"
          >
            Back to Home
          </Link>
        </div>
      )}
    </nav>
  );
};

export default AcademyNavbar;
