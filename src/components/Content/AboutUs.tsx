import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  return (
    <section className="h-full">
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-center justify-start md:justify-between px-4 sm:px-6 lg:px-8 pt-32 pb-28 h-full">
        <motion.div
          className="w-full md:w-3/5 text-[#181A25] text-left flex flex-col justify-center max-w-2xl space-y-4"
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl mb-3 font-bold leading-tight">
            About fluensyfrench
          </h2>
          <p className="text-lg md:text-xl">
            We help French learners <strong>gain fluency</strong> through proven,
            science-backed learning methods. 
            Our goal is to guide them at every step, 
            all the way to fluency, with lessons designed to be engaging, 
            practical, and easy to follow.
          </p>
          <p className="text-lg md:text-xl">
           Our lessons are designed with how people naturally learn, 
           <strong>using proven, science-backed methods</strong> to make learning 
           effective and enjoyable.
          </p>
          <p className="text-lg md:text-xl">
            We believe learning is more fun and effective when people
            are supported, so our <strong>community</strong> is here to motivate, encourage, 
            and celebrate every step of their journey.
          </p>
          <p className="text-lg md:text-xl">
            Remember, with fluensyfrench,{" "}
            fluensy is possible 👍🏾
          </p>
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 flex justify-end items-center p-2 md:p-8"
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/meet-us.svg"
            alt="Our Team"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
