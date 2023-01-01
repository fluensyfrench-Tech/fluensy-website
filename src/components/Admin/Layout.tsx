/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

interface AdminLayoutProps {
  title?: string;
  children?: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  // 🔒 Protect admin routes
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/admin/login");
  };

  if (!authorized) return null; // avoid flicker

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
        className={`fixed md:static top-0 left-0 min-h-screen bg-[#7148E5] text-white transition-transform duration-300 ease-in-out z-50
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
          w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 mt-8">
          <Link href="/" className="text-xl leading-none">
            <span className="font-bold">fluensy</span>
            <span className="font-normal">french</span>
          </Link>
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
            label="Courses"
            icon="/images/icons/admin/academy.svg"
            active={pathname === "/admin/academy"}
          />
          <NavItem
            href="/admin/students"
            label="Students"
            icon="/images/icons/admin/students.svg"
            active={pathname === "/admin/students"}
          />
          <NavItem
            href="/admin/courses"
            label="Course Title"
            icon="/images/icons/admin/word.svg"
            active={pathname === "/admin/words"}
          />
          <NavItem
            href="/admin/cohort"
            label="Cohort"
            icon="/images/icons/admin/cohort.svg"
            active={pathname === "/admin/fix"}
          />
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
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
            Welcome, Admin
          </div>
          <h1 className="text-2xl font-semibold mt-5">{title}</h1>
        </header>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}

/* -------------------- Sub Component -------------------- */

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
            ? "text-white font-medium"
            : "text-[#C7CAD1] font-normal hover:text-white"
        }`}
    >
      <img src={icon} alt={label} className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}
