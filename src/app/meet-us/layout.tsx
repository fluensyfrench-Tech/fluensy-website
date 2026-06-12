import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Us",
  description:
    "Get to know the Fluensy French team. We are passionate about helping you learn French online with science-backed methods.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://www.fluensyfrench.com/meet-us",
  },
  openGraph: {
    title: "Meet Us | Fluensy French",
    description:
      "Get to know the Fluensy French team. We are passionate about helping you learn French online with science-backed methods.",
    url: "https://www.fluensyfrench.com/meet-us",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
