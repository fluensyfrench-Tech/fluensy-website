import { motion } from 'framer-motion';
import React from 'react'

function ScrollSection() {
    const headings = [
    "Fluensy is possible 👍🏾",
    "Fluensy is possible 👍🏾",
    "Fluensy is possible 👍🏾",
    "Fluensy is possible 👍🏾",
  ];

  return (
     <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden whitespace-nowrap scroll-smooth">
            <div className="inline-flex gap-15 animate-scroll-left">
              {headings.map((text, idx) => (
                <motion.h2
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="text-base md:text-xl font-normal inline-block text-center px-12"
                >
                  {text}
                </motion.h2>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default ScrollSection