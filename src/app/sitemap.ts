import type { MetadataRoute } from "next";
import { blogs } from "@/util/blog";

const BASE_URL = "https://www.fluensyfrench.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/academy`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/meet-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.id}`,
      lastModified: new Date(blog.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
