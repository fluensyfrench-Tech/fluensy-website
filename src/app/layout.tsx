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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fluensy French",
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
    default: "Fluensy French – Learn French Online the Fun Way",
    template: "%s | Fluensy French",
  },
  description:
    "AI-powered French courses for adults and kids. Science-backed methods, live classes, and a supportive community. Download the app and go from A1 to B2 at your own pace.",
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
    "Fluensy French app",
  ],
  authors: [{ name: "Fluensy French" }],
  alternates: {
    canonical: "https://fluensyfrench.com",
  },
  openGraph: {
    title: "Fluensy French – Learn French Online the Fun Way",
    description:
      "AI-powered French courses for adults and kids. Download the app and go from A1 to B2 at your own pace.",
    url: "https://fluensyfrench.com",
    siteName: "Fluensy French",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@fluensyfrench",
    title: "Fluensy French – Learn French Online the Fun Way",
    description:
      "AI-powered French courses for adults and kids. Download the app and go from A1 to B2 at your own pace.",
    images: ["/opengraph-image"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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