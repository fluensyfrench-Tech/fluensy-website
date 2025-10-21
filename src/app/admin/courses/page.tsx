/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses, createCourse, updateCourse, Course } from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";

export default function AcademyPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    language: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else fetchCourses(token);
  }, []);

  const fetchCourses = async (token: string) => {
    try {
      setLoading(true);
      const data = await getCourses(token);
      setCourses(data);
    } catch (err) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      setLoading(true);

      if (editingCourse) {
        await updateCourse(token, editingCourse.id, {
          ...form,
          price: Number(form.price),
        });

        toast.success("Course updated!");
      } else {
        await createCourse(token, {
          ...form,
          price: Number(form.price),
        });

        toast.success("Course created!");
      }

      setForm({ title: "", description: "", price: "", language: "" });
      setEditingCourse(null);
      fetchCourses(token);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      language: course.language,
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-center" />

      <h1 className="text-2xl font-semibold mb-6">Courses</h1>

      {/* Create / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Course Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
          <input
            type="text"
            placeholder="Language (e.g., French)"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7148E5] text-white px-6 py-3 rounded-md hover:bg-[#5e39cc] transition-all"
        >
          {loading
            ? "Saving..."
            : editingCourse
            ? "Update Course"
            : "Create Course"}
        </button>
      </form>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">All Courses</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Language</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{course.title}</td>
                <td className="p-3 border-b">{course.language}</td>
                <td className="p-3 border-b">₦{course.price}</td>
                <td className="p-3 border-b">{course.description}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-[#7148E5] hover:underline text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No courses found.</p>
        )}
      </div>
    </div>
  );
}
