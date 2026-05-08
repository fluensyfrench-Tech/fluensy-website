/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from "axios";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/api\/v1\/?$/, "");
const API_V1 = `${API_BASE}/api/v1`;

export class ApiError extends Error {
  response: { data: unknown; status: number };

  constructor(public status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.response = { status, data };
  }
}

export const apiFetch = async (path: string, init?: RequestInit): Promise<Response> => {
  let response: Response;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  try {
    response = await fetch(`${API_V1}${path}`, { ...init, signal: controller.signal });
    clearTimeout(timeoutId);
  } catch {
    clearTimeout(timeoutId);
    throw new ApiError(0, "Unable to connect to the server. Please check your internet connection.");
  }
  if (!response.ok) {
    let message = response.statusText || "An error occurred";
    let data: unknown;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        data = await response.json();
        const typed = data as Record<string, unknown>;
        message = (typed?.detail as string) || (typed?.message as string) || message;
      }
    } catch {}
    throw new ApiError(response.status, message, data);
  }
  return response;
};

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  validateStatus: (status) => status < 400,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 0;
    const data = error.response?.data;
    const typed = data as Record<string, unknown> | undefined;
    const message =
      (typed?.detail as string) ||
      (typed?.message as string) ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new ApiError(status, message, data));
  }
);

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
    const res = await api.get(`/courses/verify/${reference}`);
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
