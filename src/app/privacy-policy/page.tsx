"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { privacy } from "@/util/privacy";
import Footer from "@/components/Footer";

const Privacy: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white scroll-smooth">
        {/* Header */}
        <header className="bg-[#7DE5F2] py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex-shrink-0 text-xl leading-[100%] tracking-[0]">
              <Link href="/">
                <span className="font-bold">fluensy</span>
                <span className="font-normal">french</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setOpen(true)}
                className="text-[#7148E5] focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-8 text-center">
            Privacy Policy
          </h1>
          <h6 className="font-normal text-sm text-center mb-8 text-[#5A5D66] mt-1">
            Last updated: August 1, 2025
          </h6>
        </header>

        {/* Mobile Sidebar */}
        {open && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 space-y-4 overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="self-end text-[#7148E5]"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

          <nav className="space-y-4 text-lg font-medium flex flex-col">
  {privacy.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={() => setOpen(false)}
      className="block text-[#181A25] hover:text-[#7148E5] transition-colors"
    >
      {item.label}
    </a>
  ))}
</nav>

          </div>
        )}

        {/* Main Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-10">
          {/* Desktop Sidebar Menu */}
          <nav className="space-y-2 sticky top-24 hidden lg:block">
            <ul className="space-y-1 text-sm font-medium">
              {privacy.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block px-2 py-1 text-[#7A7D88] rounded-md hover:bg-[#F3F0FF] hover:text-[#7148E5] transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <article className="w-full lg:w-3/4 space-y-5">
            {privacy.map((item) => (
              <div key={item.id} id={item.id} className="space-y-4">
                <h2 className="text-2xl font-semibold">{item.label}</h2>
                {item.content.map((entry, idx) => (
                  <div key={idx}>
                    <div className="text-base text-[#181A25] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1">
                      <span
                        dangerouslySetInnerHTML={{ __html: entry.description }}
                      />
                    </div>
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
