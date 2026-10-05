"use client"

import { notFound, useParams } from "next/navigation";
import { frenchCourses, getCourseDetail, toSingleLine } from "@/constants/courses";
import Navbar from "@/components/Navbar";
import { useFetchCourses } from "@/hooks/queries/useFetchCourses";
import { Faq } from "@/components/CourseDetails/Faq";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import RegistrationModal from "@/components/Modal/RegistrationModal";

export default function CourseDetailsPage() {
  const { courseKey } = useParams<{ courseKey: string }>();
  const [modalOpen, setModalOpen] = useState(false)
  const [activeCurrency, setActiveCurrency] = useState<"NGN" | "USD">("NGN")
  const { data: adultCourses, isLoading, isError } = useFetchCourses("adults")
  const { data: kidsCourses, isLoading: kidsLoading, isError: kidsError } = useFetchCourses("kids")
  const realCourse = getCourseDetail(courseKey);

  if (!realCourse) {
    notFound();
  }

  // Both lists share courseKey with the static details, so look the live
  // course up by key and layer its pricing on top of the static copy.
  const liveCourse = [...(adultCourses ?? []), ...(kidsCourses ?? [])].find(
    (c) => c.courseKey === courseKey
  );
  // The fetched type is undefined until the request resolves, so fall back to
  // the static catalog to avoid the copy flipping from adult to kids on load.
  const courseType =
    liveCourse?.type ??
    frenchCourses.find((c) => c.courseKey === courseKey)?.type;
  const course = {
    ...realCourse,
    priceNGN: liveCourse?.priceNGN,
    priceUSD: liveCourse?.priceUSD,
    type: courseType,
  };

  // Only the price comes from the backend; everything else is static.
  const priceLoading = !liveCourse && (isLoading || kidsLoading)
  const priceError = !liveCourse && !priceLoading && (isError || kidsError)

  const openRegistrationModal = (currency: "NGN" | "USD") => {
    setActiveCurrency(currency)
    setModalOpen(true)
  }

  const modalAmount = liveCourse
    ? activeCurrency === "NGN"
      ? `₦${liveCourse.priceNGN.toLocaleString()}`
      : `$${liveCourse.priceUSD}`
    : ""

 



  return (
    <main className="h-screen">
      <Navbar />

      <div className="max-w-[1250px] mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-0">
          <div className="w-full lg:w-[48.87%]">
            <h1 className="text-primary text-[36px] sm:text-[48px] lg:text-[60px] font-bold leading-[130%] lg:whitespace-pre">{course.title}</h1>
            <p className="leading-[150%] text-[16px] sm:text-[18px] lg:text-[20px] font-normal mt-5 lg:mt-7 max-w-[606px]">{course.intro}</p>

            <h4 className="text-primary text-[28px] sm:text-[32px] lg:text-[40px] font-bold mt-7 leading-[130%]">Learning outcomes</h4>
            <p className="mt-3 lg:mt-[18px] text-[16px] sm:text-[18px] lg:text-[20px] font-normal">{course.outcomesIntro}</p>

            <ul className="list-disc pl-6 lg:pl-8 marker:text-[14px] lg:marker:text-[16px] font-normal mt-3 space-y-1">
              {course.outcomes.map((outcome, index) => (
                <li className="text-[16px] sm:text-[18px] lg:text-[20px]" key={index}>{outcome}</li>
              ))}
            </ul>

            <h4 className="mt-7 text-[28px] sm:text-[32px] lg:text-[40px] font-bold leading-[130%]">
              Who is this course for?
            </h4>
            <ul className="list-disc pl-6 lg:pl-8 mt-3 lg:mt-[18px] text-[16px] sm:text-[18px] lg:text-[20px] marker:text-[14px] lg:marker:text-[16px] font-normal space-y-1">
              {course.audience.map((audience, index) => (
                <li key={index}>{audience}</li>
              ))}
            </ul>

            <h4 className="mt-7 text-[28px] sm:text-[32px] lg:text-[40px] font-bold leading-[130%]">
              Frequently Asked Questions (FAQs)
            </h4>

            <div className="mt-5 lg:mt-6 space-y-4 lg:space-y-6">
              {course.faqs.map((faq, index) => (
                <Faq key={index} faq={faq} />
              ))}

            </div>
          </div>


          <div className="w-full lg:w-[40.24%] lg:sticky lg:top-24">
            <div className="bg-secondary-2 rounded-[10px] px-5 py-7 sm:px-[38px] sm:py-[42px]">
              {priceLoading && (
                // Same size as the real price pills so nothing jumps when they load
                <div className="flex gap-2 animate-pulse" aria-label="Loading price">
                  <div className="h-[39px] w-[112px] rounded-[5px] bg-white/60" />
                  <div className="h-[39px] w-[60px] rounded-[5px] bg-white/60" />
                </div>
              )}
              {priceError && (
                <p className="text-primary text-[16px]">
                  We couldn&apos;t load the price right now. Please refresh the page.
                </p>
              )}
              {course.priceNGN !== undefined && course.priceUSD !== undefined && (
                <div className="child:bg-white flex gap-2 child:rounded-[5px] child:px-[10px] child:py-[5.5px] child:text-primary child:text-[18px] sm:child:text-[20px] child:font-medium">
                  <div>₦{course.priceNGN.toLocaleString()}</div>
                  <div>${course.priceUSD}</div>
                </div>
              )}

              <div className="mt-7 sm:mt-9 grid grid-cols-[max-content_1fr] gap-x-2 gap-y-4 sm:gap-y-5">
                {
                  course.facts.map((fact, index) => (
                    <div className="contents" key={index}>
                      <h5 className="text-primary text-[16px] sm:text-[20px] font-bold">{fact.label}:</h5>
                      <p className="text-primary text-[16px] sm:text-[20px] font-normal">{fact.value}</p>
                    </div>
                  ))
                }

              </div>

              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openRegistrationModal("NGN")}
                  disabled={!liveCourse}
                  className="flex-1 min-h-[43px] px-4 bg-secondary-1 hover:bg-white hover:text-primary text-white text-[16px] sm:text-[18px] font-normal rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enrol now (Naira)
                </button>
                <button
                  type="button"
                  onClick={() => openRegistrationModal("USD")}
                  disabled={!liveCourse}
                  className="flex-1 min-h-[43px] px-4 bg-secondary-1 hover:bg-white hover:text-primary text-white text-[16px] sm:text-[18px] font-normal rounded-[10px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enrol now (Dollar)
                </button>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="text-center py-12 md:py-16 px-4"
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <motion.h3
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium !leading-[1.3] text-[#181A25] mb-2"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Want a learning plan tailored {courseType !== "kids" && <br />} to  {courseType === "kids" && <br />} {courseType === "kids" ? "your child's" : "your"} goals{courseType === "kids" && ','} and pace?
          </motion.h3>
          <div>
            <a href="https://wa.me/2347065535423" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="mt-4 mx-auto px-6 py-3 bg-secondary-1 text-white rounded-lg hover:bg-secondary-2 hover:text-primary transition-colors w-full md:w-[378px] h-[66px] text-[20px] flex items-center justify-center"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Message us on WhatsApp
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>



      <Footer />

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        courseTitle={toSingleLine(course.title)}
        amount={modalAmount}
        selectedCourseId={liveCourse?.courseKey}
        currency={activeCurrency}
        isKids={courseType === "kids"}
      />
    </main>
  );
}