import type { Metadata } from "next";

export const metadata: Metadata = {
  // A plain string here would reset the title template for nested routes
  // (/blog/[id]), dropping the " | Fluensyfrench" suffix on every post.
  title: {
    default: "The Fluency Guide — French Learning Blog",
    template: "%s | Fluensyfrench",
  },
  description:
    "Tips, research, and guidance on learning French as a kid or adult — from the Fluensyfrench team.",
  alternates: {
    canonical: "https://www.fluensyfrench.com/blog",
  },
  openGraph: {
    title: "The Fluency Guide — French Learning Blog",
    description:
      "Tips, research, and guidance on learning French as a kid or adult — from the Fluensyfrench team.",
    url: "https://www.fluensyfrench.com/blog",
  },
  twitter: {
    title: "The Fluency Guide — French Learning Blog",
    description:
      "Tips, research, and guidance on learning French as a kid or adult — from the Fluensyfrench team.",
  },
};

export default function Layout({ children} : { children: React.ReactNode}) {
    return <>{children}</>;
}