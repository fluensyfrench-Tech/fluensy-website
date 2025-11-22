"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { addToWaitlist } from "@/lib/api";
import toast from "react-hot-toast";
import { CustomModal } from "./CustomModal";
import { useModal } from "./CustomModal";
function FooterUp() {
  const [email, setEmail] = useState("");
  const { openModal, closeModal, isOpen } = useModal();

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    const date = new Date().toISOString();

    toast
      .promise(addToWaitlist(email, date), {
        loading: "Submitting...",
        // success: "🎉 You're on the waitlist!",
        error: "Something went wrong. Try again later.",
      })
      .then(() => {
        openModal();
        setEmail("");
      });

    setEmail("");
  };

  return (
    <section className="bg-[#7148E5] text-white py-20 scroll-mt-60" id="cohort">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug mb-5">
          The only app to learn French faster and better is coming
        </h2>
        <p className="text-base md:text-lg mb-6 font-normal">
          Be the first to know when we launch
        </p>

        <form onSubmit={onRegisterClick} className="w-full sm:w-4/5 mx-auto">
          <div className="relative flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Type your email here"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-4 md:py-5 min-[400px]:pr-40 rounded-lg text-[#181A25] placeholder-gray-500 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 bg-[#7148E5] text-white font-light px-4 py-4 md:py-5 my-2 mr-2 rounded-[12px] hover:bg-[#7DE5F2] hover:text-black transition-colors duration-200 hidden min-[400px]:flex items-center justify-center text-center"
            >
              Join the waitlist
            </button>

            <button
              type="submit"
              className="mt-2 w-full bg-[#7DE5F2] text-black font-semibold font-light px-4 py-3 my-2 mr-2 rounded-md hover:bg-[#7DE5F2] hover:text-black transition-colors duration-200 flex items-center justify-center text-center min-[400px]:hidden"
            >
              Join the waitlist
            </button>
          </div>
        </form>
      </motion.div>
      <CustomModal
        onClose={closeModal}
        isOpen={isOpen}
        message=""
        actionMessage="Join our Telegram community"
        action={true}
      />
    </section>
  );
}

export default FooterUp;
