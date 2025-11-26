/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import RegistrationModal from "../Modal/RegistrationModal";
import { Course, getPublicCohortsDetailed } from "@/lib/api";

// Types
interface Cohort {
  id: string;
  name: string;
  year: number;
  is_active?: boolean;
  registration_open_date?: string;
  registration_close_date: string;
  registration_status: string;
  days_until_close: number;
  program_duration_months?: number;
  max_students?: number;
  courses: Course[];
}

const Program = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<"NGN" | "USD">(
    "NGN"
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ Fetch cohorts with React Query (automatic caching & deduplication)
  const {
    data: cohortsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const data = await getPublicCohortsDetailed();

      // Handle different response structures
      let cohorts: Cohort[] = [];

      if (Array.isArray(data)) {
        cohorts = data;
      } else if (data?.cohorts && Array.isArray(data.cohorts)) {
        cohorts = data.cohorts;
      } else if (data?.id && data?.courses) {
        cohorts = [data];
      }

      return cohorts;
    },
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
  });



  const cohorts = cohortsData || [];

  // ✅ Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ✅ Modal handler
  const handleOpenModal = (
    cohortId: string,
    course: Course,
    currency: "NGN" | "USD"
  ) => {
    setSelectedCourse(course);
    setSelectedCohortId(cohortId);
    setSelectedCurrency(currency);
    setShowModal(true);
    setOpenDropdown(null);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <section className="w-full max-w-[1370px] mx-auto bg-white py-8 md:py-16 px-4 sm:px-6 lg:px-20 mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#181A25] mt-6 md:mt-12 mb-3 md:mb-4 pt-3 md:pt-5">
              CEFR-Aligned French Language Courses
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-[#181A25] mb-8 md:mb-12 max-w-7xl">
              Learn French with courses aligned to the Common European Framework
              of Reference for Languages (CEFR), a globally recognized standard
              for measuring language proficiency. Our courses help you build
              practical skills in speaking, listening, reading, and writing,
              while guiding you through each CEFR level from beginner to
              intermediate.
            </p>
          </motion.div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="animate-pulse space-y-10">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-4 md:p-6"
                >
                  <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-full bg-gray-200 rounded mb-3"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && cohorts.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 text-gray-600">
              <img
                src="/images/empty-state.svg"
                alt="No data"
                className="w-32 h-32 md:w-40 md:h-40 opacity-80 mb-6"
              />
              <p className="text-base md:text-lg font-medium px-4">
                No programs available at the moment.
              </p>
              <p className="text-sm text-gray-500 mt-2 px-4">
                Please check back later or contact support for updates.
              </p>
            </div>
          )}

          {/* ✅ Loaded State */}
          {!isLoading &&
            !isError &&
            cohorts.length > 0 &&
            cohorts.map((cohort) => (
              <section key={cohort.id} className="pb-10 md:pb-16 mt-6 md:mt-10">
                <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6">
                  {cohort.name}
                </h3>
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-3">
                  Single-Level Program
                </h4>

                {/* Cohort Details */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-[65%] bg-white border border-[#C7CAD1] rounded-xl shadow-sm px-4 sm:px-6 py-6 md:py-8 mb-8 md:mb-10"
                >
                  <ul className="space-y-3 md:space-y-5 text-[#181A25] text-sm sm:text-base md:text-lg font-normal">
                    <li className="flex items-center gap-2 md:gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-4 h-4 md:w-7 md:h-7 flex-shrink-0"
                      />
                      <span>
                        <strong>Registration is open</strong> until{" "}
                        {formatDate(cohort.registration_close_date)}
                      </span>
                    </li>
                    <li className="flex items-center gap-2 md:gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-4 h-4 md:w-7 md:h-7 flex-shrink-0"
                      />
                      <span>
                        {cohort.program_duration_months || 3}-month program
                        duration
                      </span>
                    </li>
                    {cohort.courses && cohort.courses.length > 0 && (
                      <li className="flex items-center gap-2 md:gap-3">
                        <img
                          src="/images/icons/gray-check.svg"
                          alt=""
                          className="w-4 h-4 md:w-7 md:h-7 flex-shrink-0"
                        />
                        <span>
                          Classes run from{" "}
                          {formatDate(cohort.courses[0]?.start_date)} to{" "}
                          {formatDate(
                            cohort.courses[cohort.courses.length - 1]?.end_date
                          )}
                        </span>
                      </li>
                    )}
                    <li className="flex items-center gap-2 md:gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-4 h-4 md:w-7 md:h-7 flex-shrink-0"
                      />
                      <span>4–5 live classes weekly + community support</span>
                    </li>
                    <li className="flex items-center gap-2 md:gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-4 h-4 md:w-7 md:h-7 flex-shrink-0"
                      />
                      <span>Zoom/Meet, 100% online</span>
                    </li>
                    <li className="flex items-center gap-2 md:gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-4 h-4 md:w-7 md:h-7 flex-shrink-0"
                      />
                      <span>We stay connected on Telegram</span>
                    </li>
                  </ul>
                </motion.div>

                {/* ✅ Dynamic Grid - 4 cards per row */}
                {cohort.courses && cohort.courses.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {cohort.courses.map((course) => (
                      <motion.div
                        key={course.id}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white rounded-lg border border-[#C7CAD1] shadow-sm p-4 md:p-6 flex flex-col"
                      >
                        {/* Price tags at top */}
                        <div className="flex items-center gap-2 mb-3 md:mb-4 flex-wrap">
                          <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg px-2 md:px-3 py-1 text-sm md:text-base font-semibold">
                            ₦{course.price_ngn.toLocaleString()}
                          </span>
                          <span className="bg-[#7DE5F2] text-[#3A3D44] rounded-lg px-2 md:px-3 py-1 text-sm md:text-base font-medium">
                            ${course.price_usd}
                          </span>
                        </div>

                        {/* Title and Level */}
                        <div className="mb-1">
                          <h3 className="text-base md:text-lg text-[#181A25]">
                            <span className="font-bold">{course.title}</span>{" "}
                            <span className="font-bold">{`(${course.level})`}</span>
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-[#3A3D44] mb-3 md:mb-4 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Learning outcomes */}
                        <div className="mb-4">
                          <h4 className="text-sm md:text-base font-medium text-[#3A3D44] mb-2">
                            Learning outcomes
                          </h4>
                          <ul className="space-y-2">
                            {course.learning_outcomes &&
                            course.learning_outcomes.length > 0 ? (
                              course.learning_outcomes.map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <img
                                    src="/images/icons/gray-check.svg"
                                    alt=""
                                    className="w-3 h-3 md:w-6 md:h-6 mt-0.5 flex-shrink-0"
                                  />
                                  <span className="font-light text-xs md:text-sm text-[#181A1D] leading-snug">
                                    {item}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="text-xs md:text-sm text-gray-500">
                                No learning outcomes available
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Dropdown Register button */}
                        <div className="relative mt-auto pt-4">
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === course.id ? null : course.id
                              )
                            }
                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all"
                          >
                            Register Now{" "}
                            <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
                          </button>

                          {openDropdown === course.id && (
                            <ul className="absolute z-10 mt-2 w-full bg-white border border-[#C7CAD1] rounded-lg shadow-md overflow-hidden">
                              <li
                                className="px-3 md:px-4 py-2.5 md:py-3 hover:bg-[#F3F0FF] cursor-pointer text-xs md:text-sm"
                                onClick={() =>
                                  handleOpenModal(cohort.id, course, "NGN")
                                }
                              >
                                Pay in ₦ Naira
                              </li>
                              <li
                                className="px-3 md:px-4 py-2.5 md:py-3 hover:bg-[#F3F0FF] cursor-pointer text-xs md:text-sm border-t border-gray-100"
                                onClick={() => handleOpenModal(cohort.id, course, "USD")}
                              >
                                 Pay in $ Dollar
                              </li>
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            ))}

          <section className="mt-8 md:mt-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 md:mb-8">
              A1 to B2 full-level program
            </h3>
            <div className="grid md:p-0 p-3 gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 border border-[#C7CAD1] rounded-xl overflow-hidden">
              <div className="bg-white p-6 md:p-8">
                <ul className="space-y-3 md:space-y-4 text-[#181A25] text-sm sm:text-base md:text-lg font-normal">
                  <li className="flex items-start gap-2 md:gap-3">
                    <img
                      src="/images/icons/gray-check.svg"
                      alt=""
                      className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0"
                    />
                    <span>
                      <strong>Registration is open</strong> and closes on
                      November 23, 2025
                    </span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <img
                      src="/images/icons/gray-check.svg"
                      alt=""
                      className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0"
                    />
                    <span>10-month program</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <img
                      src="/images/icons/gray-check.svg"
                      alt=""
                      className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0"
                    />
                    <span>
                      Classes run from December 1, 2025 to September 30, 2026
                    </span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <img
                      src="/images/icons/gray-check.svg"
                      alt=""
                      className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0"
                    />
                    <span>4–5 classes per week + community support</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <img
                      src="/images/icons/gray-check.svg"
                      alt=""
                      className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0"
                    />
                    <span>Zoom/Meet, 100% online</span>
                  </li>
                  <li className="flex items-start gap-2 md:gap-3">
                    <img
                      src="/images/icons/gray-check.svg"
                      alt=""
                      className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0"
                    />
                    <span>We stay connected on Telegram</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#F6F7FB] rounded-md lg:rounded-2xl p-6 md:p-8 lg:m-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <h4 className="text-xl md:text-2xl font-bold text-[#181A25]">
                      Complete A1 to B2
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#7DE5F2] text-[#181A25] px-2 md:px-3 py-1 rounded-lg text-sm md:text-base font-semibold">
                        ₦400,000
                      </span>
                      <span className="bg-[#7DE5F2] text-[#181A25] px-2 md:px-3 py-1 rounded-lg text-sm md:text-base font-semibold">
                        $400
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm md:text-base font-semibold text-[#3A3D44] mb-3">
                      Learning outcomes
                    </h5>
                    <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-[#181A25]">
                      <li className="flex items-start gap-2">
                        <img
                          src="/images/icons/gray-check.svg"
                          alt=""
                          className="w-3 h-3 md:w-6 md:h-6 mt-0.5 flex-shrink-0"
                        />
                        <span>
                          Gain fluency from beginner to intermediate and develop
                          strong reading, writing, speaking, and listening
                          skills
                        </span>
                      </li>
                      {/* <li className="flex items-start gap-2">
                        <img
                          src="/images/icons/gray-check.svg"
                          alt=""
                          className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0"
                        />
                        <span>Prepare confidently for DELF exam</span>
                      </li> */}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button className="flex-1 bg-[#7148E5] text-white py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium opacity-70 cursor-not-allowed transition">
                    Register (USD)
                  </button>
                  <button className="flex-1 bg-[#7DE5F2] text-[#181A25] py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium opacity-70 cursor-not-allowed transition">
                    Register (Naira)
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center py-12 md:py-16 px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium !leading-[1.3] text-[#181A25] mb-2">
              More programs coming soon. <br className="hidden sm:block" /> Stay
              tuned
            </h3>
          </div>
        </div>
      </section>

      {/* 🧾 Registration Modal */}
      {selectedCourse && selectedCohortId && (
        <RegistrationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          courseTitle={selectedCourse?.title}
          amount={
            selectedCurrency === "NGN"
              ? `₦${selectedCourse.price_ngn.toLocaleString()}`
              : `$${selectedCourse.price_usd}`
          }
          selectedCourseId={selectedCourse?.id}
          selectedCohortId={selectedCohortId}
          currency={selectedCurrency}
        />
      )}
    </>
  );
};

export default Program;
