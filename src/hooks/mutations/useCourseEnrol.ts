import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface CourseEnrolPayload {
  courseKey: string;
  fullName: string;
  email: string;
  whatsappPhone: string;
  country?: string;
  childName?: string;
  childAge?: string;
  currency: "NGN" | "USD";
}

export interface CourseEnrolResponse {
  authorizationUrl: string;
  reference: string;
}

const courseEnrol = async (payload: CourseEnrolPayload): Promise<CourseEnrolResponse> => {
  const response = await apiFetch("/courses/enroll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<CourseEnrolResponse>;
};

export const useCourseEnrol = () => {
  return useMutation<CourseEnrolResponse, Error, CourseEnrolPayload>({
    mutationFn: courseEnrol,
  });
};
