"use client";

import { useState } from "react";
import AcademyHero from "@/components/Hero/AcademyHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CourseDetails } from "@/components/Academy";
import DebugBar from "@/components/DebugBar";

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
