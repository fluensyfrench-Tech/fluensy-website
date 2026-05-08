"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AcademyHero from "@/components/Hero/AcademyHero";
// import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CourseDetails } from "@/components/Academy";

export default function AcademyPage() {
  const [courseType, setCourseType] = useState<string | null>(null);

  const handleSelect = (type: "adults" | "kids") => {
    setCourseType(type);
  };

 

  return (
    <main className="min-h-screen">
      <Toaster position="top-center" />
      <Navbar />
      <AcademyHero courseType={courseType} onSelect={handleSelect} />
      {courseType && <CourseDetails courseType={courseType} />}
      {/* <Footer /> */}
    </main>
  );
}
