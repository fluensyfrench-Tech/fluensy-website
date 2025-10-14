/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { levels } from "@/util/levels";
import { ArrowDown } from "lucide-react";
import { text } from "stream/consumers";
import RegistrationModal from "../Modal/RegistrationModal";

const cohortDetails = [
  {
    text: (
      <>
        <strong>Registration is open</strong> and closes on October 25, 2025
      </>
    ),
  },
  {
    text: "3-month program",
  },
  {
    text: "Classes run from November 1, 2025 to January 31, 2026",
  },
  {
    text: "4–5 classes per week + community support",
  },
  {
    text: "Zoom/Meet, 100% online",
  },
];

const Program = () => {
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

 const handleOpenModal = (courseTitle: string, amount: string) => {
  setSelectedCourse(courseTitle);
  setSelectedAmount(amount);
  setShowModal(true);
};


  return (
    <>
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left mt-5">
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-12 mb-4 pt-5">
            CEFR-Aligned French Language Courses
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#181A25] mb-10">
            Learn French with courses aligned to the Common European Framework
            of Reference for Languages (CEFR), a globally recognized standard
            for measuring language proficiency. Our courses help you build
            practical skills in speaking, listening, reading, and writing, while
            guiding you through each CEFR level from beginner to intermediate.
          </p>

        

          <h4 className="text-3xl md:text-5xl font-medium mb-5">Single-level program</h4>
            <h3 className="text-2xl md:text-4xl font-medium mb-5 mt-8">Cohort 1</h3>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full md:w-[60%] bg-white border border-[#C7CAD1] rounded-xl shadow-sm px-6 py-8"
          >
            <ul className="space-y-4 text-[#181A25] text-base md:text-xl font-normal">
              {cohortDetails.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <img
                    src="/images/icons/gray-check.svg"
                    alt="Check Icon"
                    className="w-5 h-5"
                  />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-xl md:text-2xl font-medium text-[#181A25] mb-10">
            Choose the level that fits you best
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#C7CAD1] shadow-sm px-6 py-8 text-left"
              >
                {/* Price row */}
                <div className="flex items-center mb-2 font-bold text-lg">
                  <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg p-2 mr-3">
                    {course.priceNGN}
                  </span>
                  <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg p-2">
                    {course.priceUSD}
                  </span>
                </div>

                {/* Level info */}
                <h3 className="text-xl font-semibold text-[#181A25] mb-1 mt-5">
                  {course.level}
                </h3>
                <p className="text-xs text-[#3A3D44] mb-1">
                  {course.requirement}
                </p>

                {/* Outcomes */}
                <h4 className="text-base font-semibold text-[#3A3D44] mb-2 mt-5">
                  Learning outcomes
                </h4>
                <ul className="space-y-2 mb-6">
                  {course.outcomes.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt="Check Icon"
                        className="w-5 h-5 mt-1"
                      />
                      <span className="font-light text-sm text-[#181A1D]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative">
                  <button
                    onClick={() =>
                      handleOpenModal(
                        course.level,
                        `${course.priceNGN} / ${course.priceUSD}`
                      )
                    }
                    role="button"
                    aria-expanded={openDropdown === idx}
                    className="w-full flex items-center justify-between px-5 py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-lg font-normal rounded-lg transition-all"
                  >
                    Register Now{" "}
                    <span className="text-lg">
                      <ArrowDown />
                    </span>
                  </button>

                  {openDropdown === idx && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-[#C7CAD1] rounded-lg shadow-md">
                      <ul className="text-sm text-[#181A25]">
                        <li className="px-4 py-2 hover:bg-[#F3F0FF] cursor-pointer">
                          Pay in ₦ Naira
                        </li>
                        <li className="px-4 py-2 hover:bg-[#F3F0FF] cursor-pointer">
                          Pay in $ Dollar
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-medium text-[#181A25] mb-10 text-left">
            A1 to B2 Full Level Program
          </h2>

          {/* Full-width card */}
          <div className="flex flex-col lg:flex-row bg-white border border-[#C7CAD1] rounded-xl shadow-sm overflow-hidden">
            {/* Left: Features */}
            <div className="w-full lg:w-1/2 px-6 py-8">
              <ul className="space-y-4 text-[#181A25] text-base font-medium">
                {cohortDetails.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <img
                      src="/images/icons/gray-check.svg"
                      alt="Check Icon"
                      className="w-5 h-5"
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Pricing & Actions */}
            <div className="w-auto sm:w-full lg:w-1/2 bg-[#F3F4F6] m-3 md:m-5 px-6 py-8 rounded-lg">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-base sm:text-xl font-semibold mb-2">
                  A1 to B2 full program
                </h3>
                <div className="flex justify-between items-center text-[#0F766E] font-bold text-lg mb-4">
                  <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg p-2 mr-3">
                    ₦420,000
                  </span>
                  <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg p-2 hidden sm:block">
                    $420
                  </span>
                </div>
              </div>{" "}
              <p className="text-sm text-[#181A25] flex items-center gap-2 mb-6">
                <img
                  src="/images/icons/gray-check.svg"
                  alt="Check Icon"
                  className="w-4 h-4"
                />
                Gain fluency from beginner to intermediate and develop strong
                reading, writing, speaking, and listening skills
              </p>
              <p className="text-sm text-[#181A25] flex items-center gap-2 mb-6">
                <img
                  src="/images/icons/gray-check.svg"
                  alt="Check Icon"
                  className="w-4 h-4"
                />
                Prepare confidently for DELF exam.{" "}
              </p>
              <div className="w-full">
                {/* Desktop: Two buttons side-by-side */}
                <div className="hidden sm:flex flex-row justify-center items-center gap-3 w-full">
                  <button className="w-full px-5 py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm font-medium rounded-lg transition-all">
                    Register (USD)
                  </button>
                  <button className="w-full px-5 py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm font-medium rounded-lg transition-all">
                    Register (NGN)
                  </button>
                </div>

                {/* Mobile: Single button */}
                <div className="sm:hidden flex justify-center w-full mt-3">
                  <button className="w-full px-5 py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm font-medium rounded-lg transition-all">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="text-center text-3xl md:text-5xl font-medium mb-5 leading-tight md:leading-snug">
          More programs coming soon.
          <br /> Stay tuned
        </div>
      </section>
<RegistrationModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  courseTitle={selectedCourse || ""}
  amount={selectedAmount || ""}
/>

    </>
  );
};

export default Program;
