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
    const url = `https://script.google.com/macros/s/AKfycbwZ6j8E-YIbZ73EJIob-RHCjV4sRh2hthin37zYo1mPXsmOvumpJb6EWJETvTbpYIJJ/exec?email=${encodeURIComponent(
      email
    )}&date=${encodeURIComponent(date)}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.warn("Unexpected response status:", response.status);
      return false;
    }

    const result = await response.json();
    console.log("Successfully submitted:", result);
    return result.success || false;
  } catch (error) {
    console.error("Fetch error submitting to Google Sheet:", error);
    return false;
  }
};

export const getPublicCourses = async () => {
  try {
    const res = await api.get("/api/public/courses");
    return res.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getPublicCohortsDetailed = async () => {
  try {
    const res = await api.get("/api/public/cohorts/detailed");
    return res.data;
  } catch (error) {
    console.error("Error fetching cohorts:", error);
    throw error;
  }
};





export const verifyPayment = async (
  reference: string
): Promise<PaymentVerificationResponse> => {
  try {
    const res = await api.get(`/api/payment/verify/${reference}`);
    return res.data;
  } catch (error: any) {
    // Re-throw the original error with all its data intact
    // The frontend will handle extracting the appropriate message
    throw error;
  }
};

export const getPaymentOptions = async () => {
  // try {
  //   const res = await api.get("api/enrollment/payment-options");
  //   return res.data;
  // } catch (error) {
  //   console.error("Error fetching payment options:", error);
  //   // Return default options if API fails
  return {
    currencies: {
      NGN: { available: true, symbol: "₦", name: "Nigerian Naira" },
      USD: {
        available: false,
        symbol: "$",
        name: "US Dollar",
        note: "Coming Soon",
      },
    },
  };
};

export const registerEnrollment = async (
  payload: EnrollmentPayload
): Promise<EnrollmentResponse> => {
  try {
    const res = await api.post("/api/enrollment/register", payload);
    return res.data;
  } catch (error: any) {
    // Re-throw the original error with all its data intact
    // The frontend will handle extracting the appropriate message
    throw error;
  }
};
