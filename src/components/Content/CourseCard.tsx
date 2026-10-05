"use client"

import Image from "next/image";
import Link from "next/link";
import type { CourseCardData } from "@/types";

const CourseCard = ({ course }: { course: CourseCardData }) => {
    return (
        <Link
            href={`/course/${course.courseKey}`}
            className="group border border-grey-200 rounded-[10px] p-5 max-h-[269px] flex flex-col justify-between transition-shadow hover:shadow-card hover:border-none"
        >
            <div>
                <h2 className="bg-secondary-2 group-hover:bg-secondary-1 grid place-items-center h-[102px] rounded-[10px] font-bold group-hover:font-medium text-primary group-hover:text-white text-[20px]">{course.title}</h2>
                <p className="text-[16px] font-[400] mt-[15px]">{course.description}</p>
            </div>

            <span className="font-medium group-hover:font-bold text-[16px] flex items-center gap-1 mt-4 text-primary group-hover:text-secondary-1">
                Explore course
                <Image src="/arrow-right-black.svg" alt="" width={20} height={20} className="group-hover:hidden" />
                <Image src="/arrow-right-purple.svg" alt="" width={20} height={20} className="hidden group-hover:block" />
            </span>
        </Link>
    )
}

export default CourseCard