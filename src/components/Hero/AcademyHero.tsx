/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { registerEmail } from "../../util/register";
import Link from "next/link";

const AcademyHero: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-[#F8F6F6] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:mt-5">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              className="font-bold text-[38px] sm:text-[70px] lg:text-[70px] leading-[50px] md:leading-[85px] tracking-tight mt-12 sm:mt-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Your journey to
              <br /> <span className="text-[#7148E5]">fluent</span> French
              <br /> starts here
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mt-5 mb-5">
              We make learning French fun, impactful and accessible.
            </p>

            <Link href="/program">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="inline-block px-6 py-4 mt-5 text-white bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-xl font-normal rounded-lg shadow-md transition-all"
              >
                Choose your program
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <img
              src="/images/academy.svg"
              alt="Hero Illustration"
              className="w-full max-w-md object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Narration Block */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-left md:text-center flex flex-col items-center">
          <p className="text-3xl md:text-5xl leading-relaxed font-medium">
            Learn French anywhere you are
          </p>
          <p className="text-lg lg:text-xl mt-3 mb-5">
            Cohort 1 is now open for registration. <br />
            Be the first to begin your French journey with us
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="mt-5 w-[80%] lg:w-[40%] py-4 text-white bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-xl font-normal rounded-lg shadow-md transition-all"
          >
            Enrol now
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default AcademyHero;
