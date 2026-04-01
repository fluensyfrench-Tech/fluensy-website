/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cards } from "../../data/content";
import { registerEmail } from "../../util/register";
import Link from "next/link";
import MotionButton from "../ui/MotionButton";
import Image from "next/image";
import { PiGooglePlayLogoLight } from "react-icons/pi";
import { TbBrandApple } from "react-icons/tb";
import AppleFooterIcon from "../icons/AppleFooterIcon";

const Hero: React.FC = () => {
  const illustrations = [
    "/images/hero-img-1.svg",
    "/images/hero-img-2.svg",
    "/images/hero-img-3.svg",
    "/images/hero-img-4.svg",
  ];

  const onRegisterClick = (email: string) => {
    registerEmail(email);
  };

  return (
    <>
      {/* HERO CONTENT */}
      <section className="relative overflow-hidden pb-20">
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-24 sm:mt-36 lg:mt-28">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl mb-0 max-w-3xl mx-auto"
          >
            <p className="font-bold leading-[1.3]">
              Your journey <br className="md:hidden" /> to <span className="text-secondary-1">fluensy french </span> starts <span className="hidden md:inline">now</span> <span className="md:hidden">here</span>
            </p>
          </motion.h1>

          <motion.div 
            className="mt-6 space-y-4 px-[20px] md:hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <motion.button
              className="bg-secondary-1 flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <PiGooglePlayLogoLight size={32} fill="white" />
              Download on Google Play
            </motion.button>

            <motion.button
              className="bg-secondary-2 flex items-center justify-center text-[16px] font-normal gap-[10px] w-full h-[66px] rounded-[10px] text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AppleFooterIcon isHovered={false}/>
              Download on App Store
            </motion.button>
          </motion.div>

          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="max-w-xl mx-auto w-fit"
            >
              <Image src={'/images/qrcode.svg'} alt="QR Code" width={211} height={211} />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="text-primary text-sm"
            >
              Scan now to download app
            </motion.span>
          </div>
        </div>
      </section>

      {/* IMAGE ROW */}
      <section className="relative z-10 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-nowrap justify-between items-start gap-3 -mt-5 xl:mt-0 w-full">
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
        <div className="max-w-[1250px] mx-auto px-7 py-10 md:py-[98px] flex flex-col md:flex-row gap-12 items-center">
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
                className="bg-[#7148E5] hover:bg-[#ffffff] hover:text-[#181A25] text-base sm:text-lg  text-white px-6 py-3.5 h-[66px] w-full max-w-[378px] rounded-[12px] text-center font-regular hover:opacity-95 transition"
              >
                Download app
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
                className="bg-white py-4 px-6 rounded-lg shadow-md flex flex-col gap-3"
              >
                <img
                  src={card.icon} // Make sure card.icon points to /images/...
                  alt={`Icon ${idx + 1}`}
                  className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] object-contain"
                />
                <p className="text-primary text-base md:text-xl font-normal">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>

          <Link className="w-full block md:hidden" href="/#cohort">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="bg-[#7148E5]  hover:bg-[#ffffff] hover:text-[#181A25] text-base sm:text-lg  text-white px-6 h-[66px] w-full rounded-[12px] text-center font-regular hover:opacity-95 transition"
            >
              Download app
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
