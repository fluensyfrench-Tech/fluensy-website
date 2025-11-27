
import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/CookieConsent";


import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fluensy French",
  description:
    "Fluensy French helps you learn and speak French fluently through engaging lessons, real-world practice, and AI-powered conversation tools.",
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
    title: "Fluensyfrench — Learn French the fun and easy way",
    description:
      "Master the French language with interactive lessons, pronunciation practice, and personalized learning powered by AI.",
    url: "https://fluensyfrench.com",
    siteName: "Fluensy French",
    locale: "en_US",
    type: "website",
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Toaster position="top-center" />
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}