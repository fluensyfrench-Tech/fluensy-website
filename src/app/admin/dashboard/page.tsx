/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardData, DashboardResponse } from "@/lib/api";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const dashboardData = await getDashboardData(token);
        setData(dashboardData);
      } catch {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchDashboard();
  }, [router]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 min-h-screen md:h-screen bg-[#7148E5] text-white transition-transform duration-300 ease-in-out z-50
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
          w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 mt-8">
          <div className="text-xl">
            <Link href="/" className="leading-none">
              <span className="font-bold">fluensy</span>
              <span className="font-normal">french</span>
            </Link>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/80 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem
            href="/admin/dashboard"
            label="Dashboard"
            icon="/images/icons/admin/dashboard.svg"
            active={pathname === "/admin/dashboard"}
          />
          <NavItem
            href="/admin/academy"
            label="Academy"
            icon="/images/icons/admin/academy.svg"
            active={pathname === "/admin/academy"}
          />
          <NavItem
            href="/admin/customers"
            label="Customers"
            icon="/images/icons/admin/customers.svg"
            active={pathname === "/admin/customers"}
          />
          <NavItem
            href="/admin/words"
            label="words"
            icon="/images/icons/admin/customers.svg"
            active={pathname === "/admin/words"}
          />
          <NavItem
            href="/admin/fix"
            label="fix"
            icon="/images/icons/admin/fix.svg"
            active={pathname === "/admin/fix"}
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Nav */}
        <header className="mb-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-gray-700 hover:text-[#7148E5]"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-lg text-gray-600 border-b border-b-[#E4E6EB] mb-5">
            Welcome, <span className="font-medium text-gray-800">Admin</span>
          </div>
          <h1 className="text-2xl font-semibold mt-5">Dashboard</h1>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Total Students" value={data.total_students} />
          <Card title="Total Enrollments" value={data.total_enrollments} />
          <Card title="Total Revenue (₦)" value={data.total_revenue_ngn} />
          <Card title="Total Revenue ($)" value={data.total_revenue_usd} />
          <Card title="Pending Payments" value={data.pending_payments} />
          <Card title="Active Cohorts" value={data.active_cohorts} />
        </div>
      </main>
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 text-[18px]
        ${
          active
            ? "text-white font-medium" // Active state
            : "text-[#C7CAD1] font-normal hover:text-white" // Default state
        }`}
    >
      <img src={icon} alt={label} className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_#0000001A] hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
}
