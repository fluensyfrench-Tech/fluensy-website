"use client";

import { useEffect, useState } from "react";
import { PiAppStoreLogo, PiGooglePlayLogoLight } from "react-icons/pi";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.fluensyfrench.app";
const APP_STORE_URL = "https://apps.apple.com/us/app/fluensyfrench/id6770974375";

const DownloadPage = () => {
  const [device, setDevice] = useState<"android" | "ios" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("ref") !== "qr") {
      window.location.replace("/");
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
      setDevice("android");
    } else if (/iphone|ipad|ipod/.test(ua)) {
      setDevice("ios");
    } else {
      window.location.replace("/");
    }
  }, []);

  useEffect(() => {
    if (device === "android") {
      const timer = setTimeout(() => {
        window.location.href = PLAY_STORE_URL;
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (device === "ios") {
      const timer = setTimeout(() => {
        window.location.href = APP_STORE_URL;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [device]);

  if (!device) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#643BD8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (device === "android") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#643BD8]/10 flex items-center justify-center">
          <PiGooglePlayLogoLight size={36} fill="#643BD8" />
        </div>
        <h1 className="text-2xl font-bold text-[#181A25]">Redirecting to Google Play</h1>
        <p className="text-[#7A7D88] text-base max-w-xs">
          Taking you to download the Fluensy French app...
        </p>
        <a
          href={PLAY_STORE_URL}
          className="bg-[#643BD8] text-white w-full max-w-[320px] h-[56px] rounded-[12px] flex items-center justify-center gap-2 text-base font-medium"
        >
          <PiGooglePlayLogoLight size={24} fill="white" />
          Open Google Play
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-[#7DE5F2]/20 flex items-center justify-center">
        <PiAppStoreLogo size={36} fill="#643BD8" />
      </div>
      <h1 className="text-2xl font-bold text-[#181A25]">Redirecting to App Store</h1>
      <p className="text-[#7A7D88] text-base max-w-xs">
        Taking you to download the Fluensy French app...
      </p>
      <a
        href={APP_STORE_URL}
        className="bg-[#643BD8] text-white w-full max-w-[320px] h-[56px] rounded-[12px] flex items-center justify-center gap-2 text-base font-medium"
      >
        <PiAppStoreLogo size={24} fill="white" />
        Open App Store
      </a>
    </div>
  );
};

export default DownloadPage;
