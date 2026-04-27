"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden flex flex-col" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(125,229,242,0.15) 0%, transparent 70%)",
          }}
        />

        {/* 404 */}
        <p className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-secondary-1 leading-none select-none">
          404
        </p>

        {/* French subtitle */}
        <p className="text-secondary-1 font-medium text-lg italic -mt-2 mb-1">
          Cette page n&apos;existe pas
        </p>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary mt-3 text-center">
          You&apos;ve wandered off course
        </h1>

        {/* Description */}
        <p className="text-grey-600 mt-3 text-center max-w-[420px] text-base leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <Link
            href="/"
            className="px-8 py-3 bg-secondary-1 text-white rounded-xl font-medium hover:bg-[#5e36c2] transition-all text-center h-[54px] flex items-center justify-center"
          >
            Go back home
          </Link>
          <Link
            href="/academy"
            className="px-8 py-3 bg-secondary-2 text-primary rounded-xl font-medium hover:bg-secondary-1 hover:text-white transition-all text-center h-[54px] flex items-center justify-center"
          >
            Explore Academy
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
