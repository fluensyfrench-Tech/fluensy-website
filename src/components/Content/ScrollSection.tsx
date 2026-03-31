import React from "react";

function ScrollSection() {
  const headings = [
    "Fluensy is possible 👍🏾",
    "Fluensy is possible 👍🏾",
    "Fluensy is possible 👍🏾",
    "Fluensy is possible 👍🏾",
  ];

  return (
    <section className="bg-white md:mt-[60px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-scroll-left">
            {/* First set */}
            {headings.map((text, idx) => (
              <h2
                key={`first-${idx}`}
                className="text-base md:text-xl font-normal inline-block text-center px-12"
              >
                {text}
              </h2>
            ))}
            {/* Duplicate set for seamless loop */}
            {headings.map((text, idx) => (
              <h2
                key={`second-${idx}`}
                className="text-base md:text-xl font-normal inline-block text-center px-12"
              >
                {text}
              </h2>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default ScrollSection;
