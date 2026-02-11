/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import FooterUp from "../FooterUp";
import ScrollSection from "./ScrollSection";
import Link from "next/link";
import MotionButton from "../ui/MotionButton";

const Content: React.FC = () => {
  const benefits = [
    "Open doors to global career and study opportunities",
    "Teach others and earn money",
    "Travel with confidence in French-speaking countries",
    "Connect with millions of French speakers worldwide",
    "Experience the pride and joy of fluency",
  ];
  const message = [
    "Free community support",
    "Science-backed learning methods",
    "Learn from proven experts",
    // "Certificate of completion",
    "Learn from anywhere",
  ];
  return (
    <>
      <FooterUp />

      <section className="max-w-7xl mx-auto px-0 !mt-10 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-8 md:mb-10 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2">
            Cohort 1 is open for registration
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 mb-6 px-4 py-4">
            Be part of our Founding Learners, the pioneers of this exciting
            journey.
          </p>
          <Link href="/program">
            <MotionButton>Enrol now</MotionButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="sm:rounded-2xl mx-auto overflow-hidden max-w-[1200px] !mt-12 md:!mt-20 shadow-lg"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full bg-[#0f1724] px-[30px] md:px-[60px] lg:px-[80px] py-10 md:py-16 text-white">
              <p className="text-[14px] opacity-70 mb-3">Why fluensyfrench</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-4">
                Redefining the way you learn French
              </h3>
              <p className="text-base md:text-lg opacity-80 max-w-xl">
                This is where fluensy comes to life. Our lessons meet you where
                you are and guide you to mastering French.
              </p>
            </div>

            <div className="w-full bg-[#7DE5F2] px-[30px] md:px-[60px] py-4 sm:py-10 md:py-16 text-[#0f1724]">
              <ul className="space-y-3 md:space-y-6">
                {message.map((text, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-[15px] md:gap-[25px]"
                  >
                    <span className="flex items-center justify-center bg-white rounded-full w-5 h-5 md:w-6 md:h-6 text-[#7DE5F2] flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 md:w-4 md:h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-base md:text-xl text-[#181A25]">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      <ScrollSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 mb-[30px]">
        {/* Learn Anywhere Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-[60%]"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium !leading-[1.3] mb-6">
              Why sit in a classroom when you can learn French from home, the
              beach, or anywhere you like?
            </h3>
            <Link href="/program">
              <MotionButton>Start learning now</MotionButton>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-[40%] md:order-last order-first"
          >
            <img
              src="/images/academy.svg"
              alt="Learn anywhere"
              className="w-full max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-[50px]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-[10px] sm:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col-reverse sm:flex-col justify-center items-center lg:items-start w-full max-w-[400px] lg:max-w-[600px]"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-start font-medium mb-6 max-w-[400px] m-auto !leading-[1.3]">
              Why you&apos;ll love learning French
            </h3>
            <img
              src="/images/academy2.svg"
              alt="learning illustration"
              className="w-full max-w-[300px] m-auto mb-6 lg:mb-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto"
          >
            <ul className="space-y-3 md:space-y-4">
              {benefits.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex items-center justify-between bg-[#7148E5] text-white rounded-md px-4 sm:px-6 py-3 shadow-md min-h-[56px] md:min-h-[64px]"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="flex items-center justify-center bg-white rounded-full w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#7148E5]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-base sm:text-sm md:text-lg">
                      {item}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="max-w-full bg-[#7DE5F2] my-0 md:my-[50px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="py-16 md:py-24 text-center mx-auto w-full px-4 md:w-[80%] lg:w-[60%]"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium !leading-[1.5]"
          >
            Looking for a new skill or direction? Learn French{" "}
            <span aria-hidden>😉</span>
          </motion.h3>
        </motion.div>
      </section>

      <section className="max-w-7xl m-0 sm:mx-auto px-0 md:px-8 py-0 md:py-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#7148E5] rounded-none md:rounded-3xl px-4 sm:px-6 py-8 flex flex-col-reverse md:flex-row md:items-center gap-6"
        >
          <div className="flex justify-center md:justify-start items-end w-full md:w-1/3">
            <img
              src="/images/know.svg"
              alt="Brain Training"
              className="w-[60%] sm:w-[70%] lg:w-full object-contain -mb-8"
            />
          </div>
          <div className="text-white flex flex-col justify-center w-full md:w-2/3 p-0 md:p-4">
            <h2 className="text-xl min-[300px]:text-3xl lg:text-4xl xl:text-5xl font-medium !leading-[1.3] mb-3">
              Did you know learning a new language can boost your memory and
              overall brainpower?
            </h2>
            <p className="text-lg min-[300px]:text-xl md:text-2xl lg:text-3xl font-normal mt-2 sm:mt-4">
              Train your brain, learn French
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-12 md:py-20 relative overflow-hidden mb-7 md:mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center relative z-10"
        >
          <h1 className="text-lg min-[400px]:text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light leading">
            Get ready to be fluent
          </h1>
          <p className="text-3xl min-[400px]:text-6xl lg:text-8xl xl:text-9xl font-bold mb-3 sm:mb-6 py-3 sm:py-5">
            It&apos;s possible
          </p>
          <Link href="/program">
            <MotionButton className="font-normal text-base md:text-lg">
              Start learning now
            </MotionButton>
          </Link>
        </motion.div>

        {/* Background floating icons */}
        <img
          src="/images/icons/icon1.svg"
          alt=""
          className="absolute top-6 left-4 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 animate-pulse"
        />
        <img
          src="/images/icons/icon2.svg"
          alt=""
          className="absolute top-6 right-4 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 animate-bounce"
        />
        <img
          src="/images/icons/icon5.svg"
          alt=""
          className="absolute bottom-3 left-4 w-6 h-6 sm:w-8 sm:h-8 animate-ping"
        />
        <img
          src="/images/icons/icon4.svg"
          alt=""
          className="absolute bottom-3 right-4 w-4 h-4 sm:w-5 sm:h-5 animate-ping"
        />
      </section>
    </>
  );
};

export default Content;
