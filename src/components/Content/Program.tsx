/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import RegistrationModal from "../Modal/RegistrationModal";
import { Course, getPublicCohortsDetailed } from "@/lib/api";

interface Cohort {
  id: string;
  name: string;
  year: number;
  is_active: boolean;
  registration_open_date: string;
  registration_close_date: string;
  registration_status: string;
  days_until_close: number;
  program_duration_months: number;
  max_students: number;
  courses: Course[];
}

const Program = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleOpenModal = (courseTitle: string, amount: string) => {
    setSelectedCourse(courseTitle);
    setSelectedAmount(amount);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const data = await getPublicCohortsDetailed();
        setCohorts(data.cohorts || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCohorts();
  }, []);

  return (
    <>
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-12 mb-4 pt-5">
            CEFR-Aligned French Language Courses
          </h2>
          <p className="text-lg md:text-xl text-[#181A25]">
            Learn French with courses aligned to the Common European Framework
            of Reference for Languages (CEFR), a globally recognized standard
            for measuring language proficiency. Build practical skills in
            speaking, listening, reading, and writing.
          </p>
        </div>
      </section>

      {cohorts.map((cohort) => (
        <section key={cohort.id} className="w-full bg-white pb-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-left">
            <h4 className="text-3xl md:text-5xl font-medium mb-5">Single-level program</h4>
            <h3 className="text-2xl md:text-4xl font-medium mb-5 mt-8">{cohort.name}</h3>

            {/* Cohort details */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full md:w-[60%] bg-white border border-[#C7CAD1] rounded-xl shadow-sm px-6 py-8 mb-12"
            >
              <ul className="space-y-4 text-[#181A25] text-base md:text-xl font-normal">
                <li className="flex items-start gap-3">
                  <img src="/images/icons/gray-check.svg" alt="Check Icon" className="w-5 h-5 mt-1" />
                  <span>
                    <strong>Registration is open</strong> and closes on{" "}
                    {new Date(cohort.registration_close_date).toLocaleDateString()}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/icons/gray-check.svg" alt="Check Icon" className="w-5 h-5 mt-1" />
                  <span>{cohort.program_duration_months}-month program</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/icons/gray-check.svg" alt="Check Icon" className="w-5 h-5 mt-1" />
                  <span>
                    Classes run from{" "}
                    {cohort.courses[0]?.start_date
                      ? new Date(cohort.courses[0].start_date).toLocaleDateString()
                      : "-"}{" "}
                    to{" "}
                    {cohort.courses[cohort.courses.length - 1]?.end_date
                      ? new Date(cohort.courses[cohort.courses.length - 1].end_date).toLocaleDateString()
                      : "-"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/icons/gray-check.svg" alt="Check Icon" className="w-5 h-5 mt-1" />
                  <span>4–5 classes per week + community support</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/icons/gray-check.svg" alt="Check Icon" className="w-5 h-5 mt-1" />
                  <span>Zoom/Meet, 100% online</span>
                </li>
              </ul>
            </motion.div>

            {/* Courses Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              {cohort.courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl border border-[#C7CAD1] shadow-sm px-6 py-8 text-left flex flex-col"
                >
                  <div className="flex items-center mb-2 font-bold text-lg gap-2">
                    <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg p-2">
                      ₦{course.price_ngn.toLocaleString()}
                    </span>
                    <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg p-2">
                      ${course.price_usd}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#181A25] mb-1 mt-5">
                  {course.level}
                  </h3>
                  <p className="text-xs text-[#3A3D44] mb-1">{course.description}</p>

                  <h4 className="text-base font-semibold text-[#3A3D44] mb-2 mt-5">
                    Learning outcomes
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {course.learning_outcomes.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <img
                          src="/images/icons/gray-check.svg"
                          alt="Check Icon"
                          className="w-5 h-5 mt-1"
                        />
                        <span className="font-light text-sm text-[#181A1D]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Dropdown Register button */}
                  <div className="relative w-full">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === course.id ? null : course.id)
                      }
                      className="w-[200px] flex items-center justify-between px-6 py-4 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm font-medium rounded-lg transition-all"
                    >
                      Register Now <ArrowDown className="ml-2" />
                    </button>

                    {openDropdown === course.id && (
                      <ul className="absolute z-10 mt-2 w-[200px] bg-white border border-[#C7CAD1] rounded-lg shadow-md">
                        <li
                          className="px-4 py-2 hover:bg-[#F3F0FF] cursor-pointer"
                          onClick={() => handleOpenModal(course.title, `₦${course.price_ngn.toLocaleString()}`)}
                        >
                          Pay in ₦ Naira
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-[#F3F0FF] cursor-not-allowed opacity-50"
                        >
                          Pay in $ Dollar
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

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
