/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { getNames } from "country-list";
import Select from "react-select";
import { registerEnrollment } from "@/lib/api";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  amount?: string;
  selectedCourseId?: string;
  selectedCohortId?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  courseTitle = "",
  amount = "",
  selectedCourseId,
  selectedCohortId,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const countryOptions = getNames().map((country) => ({
    value: country,
    label: country,
  }));

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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
      });
      setErrors({ email: "", phone: "" });
      setSuccess(false);
    }
  }, [isOpen]);

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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    setLoading(true);

    const payload = {
      cohort_id: selectedCohortId,
      course_id: selectedCourseId,
      country: formData.location,
      currency: "NGN",
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phone,
    };

    const response = await registerEnrollment(payload);

    if (response?.authorization_url) {
      toast.success("Redirecting to payment...");
      setSuccess(true);

      setTimeout(() => {
        onClose();
        window.open(response.authorization_url, "_blank");
      }, 1500);
    } else {
      toast.error("Failed to get payment link. Please try again.");
    }
  } catch (error: any) {
    console.error("Enrollment error:", error);
    toast.error(error.message);
  } finally {
    setLoading(false);
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
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-[#3A3D44] text-2xl font-bold hover:text-[#7148E5] transition-all"
            >
              &times;
            </button>

            {/* Success message */}
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
                  Redirecting to payment 🎉
                </h2>
                <p className="text-[#181A25] text-base">
                  Please complete your payment in the new tab.
                </p>
              </div>
            ) : (
              <>
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

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 text-[#181A25] text-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                      <label className="block mb-1 font-medium">
                        First Name
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
                      <label className="block mb-1 font-medium">Last Name</label>
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

                  <div>
                    <label className="block mb-1 font-medium">Email</label>
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

                  <div>
                    <label className="block mb-1 font-medium">Phone</label>
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

                  {/* 🌍 Searchable Country Dropdown */}
                  <div>
                    <label className="block mb-1 font-medium">Country</label>
                    <Select
                      options={countryOptions}
                      onChange={(option: any) =>
                        setFormData({
                          ...formData,
                          location: option?.value || "",
                        })
                      }
                      placeholder="Search or select your country"
                      className="text-sm"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderRadius: "0.5rem",
                          borderColor: "#C7CAD1",
                          padding: "2px",
                        }),
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-[80%] mx-auto block px-6 py-3 rounded-lg font-medium mt-4 transition-all ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#7148E5] hover:bg-[#5a3bc3] text-white"
                    }`}
                  >
                    {loading ? "Processing..." : "Secure your spot"}
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
