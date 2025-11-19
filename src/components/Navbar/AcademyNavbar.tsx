"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-gray-700 hover:text-gray-900 transition-colors px-2 py-1"
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = mounted && pathname === "/program";

  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link
            href="/"
            className="flex-shrink-0 text-xl leading-[100%] tracking-[0]"
          >
            <span className="font-bold">fluensy</span>
            <span className="font-normal">french</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/meet-us">Meet us</NavLink>
            <Link
              href="/program"
              onClick={() => setOpen(false)}
              className={`text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 ${
                isActive ? "text-[#8f66ff] font-semibold" : ""
              }`}
            >
              course
            </Link>
          </div>

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

      {open && (
        <div className="fixed inset-0 border bg-white z-40 flex flex-col items-center justify-center space-y-6 text-lg px-6">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-[#7148E5] focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <NavLink href="/meet-us" onClick={() => setOpen(false)}>
            Meet us
          </NavLink>
          <NavLink href="/program" onClick={() => setOpen(false)}>
            course
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
