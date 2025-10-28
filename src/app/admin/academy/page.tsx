/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState, FormEvent, ChangeEvent, JSX } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import AdminLayout from "@/components/Admin/Layout";
import {
  Course,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/lib/adminapi";


interface FormState {
  course_title_name: string;
  course_title_level: string;
  price_ngn: string;
  start_date: string;
  end_date: string;
  description: string;
}

export default function AcademyPage(): JSX.Element {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    course_title_name: "",
    course_title_level: "",
    price_ngn: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const getTokenOrRedirect = (): string | null => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please log in.");
      router.push("/login");
      return null;
    }
    return token;
  };

  useEffect(() => {
    const token = getTokenOrRedirect();
    if (token) fetchCoursesHandler(token);
  }, []);

  const fetchCoursesHandler = async (token: string) => {
    setFetching(true);
    try {
      const data = await getCourses(token);
      setCourses(data);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch courses");
    } finally {
      setFetching(false);
    }
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setForm({
      course_title_name: "",
      course_title_level: "",
      price_ngn: "",
      start_date: "",
      end_date: "",
      description: "",
    });
    setShowModal(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setForm({
      course_title_name: course.course_title_name,
      course_title_level: course.course_title_level,
      price_ngn: course.price_ngn,
      start_date: course.start_date,
      end_date: course.end_date,
      description: course.description,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setForm({
      course_title_name: "",
      course_title_level: "",
      price_ngn: "",
      start_date: "",
      end_date: "",
      description: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const token = getTokenOrRedirect();
  //   if (!token) return;

  //   setSaving(true);
  //   try {
  //     if (editingCourse) {
  //       const updated = await updateCourse(token, editingCourse.id, form);
  //       setCourses(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  //       toast.success("Course updated!");
  //     } else {
  //       const created = await createCourse(token, form);
  //       setCourses(prev => [...prev, created]);
  //       toast.success("Course created!");
  //     }
  //     closeModal();
  //   } catch (error: unknown) {
  //     toast.error(error instanceof Error ? error.message : "Error saving course");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setShowDeleteModal(true);
  };

  // const confirmDelete = async () => {
  //   const token = getTokenOrRedirect();
  //   if (!token || !pendingDeleteId) return;

  //   setDeleting(true);
  //   try {
  //     await deleteCourse(token, pendingDeleteId);
  //     setCourses(prev => prev.filter(c => c.id !== pendingDeleteId));
  //     toast.success("Course deleted!");
  //   } catch (error: unknown) {
  //     toast.error(error instanceof Error ? error.message : "Failed to delete course");
  //   } finally {
  //     setDeleting(false);
  //     setShowDeleteModal(false);
  //     setPendingDeleteId(null);
  //   }
  // };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPendingDeleteId(null);
  };

  const InputField = ({
    name,
    label,
    type = "text",
    value,
  }: {
    name: string;
    label: string;
    type?: string;
    value: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className="w-full p-3 rounded border border-gray-300 bg-[#F1F1F1] focus:outline-none focus:ring-2 focus:ring-[#7148E5]"
      />
    </div>
  );

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
        <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        <button
          onClick={openCreateModal}
          className="px-6 py-3 bg-[#7148E5] hover:bg-[#5e39cc] text-white rounded-lg transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Create Course
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Price (NGN)</th>
              <th>Start</th>
              <th>End</th>
              <th>Description</th>
              <th>Cohort</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td>{course.course_title_name}</td>
                <td>{course.course_title_level}</td>
                <td>₦{Number(course.price_ngn).toLocaleString()}</td>
                <td>{new Date(course.start_date).toLocaleDateString()}</td>
                <td>{new Date(course.end_date).toLocaleDateString()}</td>
                <td className="truncate max-w-xs">{course.description}</td>
                <td>{course.cohort_name}</td>
                <td className="text-center flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(course)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals (Create/Edit & Delete) remain the same as your previous code */}
    </AdminLayout>
  );
}
