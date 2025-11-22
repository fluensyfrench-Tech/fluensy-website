/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";

const MeetUs: React.FC = () => {
  return (
    <section className="bg-[#7DE5F2] h-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-start px-4 sm:px-6 lg:px-8 pt-32 pb-28 h-full">
        <motion.div
          className="w-full md:w-3/5 text-[#181A25] text-left flex flex-col justify-center max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl mb-3 font-bold leading-tight">
            Meet fluensyfrench
          </h2>
          <p className="text-lg md:text-xl">
            At fluensyfrench, we make French learning fun, impactful, and
            accessible.
          </p>
          <p className="text-lg md:text-xl">
            Our goal is to guide learners from their first words all the way to
            fluensy, with lessons designed to be engaging, practical, and easy
            to follow.
          </p>
          <p className="text-lg md:text-xl">
            Our lessons are designed with how people naturally learn, using
            proven, <strong>science-backed methods</strong> to make learning
            effective and enjoyable.
          </p>
          <p className="text-lg md:text-xl">
            We believe learning is more fun and effective when people are
            supported, so <strong>our community</strong> is here to motivate,
            encourage, and celebrate every step of their journey.
          </p>
          <p className="text-lg md:text-xl font-medium">
            Remember, with fluensyfrench,{" "}
            <strong>fluensy is possible 👍🏾</strong>
          </p>
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 flex justify-end items-center p-2 md:p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
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
