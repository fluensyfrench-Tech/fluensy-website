import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/CookieConsent";
import { GoogleAnalytics } from '@next/third-parties/google';
import favicon from "./faviconnn.jpg";

import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fluensy French",
  description:
    "Fluensy French helps you learn French the fun and easy way.",
  keywords: [
    "learn French",
    "French lessons",
    "speak French fluently",
    "online French course",
    "AI French tutor",
    "Fluensy French app",
  ],
  authors: [{ name: "Fluensyfrench" }],
  openGraph: {
    title: "Fluensyfrench",
    description:
      "Learn French the fun and easy way.",
    url: "https://fluensyfrench.com",
    siteName: "Fluensy French",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: favicon.src, type: "image/jpeg", sizes: "32x32" },
      { url: favicon.src, type: "image/jpeg", sizes: "192x192" },
    ],
    apple: [{ url: favicon.src, type: "image/jpeg", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${spaceGrotesk.className}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/jpeg" href={favicon.src} />
        <link rel="apple-touch-icon" type="image/jpeg" href={favicon.src} />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Toaster position="top-center" />
          <Suspense>
            {children}
          </Suspense>
          <CookieConsent />
        </Providers>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}