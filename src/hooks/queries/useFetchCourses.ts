import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Course } from "@/types";

export const COURSES_QUERY_KEY = ["courses"] as const;

const fetchCourses = async ({type}: {type: string}) => {
  const response = await apiFetch(`/courses?type=${type}`);
  return response.json() as Promise<Course[]>;
};

export const useFetchCourses = (type: string) => {
  return useQuery<Course[]>({
    queryKey: [...COURSES_QUERY_KEY, type],
    queryFn: () => fetchCourses({type}),
    enabled: !!type,
  });
};
