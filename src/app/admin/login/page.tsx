"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await loginAdmin(email, password);

    // ✅ Store token consistently (sessionStorage or localStorage)
    sessionStorage.setItem("token", res.access_token);

    toast.success("Login successful! Redirecting...");

    // ✅ Wait a short moment to ensure the token is stored before navigation
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 800);
  } catch (error: unknown) {
    // ✅ More reliable error handling
    const message =
      error instanceof Error
        ? error.message
        : "Login failed. Please check your credentials.";
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Toasts */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Logo ABOVE the card */}
      <div className="text-3xl mb-8">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-bold">fluensy</span>
          <span className="font-normal text-gray-700">french</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white shadow-[0_0_20px_#0000001A] rounded-xl p-8">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-gray-700 text-sm font-medium"
            >
          What’s your email address?
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email address here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#F1F1F1] border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#7148E5]"
            />
          </div>

          {/* Password Field */}
         <div className="flex flex-col gap-2 relative">
  <label
    htmlFor="password"
    className="text-gray-700 text-sm font-medium"
  >
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
        if (e.target.value.length === 0) setShowPassword(false);
      }}
      required
      className="bg-[#F1F1F1] border border-gray-200 rounded-md px-4 py-3 pr-20 text-sm w-full focus:outline-none focus:border-[#7148E5]"
    />

    {/* Toggle only when user has typed something */}
    {password.length > 0 && (
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-600 hover:text-[#7148E5] focus:outline-none text-sm"
      >
        {showPassword ? (
          <>
            <EyeOff className="h-5 w-5" />
            <span>Hide</span>
          </>
        ) : (
          <>
            <Eye className="h-5 w-5" />
            <span>Show</span>
          </>
        )}
      </button>
    )}
  </div>
</div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#7148E5] text-white rounded-md py-3 font-medium 
                       transition-all duration-300 ease-out transform 
                       hover:bg-[#7DE5F2] hover:text-[#181A25] hover:shadow-lg hover:scale-[1.02] 
                       active:scale-[0.98] disabled:opacity-70 mt-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
