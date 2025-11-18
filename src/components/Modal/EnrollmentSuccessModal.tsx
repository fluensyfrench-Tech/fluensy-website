// components/Modal/EnrollmentSuccessModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnrollmentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentSuccessModal: React.FC<EnrollmentSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-all"
            >
              ×
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Confetti/Party Icon */}
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-bounce"
                >
                  {/* Party Popper */}
                  <path
                    d="M60 20L50 40L60 45L70 40L60 20Z"
                    fill="#7148E5"
                    className="animate-pulse"
                  />
                  <path
                    d="M60 45L50 50L60 100L70 50L60 45Z"
                    fill="#A78BFA"
                  />
                  
                  {/* Confetti pieces */}
                  <circle cx="30" cy="30" r="3" fill="#7DE5F2" className="animate-ping" />
                  <circle cx="90" cy="35" r="3" fill="#FCD34D" className="animate-ping" style={{ animationDelay: '0.1s' }} />
                  <circle cx="25" cy="70" r="3" fill="#F472B6" className="animate-ping" style={{ animationDelay: '0.2s' }} />
                  <circle cx="95" cy="75" r="3" fill="#60A5FA" className="animate-ping" style={{ animationDelay: '0.3s' }} />
                  <rect x="20" y="50" width="4" height="4" fill="#34D399" className="animate-ping" style={{ animationDelay: '0.15s' }} />
                  <rect x="85" y="55" width="4" height="4" fill="#FB923C" className="animate-ping" style={{ animationDelay: '0.25s' }} />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#181A25]">
                You're officially enrolled!
              </h2>

              <p className="text-base text-[#3A3D44] leading-relaxed">
                Check your email for next steps. Thank you for trusting us to
                guide your French journey.
              </p>

              <p className="text-base text-[#3A3D44] leading-relaxed">
                You're part of our very first set of learners, the pioneers of{" "}
                <span className="font-semibold text-[#7148E5]">
                  fluensyfrench
                </span>
                ! You're amazing, and we're so glad to have you.
              </p>

              <p className="text-base text-[#3A3D44] flex items-center justify-center gap-2">
                Get ready to be fluent, it's possible{" "}
                <span className="text-2xl">👍</span>
              </p>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full mt-6 px-6 py-3 bg-[#7148E5] hover:bg-[#5e36c2] text-white text-base font-medium rounded-lg transition-all"
              >
                Okay
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentSuccessModal;