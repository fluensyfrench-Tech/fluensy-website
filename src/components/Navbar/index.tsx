"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import PlayStoreIcon from "../icons/PlayStoreIcon";
import AppStoreIcon from "../icons/AppStoreIcon";
import { PiGooglePlayLogoLight } from "react-icons/pi";
import AppleFooterIcon from "../icons/AppleFooterIcon";

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  pathname: string;
}> = ({ href, children, onClick, pathname }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`relative transition-colors px-2 py-1 group ${href === pathname
        ? "text-secondary-1 font-bold"
        : "text-primary hover:text-gray-900"
      }`}
  >
    {children}
    {href !== pathname && (
      <span className="absolute left-0 -bottom-2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-[10px]">
        <svg
          width="100%"
          height="6"
          viewBox="0 0 67 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0.485596 4.35548C13.1523 0.0221491 43.4856 1.1131 66.4856 4.35548"
            stroke="#643BD8"
            strokeWidth="3"
          />
        </svg>
      </span>
    )}
  </Link>
);

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = mounted && pathname === "/meet-us";

  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-white">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-xl leading-[100%] tracking-[0]"
          >
            <span className="font-bold">fluensy</span>
            <span className="font-normal">french</span>
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center space-x-7">
            <NavLink href="/academy" pathname={pathname}>
              Academy
            </NavLink>
            <NavLink href="/about-us" pathname={pathname}>
              About us
            </NavLink>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-7">
            <div className="flex items-center space-x-5">
              <a
                href="https://play.google.com/store/apps/details?id=com.fluensyfrench.app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity"
              >
                <PlayStoreIcon />
              </a>
              <button className="transition-opacity">
                <AppStoreIcon disabled />
              </button>
            </div>
            <button
              onClick={() => {
                const footer = document.querySelector('footer');
                footer?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-secondary-1 text-white px-5 h-[45px] rounded-[12px] text-base text-center font-normal hover:opacity-95 transition hover:bg-[#7DE5F2] hover:text-[#181A25] grid place-items-center"
            >
              Download app
            </button>
          </div>

          {/* Mobile Hamburger */}
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

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 border bg-[#7DE5F2] z-40 flex flex-col justify-start space-y-6 text-lg px-6">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-[#7148E5] focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <Link href="/">
            <span className="font-bold">fluensy</span>
            <span className="font-normal text-gray-700">french</span>
          </Link>

          <div className="pt-20 flex flex-col items-center gap-[20px]">
            <Link
              href="/academy"
              onClick={() => setOpen(false)}
              className={`text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 ${isActive ? "text-[#8f66ff] font-semibold" : ""
                }`}
            >
              Academy
            </Link>
            <Link
              href="/about-us"
              onClick={() => setOpen(false)}
              className={`text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 ${isActive ? "text-[#8f66ff] font-semibold" : ""
                }`}
            >
              About us
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.fluensyfrench.app"
              rel="noopener noreferrer"
              className="bg-[#643BD8] flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-white"
            >
              <PiGooglePlayLogoLight size={32} fill="white" />
              Download on Google Play
            </a>
            <div
              className="bg-grey-300 flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-primary cursor-not-allowed"
            >
              <AppleFooterIcon isHovered={false}/>
              Download on App Store
            </div>
           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;