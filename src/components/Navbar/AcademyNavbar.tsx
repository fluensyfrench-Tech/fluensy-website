/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// Reusable NavLink component with concave underline
const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="group relative font-normal transition-transform duration-300 px-2 py-1
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

const AcademyNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [logoWidth, setLogoWidth] = useState<number | null>(null);

  useEffect(() => {
    if (logoRef.current) {
      setLogoWidth(logoRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: fluensyfrench + academy */}
          <div className="flex flex-col leading-tight">
            <Link
              href="/"
              ref={logoRef}
              className="text-base font-bold text-[#181A25]"
            >
              <img
                src="/images/academy-logo.svg"
                alt="FluensyFrench Academy Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Right: Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/program">Program</NavLink>
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

          <NavLink href="/program" onClick={() => setOpen(false)}>
            Program
          </NavLink>
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
