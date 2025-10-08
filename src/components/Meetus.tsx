/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";

const MeetUs: React.FC = () => {
  return (
    <section className="bg-[#7DE5F2] h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 w-full h-full">
        
        {/* Left Text */}
        <motion.div
          className="w-full md:w-1/2 text-[#181A25] text-center md:text-left flex flex-col justify-center h-full max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Meet fluensyfrench
          </h2>
          <p className="text-lg md:text-xl mb-4">
            At fluensyfrench, fluensy is the goal. We make French learning fun,
            impactful, and accessible.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Our goal is to guide learners from their first words all the way to
            fluensy, with lessons designed to be engaging, practical, and easy
            to follow.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Our lessons are designed with how people naturally learn, using
            proven, <strong>science-backed methods</strong> to make learning
            effective and enjoyable.
          </p>
          <p className="text-lg md:text-xl mb-4">
            We believe learning is more fun and effective when people are
            supported, so <strong>our community</strong> is here to motivate,
            encourage, and celebrate every step of their journey.
          </p>
          <p className="text-lg md:text-xl font-medium">
            Remember, with fluensyfrench, fluensy is possible 👍🏾
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center h-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="/images/meet-us.svg"
            alt="Our Team"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MeetUs;
