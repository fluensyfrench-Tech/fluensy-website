"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShowBanner(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay blur */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[3px] z-40"></div>

      {/* Cookie Banner */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] bg-white border border-gray-200 rounded-2xl shadow-xl p-4 md:p-5 z-50 flex flex-col md:flex-row md:items-center justify-between gap-3 animate-fadeIn">
        <p className="text-sm text-[#3A3D44] leading-snug">
          We use cookies to make fluensyfrench work better for you and to comply
          with 
          <Link
            href="/privacy"
            className="text-[#7148E5] font-medium hover:underline"
          >
           your country&apos;s Data Protection Regulation 
          </Link>
          . By using our site, you agree to our{" "}
          <Link
            href="/privacy"
            className="text-[#7148E5] font-medium hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={handleAccept}
          className="bg-[#7148E5] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#5b36c2] transition-all whitespace-nowrap"
        >
          Accept
        </button>
      </div>
    </>
  );
}
