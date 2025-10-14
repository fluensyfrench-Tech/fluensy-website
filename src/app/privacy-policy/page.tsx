"use client";

import React from "react";
import Link from "next/link";
import { privacy } from "@/util/privacy";
import Footer from "@/components/Footer";

const Privacy: React.FC = () => {
  return (
    <>
      {" "}
      <div className="min-h-screen bg-white scroll-smooth">
        {/* Header */}
        <header className="bg-[#7DE5F2] py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-[#181A25]">
              fluensyfrench
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-8 text-center">
            Privacy Policy
          </h1>
          <h6 className="font-normal text-sm text-center mb-8 text-[#5A5D66] mt-1">
            Last updated: August 1, 2025
          </h6>
        </header>

        {/* Main Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-10">
          {/* Sidebar Menu */}
          <nav className="space-y-2 sticky top-24">
            <ul className="space-y-1 text-sm font-medium">
              {privacy.map((privacy) => (
                <li key={privacy.id}>
                  <a
                    href={`#${privacy.id}`}
                    className="block px-2 py-1 text-[#7A7D88] rounded-md hover:bg-[#F3F0FF] hover:text-[#7148E5] transition-all"
                  >
                    {privacy.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <article className="w-full lg:w-3/4 space-y-5">
            {privacy.map((privacy) => (
              <div key={privacy.id} id={privacy.id} className="space-y-4">
                <h2 className="text-2xl font-semibold">{privacy.label}</h2>
                {privacy.content.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-base text-[#181A25] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1">
                      <span
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
