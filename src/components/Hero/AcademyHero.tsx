/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AcademyHero: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseType = searchParams.get("course_type") // null | "adults" | "kids"

  const handleSelect = (type: "adults" | "kids") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("course_type", type)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const getButtonClass = (type: "adults" | "kids") => {
    const isActive = courseType === type
    if (isActive) {
      return "bg-secondary-1 text-white"
    }
    return "border border-grey-200 text-primary hover:bg-secondary-1 hover:text-secondary"
  }

  return (
      <section className="w-full pt-[100px] pb-12 px-4 sm:px-6 lg:px-8 max-w-[1250px] mx-auto">
        <h1 className="text-[40px] md:text-[48px] font-bold text-primary">fluensyfrench Online Academy</h1>
        <div className="mt-[10px] text-primary text-[20px]">
          <p>
            Learn French with courses aligned to the Common European Framework of Reference for Languages (CEFR), a globally recognized standard for measuring language proficiency.
          </p>
          <p className="mt-3">
            Our courses help you build practical skills in speaking, listening, reading, and writing, while guiding you through each CEFR level from beginner to intermediate.
          </p>
        </div>

        <div className="child-button:text-[18px] 
          md:child-button:text-[40px]
          child-button:font-bold 
          child-button:h-11 md:child-button:h-[171px] 
          child-button:px-[14px] 
          child-button:rounded-[10px]
          child-button:transition-all
          child-button:duration-200
          mt-12 md:mt-16 flex flex-col min-[400px]:flex-row gap-4 md:gap-8
        ">
          <button
            onClick={() => handleSelect("adults")}
            className={`md:flex-1 ${getButtonClass("adults")}`}
          >
            Courses for adults
          </button>
          <button
            onClick={() => handleSelect("kids")}
            className={`md:flex-1 ${getButtonClass("kids")}`}
          >
            Courses for kids
          </button>
        </div>
      </section>
  );
};

export default AcademyHero;