"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  pathname: string;
}> = ({ href, children, onClick, pathname }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`transition-colors px-2 py-1 ${href === pathname ? "text-[#7148e5]" : "text-gray-700 hover:text-gray-900 "}`}
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

  const isActive = mounted && pathname === "/meet-us";

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((o) => !o);

  return (
    <>
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
              <NavLink href="/about-us" pathname={pathname}>
                About us
              </NavLink>
              <Link
                href="/academy"
                className="bg-[#7148E5] text-white px-6 py-3.5 h-[52px] w-[221px] rounded-[12px] text-base text-center font-medium hover:opacity-95 transition hover:bg-[#7DE5F2] hover:text-[#181A25]"
              >
                Browse courses
              </Link>
            </div>

            {/* p-3 -mr-3 gives a 48×48 touch target (icon alone is only 24×24) */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="text-[#7148E5] focus:outline-none p-3 -mr-3"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Rendered as a sibling (not inside nav) so it gets its own z-index
          in the document stacking context rather than inside nav's z-50 layer */}
      {open && (
        <div className="fixed inset-0 bg-[#7DE5F2] z-[9999] flex flex-col text-lg px-4">
          <div className="flex items-center justify-between h-24">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex-shrink-0 text-xl leading-[100%] tracking-[0]"
            >
              <span className="font-bold">fluensy</span>
              <span className="font-normal text-gray-700">french</span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="text-[#7148E5] focus:outline-none p-3 -mr-3"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-[20px] mt-8">
            <Link
              href="/about-us"
              onClick={closeMenu}
              className={`text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 ${
                isActive ? "text-[#8f66ff] font-semibold" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              href="/academy"
              onClick={closeMenu}
              className="bg-[#7148E5] text-white px-6 py-3.5 rounded-md text-base font-medium"
            >
              Browse courses
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
