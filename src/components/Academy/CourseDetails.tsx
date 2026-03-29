/* eslint-disable @next/next/no-img-element */
import { useSearchParams } from "next/navigation"
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const CourseDetails = () => {
    const searchParams = useSearchParams()
    const courseType = searchParams.get("course_type")
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    const singleLevelGeneralCourseInfo = [
        "Registration is ongoing",
        "Class starts in December 1, 2025 ",
        "Prepare for DELF exam (optional)",
        "Classes hold 4 days a week",
        "Live online classes"
    ]

    const beginnerToIntermediateGeneralCOurseInfo = [
        "Registration is ongoing",
        "Class starts in December 1, 2025 ",
        "8-9 months program (Classes hold 4 days a week)",
        "Prepare for DELF, TCF, or TEF exams (optional)",
        "Live online classes"
    ]

    const singleLevelCourseInfo = [
        {
            id: "single-a1",
            pricing: ["$130", "₦130,000"],
            title: "Beginner (A1)",
            subtitle: "No prior knowledge required",
            heading: "Learning achievements",
            description: "You'll be able to understand and respond to simple everyday conversations, read basic texts and write short sentences about your daily life."
        },
        {
            id: "single-a2",
            pricing: ["$130", "₦130,000"],
            title: "Elementary (A2)",
            subtitle: "A1 level or equivalent required",
            heading: "Learning achievements",
            description: "You'll confidently join everyday interactions, describe your routines, understand short texts and write simple messages about familiar topics."
        },
        {
            id: "single-b1",
            pricing: ["$150", "₦150,000"],
            title: "Intermediate (B1)",
            subtitle: "A2 level or equivalent required",
            heading: "Learning achievements",
            description: "You'll participate in conversations on familiar topics, understand and summarize everyday texts, and write clear texts about your experiences."
        },
        {
            id: "single-b2",
            pricing: ["$150", "₦150,000"],
            title: "Upper Intermediate (B2)",
            subtitle: "B1 level or equivalent required",
            heading: "Learning achievements",
            description: "You'll understand complex discussions, express ideas fluently, read detailed texts, and write structured content."
        },
    ]

    const beginnerToIntermediateCourseInfo = [
        {
            id: "beginner-intermediate",
            pricing: ["$130", "₦130,000"],
            title: "Beginner (A1)",
            subtitle: "No prior knowledge required",
            heading: "Learning achievements",
            description: "You'll be able to understand and respond to simple everyday conversations, read basic texts and write short sentences about your daily life."
        },
    ]

    const kidsGeneralCourseInfo = [
        "Registration opens soon",
        "2-month program for ages 8-12",
        "Classes hold twice a week (Saturdays & Sundays)",
        "Live online classes"
    ]

    const kidsCourseInfo = [
        {
            id: "kids-beginner",
            pricing: ["$100", "₦100,000"],
            title: "Beginner (A1)",
            subtitle: "No prior knowledge required",
            heading: "Learning achievements",
            description: "You'll be able to understand and respond to simple everyday conversations, read basic texts and write short sentences about your daily life."
        },
    ]



    const renderCourseDetails = () => {
        if (courseType == 'adults') return (
            <div>
                <div>
                    <h1 className="text-[28px] font-medium text-primary">Single-level courses <span>(January cohort)</span></h1>
                    <div className="bg-secondary-2 rounded-lg px-4 py-9 mt-5">
                        <ul className="space-y-2">
                            {
                                singleLevelGeneralCourseInfo.map((info, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start space-x-3"

                                    >
                                        <img
                                            src="/images/icons/check.svg"
                                            alt="Check Icon"
                                            className="w-8 h-8"
                                        />
                                        <span className="text-primary text-xl font-normal">
                                            {info}
                                        </span>
                                    </li>
                                ))
                            }

                        </ul>

                        <div className="mt-[30px] flex flex-col md:flex-row gap-4">
                            {
                                singleLevelCourseInfo.map(course => (
                                    <div className="rounded-lg bg-white px-5 py-6">
                                        <div
                                            className="
                            child:bg-secondary-3 child:text-[18px] 
                            child:font-medium child:text-white
                            child:px-[10px] child:py-[5px] child:rounded-lg
                            space-x-[10px] 
                            "
                                        >
                                            <span>₦130,000</span>
                                            <span>$130</span>
                                        </div>
                                        <h2 className="text-primary font-bold text-[20px] mt-[10px]">Beginner (A1)</h2>
                                        <p className="text-sm text-grey-600 mt-1">No prior knowledge required</p>
                                        <h3 className="text-[16px] font-medium text-primary mt-[14px]">Learning achievements</h3>
                                        <p className="text-grey-600 mt-2">You'll be able to understand and respond to simple everyday conversations, introduce yourself, read basic texts and write short sentences about your daily life.</p>
                                        <div className="relative mt-5 pt-4">
                                            <button
                                                onClick={() =>
                                                    setOpenDropdown(
                                                        openDropdown === course.id ? null : course.id
                                                    )
                                                }
                                                className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                            >
                                                Register Now{" "}
                                                <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                                            </button>

                                            {openDropdown === course.id && (
                                                <ul className="absolute z-10 mt-2 w-full bg-white  rounded-lg shadow-md overflow-hidden">
                                                    <li
                                                        className="px-3 md:px-4 py-2.5 md:py-3 hover:bg-[#F3F0FF] cursor-pointer text-xs md:text-sm"
                                                        onClick={() =>
                                                            console.log("Pay in NGN for course:", course.id)
                                                        }
                                                    >
                                                        Naira
                                                    </li>
                                                    <li
                                                        className="px-3 md:px-4 py-2.5 md:py-3 hover:bg-[#F3F0FF] cursor-pointer text-xs md:text-sm "
                                                        onClick={() => console.log("Pay in USD for course:", course.id)}
                                                    >
                                                        Dollar
                                                    </li>
                                                </ul>
                                            )}
                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>

                <h1 className="text-[28px] font-medium text-primary mt-[67px]">Beginner to intermediate <span>(November cohort)</span></h1>
                <div className="bg-secondary-2 rounded-lg px-4 py-8 md:py-0 md:pb-8 mt-5 flex flex-col md:flex-row items-center">
                    <ul className="space-y-6 flex-1">
                        {
                            beginnerToIntermediateGeneralCOurseInfo.map((info, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start space-x-3"

                                >
                                    <img
                                        src="/images/icons/check.svg"
                                        alt="Check Icon"
                                        className="w-8 h-8"
                                    />
                                    <span className="text-primary text-xl font-normal">
                                        {info}
                                    </span>
                                </li>
                            ))
                        }

                    </ul>

                    <div className="mt-[30px] flex gap-4 flex-1 bg">
                        {
                            beginnerToIntermediateCourseInfo.map(course => (
                                <div className="rounded-lg bg-white px-5 py-6">
                                    <div
                                        className="
                            child:bg-secondary-3 child:text-[18px] 
                            child:font-medium child:text-white
                            child:px-[10px] child:py-[5px] child:rounded-lg
                            space-x-[10px] 
                            "
                                    >
                                        <span>₦130,000</span>
                                        <span>$130</span>
                                    </div>
                                    <h2 className="text-primary font-bold text-[20px] mt-[10px]">Beginner (A1)</h2>
                                    <p className="text-sm text-grey-600 mt-1">No prior knowledge required</p>
                                    <h3 className="text-[16px] font-medium text-primary mt-[14px]">Learning achievements</h3>
                                    <p className="text-grey-600 mt-2">You'll be able to understand and respond to simple everyday conversations, introduce yourself, read basic texts and write short sentences about your daily life.</p>
                                    <div className="relative mt-5 pt-4 flex gap-4">
                                        <button
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (USD)
                                        </button>

                                        <button
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7DE5F2] hover:bg-secondary-1 hover:text-white text-primary text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (NGN)
                                        </button>


                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        )

        if (courseType == 'kids') return (
            <div>
                <h1 className="text-[28px] font-medium text-primary mt-[67px]">Beginner french for kids <span>(January cohort)</span></h1>
                <div className="bg-secondary-2 rounded-lg px-4 py-8 md:py-0 md:pb-8 mt-5 flex flex-col md:flex-row items-center">
                    <ul className="space-y-6 flex-1">
                        {
                            kidsGeneralCourseInfo.map((info, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start space-x-3"

                                >
                                    <img
                                        src="/images/icons/check.svg"
                                        alt="Check Icon"
                                        className="w-8 h-8"
                                    />
                                    <span className="text-primary text-xl font-normal">
                                        {info}
                                    </span>
                                </li>
                            ))
                        }

                    </ul>

                    <div className="mt-[30px] flex gap-4 flex-1 w-full">
                        {
                            kidsCourseInfo.map(course => (
                                <div className="rounded-lg bg-white px-5 py-6 w-full">
                                    <div
                                        className="
                            child:bg-secondary-3 child:text-[18px] 
                            child:font-medium child:text-white
                            child:px-[10px] child:py-[5px] child:rounded-lg
                            space-x-[10px] 
                            "
                                    >
                                        <span>$100</span>
                                        <span>₦100,000</span>
                                    </div>
                                    <h2 className="text-primary font-bold text-[20px] mt-[10px]">Beginner French for kids</h2>
                                    <p className="text-sm text-grey-600 mt-1">No prior knowledge required</p>
                                    <h3 className="text-[16px] font-medium text-primary mt-[14px]">Class activities</h3>
                                    <div className="text-grey-600 mt-2 space-y-2">
                                        {
                                            ["Interactive quizzes and games", "Guided speaking practice", "Storytelling and role play"].map((activity, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-grey-100 grid place-items-center">
                                                        <Check className="w-3 h-3 text-primary" />
                                                    </div>
                                                    <p>{activity}</p>
                                                </div>

                                            ))
                                        }
                                    </div>
                                    <div className="relative mt-5 pt-4 flex gap-4">
                                        <button
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (USD)
                                        </button>

                                        <button
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7DE5F2] hover:bg-secondary-1 hover:text-white text-primary text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (NGN)
                                        </button>


                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        )

        return null

    }


    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1250px] mx-auto pb-[76px]">
            {renderCourseDetails()}
            {courseType && (
            <motion.div 
                className="text-center py-12 md:py-16 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
                <motion.h3 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium !leading-[1.3] text-[#181A25] mb-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    Prefer private lessons tailored <br />to your {courseType === "kids" ? "child's" : ""} goals?
                </motion.h3>
                <motion.button 
                    className="mt-4 px-6 py-3 bg-secondary-1 text-white rounded-lg hover:bg-secondary-2 hover:text-primary transition-colors md:w-[378px] h-[66px]"
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    Send us a mail
                </motion.button>
            </motion.div>
        )}
        </div>
    )
}
