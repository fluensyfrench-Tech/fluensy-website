/* eslint-disable @next/next/no-img-element */
import { Check, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFetchCourses, Course } from "@/hooks/queries/useFetchCourses";
import { BundledCourseSkeleton, SingleLevelCourseSkeleton } from "./CourseCardSkeleton";
import RegistrationModal from "@/components/Modal/RegistrationModal";
import Image from "next/image";

const COURSE_STATIC: Record<string, { subtitle: string; description: string }> = {
    BEGINNER_A1: {
        subtitle: "No prior knowledge required",
        description: "You'll be able to understand and respond to simple everyday conversations, read basic texts and write short sentences about your daily life.",
    },
    ELEMENTARY_A2: {
        subtitle: "A1 level or equivalent required",
        description: "You'll confidently join everyday interactions, describe your routines, understand short texts and write simple messages about familiar topics.",
    },
    INTERMEDIATE_B1: {
        subtitle: "A2 level or equivalent required",
        description: "You'll participate in conversations on familiar topics, understand and summarize everyday texts, and write clear texts about your experiences.",
    },
    UPPER_INTERMEDIATE_B2: {
        subtitle: "B1 level or equivalent required",
        description: "You'll understand complex discussions, express ideas fluently, read detailed texts, and write structured content.",
    },
    BEGINNER_TO_INTERMEDIATE: {
        subtitle: "No prior knowledge required",
        description: "You'll communicate confidently in French from beginner to intermediate, developing strong reading, writing, speaking, and listening skills.",
    },
    CONVERSATION_PRACTICE: {
        subtitle: "Builds on your existing French knowledge",
        description: "You'll enhance your French speaking skills through guided conversation practice and live interactive sessions.",
    },
}

const SINGLE_LEVEL_KEYS = ["BEGINNER_A1", "ELEMENTARY_A2", "INTERMEDIATE_B1", "UPPER_INTERMEDIATE_B2"]

const getCourseTitle = (course: Course) => {
    if (course.levels && course.levels.length > 1) {
        return `${course.name} ${course.levels[0]} to ${course.levels[course.levels.length - 1]}`
    }
    if (course.levels && course.levels.length === 1) {
        return `${course.name} ${course.levels[0]}`
    }
    return course.name
}

interface CourseDetailsProps {
    courseType: string | null;
}

