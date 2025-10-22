"use client";
import React, { useEffect, useState, FormEvent, ChangeEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  Course,
} from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";
import AdminLayout from "@/components/Admin/Layout";

interface FormState {
  name: string;
  level: string;
  price: string;
  duration_months: string;
  description: string;
}

export default function AcademyPage(): JSX.Element {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    level: "",
    price: "",
    duration_months: "",
    description: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please log in.");
      router.push("/login");
    } else {
      fetchCourses(token);
    }
  }, [router]);

  const fetchCourses = async (token: string): Promise<void> => {
    setLoading(true);
    try {
      const data: Course[] = await getCourses(token);
      setCourses(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch courses";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please log in.");
      router.push("/login");
      return;
    }

    const payload = {
      name: form.name,
      level: form.level,
      price: Number(form.price),
      duration_months: Number(form.duration_months),
      description: form.description,
    };

    setLoading(true);
    try {
      if (editingCourse) {
        const updated: Course = await updateCourse(
          token,
          editingCourse.id,
          payload
        );
        setCourses((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        toast.success("Course updated!");
      } else {
        const created: Course = await createCourse(token, payload);
        setCourses((prev) => [...prev, created]);
        toast.success("Course created!");
      }

      setForm({
        name: "",
        level: "",
        price: "",
        duration_months: "",
        description: "",
      });
      setEditingCourse(null);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error saving course";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: Course): void => {
    setEditingCourse(course);
    setForm({
      name: course.name,
      level: course.level,
      price: course.price.toString(),
      duration_months: course.duration_months.toString(),
      description: course.description,
    });
    toast(`Editing course: ${course.name}`);
  };

  const handleDeleteClick = (id: number): void => {
    setPendingDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (): Promise<void> => {
    const token = sessionStorage.getItem("token");
    if (!token || pendingDeleteId === null) {
      toast.error("Session expired. Please log in.");
      router.push("/login");
      return;
    }

    try {
      await deleteCourse(token, pendingDeleteId);
      setCourses((prev) =>
        prev.filter((course) => course.id !== pendingDeleteId)
      );
      toast.success("Course deleted!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete course";
      toast.error(message);
    } finally {
      setShowDeleteModal(false);
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = (): void => {
    setShowDeleteModal(false);
    setPendingDeleteId(null);
    toast("Deletion cancelled");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AdminLayout title="Academy">
      <Toaster position="top-center" />

      {/* ---------- Form ---------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            placeholder="Course Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
          <input
            name="level"
            type="number"
            placeholder="Level (e.g 1)"
            value={form.level}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
          <input
            name="duration_months"
            type="number"
            placeholder="Duration (months)"
            value={form.duration_months}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1]"
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 bg-[#F1F1F1] col-span-full"
          />
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-md transition-all text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#7148E5] hover:bg-[#5e39cc]"
            }`}
          >
            {loading
              ? "Saving..."
              : editingCourse
              ? "Update Course"
              : "Create Course"}
          </button>

          {editingCourse && (
            <button
              type="button"
              onClick={() => {
                setEditingCourse(null);
                setForm({
                  name: "",
                  level: "",
                  price: "",
                  duration_months: "",
                  description: "",
                });
                toast("Edit cancelled");
              }}
              className="ml-4 text-sm text-gray-500 hover:underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* ---------- Table ---------- */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">All Courses</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Level</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Duration</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{course?.name}</td>
                <td className="p-3 border-b">{course?.level}</td>
                <td className="p-3 border-b">₦{course?.price}</td>
                <td className="p-3 border-b">
                  {course.duration_months} month
                  {course.duration_months > 1 ? "s" : ""}
                </td>
                          <td className="p-3 border-b">₦{course?.description}</td>
                <td className="p-3 border-b text-center space-x-3">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-[#7148E5] hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course?.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
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

      {/* ---------- Delete Confirmation Modal ---------- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
