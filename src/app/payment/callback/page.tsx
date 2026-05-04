
// app/payment/callback/page.tsx
"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyCoursePayment } from "@/hooks/queries/useVerifyCoursePayment";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reference = searchParams.get("reference") || searchParams.get("trxref") || "";
  const type = searchParams.get("type");
  const { data, isLoading, isError, error } = useVerifyCoursePayment(reference);

  if (isLoading || !reference) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#7148E5] mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl">💳</div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#181A25]">
            Verifying your payment...
          </h2>
          <p className="text-[#3A3D44]">Please wait while we confirm your enrollment</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#181A25]">
            Payment Verification Failed
          </h2>
          <p className="text-[#3A3D44]">{error?.message}</p>
          <div className="space-y-3 mt-6">
            <button
              onClick={() => router.push("/academy")}
              className="w-full px-6 py-3 bg-[#7148E5] text-white rounded-lg hover:bg-[#5e36c2] transition-all"
            >
              Back to Courses
            </button>
            <p className="text-sm text-gray-500">
              If you&apos;ve been charged, please contact support
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (data?.isPaid) {
    const isKids = type === "kids";

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[573px] p-8 relative">
          <button
            onClick={() => router.push("/academy")}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-normal leading-none transition-colors"
          >
            ×
          </button>

          <div className="flex justify-center mb-6">
            <Image src="/gif/confetti.gif" alt="Confetti Icon" width={246} height={246} />
          </div>

          <div className="text-start space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#181A25]">
              {isKids ? "Your child is officially enrolled" : "You’re officially enrolled!"}
            </h2>

            <p className="text-base text-[#3A3D44] leading-relaxed">
              {isKids
                ? "Check your email for next steps. We’re excited to support your child’s French learning journey."
                : "Check your email for next steps. Thank you for trusting us to guide your French journey."}
            </p>

            <p className="text-base text-[#3A3D44] flex items-center justify-start gap-2">
              {isKids ? "Fluensy is possible" : "Get ready to be fluent. Fluensy is possible"}{" "}
              <span className="text-2xl">👍</span>
            </p>

            <button
              onClick={() => router.push("/academy")}
              className="w-full mt-6 px-6 py-3 bg-[#7148E5] hover:bg-[#5e36c2] text-white text-base font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment reference found but isPaid is false
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-[#181A25]">Payment Not Confirmed</h2>
        <p className="text-[#3A3D44]">
          We could not confirm your payment. If you were charged, please contact support.
        </p>
        <button
          onClick={() => router.push("/academy")}
          className="w-full px-6 py-3 bg-[#7148E5] text-white rounded-lg hover:bg-[#5e36c2] transition-all"
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#7148E5] mx-auto"></div>
            <h2 className="text-2xl font-bold text-[#181A25]">Loading...</h2>
          </div>
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
