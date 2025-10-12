"use client";

import React from "react";
import Link from "next/link";
import { terms } from "@/util/terms";
import Footer from "@/components/Footer";

const TermsOfService: React.FC = () => {
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
            <Link
                      href="/academy#waitlist"
              className="px-5 py-2 bg-[#7148E5] text-white rounded-lg text-sm font-medium hover:bg-[#5b36c2] transition-all"
            >
              Start Your French Course
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-8 text-center">
            Terms of Service
          </h1>
        </header>

        {/* Main Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-10">
          {/* Sidebar Menu */}
          <aside className="w-full lg:w-1/4 border-l-4 border-[#7148E5] pl-4">
            <nav className="space-y-2 sticky top-24">
              <h2 className="text-lg font-semibold text-[#181A25] mb-2">
                Contents
              </h2>
              <ul className="space-y-1 text-sm font-medium">
                {terms.map((terms) => (
                  <li key={terms.id}>
                    <a
                      href={`#${terms.id}`}
                      className="block px-2 py-1 rounded-md hover:bg-[#F3F0FF] hover:text-[#7148E5] transition-all"
                    >
                      {terms.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="w-full lg:w-3/4 space-y-12">
            {terms.map((terms) => (
              <div key={terms.id} id={terms.id} className="space-y-6">
                <h2 className="text-2xl font-semibold text-[#7148E5] border-b border-[#E5E7EB] pb-2">
                  {terms.label}
                </h2>
                {terms.content.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-[#181A25] mb-1">
                      {item.heading}
                    </h3>
                    <p className="text-sm text-[#3A3D44] leading-relaxed whitespace-pre-line">
                      {item.description}
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

export default TermsOfService;
