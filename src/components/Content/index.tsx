/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import FooterUp from "../FooterUp";
import ScrollSection from "./ScrollSection";

const Content: React.FC = () => {
  return (
    <>
      {/* Waitlist Section */}
      <FooterUp />

      {/* Headings Section */}
      <ScrollSection />

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
              src="/images/learn.svg"
              alt="Learn anywhere"
              className="w-full max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
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
