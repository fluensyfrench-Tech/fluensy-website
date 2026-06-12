import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/payment/", "/api/", "/_next/static/media/"],
      },
    ],
    sitemap: "https://www.fluensyfrench.com/sitemap.xml",
  };
}
