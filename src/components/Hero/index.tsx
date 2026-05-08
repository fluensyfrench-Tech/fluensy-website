/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cards } from "../../data/content";
import { registerEmail } from "../../util/register";
import Link from "next/link";
import MotionButton from "../ui/MotionButton";

const Hero: React.FC = () => {
  const illustrations = [
    "/images/hero-img1.svg",
    "/images/hero-img2.svg",
    "/images/hero-img3.svg",
    "/images/hero-img4.svg",
  ];

  const onRegisterClick = (email: string) => {
    registerEmail(email);
  };

  return (
    <>
      {/* HERO CONTENT */}
      <section className="relative pb-20">
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-24 sm:mt-36">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl lg:text-7xl mb-6"
          >
            <span className="block mt-2 font-bold leading-[1.3]">
              Your journey to fluent French starts here
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-base md:text-lg font-normal mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed"
          >
            We make French learning fun, impactful, and accessible.
          </motion.p>

          <Link href="/academy">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-base sm:text-[20px] text-white px-6 py-[10px] sm:py-3.5 h-[66px] w-full max-w-[378px] rounded-[12px] text-center font-normal hover:opacity-95 transition"
            >
              Start learning now
            </motion.button>
          </Link>
        </div>
      </section>

      {/* IMAGE ROW */}
      <section className="relative z-10 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-nowrap justify-center items-start gap-3 -mt-5 xl:mt-0 w-full px-4">
            {illustrations.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: idx * 0.2,
                }}
                viewport={{ once: true }}
                className={
                  idx === 0 ? "flex-[1.1]" : idx === 1 ? "flex-[1.5]" : "flex-1"
                }
              >
                <img
                  src={src}
                  alt={`Illustration ${idx + 1}`}
                  className="w-full max-h-[320px] md:max-h-[340px] 2xl:max-h-[450px] object-contain transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLUE SECTION FULL WIDTH */}
      <section className="bg-[#7DE5F2] relative z-30 -mt-5 md:-mt-10 xl:-mt-16 w-full">
        <div className="max-w-[1250px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-medium text-3xl md:text-4xl lg:text-5xl mb-0 md:mb-8 !leading-[1.3]">
              Meet learners like
              <br className="hidden md:block" /> you in our growing learners’
              club
            </h2>

            <Link href="/#cohort" className="hidden md:block">
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="bg-[#7148E5] hover:bg-[#ffffff] hover:text-[#181A25] text-base sm:text-lg  text-white px-6 py-3.5 h-[66px] w-full max-w-[378px] rounded-[12px] text-center font-medium hover:opacity-95 transition"
              >
                Join now for free
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: idx * 0.2,
                }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-3"
              >
                <img
                  src={card.icon} // Make sure card.icon points to /images/...
                  alt={`Icon ${idx + 1}`}
                  className="w-10 h-10 object-contain"
                />
                <p className="text-gray-800 text-base md:text-xl font-normal">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>

          <Link href="/#cohort">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="bg-[#7148E5] block md:hidden hover:bg-[#ffffff] hover:text-[#181A25] text-base sm:text-lg  text-white px-6 py-3.5 h-[66px] w-full max-w-[378px] rounded-[12px] text-center font-medium hover:opacity-95 transition"
            >
              Join now for free
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
