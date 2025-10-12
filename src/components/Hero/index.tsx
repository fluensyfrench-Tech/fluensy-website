/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cards } from "../../data/content";
import { registerEmail } from "../../util/register";

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
      <section className="relative overflow-hidden pb-20">
        <div className="relative z-20 max-w-3xl mx-auto px-4 text-center mt-28">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-none md:leading-normal mb-6 sm:mb-8 md:mb-10"
          >
            <span className="block font-light">With fluensyfrench</span>
            <span className="block mt-1 sm:mt-2 font-bold">Fluensy is possible</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-base md:text-lg font-normal mb-5 xl:mb-8 max-w-xl mx-auto leading-relaxed"
          >
            The only path to real fluensy is here
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="group inline-flex items-center px-6 py-4 md:px-7 mt-3 md:mt-0 text-white
                       bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-base sm:text-xl font-normal 
                       rounded-lg shadow-lg hover:shadow-xl 
                       transform hover:scale-105 transition-all duration-300"
          >
            Start your French course now
          </motion.button>
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
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={idx === 1 ? "flex-[1.5]" : "flex-1"}
              >
                <img
                  src={src}
                  alt={`Illustration ${idx + 1}`}
                  className="w-full max-h-[345px] object-contain hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLUE SECTION FULL WIDTH */}
      <section className="bg-[#7DE5F2] relative z-30 -mt-5 md:-mt-10 xl:-mt-16 w-full">
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-medium text-[32px] md:text-5xl leading-[120%] mb-0 md:mb-8">
              Meet learners like
              <br className="hidden md:block" /> you in our growing learners’ club
            </h2>
            <button className="px-6 py-3 text-white bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-base md:text-xl rounded-lg hidden md:block">
              Join now for free
            </button>
          </motion.div>

          {/* Right Cards */}
          <div className="grid grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-3"
              >
                <img
                  src={card.icon} // Make sure card.icon points to /images/...
                  alt={`Icon ${idx + 1}`}
                  className="w-10 h-10 object-contain"
                />
                <p className="text-gray-800 text-base md:text-xl font-normal">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-2 px-6 py-3 text-white bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-base md:text-xl rounded-lg block md:hidden">
            Join now for free
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
