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
  total_courses: number;
}


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




export interface Course {
  id: string;
  course_title_id: string;
  cohort_id: string;
  price_ngn: string;
  price_usd: string;
  start_date: string;
  end_date: string;
  description: string;
  learning_outcomes: string[];
  telegram_link: string | null;
  created_at: string;
  course_title_name: string;
  course_title_level: string;
  cohort_name: string;
}

export const getCourses = async (token: string): Promise<Course[]> => {
  try {
    const res = await api.get("/admin/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses");
  }
};

export const createCourse = async (
  token: string,
  course: Omit<Course, "id">
): Promise<Course> => {
  try {
    const res = await api.post("/admin/courses", course, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }
};

export const updateCourse = async (
  token: string,
  id: number,
  course: Partial<Course>
): Promise<Course> => {
  try {
    const res = await api.put(`/admin/courses/${id}`, course, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating course ${id}:`, error);
    throw new Error("Failed to update course");
  }
};

export const deleteCourse = async (
  token: string,
  id: number
): Promise<void> => {
  try {
    await api.delete(`/admin/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(`Error deleting course ${id}:`, error);
    throw new Error("Failed to delete course");
  }
};
