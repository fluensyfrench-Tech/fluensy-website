


// // app/payment/callback/page.tsx
// "use client";

// export const dynamic = 'force-dynamic';

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { verifyPayment } from "@/lib/api";
// import toast from "react-hot-toast";

// export default function PaymentCallback() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   const [mounted, setMounted] = useState(false);
//   const [verifying, setVerifying] = useState(true);
//   const [verified, setVerified] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [paymentData, setPaymentData] = useState<any>(null);

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const reference = searchParams.get("reference") || searchParams.get("trxref");

//     if (!reference) {
//       setError("Invalid payment reference");
//       setVerifying(false);
//       return;
//     }

//     // Verify payment
//     const verify = async () => {
//       try {
//         setVerifying(true);
        
//         const response = await verifyPayment(reference);
        
//         console.log("Verification response:", response);
        
//         if (response.status === "success") {
//           setVerified(true);
//           setPaymentData(response.data);
          
//           setTimeout(() => {
//             setShowModal(true);
//           }, 500);
//         } else {
//           setError(response.message || "Payment verification failed");
//           toast.error("Payment verification failed");
//         }
//       } catch (err: any) {
//         console.error("Verification error:", err);
//         setError(err.message || "Failed to verify payment");
//         toast.error(err.message || "Failed to verify payment");
//       } finally {
//         setVerifying(false);
//       }
//     };

//     verify();
//   }, [searchParams, mounted]);

//   const handleClose = () => {
//     setShowModal(false);
//     router.push("/program");
//   };

//   // Don't render anything until mounted
//   if (!mounted) {
//     return null;
//   }

//   // Loading state
//   if (verifying) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center space-y-4">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#7148E5] mx-auto"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-2xl">💳</div>
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold text-[#181A25]">
//             Verifying your payment...
//           </h2>
//           <p className="text-[#3A3D44]">Please wait while we confirm your enrollment</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !verified) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//         <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-2xl shadow-lg">
//           <div className="text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-[#181A25]">
//             Payment Verification Failed
//           </h2>
//           <p className="text-[#3A3D44]">{error}</p>
//           <div className="space-y-3 mt-6">
//             <button
//               onClick={() => router.push("/program")}
//               className="w-full px-6 py-3 bg-[#7148E5] text-white rounded-lg hover:bg-[#5e36c2] transition-all"
//             >
//               Back to Courses
//             </button>
//             <p className="text-sm text-gray-500">
//               If you&apos;ve been charged, please contact support
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Success modal
//   if (showModal && verified) {
//     return (
//       <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
//           <button
//             onClick={handleClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none transition-colors"
//           >
//             ×
//           </button>

//           <div className="flex justify-center mb-6">
//             <div className="text-8xl">🎉</div>
//           </div>

//           <div className="text-center space-y-4">
//             <h2 className="text-2xl md:text-3xl font-bold text-[#181A25]">
//               You&apos;re officially enrolled!
//             </h2>

//             {paymentData && (
//               <div className="bg-gray-50 rounded-lg p-4 mb-4">
//                 <p className="text-sm text-gray-600">
//                   Payment:{" "}
//                   <span className="font-semibold text-[#181A25]">
//                     {paymentData.currency} {paymentData.amount.toLocaleString()}
//                   </span>
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Ref: {paymentData.reference}
//                 </p>
//               </div>
//             )}

//             <p className="text-base text-[#3A3D44] leading-relaxed">
//               Check your email for next steps. Thank you for trusting us to
//               guide your French journey.
//             </p>

//             <p className="text-base text-[#3A3D44] leading-relaxed">
//               You&apos;re part of our very first set of learners, the pioneers of{" "}
//               <span className="font-semibold text-[#7148E5]">fluensyfrench</span>
//               ! You&apos;re amazing, and we&apos;re so glad to have you.
//             </p>

//             <p className="text-base text-[#3A3D44] flex items-center justify-center gap-2">
//               Get ready to be fluent, it&apos;s possible{" "}
//               <span className="text-2xl">👍</span>
//             </p>

//             <button
//               onClick={handleClose}
//               className="w-full mt-6 px-6 py-3 bg-[#7148E5] hover:bg-[#5e36c2] text-white text-base font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
//             >
//               Okay
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }


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
        setError(err.message || "Failed to verify payment");
        toast.error(err.message || "Failed to verify payment");
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