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
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { frenchCourses, getCourseDetail, toSingleLine } from "@/constants/courses";

// Same order as the homepage grid, labelled with the detail-page titles.
const COURSE_LINKS = frenchCourses.map(({ courseKey, title }) => ({
  courseKey,
  title: toSingleLine(getCourseDetail(courseKey)?.title ?? title),
}));

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  pathname: string;
}> = ({ href, children, onClick, pathname }) => {
  // Also active on nested routes, e.g. /blog/1 keeps "Blog" highlighted.
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
  <Link
    href={href}
    onClick={onClick}
    className={`relative transition-colors px-2 py-1 group ${isActive
      ? "text-secondary-1 font-bold"
      : "text-primary hover:text-gray-900"
      }`}
  >
    {children}
    {!isActive && (
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
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
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
            {/* The trigger is as tall as the bar so the pointer moves from it
                straight onto the panel without leaving this wrapper. */}
            <div
              className="h-[72px] flex items-center"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCoursesOpen((isOpen) => !isOpen)}
                aria-expanded={coursesOpen}
                aria-haspopup="true"
                className={`flex items-center space-x-1 px-2 py-1 transition-colors ${pathname.startsWith("/course/")
                  ? "text-secondary-1 font-bold"
                  : "text-primary hover:text-gray-900"
                  }`}
              >
                <span>Courses</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${coursesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {coursesOpen && (
                  <motion.div
                    className="absolute left-0 top-full w-full px-4 pointer-events-none"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <div className="pointer-events-auto mx-auto w-full max-w-[800px] bg-secondary-2 rounded-[10px] shadow-custom px-8 lg:px-[69px] py-[42px] flex items-center justify-between gap-10">
                      <p className="text-primary text-[60px] lg:text-[60px] font-bold max-w-[260px] leading-[130%]">
                        Enrol <br /> in a <br /> course today
                      </p>
                      <ul className="flex flex-col gap-4 flex-1">
                        {COURSE_LINKS.map((course) => (
                          <li key={course.courseKey}>
                            <Link
                              href={`/course/${course.courseKey}`}
                              onClick={() => setCoursesOpen(false)}
                              className={`block bg-white rounded-[5px] px-6 py-[10px] text-[18px] transition-colors hover:bg-secondary-1 hover:text-white ${pathname === `/course/${course.courseKey}`
                                ? "text-secondary-1 font-bold"
                                : "text-primary"
                                }`}
                            >
                              {course.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <NavLink href="/blog" pathname={pathname}>
              Blog
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
              <a
                href="https://apps.apple.com/us/app/fluensyfrench/id6770974375"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity cursor-pointer"
              >
                <AppStoreIcon />
              </a>
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
            className="absolute top-6 right-6 text-primary focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <Link href="/">
            <span className="font-bold">fluensy</span>
            <span className="font-normal text-gray-700">french</span>
          </Link>

          <div className="pt-[53px] flex flex-col items-start gap-[20px]">
            <div>
              <button
                type="button"
                onClick={() => setMobileCoursesOpen((isOpen) => !isOpen)}
                aria-expanded={mobileCoursesOpen}
                className={`flex items-center gap-1 px-2 py-1 transition-colors ${pathname.startsWith("/course/")
                  ? "text-secondary-1 font-semibold"
                  : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                Courses
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCoursesOpen ? "rotate-180" : ""}`} />
              </button>

              {/* grid-rows 0fr -> 1fr animates the height, same as the FAQ accordion */}
              <div
                className={`grid transition-[grid-template-rows] duration-200 ${mobileCoursesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
              >
                <div className="overflow-hidden">
                  {/* w-fit + grid makes every pill as wide as the longest title */}
                  <ul className="w-fit grid gap-[10px] pt-2 pl-2">
                    {COURSE_LINKS.map((course) => (
                      <li key={course.courseKey}>
                        <Link
                          href={`/course/${course.courseKey}`}
                          onClick={() => setOpen(false)}
                          tabIndex={mobileCoursesOpen ? undefined : -1}
                          className={`block bg-white rounded-[5px] px-6 py-[10px] text-[16px] ${pathname === `/course/${course.courseKey}`
                            ? "text-secondary-1 font-bold"
                            : "text-primary"
                            }`}
                        >
                          {course.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={`text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 ${isActive ? "text-[#8f66ff] font-semibold" : ""
                }`}
            >
              Blog
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
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.fluensyfrench.app"
              rel="noopener noreferrer"
              className="bg-[#643BD8] flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-white"
            >
              <PiGooglePlayLogoLight size={32} fill="white" />
              Download on Google Play
            </a>
            <a
              target="_blank"
              href="https://apps.apple.com/app/id6770974375"
              rel="noopener noreferrer"
              className="bg-white flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-primary cursor-pointer"
            >
              <AppleFooterIcon />
              Download on App Store
            </a>


          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;