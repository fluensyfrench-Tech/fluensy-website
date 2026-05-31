import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "French Courses for Adults & Kids",
  description:
    "CEFR-aligned online French courses from beginner (A1) to advanced (B2). Adult classes and kids programmes ages 8–12. Download the app and start learning today.",
  keywords: [
    "A1 French course",
    "A2 French course",
    "B1 French course",
    "B2 French course",
    "learn French for kids",
    "online French academy",
    "CEFR French course",
  ],
  alternates: {
    canonical: "https://www.fluensyfrench.com/academy",
  },
  openGraph: {
    title: "French Courses for Adults & Kids | Fluensy Academy",
    description:
      "CEFR-aligned online French courses from beginner (A1) to advanced (B2). Adult classes and kids programmes ages 8–12. Download the app and start learning today.",
    url: "https://www.fluensyfrench.com/academy",
  },
  twitter: {
    title: "French Courses for Adults & Kids | Fluensy Academy",
    description:
      "CEFR-aligned online French courses from beginner (A1) to advanced (B2). Adult classes and kids programmes ages 8–12. Download the app and start learning today.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
