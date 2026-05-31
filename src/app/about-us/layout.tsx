import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Fluensy French — our mission, methods, and the team helping thousands speak French with confidence.",
  alternates: {
    canonical: "https://www.fluensyfrench.com/about-us",
  },
  openGraph: {
    title: "About Us | Fluensy French",
    description:
      "Discover the story behind Fluensy French — our mission, methods, and the team helping thousands speak French with confidence.",
    url: "https://www.fluensyfrench.com/about-us",
  },
  twitter: {
    title: "About Us | Fluensy French",
    description:
      "Discover the story behind Fluensy French — our mission, methods, and the team helping thousands speak French with confidence.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
