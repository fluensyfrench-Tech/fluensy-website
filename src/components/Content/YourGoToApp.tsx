/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion"
import { ImGlass } from "react-icons/im"

const YourGoToApp = () => {
    const highlights = [
        {
            id: 1,
            icon: "/images/icons/your-go-to-app-1.svg",
            highlight: "Daily useful words",
        },
        {
            id: 2,
            icon: "/images/icons/icon2.svg",
            highlight: "Revisions"
        },
        {
            id: 3,
            icon: "/images/icons/icon1.svg",
            highlight: "Engaging content",
        },
        {
            id: 4,
            icon: "/images/icons/your-go-to-app-2.svg",
            highlight: "Fun quizzes"
        }
    ]
    return (
        <section className="mt-[107px] max-w-[1250px] mx-auto md:px-8">
            <div className=" bg-secondary-3  px-7 md:px-0 md:pr-16 pt-10  flex flex-col justify-between md:flex-row-reverse md:items-center md:rounded-3xl">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-medium text-3xl md:text-4xl lg:text-5xl mb-0 md:mb-8 !leading-[1.3] text-white">
                            Your go-to app for the <br className="hidden md:block" /> French you’ll use
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {
                            highlights.map((highlight, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeOut",
                                        delay: idx * 0.2,
                                    }}
                                    viewport={{ once: true }}
                                    key={highlight.id}
                                    className="flex items-center gap-4 bg-white py-5 md:py-[30px] px-9 rounded-[10px] shadow-lg"
                                >
                                    <img src={highlight.icon} alt={highlight.highlight} className="w-8 h-8" />
                                    <p className="text-primary text-lg">{highlight.highlight}</p>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='-mb-16 hidden md:block'>
                    <img src="/images/your-go-to-app-desktop.png" />

                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="-mb-10 mt-12 z-[0] relative md:hidden">
                    <img src="/images/your-go-to-app.svg" />
                </motion.div>




            </div>

        </section>
    )
}

export default YourGoToApp