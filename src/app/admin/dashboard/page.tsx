"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/Admin/Layout";
import { getDashboardData, DashboardResponse } from "@/lib/adminapi";
import { useRouter } from "next/navigation";

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_#0000001A] hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    (async () => {
      try {
        const res = await getDashboardData(token);
        setData(res);
      } catch {
        sessionStorage.removeItem("token");
        router.push("/admin/login");
      }
    })();
  }, [router]);

  if (!data) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-40 text-gray-600">
          Loading dashboard...
        </div>
      </AdminLayout>
    );
  }

return (
  <AdminLayout title="Dashboard">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title="Total Students" value={data?.total_students} />
      <Card title="Total Enrollments" value={data?.total_enrollments} />
      <Card title="Total Revenue (₦)" value={data?.total_revenue_ngn} />
      <Card title="Total Revenue ($)" value={data?.total_revenue_usd} />
      <Card title="Active Cohorts" value={data?.active_cohorts} />
      <Card title="Total Courses" value={data?.total_courses} />
    </div>
  </AdminLayout>
);
}
