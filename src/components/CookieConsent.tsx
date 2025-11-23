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

  const handleReject = () => {
    // Does nothing functional yet — just closes the banner
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay blur */}
      <div className="fixed inset-0 z-40"></div>

      {/* Cookie Banner */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[640px] bg-white border border-gray-200 rounded-2xl shadow-xl p-5 md:p-6 z-50 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
        <p className="text-sm text-[#3A3D44] leading-snug md:w-[70%]">
          We use cookies to improve your experience. Learn more in our{" "}
          <Link
            href="/privacy"
            className="text-[#7148E5] font-medium hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex flex-row gap-2 md:gap-3">
          <button
            onClick={handleReject}
            className="border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            Reject
          </button>

          <button
            onClick={handleAccept}
            className="bg-[#7148E5] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#5b36c2] transition-all"
          >
            Accept
          </button>
        </div>
      </div>
    </>
  );
}
