import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import { blogs } from "@/util/blog";
import Image from "next/image";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import Footer from "@/components/Footer";
import ShareArticle from "@/components/Blog/ShareArticle";
import type { Metadata } from "next";

// Link previews use the article's generated image (opengraph-image.tsx) and title.
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params
    const blog = blogs.find((b) => b.id === id)

    if (!blog) {
        return {}
    }

    return {
        title: blog.title,
        // Plain meta tag for search only. Next copies any page or layout description into
        // the Open Graph and X tags, so those are set to a blank space to keep previews to
        // title + image.
        other: { description: blog.description },
        openGraph: {
            title: blog.title,
            description: " ",
            url: `/blog/${blog.id}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: " ",
        },
    }
}

// Styling for every post's Markdown lives here, not in the content.
const markdownComponents: Components = {
    h2: ({ children }) => (
        <h2 className="text-[20px] font-bold pt-4">{children}</h2>
    ),
    p: ({ children }) => (
        <p className="text-[16px] text-primary leading-[150%]">{children}</p>
    ),
    a: ({ href, children }) => (
        <a href={href} className="text-secondary-1 underline">{children}</a>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 text-[18px] leading-[150%]">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 text-[18px] leading-[150%]">{children}</ol>
    ),
};

export default async function BlogDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const blog = blogs.find((b) => b.id === id)

    if (!blog) {
        notFound()
    }

    return (
        <main>
            <Navbar />
            <section className="pt-[100px] max-w-[1250px] mx-auto w-full px-8 pb-[64px]">
                <div className="relative">
                    <Link href="/blog" aria-label="Back to blog" className="absolute top-0 left-0">
                        <Image className="rotate-180" src={"/arrow-right-black.svg"} alt="" width={32} height={32} />
                    </Link>
                </div>

                <div className="max-w-[675px] mx-auto flex flex-col items-start">
                    <h1 className="text-[48px] font-bold text-primary max-w-[562px] leading-[130%]">{blog.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-5">
                        <p className="text-[20px] text-grey-700">{blog.date}</p>
                        <div className="h-[10px] bg-grey-100 w-[10px] rounded-full"></div>
                        <ShareArticle title={blog.title} path={`/blog/${blog.id}`} />
                    </div>

                    <div className={`mt-12 ${blog.previewBg} w-full pt-[26px] grid place-items-center rounded-[10px]`}>
                        <Image src={"/images/blogs/blog-preview.svg"} alt="" width={352} height={352} />
                    </div>

                    {blog.content && (
                        <article className="mt-12 w-full space-y-5 text-primary">
                            <Markdown components={markdownComponents}>{blog.content}</Markdown>
                        </article>
                    )}
                </div>

            </section>
            <Footer />
        </main>
    );
}
