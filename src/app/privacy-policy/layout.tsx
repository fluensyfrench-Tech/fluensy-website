import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Fluensy French privacy policy. Understand how we collect, use, and protect your personal data when you use our app and website.",
  alternates: {
    canonical: "https://fluensyfrench.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Fluensy French",
    description:
      "Read the Fluensy French privacy policy. Understand how we collect, use, and protect your personal data.",
    url: "https://fluensyfrench.com/privacy-policy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
