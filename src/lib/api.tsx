/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface DashboardResponse {
  total_students: number;
  total_enrollments: number;
  total_revenue_ngn: string;
  total_revenue_usd: string;
  pending_payments: number;
  active_cohorts: number;
}

// Define error shape if backend uses `detail` or `message`
interface ApiError {
  detail?: string;
  message?: string;
}

// LOGIN
export const loginAdmin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const res: AxiosResponse<LoginResponse> = await api.post("/admin/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError<ApiError>(err)) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "An error occurred during login.";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred during login.");
  }
};

// DASHBOARD DATA
export const getDashboardData = async (
  token: string
): Promise<DashboardResponse> => {
  try {
    const res: AxiosResponse<DashboardResponse> = await api.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError<ApiError>(err)) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to fetch dashboard data.";
      throw new Error(message);
    }
    throw new Error("Unexpected error occurred while fetching dashboard data.");
  }
};
