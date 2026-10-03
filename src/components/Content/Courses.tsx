import { motion } from "framer-motion";
import { frenchCourses } from "@/constants/courses";
import CourseCard from "./CourseCard";

export const Courses = () => {
    return (
        <div>
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl lg:text-6xl mb-0  mx-auto mt-[72px] font-medium w-fit">
                Explore our French courses
            </motion.h1>


            <div className="mt-12 px-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    frenchCourses.map((course, idx) => (
                        // Each card animates on its own, offset by its index, matching
                        // the staggered cards in YourGoToApp. `grid` lets the card
                        // fill this wrapper the way it filled the grid cell before.
                        <motion.div
                            key={course.courseKey}
                            className="grid"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))
                }


            </div>


        </div>
    )
}
