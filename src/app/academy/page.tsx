"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AcademyHero from "@/components/Hero/AcademyHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CourseDetails } from "@/components/Academy";
import DebugBar from "@/components/DebugBar";

function AcademyContent() {
  const searchParams = useSearchParams();
  const courseType = searchParams.get("type"); // "adults" | "kids" | null

  return (
    <main className="min-h-screen">
      <Navbar />
      <AcademyHero courseType={courseType} />
      {courseType && <CourseDetails courseType={courseType} />}
      <Footer />
      <DebugBar />
    </main>
  );
}

export default function AcademyPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <Navbar />
      </main>
    }>
      <AcademyContent />
    </Suspense>
  );
}