export const CourseDetails = ({ courseType }: CourseDetailsProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [activeCourse, setActiveCourse] = useState<Course | null>(null)
    const [activeCurrency, setActiveCurrency] = useState<"NGN" | "USD">("NGN")
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setOpenDropdown(null)
        if (!courseType) return
        const timer = setTimeout(() => {
            if (!containerRef.current) return
            const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 110
            // scrollTop assignment bypasses html{scroll-behavior:smooth} CSS which causes
            // window.scrollTo to silently fail on iOS Safari < 15.4
            const scroller = document.scrollingElement || document.documentElement
            scroller.scrollTop = Math.max(0, top)
        }, 100)
        return () => clearTimeout(timer)
    }, [courseType])

    const openRegistrationModal = (course: Course, currency: "NGN" | "USD") => {
        setActiveCourse(course)
        setActiveCurrency(currency)
        setOpenDropdown(null)
        setModalOpen(true)
    }

    const singleLevelGeneralCourseInfo = [
        "2-3 months program",
        "Classes run 3 days a week",
        "Prepare for DELF exam (optional)",
        "Live online classes + Telegram community"
    ]

    const beginnerToIntermediateGeneralCOurseInfo = [
        "8-9 months program",
        "Classes run 3 days a week",
        "Prepare for DELF, TCF, or TEF exams (optional)",
        "Live online classes + Telegram community"
    ]

    const conversationPracticeGeneralCourseInfo = [
        "1-month guided conversation practice",
        "Suitable for all levels between A1 and B2",
        "Sessions run 4 times a week",
        "Live online sessions + Telegram community"
    ]

    const kidsGeneralCourseInfo = [
        "2-month program for ages 8-12",
        "Classes run on Saturdays and Sundays",
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

    const { data: courses, isLoading, isError } = useFetchCourses(courseType?.toUpperCase() || '')

    const singleLevelCourses = courses?.filter(c => SINGLE_LEVEL_KEYS.includes(c.courseKey)) ?? []
    const beginnerToIntermediateCourse = courses?.find(c => c.courseKey === "BEGINNER_TO_INTERMEDIATE")
    const conversationPracticeCourse = courses?.find(c => c.courseKey === "CONVERSATION_PRACTICE")
    const kidsCourse = courses?.[0] ?? null

    const renderCourseDetails = () => {
        if (courseType == 'adults') return (
            <div>
                {/* Click-outside backdrop for dropdowns */}
                {openDropdown && (
                    <div
                        className="fixed inset-0 z-[5]"
                        onClick={() => setOpenDropdown(null)}
                    />
                )}

                <div>
                    <h2 className="text-[35px] font-medium text-primary">Single-level course</h2>
                    <div className="bg-secondary-2 rounded-lg px-4 py-8 mt-5">
                        <ul className="space-y-5">
                            {singleLevelGeneralCourseInfo.map((info, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                    <Image src="/images/icons/check.svg" alt="Check Icon" className="w-8 h-8" width={32} height={32} />
                                    <span className={`text-primary text-xl font-normal`}>
                                        {info}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-[30px] flex flex-col md:flex-row gap-4">
                            {isLoading && <SingleLevelCourseSkeleton />}
                            {isError && <p className="text-red-500 text-sm">Failed to load courses.</p>}
                            {singleLevelCourses.map(course => {
                                const staticInfo = COURSE_STATIC[course.courseKey]
                                return (
                                    <div key={course.courseKey} className="rounded-lg bg-white px-5 py-6 flex flex-col flex-1">
                                        <div className="child:bg-secondary-3 child:text-[18px] child:font-medium child:text-white child:px-[10px] child:py-[5px] child:rounded-lg space-x-[10px]">
                                            <span>${course.priceUSD}</span>
                                            <span>₦{course.priceNGN.toLocaleString()}</span>
                                        </div>
                                        <h2 className="text-primary font-bold text-[20px] mt-[18px]">{course.name} ({course.levels[0]})</h2>
                                        <p className="text-sm text-grey-600 mt-1">{staticInfo?.subtitle}</p>
                                        <h3 className="text-[16px] font-medium text-primary mt-[20px]">Learning achievements</h3>
                                        <p className="text-grey-600 mt-2 flex-1">{staticInfo?.description}</p>
                                        <div className="relative mt-5 pt-4 z-10">
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === course.courseKey ? null : course.courseKey)}
                                                className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                            >
                                                Register Now <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${openDropdown === course.courseKey ? 'rotate-180' : ''}`} />
                                            </button>

                                            {openDropdown === course.courseKey && (
                                                <ul className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                                                    <li
                                                        className="px-3 md:px-4 py-2.5 md:py-3 hover:bg-[#F3F0FF] cursor-pointer text-xs md:text-sm"
                                                        onClick={() => openRegistrationModal(course, "NGN")}
                                                    >
                                                        Naira
                                                    </li>
                                                    <li
                                                        className="px-3 md:px-4 py-2.5 md:py-3 hover:bg-[#F3F0FF] cursor-pointer text-xs md:text-sm"
                                                        onClick={() => openRegistrationModal(course, "USD")}
                                                    >
                                                        Dollar
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <h2 className="text-[35px] font-medium text-primary mt-[67px]">Beginner to intermediate <span>(A1 to B2)</span></h2>
                <div className="bg-secondary-2 rounded-lg px-4  mt-5 py-8 flex flex-col md:flex-row items-center">
                    <ul className="space-y-5 flex-1">
                        {beginnerToIntermediateGeneralCOurseInfo.map((info, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                                <Image src="/images/icons/check.svg" alt="Check Icon" className="w-8 h-8" width={32} height={32} />
                                <span className={`text-primary text-xl font-normal`}>
                                    {info}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4 flex-1">
                        {isLoading && <BundledCourseSkeleton />}
                        {isError && (
                            <div className="flex items-center justify-center flex-1 py-6">
                                <p className="text-red-500 text-sm">Failed to load courses.</p>
                            </div>
                        )}
                        {beginnerToIntermediateCourse && (() => {
                            const staticInfo = COURSE_STATIC[beginnerToIntermediateCourse.courseKey]
                            return (
                                <div className="rounded-lg bg-white px-5 py-6 mt-[30px] md:mt-0">
                                    <div className="child:bg-secondary-3 child:text-[18px] child:font-medium child:text-white child:px-[10px] child:py-[5px] child:rounded-lg space-x-[10px]">
                                        <span>${beginnerToIntermediateCourse.priceUSD}</span>
                                        <span>₦{beginnerToIntermediateCourse.priceNGN.toLocaleString()}</span>
                                    </div>
                                    <h2 className="text-primary font-bold text-[20px] mt-[18px]">
                                        {getCourseTitle(beginnerToIntermediateCourse)}
                                    </h2>
                                    <p className="text-sm text-grey-600 mt-1">{staticInfo?.subtitle}</p>
                                    <h3 className="text-[16px] font-medium text-primary mt-[14px]">Learning achievements</h3>
                                    <p className="text-grey-600 mt-2">{staticInfo?.description}</p>
                                    <div className="relative mt-5 pt-4 flex gap-4">
                                        <button
                                            onClick={() => openRegistrationModal(beginnerToIntermediateCourse, "USD")}
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (USD)
                                        </button>
                                        <button
                                            onClick={() => openRegistrationModal(beginnerToIntermediateCourse, "NGN")}
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7DE5F2] hover:bg-secondary-1 hover:text-white text-primary text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (NGN)
                                        </button>
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                </div>

                <h2 className="text-[35px] font-medium text-primary mt-[67px]">Conversation Practice</h2>
                <div className="bg-secondary-2 rounded-lg px-4  mt-5 py-8 flex flex-col md:flex-row items-center">
                    <ul className="space-y-5 flex-1">
                        {conversationPracticeGeneralCourseInfo.map((info, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                                <Image src="/images/icons/check.svg" alt="Check Icon" className="w-8 h-8" width={32} height={32} />
                                <span className={`text-primary text-xl font-normal`}>
                                    {info}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className=" flex gap-4 flex-1">
                        {isLoading && <BundledCourseSkeleton />}
                        {isError && (
                            <div className="flex items-center justify-center flex-1 py-6">
                                <p className="text-red-500 text-sm">Failed to load courses.</p>
                            </div>
                        )}
                        {conversationPracticeCourse && (() => {
                            const staticInfo = COURSE_STATIC[conversationPracticeCourse.courseKey]
                            return (
                                <div className="rounded-lg bg-white px-5 py-6 mt-[30px] md:mt-0">
                                    <div className="child:bg-secondary-3 child:text-[18px] child:font-medium child:text-white child:px-[10px] child:py-[5px] child:rounded-lg space-x-[10px]">
                                        <span>${conversationPracticeCourse.priceUSD}</span>
                                        <span>₦{conversationPracticeCourse.priceNGN.toLocaleString()}</span>
                                    </div>
                                    <h2 className="text-primary font-bold text-[20px] mt-[18px]">
                                        {conversationPracticeCourse.name}
                                    </h2>
                                    <p className="text-sm text-grey-600 mt-1">{staticInfo?.subtitle}</p>
                                    <h3 className="text-[16px] font-medium text-primary mt-[14px]">Learning achievements</h3>
                                    <p className="text-grey-600 mt-2">{staticInfo?.description}</p>
                                    <div className="relative mt-5 pt-4 flex gap-4">
                                        <button
                                            onClick={() => openRegistrationModal(conversationPracticeCourse, "USD")}
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (USD)
                                        </button>
                                        <button
                                            onClick={() => openRegistrationModal(conversationPracticeCourse, "NGN")}
                                            className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7DE5F2] hover:bg-secondary-1 hover:text-white text-primary text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px]"
                                        >
                                            Register (NGN)
                                        </button>
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                </div>
            </div>
        )

        if (courseType == 'kids') return (
            <div>
                <h2 className="text-[35px] font-medium text-primary">Beginner French for kids</h2>
                <div className="bg-secondary-2 rounded-lg px-4 py-8 mt-5 flex flex-col md:flex-row items-center">
                    <ul className="space-y-5 flex-1">
                        {kidsGeneralCourseInfo.map((info, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                                <Image src="/images/icons/check.svg" alt="Check Icon" className="w-8 h-8" width={32} height={32} />
                                <span className={`text-primary text-xl font-normal`}>
                                    {info}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-[30px] md:mt-0 flex gap-4 flex-1 w-full">
                        {isLoading && <BundledCourseSkeleton />}
                        {isError && (
                            <div className="flex items-center justify-center flex-1 py-6">
                                <p className="text-red-500 text-sm">Failed to load courses.</p>
                            </div>
                        )}
                        {!isLoading && !isError && kidsCourseInfo.map(course => (
                            <div key={course.id} className="rounded-lg bg-white px-5 py-6 w-full">
                                <div className="child:bg-secondary-3 child:text-[18px] child:font-medium child:text-white child:px-[10px] child:py-[5px] child:rounded-lg space-x-[10px]">
                                    <span>$100</span>
                                    <span>₦100,000</span>
                                </div>
                                <h2 className="text-primary font-bold text-[20px] mt-[18px]">Beginner French for kids</h2>
                                <p className="text-sm text-grey-600 mt-1">No prior knowledge required</p>
                                <h3 className="text-[16px] font-medium text-primary mt-[14px]">Class activities</h3>
                                <div className="text-grey-600 mt-2 space-y-2">
                                    {["Interactive quizzes and games", "Guided speaking practice", "Storytelling and role play"].map((activity, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-grey-100 grid place-items-center">
                                                <Check className="w-3 h-3 text-primary" />
                                            </div>
                                            <p>{activity}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="relative mt-5 pt-4 flex gap-4">
                                    <button
                                        onClick={() => kidsCourse && openRegistrationModal(kidsCourse, "USD")}
                                        disabled={!kidsCourse}
                                        className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Register (USD)
                                    </button>
                                    <button
                                        onClick={() => kidsCourse && openRegistrationModal(kidsCourse, "NGN")}
                                        disabled={!kidsCourse}
                                        className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7DE5F2] hover:bg-secondary-1 hover:text-white text-primary text-sm md:text-base font-medium rounded-[12px] transition-all h-[54px] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Register (NGN)
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )

        return null
    }

    const modalAmount = activeCourse
        ? activeCurrency === "NGN"
            ? `₦${activeCourse.priceNGN.toLocaleString()}`
            : `$${activeCourse.priceUSD}`
        : ""

    return (
        <div ref={containerRef} className="px-4 sm:px-6 lg:px-8 max-w-[1250px] mx-auto pb-[76px]">
            {renderCourseDetails()}

            {courseType && (
                <motion.div
                    className="text-center py-12 md:py-16 px-4"
                    initial={{ y: 16 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                    <motion.h3
                        className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium !leading-[1.3] text-[#181A25] mb-2"
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    >
                        Want a learning plan tailored {courseType !== "kids" && <br />} to  {courseType === "kids" && <br />} {courseType === "kids" ? "your child's" : "your"} goals{courseType === "kids" && ','} and pace?
                    </motion.h3>
                    <div>
                        <a href="mailto:Fluensyfrench@gmail.com">
                            <motion.button
                                className="mt-4 mx-auto px-6 py-3 bg-secondary-1 text-white rounded-lg hover:bg-secondary-2 hover:text-primary transition-colors w-full md:w-[378px] h-[66px] text-[20px] flex items-center justify-center"
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                Send us a mail
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            )}

            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                courseTitle={activeCourse ? getCourseTitle(activeCourse) : ""}
                amount={modalAmount}
                selectedCourseId={activeCourse?.courseKey}
                currency={activeCurrency}
                isKids={courseType === "kids"}
            />
        </div>
    )
}
