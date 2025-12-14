

// app/payment/callback/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPayment } from "@/lib/api";
import toast from "react-hot-toast";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [mounted, setMounted] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reference = searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setError("Invalid payment reference");
      setVerifying(false);
      return;
    }

    // Verify payment
    const verify = async () => {
      try {
        setVerifying(true);
        
        const response = await verifyPayment(reference);
        
        console.log("Verification response:", response);
        
        if (response.status === "success") {
          setVerified(true);
          setPaymentData(response.data);
          
          setTimeout(() => {
            setShowModal(true);
          }, 500);
        } else {
          setError(response.message || "Payment verification failed");
          toast.error("Payment verification failed");
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        
        // Extract error message from backend response
        let errorMessage = "Failed to verify payment";
        
        // Network error (backend is down)
        if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
          errorMessage = "Unable to connect to the server. Please contact support with your payment reference.";
        }
        // Connection refused (backend not running)
        else if (err?.message?.includes('ECONNREFUSED') || err?.message?.includes('Failed to fetch')) {
          errorMessage = "The service is temporarily unavailable. Please contact support if payment was deducted.";
        }
        // Timeout error
        else if (err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
          errorMessage = "Payment verification is taking too long. Please contact support.";
        }
        else {
          const responseData = err?.response?.data;
          
          if (responseData) {
            // Detect HTML error pages
            if (typeof responseData === 'string' && responseData.trim().startsWith('<!DOCTYPE')) {
              errorMessage = "Service unavailable. Please contact support if payment was deducted.";
            }
            // Check for detail field (FastAPI standard)
            else if (responseData.detail) {
              errorMessage = typeof responseData.detail === 'string' 
                ? responseData.detail 
                : JSON.stringify(responseData.detail);
            }
            // Check for message field
            else if (responseData.message) {
              errorMessage = responseData.message;
            }
            // Check for error field
            else if (responseData.error) {
              errorMessage = responseData.error;
            }
            // If data itself is a string (not HTML)
            else if (typeof responseData === 'string' && responseData.length < 200) {
              errorMessage = responseData;
            }
          }
          // HTTP status errors
          else if (err?.response?.status) {
            const status = err.response.status;
            if (status === 500) errorMessage = "Server error. Please contact support.";
            else if (status === 502 || status === 503) errorMessage = "Service unavailable. Please try again later.";
            else if (status === 504) errorMessage = "Request timeout. Please try again or contact support.";
          }
          // Fallback to error message property but avoid generic axios messages
          else if (err?.message && !err?.message.includes("status code")) {
            errorMessage = err.message;
          }
        }
        
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [searchParams, mounted]);

  const handleClose = () => {
    setShowModal(false);
    router.push("/program");
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  // Loading state
  if (verifying) {
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

  // Error state
  if (error && !verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#181A25]">
            Payment Verification Failed
          </h2>
          <p className="text-[#3A3D44]">{error}</p>
          <div className="space-y-3 mt-6">
            <button
              onClick={() => router.push("/program")}
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

  // Success modal
  if (showModal && verified) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none transition-colors"
          >
            ×
          </button>

          <div className="flex justify-center mb-6">
            <div className="text-8xl">🎉</div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#181A25]">
              You&apos;re officially enrolled!
            </h2>

            {paymentData && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Payment:{" "}
                  <span className="font-semibold text-[#181A25]">
                    {paymentData.currency} {paymentData.amount.toLocaleString()}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Ref: {paymentData.reference}
                </p>
              </div>
            )}

            <p className="text-base text-[#3A3D44] leading-relaxed">
              Check your email for next steps. Thank you for trusting us to
              guide your French journey.
            </p>

            <p className="text-base text-[#3A3D44] leading-relaxed">
              You&apos;re part of our very first set of learners, the pioneers of{" "}
              <span className="font-semibold text-[#7148E5]">fluensyfrench</span>
              ! You&apos;re amazing, and we&apos;re so glad to have you.
            </p>

            <p className="text-base text-[#3A3D44] flex items-center justify-center gap-2">
              Get ready to be fluent, it&apos;s possible{" "}
              <span className="text-2xl">👍</span>
            </p>

            <button
              onClick={handleClose}
              className="w-full mt-6 px-6 py-3 bg-[#7148E5] hover:bg-[#5e36c2] text-white text-base font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#7148E5] mx-auto"></div>
          <h2 className="text-2xl font-bold text-[#181A25]">Loading...</h2>
        </div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}