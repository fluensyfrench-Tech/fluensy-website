import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the Fluensy French terms of service. Learn about your rights and responsibilities when using our French learning platform and app.",
  alternates: {
    canonical: "https://fluensyfrench.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Fluensy French",
    description:
      "Review the Fluensy French terms of service. Learn about your rights and responsibilities when using our platform.",
    url: "https://fluensyfrench.com/terms",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
