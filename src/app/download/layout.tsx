import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download the Fluensy French app on your Android or iOS device and start speaking French with confidence.",
  alternates: {
    canonical: "https://fluensyfrench.com/download",
  },
  openGraph: {
    title: "Download | Fluensy French",
    description:
      "Download the Fluensy French app on your Android or iOS device and start speaking French with confidence.",
    url: "https://fluensyfrench.com/download",
  },
  twitter: {
    title: "Download | Fluensy French",
    description:
      "Download the Fluensy French app on your Android or iOS device and start speaking French with confidence.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
