"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AcademyHero from "@/components/Hero/AcademyHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CourseDetails } from "@/components/Academy";

export default function AcademyPage() {
  const [courseType, setCourseType] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCourseType(params.get("course_type"));
  }, []);

  const handleSelect = (type: "adults" | "kids") => {
    setCourseType(type);
  };

  useEffect(() => {
    const handleAnchorScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        const anchor = target as HTMLAnchorElement;
        if (anchor.hash) {
          e.preventDefault();
          const element = document.querySelector(anchor.hash);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    let timeout: NodeJS.Timeout;
    const handleScrollActivity = () => {
      document.documentElement.classList.add("scrolling");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.documentElement.classList.remove("scrolling");
      }, 500);
    };

    document.addEventListener("click", handleAnchorScroll);
    window.addEventListener("scroll", handleScrollActivity);
    return () => {
      document.removeEventListener("click", handleAnchorScroll);
      window.removeEventListener("scroll", handleScrollActivity);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <AcademyHero courseType={courseType} onSelect={handleSelect} />
      <CourseDetails courseType={courseType} />
      <Footer />
    </main>
  );
}
