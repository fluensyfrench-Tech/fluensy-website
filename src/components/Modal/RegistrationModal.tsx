/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useCourseEnrol } from "@/hooks/mutations/useCourseEnrol";


interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  amount?: string;
  selectedCourseId?: string;
  selectedCohortId?: string;
  currency?: "NGN" | "USD";
  isKids?: boolean;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  courseTitle = "",
  amount = "",
  selectedCourseId = "",
  selectedCohortId = "",
  currency = "NGN",
  isKids = false,
}) => {
  const { mutate: enrol, isPending } = useCourseEnrol();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({ fullName: "", email: "", phone: "", childName: "", childAge: "" });
      setErrors({ fullName: "", email: "", phone: "", childName: "", childAge: "" });
    }
  }, [isOpen]);

  const validate = () => {
    let valid = true;
    const newErrors = { fullName: "", email: "", phone: "", childName: "", childAge: "" };

    const nameParts = formData.fullName.trim().split(/\s+/);
    if (nameParts.length < 2 || !nameParts[1]) {
      newErrors.fullName = "Please enter both your first and last name.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    const phoneDigits = formData.phone.replace(/[\s\-()]/g, "");
    if (!/^\+[1-9][0-9]{6,14}$/.test(phoneDigits)) {
      newErrors.phone = "Include your country code, e.g. +2348012345678 or +447911123456.";
      valid = false;
    }

    if (isKids) {
      const childNameParts = formData.childName.trim().split(/\s+/);
      if (childNameParts.length < 2 || !childNameParts[1]) {
        newErrors.childName = "Please enter the child's first and last name.";
        valid = false;
      }
      const age = parseInt(formData.childAge, 10);
      if (!formData.childAge || isNaN(age) || age < 1 || age > 17) {
        newErrors.childAge = "Please enter a valid age.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    enrol(
      {
        courseKey: selectedCourseId,
        fullName: formData.fullName.trim(),
        email: formData.email,
        whatsappPhone: formData.phone.replace(/[\s\-()]/g, ""),
        ...(isKids && { childName: formData.childName.trim(), childAge: formData.childAge }),
        currency,
      },
      {
        onSuccess: (data) => {
          if (data?.authorizationUrl) {
            onClose();
            window.location.href = data.authorizationUrl;
          } else {
            toast.error("Failed to get payment link. Please try again.");
          }
        },
        onError: (error: any) => {
          const responseData = error?.response?.data;
          let errorMessage = "An error occurred. Please try again.";

          if (error?.code === "ERR_NETWORK" || error?.message?.includes("Network Error")) {
            errorMessage = "Unable to connect to the server. Please check your internet connection.";
          } else if (error?.code === "ECONNABORTED" || error?.message?.includes("timeout")) {
            errorMessage = "The request took too long. Please try again.";
          } else if (responseData) {
            if (typeof responseData === "string" && responseData.trim().startsWith("<!DOCTYPE")) {
              errorMessage = "The service is temporarily unavailable. Please try again later.";
            } else if (responseData.detail) {
              errorMessage = typeof responseData.detail === "string" ? responseData.detail : JSON.stringify(responseData.detail);
            } else if (responseData.message) {
              errorMessage = responseData.message;
            } else if (responseData.error) {
              errorMessage = responseData.error;
            }
          } else if (error?.response?.status) {
            const status = error.response.status;
            if (status === 500) errorMessage = "Server error. Our team has been notified.";
            else if (status === 502 || status === 503) errorMessage = "Service temporarily unavailable.";
            else if (status === 504) errorMessage = "Request timeout. Please try again.";
          }

          toast.error(errorMessage);
        },
      }
    );
  };

  const inputBase =
    "w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7148E5] transition-all bg-[#F0F0F0] placeholder:text-grey-300";

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
            className="bg-white rounded-xl shadow-lg w-full max-w-[605px] max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <>
              {/* Scrollable form fields */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-[50px] pt-[50px] pb-4">
                  <h2 className="text-[24px] font-medium text-primary mb-5">{courseTitle}</h2>

                  {amount && (
                    <div className="mb-5">
                      <label className="block mb-1 text-base font-normal text-[#181A25]">Amount</label>
                      <div className="w-full rounded-lg px-4 py-3 bg-[#F0F0F0] text-sm text-grey-400">
                        <span className="mr-4">{currency}</span>
                        {amount.replace(/[₦$]/g, "").trim()}
                      </div>
                    </div>
                  )}

                  <form
                    id="registration-form"
                    onSubmit={handleSubmit}
                    className="space-y-4 text-[#181A25] text-base font-normal"
                  >
                    {isKids && (
                      <p className="font-semibold text-[#181A25]">Parent Information</p>
                    )}

                    <div>
                      <label className="block mb-1">Your first and last name</label>
                      <input
                        type="text"
                        placeholder="Type it here"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`${inputBase} ${errors.fullName ? "ring-2 ring-red-500" : ""}`}
                        required
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block mb-1">Your email address</label>
                      <input
                        type="email"
                        placeholder="Type it here"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`${inputBase} ${errors.email ? "ring-2 ring-red-500" : ""}`}
                        required
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block mb-1">Your phone number (WhatsApp)</label>
                      <input
                        type="tel"
                        placeholder="+234 801 234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`${inputBase} ${errors.phone ? "ring-2 ring-red-500" : ""}`}
                        required
                      />
                      {errors.phone
                        ? <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        : <p className="text-xs text-gray-400 mt-1">Include your country code (e.g. +234 for Nigeria, +44 for UK)</p>
                      }
                    </div>

                    {isKids && (
                      <>
                        <p className="font-semibold text-[#181A25] pt-2">Child Information</p>

                        <div>
                          <label className="block mb-1">First and last name</label>
                          <input
                            type="text"
                            placeholder="Type it here"
                            value={formData.childName}
                            onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                            className={`${inputBase} ${errors.childName ? "ring-2 ring-red-500" : ""}`}
                            required
                          />
                          {errors.childName && <p className="text-red-500 text-xs mt-1">{errors.childName}</p>}
                        </div>

                        <div>
                          <label className="block mb-1">Age</label>
                          <input
                            type="number"
                            placeholder="Type it here"
                            min={1}
                            max={17}
                            value={formData.childAge}
                            onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                            className={`${inputBase} ${errors.childAge ? "ring-2 ring-red-500" : ""}`}
                            required
                          />
                          {errors.childAge && <p className="text-red-500 text-xs mt-1">{errors.childAge}</p>}
                        </div>
                      </>
                    )}
                  </form>
                </div>

              {/* Pinned footer — always visible, never scrolls away */}
              <div className="flex-shrink-0 px-[50px] pb-[50px] pt-4">
                <button
                  type="submit"
                  form="registration-form"
                  disabled={isPending}
                  className={`w-full px-6 py-4 rounded-xl font-medium transition-all text-base ${
                    isPending
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#7148E5] hover:bg-[#5a3bc3] text-white"
                  }`}
                >
                  {isPending ? "Processing..." : "Secure my spot"}
                </button>
              </div>
            </>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
