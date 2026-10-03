"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { blogs } from "@/util/blog";
import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="pt-24 lg:pt-[100px] max-w-[1250px] mx-auto w-full px-4 sm:px-8 mb-16 lg:mb-[108px]">
                <h1 className="text-primary text-[32px] sm:text-[40px] lg:text-[48px] font-bold">
                    The fluency guide
                </h1>

                <div className="mt-8 lg:mt-[66px] space-y-10 lg:space-y-[48px] min-h-[50vh]">
                    {
                        blogs.map((blog, index) => {
                            return (
                                // Image above the text on phones, side by side from sm up
                                <div  className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 lg:gap-16" key={index}>
                                    <div className={`${blog.previewBg} w-full sm:w-fit shrink-0 flex justify-center rounded-[5.38px] px-10 lg:px-20 pt-4`}>
                                        <Image src="/images/blogs/blog-preview.svg" width={188} height={188} alt="blog" />
                                    </div>

                                    <Link href={`/blog/${blog.id}`}>
                                        <span className="text-[16px] sm:text-[18px] text-grey-400">{blog.date}</span>
                                        <h2 className="text-[20px] sm:text-[24px] font-bold text-primary max-w-[663px]">{blog.title}</h2>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>

                
            </section>

            <Footer />
        </main>
    );
}