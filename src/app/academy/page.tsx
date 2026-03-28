"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AcademyNavbar from "@/components/Navbar/AcademyNavbar";
import AcademyHero from "@/components/Hero/AcademyHero";
import Academy from "@/components/Content/Academy";
import FooterUp from "@/components/FooterUp";
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
      {/* <AcademyNavbar /> */}
      <AcademyHero />
      <CourseDetails />
      {/* <Academy /> */}
      {/* <FooterUp/> */}
      <Footer />
    </main>
  );
}


