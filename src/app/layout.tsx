import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/CookieConsent";
import { GoogleAnalytics } from '@next/third-parties/google';
import favicon from "./faviconnn.jpg";

import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fluensyfrench",
  url: "https://fluensyfrench.com",
  logo: "https://fluensyfrench.com/favicon.jpg",
  sameAs: [
    "https://www.youtube.com/@fluensyfrench",
    "https://x.com/fluensyfrench",
    "https://www.linkedin.com/company/fluensyfrench",
    "https://www.tiktok.com/@fluensyfrench",
    "https://www.instagram.com/fluensyfrench",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fluensyfrench.com"),
  title: {
    default: "Fluensyfrench – Learn French Online the Fun Way",
    template: "%s | Fluensyfrench",
  },
  description:
    "We help kids and adults gain fluency in French by learning smarter, not harder through science-backed methods.",
  keywords: [
    "learn French online",
    "online French course",
    "French language course online",
    "French course for beginners",
    "learn French in Nigeria",
    "French courses Nigeria",
    "online French academy",
    "French lessons",
    "speak French fluently",
    "AI French tutor",
    "Fluensyfrench app",
  ],
  authors: [{ name: "Fluensyfrench" }],
  alternates: {
    canonical: "https://fluensyfrench.com",
  },
  openGraph: {
    title: "Fluensyfrench — Helping French learners gain fluency through science-backed learning methods",
    description:
      "We help kids and adults gain fluency in French by learning smarter, not harder through science-backed methods.",
    url: "https://fluensyfrench.com",
    siteName: "Fluensyfrench",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fluensyfrench",
    title: "Fluensyfrench – Learn French Online the Fun Way",
    description:
      "We help kids and adults gain fluency in French by learning smarter, not harder through science-backed methods.",
    images: ["/opengraph-image.jpg"],
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="icon" type="image/jpeg" href={favicon.src} />
        <link rel="apple-touch-icon" type="image/jpeg" href={favicon.src} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Toaster position="top-center" />
          {children}
          <CookieConsent />
        </Providers>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}