"use client";

import { useEffect, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import AcademyHero from "@/components/Hero/AcademyHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CourseDetails } from "@/components/Academy";

export default function HomePage() {
  useEffect(() => {
    // Delay scroll behavior until after hydration
    const initScrollBehavior = () => {
      // Smooth scroll for anchor links
      const handleAnchorScroll = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.tagName === "A") {
          const anchor = target as HTMLAnchorElement;

          if (anchor.hash) {
            e.preventDefault();
            const element = document.querySelector(anchor.hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      };

      // Scrollbar visibility toggle
      let timeout: NodeJS.Timeout;
      const handleScrollActivity = () => {
        document.documentElement.classList.add("scrolling");

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          document.documentElement.classList.remove("scrolling");
        }, 500); // Hide scrollbar after 500ms of inactivity
      };

      document.addEventListener("click", handleAnchorScroll);
      window.addEventListener("scroll", handleScrollActivity);

      return () => {
        document.removeEventListener("click", handleAnchorScroll);
        window.removeEventListener("scroll", handleScrollActivity);
      };
    };

    // Run scroll behavior after hydration
    const id = requestAnimationFrame(() => {
      initScrollBehavior();
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <main className="min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <Suspense fallback={<div className="pt-[100px] pb-12 px-4 max-w-[1250px] mx-auto animate-pulse"><div className="h-10 bg-gray-100 rounded w-3/4 mb-4" /><div className="h-6 bg-gray-100 rounded w-full mb-2" /><div className="h-6 bg-gray-100 rounded w-5/6" /></div>}>
        <AcademyHero />
      </Suspense>
      <Suspense fallback={<div className="px-4 py-8 max-w-[1250px] mx-auto"><div className="h-8 bg-gray-100 rounded w-1/2 mb-6 animate-pulse" /><div className="h-40 bg-gray-100 rounded animate-pulse" /></div>}>
        <CourseDetails />
      </Suspense>
      <Footer />
    </main>
  );
}


