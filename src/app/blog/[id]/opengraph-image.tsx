import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import { blogs } from "@/util/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DEFAULT_IMAGE = "/images/blogs/blog-preview.svg";

export function generateStaticParams() {
  return blogs.map((blog) => ({ id: blog.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = blogs.find((b) => b.id === id);

  const imagePath = blog?.image ?? DEFAULT_IMAGE;
  const svg = await readFile(path.join(process.cwd(), "public", imagePath));
  const imageSrc = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative" }}>
        <img src={imageSrc} width={1200} height={630} style={{ objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            padding: "120px 64px 56px",
            background: "linear-gradient(to top, rgba(24, 26, 37, 0.9), rgba(24, 26, 37, 0))",
            color: "#FFFFFF",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {blog?.title ?? "Fluensyfrench blog"}
        </div>
      </div>
    ),
    size
  );
}
