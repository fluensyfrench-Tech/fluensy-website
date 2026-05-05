"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Page Error]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-[#F3F0FF] rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-secondary-1" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">
          Something went wrong
        </h1>
        <p className="text-grey-600 mb-8">
          We ran into an unexpected error. You can try again or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-secondary-1 text-white rounded-xl font-medium hover:bg-[#5e36c2] transition-all h-[50px] flex items-center justify-center"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-grey-200 text-primary rounded-xl font-medium hover:border-secondary-1 hover:text-secondary-1 transition-all h-[50px] flex items-center justify-center"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
