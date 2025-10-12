/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  amount?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  courseTitle = "",
  amount = "",
}) => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  // ✅ Validation
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", phone: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10–15 digits).";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
    }
  };

  const inputBase =
    "w-full border border-[#C7CAD1] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7148E5] focus:border-[#7148E5] transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-lg w-full max-w-xl mx-4 p-6 relative"
          >
            {/* ✅ Consistent top-right close icon */}
<button
  onClick={() => {
    onClose();
    setSuccess(false);
  }}
  aria-label="Close modal"
  className="absolute top-4 right-4 text-[#3A3D44] text-2xl font-bold hover:text-[#7148E5] transition-all"
>
  &times;
</button>



            {/* ✅ Success Modal */}
            {success ? (
              <div className="text-center space-y-4 mt-6">
                <div className="flex justify-center">
                  <img
                    src="/images/icons/confetti.svg"
                    alt="Confetti Icon"
                    className="w-12 h-12"
                  />
                </div>
                <h2 className="text-2xl font-bold text-[#181A25]">
                  You’re officially enrolled! 🎉
                </h2>
                <p className="text-[#181A25] text-base">
                  Check your email for next steps. Thank you for trusting us to
                  guide your French journey.
                </p>
                <p className="text-[#181A25] text-base">
                  You’re part of our first set of learners — the pioneers of{" "}
                  <strong>fluensyfrench</strong> 🥳
                </p>
                <p className="text-[#181A25] text-base">
                  You’re amazing, and we’re so glad to have you. Get ready to be
                  fluent — fluensy is possible 👍🏽
                </p>
              </div>
            ) : (
              <>
                {/* ✅ Header */}
                <div className="mt-2 mb-4">
                  <h2 className="text-xl font-semibold text-[#181A25]">
                    Start your French journey with {courseTitle}
                  </h2>
                </div>

                {amount && (
                  <p className="text-[#0F766E] font-bold mb-4">
                    Amount: {amount}
                  </p>
                )}

                {/* ✅ Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 text-[#181A25] text-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label className="block mb-1 font-medium">
                        Your First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type it here"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className={inputBase}
                        required
                      />
                    </div>

                    <div className="w-full">
                      <label className="block mb-1 font-medium">
                        Your Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type it here"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          })
                        }
                        className={inputBase}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-1 font-medium">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Type it here"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`${inputBase} ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-1 font-medium">
                      Your Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      placeholder="Type it here"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`${inputBase} ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block mb-1 font-medium">
                      Where are you based?
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className={inputBase}
                      required
                    >
                      <option value="">Select country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-[80%] mx-auto block px-6 py-3 bg-[#7148E5] text-white rounded-lg font-medium mt-4"
                  >
                    Secure your spot
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
