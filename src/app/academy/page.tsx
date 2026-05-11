"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AcademyHero from "@/components/Hero/AcademyHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Lazy-loaded so framer-motion is NOT in the initial JS bundle.
// Without this, framer-motion v12's class-field syntax causes a SyntaxError
// on iOS < 14, which prevents React from hydrating entirely.
const CourseDetails = dynamic(
  () => import("@/components/Academy/CourseDetails").then((m) => ({ default: m.CourseDetails })),
  { ssr: false, loading: () => null }
);

export default function AcademyPage() {
  const [courseType, setCourseType] = useState<string | null>(null);

  // Read ?type= from URL on mount — avoids useSearchParams which requires Suspense
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type === "adults" || type === "kids") {
      setCourseType(type);
    }
  }, []);

  const handleSelect = (type: "adults" | "kids") => {
    setCourseType(type);
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <AcademyHero courseType={courseType} onSelect={handleSelect} />
      {courseType && <CourseDetails courseType={courseType} />}
      <Footer />
    </main>
  );
}
