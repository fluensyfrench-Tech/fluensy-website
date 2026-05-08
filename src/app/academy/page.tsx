"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AcademyHero from "@/components/Hero/AcademyHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DebugBar from "@/components/DebugBar";

// Lazy-loaded so framer-motion is NOT in the initial JS bundle.
// Without this, framer-motion v12's class-field syntax causes a SyntaxError
// on iOS < 14, which prevents React from hydrating entirely.
const CourseDetails = dynamic(
  () => import("@/components/Academy/CourseDetails").then((m) => ({ default: m.CourseDetails })),
  { ssr: false, loading: () => null }
);

export default function AcademyPage() {
  const [courseType, setCourseType] = useState<string | null>(null);

  return (
    <main className="min-h-screen">
      <Navbar />
      <AcademyHero courseType={courseType} onSelect={setCourseType} />
      {courseType && <CourseDetails courseType={courseType} />}
      <Footer />
      <DebugBar courseType={courseType} />
    </main>
  );
}
