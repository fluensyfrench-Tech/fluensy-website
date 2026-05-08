"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import AcademyHero from "@/components/Hero/AcademyHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CourseDetails } from "@/components/Academy";

export default function AcademyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseType = searchParams.get("course_type");

  const handleSelect = (type: "adults" | "kids") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("course_type", type);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const initScrollBehavior = () => {
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
    };

    const id = requestAnimationFrame(() => {
      initScrollBehavior();
    });

    return () => cancelAnimationFrame(id);
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
