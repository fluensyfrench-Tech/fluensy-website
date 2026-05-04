import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface VerifyCoursePaymentPayload {
  reference: string;
}

export interface VerifyCoursePaymentResponse {
  enrollmentId: string;
  fullName: string;
  email: string;
  courseName: string;
  isPaid: boolean;
}

const verifyCoursePayment = async (payload: VerifyCoursePaymentPayload): Promise<VerifyCoursePaymentResponse> => {
  const response = await apiFetch(`/courses/verify?reference=${payload.reference}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json() as Promise<VerifyCoursePaymentResponse>;
};

export const useVerifyCoursePayment = (reference: string) => {
  return useQuery<VerifyCoursePaymentResponse, Error>({
    queryKey: ['verifyCoursePayment', reference],
    queryFn: () => verifyCoursePayment({ reference }),
    enabled: !!reference,
  });
};
