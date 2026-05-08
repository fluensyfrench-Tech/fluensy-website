/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cards } from "@/data/content";
import ScrollSection from "./ScrollSection";

const Academy: React.FC = () => {
  const features = [
    "Free community support",
    "Science-backed learning methods",
    "Learn from proven experts",
    // "Certificate of completion",
    "Real-world French you will use",
    "Learn from anywhere",
  ];

  const benefits = [
    "Open doors to global career and study opportunities",
    "Boost memory, focus, and overall brainpower",
    "Teach others and earn money",
    "Travel with confidence in French-speaking countries",
    "Connect with millions of French speakers worldwide",
    "Experience the pride and joy of Fluensy",
  ];

  return (
    <>
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg">
          {/* Left: Black background with text */}
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0 }}
            className="bg-[#181A25] text-white flex flex-col justify-center items-start px-8 py-16 text-left"
          >
            <div className="ml-0 md:ml-5">
              <p className="text-base font-normal mb-5">
                Why fluensyfrench Academy
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug ">
                Redefining the way you learn French
              </h2>
              <p className="text-lg md:text-xl max-w-md">
                This is where fluensy comes to life. Our lessons meet you where
                you are and guide you to mastering French.
              </p>
            </div>
          </motion.div>

          {/* Right: Blue background with check icons */}
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0 }}
            className="bg-[#7DE5F2] flex flex-col justify-center px-5 md:px-8 py-14 md:py-16"
          >
            <ul className="space-y-4 md:space-y-6">
              {features.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ y: 16 }}
                  whileInView={{ y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: 0.2 + idx * 0.1,
                  }}
                  viewport={{ once: true, amount: 0 }}
                  className="flex items-center space-x-3 ml-0 sm:ml-8"
                >
                  <img
                    src="/images/icons/check.svg"
                    alt="Check Icon"
                    className="w-6 h-6"
                  />
                  <span className="text-[#181A25] text-xl font-normal">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <ScrollSection />

      <section className="bg-[#7148E5] relative z-30 w-full">
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0 }}
          >
            <h2 className="font-medium text-3xl md:text-5xl text-white leading-snug mb-0 md:mb-8">
              Free community
              <br className="hidden md:block" /> support
            </h2>
            <div className="w-full md:w-[80%] text-white text-base md:text-xl rounded-lg hidden md:block text-left font-normal">
              Learning doesn’t stop when your lesson ends. From day 1, our
              learners club supports your growth toward Fluensy.
            </div>
          </motion.div>

          {/* Right Cards */}
          <div className="grid grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: idx * 0.2,
                }}
                viewport={{ once: true, amount: 0 }}
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

          <button className="w-full mt-2 px-6 py-4 md:py-5 text-white bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-base md:text-xl rounded-lg block md:hidden">
            Join now for free
          </button>
        </div>
      </section>

      <section className="py-16 bg-[#7DE5F2]">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <p className="text-3xl md:text-5xl leading-snug md:leading-tight font-medium">
            Looking for a new skill or direction? <br />
            Learn French 😉
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 md:mx-20">
        <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left: Text + Image */}
          <div className="md:w-2/5 w-full flex flex-col items-start">
            <h2
              className="text-[#181A25] text-3xl md:text-5xl font-medium mb-6"
              style={{ lineHeight: "1.2" }}
            >
              Why you’ll love <br className="hidden md:block" />
              learning French
            </h2>

            <img
              src="/images/academy2.svg"
              alt="Learning French"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right: Purple Cards */}
          <div className="md:w-3/5 w-full flex flex-col justify-center space-y-7 md:ml-8">
            {benefits.map((text, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: idx * 0.1,
                }}
                viewport={{ once: true, amount: 0 }}
                className="bg-[#7148E5] text-white xl:w-[75%] px-6 py-4 rounded-lg flex items-center space-x-3 shadow-md"
              >
                <img
                  src="/images/icons/check.svg"
                  alt="Check Icon"
                  className="w-6 h-6"
                />
                <span className="text-lg font-medium">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
          {/* Left Image */}
          <img
            src="/images/academy3.svg"
            alt="Left visual"
            className="w-full md:w-1/4 h-auto rounded-lg object-cover"
          />

          {/* Text Content */}
          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0 }}
            className="w-full md:w-1/2 flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#181A25] mb-4 text-center">
              Turn your screen time into French time
            </h2>
            <p className="text-lg md:text-xl text-[#181A25] mb-8 text-center">
              Make your data count, learn French with it.{" "}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-[70%] px-6 py-4 text-white bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-lg font-medium rounded-lg shadow-md transition-all"
            >
              Enroll now
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <img
            src="/images/academy4.svg"
            alt="Right visual"
            className="w-full md:w-1/4 h-auto rounded-lg object-cover mt-8 md:mt-0"
          />
        </div>
      </section>
    </>
  );
};

export default Academy;
