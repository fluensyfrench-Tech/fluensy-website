/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export interface Cohort {
  id: string;
  name: string;
  year: number;
  is_active: boolean;
  registration_open_date: string;
  registration_close_date: string;
  registration_status: string;
  days_until_close: number;
  program_duration_months: number;
  max_students: number;
  courses: Course[];
}

export interface Course {
  id: string;
  title: string; // corresponds to course name
  level: string; // course level
  cohort_name: string; // cohort display name
  cohort_id: string; // cohort ID
  price_ngn: number; // price in Naira
  price_usd: number; // price in USD
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  description: string; // course description
  learning_outcomes: string[];
}

export interface EnrollmentPayload {
  cohort_id: string | undefined;
  course_id: string | undefined;
  country: string;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface EnrollmentResponse {
  enrollment_id: string;
  payment_gateway: string;
  authorization_url: string;
  reference: string;
}


// @/lib/api.ts

// Add this interface
export interface PaymentVerificationResponse {
  status: string;
  message: string;
  data: {
    reference: string;
    amount: number;
    currency: string;
    payment_status: string;
    enrollment_status: string | null;
    paid_at?: string;
  };
}



interface ApiError {
  detail?: string;
  message?: string;
}

export const addToWaitlist = async (
  email: string,
  date: string
): Promise<boolean> => {
  try {
    const url = `https://script.google.com/macros/s/AKfycbwW0uSlU2LwmW2AJuJ8Oi_h_5ZLwjvxMGB90phrDFSm3PjbdtIcE4KttQuilCvmPa6a/exec?email=${encodeURIComponent(
      email
    )}&date=${encodeURIComponent(date)}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.warn("Unexpected response status:", response.status);
      return false;
    }

    console.log("Successfully submitted:", await response.text());
    return true;
  } catch (error) {
    console.error("Fetch error submitting to Google Sheet:", error);
    return false;
  }
};


export const getPublicCourses = async () => {
  try {
    const res = await api.get("/public/courses");
    return res.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses");
  }
};

export const getPublicCohortsDetailed = async () => {
  try {
    const res = await api.get("/public/cohorts/detailed");
    return res.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses");
  }
};

// Add this function
export const verifyPayment = async (
  reference: string
): Promise<PaymentVerificationResponse> => {
  try {
    const res = await api.get(`/payment/verify/${reference}`);
    return res.data;
  } catch (error: any) {
    const detail = error.response?.data?.detail;
    throw new Error(detail || error.message || "Payment verification failed");
  }
};

// @/lib/api.ts - Add getPaymentOptions
export const getPaymentOptions = async () => {
  try {
    const res = await api.get("/enrollment/payment-options");
    return res.data;
  } catch (error) {
    console.error("Error fetching payment options:", error);
    // Return default options if API fails
    return {
      currencies: {
        NGN: { available: true, symbol: "₦", name: "Nigerian Naira" },
        USD: { available: false, symbol: "$", name: "US Dollar", note: "Available in production only" },
      },
    };
  }
};

export const registerEnrollment = async (
  payload: EnrollmentPayload
): Promise<EnrollmentResponse> => {
  try {
    const res = await api.post("/enrollment/register", payload);
    return res.data;
  } catch (error: any) {
    const detail = error.response?.data?.detail;

    // Handle duplicate enrollment error
    if (error.response?.status === 409 || 
        (typeof detail === 'string' && detail.includes('already enrolled'))) {
      throw new Error("You are already enrolled in this cohort. Please check your email or contact support.");
    }

    // Handle unique constraint violation
    if (error.response?.status === 400 && 
        (typeof detail === 'string' && detail.includes('duplicate'))) {
      throw new Error("You are already enrolled in this cohort. Please check your email or contact support.");
    }

    if (Array.isArray(detail)) {
      const firstError = detail[0];
      const field = firstError?.loc?.[1];
      const reason = firstError?.msg || firstError?.ctx?.reason;

      throw new Error(`${field ? `${field}: ` : ""}${reason}`);
    }

    throw new Error(
      error.response?.data?.message || error.message || "Enrollment failed"
    );
  }
};

