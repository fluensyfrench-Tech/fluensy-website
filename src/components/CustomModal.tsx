"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  action?: boolean;
  actionMessage?: string;
  onActionClick?: () => void;
}

export function CustomModal({
  isOpen,
  onClose,
  message,
  action = false,
  actionMessage,
  onActionClick,
}: CustomModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-[#181A25] transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="px-5 relative">
                <div className="flex items-center justify-center relative h-[130px]">
                  <Image
                    src={"/gif/confetti.gif"}
                    alt="Confetti celebration animation"
                    width={200}
                    height={200}
                    className="absolute -top-[50px]"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  You&apos;re in
                </h1>
                <p className="text-base font-medium text-[#181A25]">
                  {message}
                </p>
                <p className="text-[18px] text-[#181A25] py-3">
                  You did the right thing. Expect something exciting in your
                  inbox soon 💌
                </p>
                <p className="text-[18px] text-[#181A25] mb-4 leading-[24px]">
                  And while you wait, come hang out in our learner's club and
                  practice french with others.
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 pt-5">
                  {action && (
                    <button
                      onClick={() => {
                        onActionClick?.();
                        onClose();
                      }}
                      className="flex-1 px-4 py-4 bg-[#7148E5] text-white text-base rounded-lg hover:bg-[#7DE5F2] hover:text-black transition-colors"
                    >
                      {actionMessage}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
}
