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
  return (
    <>
      {/* Waitlist Section */}
      <FooterUp />

      <section className="max-w-7xl mx-auto px-4 !mt-10  sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            Cohort 1 is open for registration
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Be part of our Founding Learners, the pioneers of this exciting
            journey.
          </p>
          <Link href="/enrol">
            <MotionButton>Enrol now</MotionButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl mx-auto overflow-hidden  max-w-[1080px] !mt-20  shadow-lg"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full bg-[#0f1724] p-8 md:p-10 text-white">
              <p className="text-xs opacity-70 mb-3">Why fluensyfrench</p>
              <h3 className="text-2xl md:text-4xl font-semibold leading-tight mb-4">
                Redefining the way you learn French
              </h3>
              <p className="text-sm md:text-base opacity-80 max-w-xl">
                This is where fluensy comes to life. Our lessons meet you where
                you are and guide you to mastering French.
              </p>
            </div>

            <div className="w-full bg-[#7DE5F2] p-8 md:p-10 text-[#0f1724]">
              <ul className="space-y-4">
                {benefits.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex items-center justify-center bg-white rounded-full w-6 h-6 text-[#7DE5F2]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
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
                    <span className="text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Headings Section */}
      <ScrollSection />

      {/* Learn From Home Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Learn Anywhere Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-[60%]"
          >
            <h3 className="text-3xl md:text-5xl font-normal md:font-medium leading-tight md:leading-snug mb-6">
              Why go to a classroom when you can learn French from home, the
              beach, or anywhere you like?
            </h3>
            <button className="w-full sm:w-auto sm:px-32 xl:px-40 py-4 md:py-5 bg-[#7148E5] text-white text-lg md:text-xl rounded-lg hover:bg-[#7DE5F2] hover:text-[#181A25] transition-colors duration-200 mt-8">
              Start learning now
            </button>
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
              className="w-full max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="order-2 md:order-1 flex w-[379px] flex-col justify-center items-start"
          >
            <h3 className="text-3xl md:text-5xl text-center font-medium mb-6">
              Why you’ll love learning French
            </h3>
            <img
              src="/images/academy2.svg"
              alt="learning illustration"
              className="w-full max-w-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="order-1 md:order-2"
          >
            <ul className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="order-1 md:order-2"
              >
                <ul className="space-y-4">
                  {benefits.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.06 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="flex items-center justify-between bg-[#7148E5] text-white rounded-md px-6 py-3 shadow-md h-16"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center bg-white rounded-full w-6 h-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 text-[#7148E5]"
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
                        <span>{item}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* New Skills Section */}
      <section className="max-w-full bg-[#7DE5F2]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className=" py-24 text-center mx-auto w-[60%]"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl md:text-5xl font-medium"
          >
            Looking for a new skill or direction? Learn French{" "}
            <span aria-hidden>😉</span>
          </motion.h3>
        </motion.div>
      </section>

      {/* Brain Training Section */}
      <section className="max-w-7xl m-0 sm:mx-auto px-0 sm:px-6 lg:px-8 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#7148E5] rounded-none md:rounded-3xl px-6 py-8 flex flex-col-reverse md:flex-row md:items-center gap-6"
        >
          <div className="flex justify-center md:justify-start items-end w-full md:w-1/3">
            <img
              src="/images/know.svg"
              alt="Brain Training"
              className="w-[70%] lg:w-full object-contain -mb-8"
            />
          </div>
          <div className="text-white flex flex-col justify-center w-full md:w-2/3 p-0 md:p-4">
            <h2 className="text-3xl md:text-5xl font-medium leading-tight md:leading-snug mb-3">
              Did you know learning a new language can improve memory and focus?
            </h2>
            <p className="text-xl md:text-3xl font-normal mt-4">
              Train your brain, learn French
            </p>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden mb-7 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center px-4 relative z-10"
        >
          <h1 className="text-4xl md:text-7xl font-light leading mb-3">
            Get ready to be fluent
          </h1>
          <p className="text-5xl md:text-9xl font-bold mb-6">It’s possible</p>
          <button
            className="items-center w-full sm:w-auto py-4 md:py-5 px-auto md:px-24 mt-5 md:mt-10 text-white mx-auto
             bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-base sm:text-xl font-normal 
             rounded-lg shadow-lg hover:shadow-xl 
             transform hover:scale-105 transition-all duration-300"
          >
            Start learning now
          </button>
        </motion.div>

        {/* Background floating icons */}
        <img
          src="/images/icons/icon1.svg"
          alt=""
          className="absolute top-6 left-6 w-8 h-8 animate-pulse"
        />
        <img
          src="/images/icons/icon2.svg"
          alt=""
          className="absolute top-6 right-6 w-8 h-8 animate-bounce"
        />
        <img
          src="/images/icons/icon5.svg"
          alt=""
          className="absolute bottom-3 left-4 w-8 h-8 animate-ping"
        />
        <img
          src="/images/icons/icon4.svg"
          alt=""
          className="absolute bottom-3 right-4 w-5 h-5 animate-ping"
        />
      </section>
    </>
  );
};

export default Content;
