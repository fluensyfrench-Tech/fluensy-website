import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
  authors: [{ name: "Fluensy Team" }],
  openGraph: {
    title: "Fluensy French — Learn French Fluently",
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
    <html lang="en" className="scroll-smooth">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
