"use client"

import { useState } from "react";
import { FaqItem } from "@/types";

export const Faq = ({ faq }: { faq: FaqItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Everything inside is a <span>: a <button> may only contain phrasing
    // content, so <div> and <p> are not valid children.
    return (
        <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            className={`block w-full text-left px-5 py-5 sm:px-7 sm:py-6 rounded-[10px] transition-colors duration-200 ${
                isOpen ? "bg-secondary-2" : "bg-grey-100"
            }`}
        >
            <span className="text-primary font-normal text-[16px] sm:text-[18px] justify-between flex items-center gap-4">
                <span className="flex flex-col">
                    <span className={isOpen ? "font-bold" : ""}>{faq.question}</span>

                    {/* grid-rows 0fr -> 1fr animates the height without knowing it up front */}
                    <span
                        className={`grid transition-[grid-template-rows] duration-200 ${
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                    >
                        <span className="overflow-hidden max-w-[423px] leading-[130%]">
                            <span className="block pt-[18px]">{faq.answer}</span>
                        </span>
                    </span>
                </span>

                <span className="text-[14px] underline shrink-0">
                    {isOpen ? "Hide" : "View"}
                </span>
            </span>
        </button>
    );
};
