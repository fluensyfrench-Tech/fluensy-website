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
  title: string;              // corresponds to course name
  level: string;              // course level
  cohort_name: string;        // cohort display name
  cohort_id: string;          // cohort ID
  price_ngn: number;          // price in Naira
  price_usd: number;          // price in USD
  start_date: string;         // ISO date string
  end_date: string;           // ISO date string
  description: string;        // course description
  learning_outcomes: string[]; 
}


interface ApiError {
  detail?: string;
  message?: string;
}

// LOGIN



export const getPublicCourses = async () => {
  try {
    const res = await api.get("public/courses");
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

