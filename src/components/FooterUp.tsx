import React, { useState } from 'react'
import { registerEmail } from "../util/register";
import { motion } from 'framer-motion';

function FooterUp() {
   const [email, setEmail] = useState("");

     const onRegisterClick = (e: React.FormEvent) => {
       e.preventDefault();
       registerEmail(email);
       setEmail("");
     };

  return (
   <section className="bg-[#7148E5] text-white py-20">
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
                className="w-full px-4 py-6 pr-40 rounded-lg text-[#181A25] placeholder-gray-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[#7148E5] text-white font-light px-4 py-3 my-2 mr-2 rounded-md  hover:bg-white hover:text-black transition-colors duration-200 hidden md:block"
              >
                Join the waitlist
              </button>
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-[#7148E5] text-white font-light px-4 py-2 my-2 mr-2 rounded-md hover:bg-white hover:text-black transition-colors duration-200 block md:hidden"
            >
              Join the waitlist
            </button>
          </form>
        </motion.div>
      </section>
  )
}

export default FooterUp