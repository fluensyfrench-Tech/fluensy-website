import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface Course {
  courseKey: string;
  name: string;
  type: "ADULTS" | "KIDS";
  levels: string[];
  priceNGN: number;
  priceUSD: number;
}

export const COURSES_QUERY_KEY = ["courses"] as const;

const fetchCourses = async ({type}: {type: string}) => {
  const response = await apiFetch(`/courses?type=${type}`);
  return response.json();
};

export const useFetchCourses = (type: string) => {
  return useQuery<Course[]>({
    queryKey: [...COURSES_QUERY_KEY, type],
    queryFn: () => fetchCourses({type}),
    enabled: !!type,
  });
};
