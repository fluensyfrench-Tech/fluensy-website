/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

interface AcademyHeroProps {
  courseType: string | null;
  onSelect: (type: "adults" | "kids") => void;
}

const AcademyHero: React.FC<AcademyHeroProps> = ({ courseType, onSelect }) => {
  const getButtonClass = (type: "adults" | "kids") => {
    const isActive = courseType === type;
    if (isActive) {
      return "bg-secondary-1 text-white";
    }
    return "border border-grey-200 text-primary";
  };

  return (
    <section className="w-full pt-[100px] pb-12 px-4 sm:px-6 lg:px-8 max-w-[1250px] mx-auto">
      <h1 className="text-[40px] md:text-[48px] font-bold text-primary">fluensyfrench online academy</h1>
      <div className="mt-[10px] text-primary text-[20px]">
        <p>
          Learn French with courses aligned to the Common European Framework of Reference for Languages (CEFR), a globally recognized standard for measuring language proficiency.
        </p>
        <p className="mt-3">
          Our courses help you build practical skills in speaking, listening, reading, and writing, while guiding you through each CEFR level from beginner to intermediate.
        </p>
      </div>

      <div className="mt-12 md:mt-16 flex flex-col min-[400px]:flex-row gap-4 md:gap-8">
        {/* javascript:void(0) keeps <a> interactive on iOS without causing scroll-to-top */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onSelect("adults"); }}
          className={`flex items-center justify-center text-[18px] md:text-[40px] font-bold h-11 md:h-[171px] px-[14px] rounded-[10px] w-full md:flex-1 cursor-pointer select-none ${getButtonClass("adults")}`}
        >
          Courses for adults
        </a>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onSelect("kids"); }}
          className={`flex items-center justify-center text-[18px] md:text-[40px] font-bold h-11 md:h-[171px] px-[14px] rounded-[10px] w-full md:flex-1 cursor-pointer select-none ${getButtonClass("kids")}`}
        >
          Courses for kids
        </a>
      </div>
    </section>
  );
};

export default AcademyHero;
