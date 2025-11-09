// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";
// import { ArrowDown } from "lucide-react";
// import RegistrationModal from "../Modal/RegistrationModal";
// import { Course, getPublicCohortsDetailed } from "@/lib/api";

// // Types
// interface Cohort {
//   id: string;
//   name: string;
//   year: number;
//   is_active: boolean;
//   registration_open_date: string;
//   registration_close_date: string;
//   registration_status: string;
//   days_until_close: number;
//   program_duration_months: number;
//   max_students: number;
//   courses: Course[];
// }

// const Program = () => {
//   const [cohorts, setCohorts] = useState<Cohort[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//   // ✅ Format date as “October 25, 2025”
// const formatDate = (dateString?: string): string => {
//   if (!dateString) return "-";

//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "-"; // Invalid date

//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };


//   // ✅ Fetch cohorts
//   const fetchCohorts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await getPublicCohortsDetailed();
//       setCohorts(data?.cohorts || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load programs. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCohorts();
//   }, [fetchCohorts]);

//   // ✅ Modal handler
//   const handleOpenModal = (cohortId: string, course: Course) => {
//     setSelectedCourse(course);
//     setSelectedCohortId(cohortId);
//     setShowModal(true);
//     setOpenDropdown(null);
//   };

//   return (
//     <>
//       <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-left"
//           >
//             <h2 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-12 mb-4 pt-5">
//               CEFR-Aligned French Language Courses
//             </h2>
//             <p className="text-lg md:text-xl text-[#181A25] mb-12 max-w-3xl">
//               Learn French with courses aligned to the Common European Framework
//               of Reference (CEFR) — a globally recognized standard for measuring
//               language proficiency. Build real-world skills in speaking,
//               listening, reading, and writing.
//             </p>
//           </motion.div>

//           {/* Loading */}
//      {/* Loading skeleton */}
// {loading && (
//   <div className="animate-pulse space-y-10">
//     {[...Array(2)].map((_, i) => (
//       <div key={i} className="border border-gray-200 rounded-xl p-6">
//         <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
//         <div className="space-y-3">
//           <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
//           <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
//           <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-6">
//           {[...Array(2)].map((_, j) => (
//             <div key={j} className="border border-gray-200 rounded-xl p-4">
//               <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
//               <div className="h-3 w-48 bg-gray-200 rounded mb-3"></div>
//               <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
//               <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// )}

//           {/* Error */}
//           {error && !loading && (
//             <div className="text-center py-20">
//               <p className="text-red-500 text-lg mb-4">{error}</p>
//               <button
//                 onClick={fetchCohorts}
//                 className="bg-[#7148E5] text-white px-5 py-3 rounded-lg hover:bg-[#5e36c2] transition-all"
//               >
//                 Retry
//               </button>
//             </div>
//           )}

//           {/* Empty */}
//           {!loading && !error && cohorts.length === 0 && (
//             <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
//               <img
//                 src="/images/empty-state.svg"
//                 alt="No data"
//                 className="w-40 h-40 opacity-80 mb-6"
//               />
//               <p className="text-lg font-medium">
//                 No programs available at the moment.
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Please check back later or contact support for updates.
//               </p>
//             </div>
//           )}

//           {/* ✅ Loaded State */}
//           {!loading &&
//             !error &&
//             cohorts.length > 0 &&
//             cohorts.map((cohort) => (
//               <section key={cohort.id} className="pb-16 mt-10 border-b">
//                 <h4 className="text-2xl md:text-3xl font-semibold mb-3">
//                   Single-Level Program
//                 </h4>
//                 <h3 className="text-xl md:text-2xl font-medium mb-6">
//                   {cohort.name}
//                 </h3>

//                 {/* Cohort Details */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   viewport={{ once: true }}
//                   className="w-full md:w-[65%] bg-white border border-[#C7CAD1] rounded-xl shadow-sm px-6 py-8 mb-10"
//                 >
//                   <ul className="space-y-4 text-[#181A25] text-base md:text-lg font-normal">
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>
//                         <strong>Registration is open</strong> until{" "}
//                         {formatDate(cohort.registration_close_date)}
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>
//                         {cohort.program_duration_months}-month program duration
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>
//                         Classes run from{" "}
//                         {formatDate(cohort.courses[0]?.start_date)} to{" "}
//                         {formatDate(
//                           cohort.courses[cohort.courses.length - 1]?.end_date
//                         )}
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>4–5 live classes weekly + community support</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>Zoom/Meet, 100% online</span>
//                     </li>
//                   </ul>
//                 </motion.div>

//                 {/* Courses Grid */}
//                 <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
//                   {cohort.courses.map((course) => (
//                     <motion.div
//                       key={course.id}
//                       whileHover={{ scale: 1.02 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                       className="bg-white rounded-xl border border-[#C7CAD1] shadow-sm px-6 py-8 flex flex-col justify-between"
//                     >
//                       <div>
//                         <div className="flex items-center gap-2 mb-4 font-bold text-lg">
//                           <span className="bg-[#E6E6FA] text-[#181A25] rounded-lg px-3 py-1">
//                             ₦{course.price_ngn.toLocaleString()}
//                           </span>
//                           <span className="bg-[#E6E6FA] text-[#181A25] rounded-lg px-3 py-1">
//                             ${course.price_usd}
//                           </span>
//                         </div>

//                         <h3 className="text-xl font-semibold text-[#181A25] mb-2">
//                           {course.level}
//                         </h3>
//                         <p className="text-sm text-[#3A3D44] mb-4">
//                           {course.description}
//                         </p>

//                         <h4 className="text-base font-semibold text-[#3A3D44] mb-2">
//                           Learning outcomes
//                         </h4>
//                         <ul className="space-y-2 mb-6">
//                           {course.learning_outcomes.map((item, i) => (
//                             <li key={i} className="flex items-start gap-2">
//                               <img
//                                 src="/images/icons/gray-check.svg"
//                                 alt=""
//                                 className="w-5 h-5 mt-1"
//                               />
//                               <span className="font-light text-sm text-[#181A1D]">
//                                 {item}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       {/* Dropdown Register button */}
//                       <div className="relative">
//                         <button
//                           onClick={() =>
//                             setOpenDropdown(
//                               openDropdown === course.id ? null : course.id
//                             )
//                           }
//                           className="w-[200px] flex items-center justify-between px-6 py-4 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm font-medium rounded-lg transition-all"
//                         >
//                           Register Now <ArrowDown className="ml-2" />
//                         </button>

//                         {openDropdown === course.id && (
//                           <ul className="absolute z-10 mt-2 w-[200px] bg-white border border-[#C7CAD1] rounded-lg shadow-md">
//                             <li
//                               className="px-4 py-2 hover:bg-[#F3F0FF] cursor-pointer"
//                               onClick={() => handleOpenModal(cohort.id, course)}
//                             >
//                               Pay in ₦ Naira
//                             </li>
//                             <li className="px-4 py-2 hover:bg-[#F3F0FF] opacity-50 cursor-not-allowed">
//                               Pay in $ Dollar (Coming soon)
//                             </li>
//                           </ul>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </section>
//             ))}
//         </div>
//       </section>

//       {/* 🧾 Registration Modal */}

//       {selectedCourse && selectedCohortId && (
//         <RegistrationModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           courseTitle={selectedCourse?.title}
//           amount={`₦${selectedCourse.price_ngn.toLocaleString()}`}
//           selectedCourseId={selectedCourse?.id}
//           selectedCohortId={selectedCohortId}
//         />
//       )}
//     </>
//   );
// };

// export default Program;




// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";
// import { ArrowDown } from "lucide-react";
// import RegistrationModal from "../Modal/RegistrationModal";
// import { Course, getPublicCohortsDetailed } from "@/lib/api";

// // Types
// interface Cohort {
//   id: string;
//   name: string;
//   year: number;
//   is_active?: boolean;
//   registration_open_date?: string;
//   registration_close_date: string;
//   registration_status: string;
//   days_until_close: number;
//   program_duration_months?: number;
//   max_students?: number;
//   courses: Course[];
// }

// const Program = () => {
//   const [cohorts, setCohorts] = useState<Cohort[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//   // ✅ Format date as "October 25, 2025"
//   const formatDate = (dateString?: string): string => {
//     if (!dateString) return "-";

//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "-"; // Invalid date

//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // ✅ Fetch cohorts with proper data handling
//   const fetchCohorts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const data = await getPublicCohortsDetailed();
      
//       // Debug log
//       console.log("API Response:", data);
      
//       // Handle different response structures
//       let cohortsData: Cohort[] = [];
      
//       if (Array.isArray(data)) {
//         // If data is directly an array
//         cohortsData = data;
//       } else if (data?.cohorts && Array.isArray(data.cohorts)) {
//         // If data has cohorts property as array
//         cohortsData = data.cohorts;
//       } else if (data?.id && data?.courses) {
//         // If data is a single cohort object (YOUR CASE)
//         cohortsData = [data];
//       } else {
//         console.warn("Unexpected data structure:", data);
//         cohortsData = [];
//       }
      
//       console.log("Processed cohorts:", cohortsData);
//       setCohorts(cohortsData);
      
//     } catch (err) {
//       console.error("Error fetching cohorts:", err);
//       setError("Failed to load programs. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCohorts();
//   }, [fetchCohorts]);

//   // ✅ Modal handler
//   const handleOpenModal = (cohortId: string, course: Course) => {
//     setSelectedCourse(course);
//     setSelectedCohortId(cohortId);
//     setShowModal(true);
//     setOpenDropdown(null);
//   };

//   return (
//     <>
//       <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-left"
//           >
//             <h2 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-12 mb-4 pt-5">
//               CEFR-Aligned French Language Courses
//             </h2>
//             <p className="text-lg md:text-xl text-[#181A25] mb-12 max-w-3xl">
//               Learn French with courses aligned to the Common European Framework
//               of Reference (CEFR) — a globally recognized standard for measuring
//               language proficiency. Build real-world skills in speaking,
//               listening, reading, and writing.
//             </p>
//           </motion.div>

//           {/* Loading skeleton */}
//           {loading && (
//             <div className="animate-pulse space-y-10">
//               {[...Array(2)].map((_, i) => (
//                 <div key={i} className="border border-gray-200 rounded-xl p-6">
//                   <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
//                   <div className="space-y-3">
//                     <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
//                     <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
//                     <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//                     {[...Array(3)].map((_, j) => (
//                       <div key={j} className="border border-gray-200 rounded-xl p-4">
//                         <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
//                         <div className="h-3 w-48 bg-gray-200 rounded mb-3"></div>
//                         <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
//                         <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Error */}
//           {error && !loading && (
//             <div className="text-center py-20">
//               <p className="text-red-500 text-lg mb-4">{error}</p>
//               <button
//                 onClick={fetchCohorts}
//                 className="bg-[#7148E5] text-white px-5 py-3 rounded-lg hover:bg-[#5e36c2] transition-all"
//               >
//                 Retry
//               </button>
//             </div>
//           )}

//           {/* Empty */}
//           {!loading && !error && cohorts.length === 0 && (
//             <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
//               <img
//                 src="/images/empty-state.svg"
//                 alt="No data"
//                 className="w-40 h-40 opacity-80 mb-6"
//               />
//               <p className="text-lg font-medium">
//                 No programs available at the moment.
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Please check back later or contact support for updates.
//               </p>
//             </div>
//           )}

//           {/* ✅ Loaded State */}
//           {!loading &&
//             !error &&
//             cohorts.length > 0 &&
//             cohorts.map((cohort) => (
//               <section key={cohort.id} className="pb-16 mt-10 border-b">
//                 <h4 className="text-2xl md:text-3xl font-semibold mb-3">
//                   Single-Level Program
//                 </h4>
//                 <h3 className="text-xl md:text-2xl font-medium mb-6">
//                   {cohort.name}
//                 </h3>

//                 {/* Cohort Details */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   viewport={{ once: true }}
//                   className="w-full md:w-[65%] bg-white border border-[#C7CAD1] rounded-xl shadow-sm px-6 py-8 mb-10"
//                 >
//                   <ul className="space-y-4 text-[#181A25] text-base md:text-lg font-normal">
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>
//                         <strong>Registration is open</strong> until{" "}
//                         {formatDate(cohort.registration_close_date)}
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>
//                         {cohort.program_duration_months || 3}-month program duration
//                       </span>
//                     </li>
//                     {cohort.courses && cohort.courses.length > 0 && (
//                       <li className="flex items-start gap-3">
//                         <img
//                           src="/images/icons/gray-check.svg"
//                           alt=""
//                           className="w-5 h-5 mt-1"
//                         />
//                         <span>
//                           Classes run from{" "}
//                           {formatDate(cohort.courses[0]?.start_date)} to{" "}
//                           {formatDate(
//                             cohort.courses[cohort.courses.length - 1]?.end_date
//                           )}
//                         </span>
//                       </li>
//                     )}
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>4–5 live classes weekly + community support</span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <img
//                         src="/images/icons/gray-check.svg"
//                         alt=""
//                         className="w-5 h-5 mt-1"
//                       />
//                       <span>Zoom/Meet, 100% online</span>
//                     </li>
//                   </ul>
//                 </motion.div>

//                 {/* ✅ Dynamic Grid - Handles any number of courses */}
//                 {cohort.courses && cohort.courses.length > 0 && (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {cohort.courses.map((course) => (
//                       <motion.div
//                         key={course.id}
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                         className="bg-white rounded-xl border border-[#C7CAD1] shadow-sm px-6 py-8 flex flex-col justify-between min-h-[400px]"
//                       >
//                         <div>
//                           <div className="flex items-center gap-2 mb-4 font-bold text-lg">
//                             <span className="bg-[#E6E6FA] text-[#181A25] rounded-lg px-3 py-1">
//                               ₦{course.price_ngn.toLocaleString()}
//                             </span>
//                             <span className="bg-[#E6E6FA] text-[#181A25] rounded-lg px-3 py-1">
//                               ${course.price_usd}
//                             </span>
//                           </div>

//                           <h3 className="text-xl font-semibold text-[#181A25] mb-2">
//                             {course.level}
//                           </h3>
//                           <p className="text-sm text-[#3A3D44] mb-4">
//                             {course.description}
//                           </p>

//                           <h4 className="text-base font-semibold text-[#3A3D44] mb-2">
//                             Learning outcomes
//                           </h4>
//                           <ul className="space-y-2 mb-6">
//                             {course.learning_outcomes && course.learning_outcomes.length > 0 ? (
//                               course.learning_outcomes.map((item, i) => (
//                                 <li key={i} className="flex items-start gap-2">
//                                   <img
//                                     src="/images/icons/gray-check.svg"
//                                     alt=""
//                                     className="w-5 h-5 mt-1 flex-shrink-0"
//                                   />
//                                   <span className="font-light text-sm text-[#181A1D]">
//                                     {item}
//                                   </span>
//                                 </li>
//                               ))
//                             ) : (
//                               <li className="text-sm text-gray-500">
//                                 No learning outcomes available
//                               </li>
//                             )}
//                           </ul>
//                         </div>

//                         {/* Dropdown Register button */}
//                         <div className="relative mt-auto">
//                           <button
//                             onClick={() =>
//                               setOpenDropdown(
//                                 openDropdown === course.id ? null : course.id
//                               )
//                             }
//                             className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm font-medium rounded-lg transition-all"
//                           >
//                             Register Now <ArrowDown className="w-4 h-4" />
//                           </button>

//                           {openDropdown === course.id && (
//                             <ul className="absolute z-10 mt-2 w-full bg-white border border-[#C7CAD1] rounded-lg shadow-md">
//                               <li
//                                 className="px-4 py-2 hover:bg-[#F3F0FF] cursor-pointer rounded-t-lg"
//                                 onClick={() => handleOpenModal(cohort.id, course)}
//                               >
//                                 Pay in ₦ Naira
//                               </li>
//                               <li className="px-4 py-2 hover:bg-[#F3F0FF] opacity-50 cursor-not-allowed rounded-b-lg">
//                                 Pay in $ Dollar (Coming soon)
//                               </li>
//                             </ul>
//                           )}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </section>
//             ))}
//         </div>
//       </section>

//       {/* 🧾 Registration Modal */}
//       {selectedCourse && selectedCohortId && (
//         <RegistrationModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           courseTitle={selectedCourse?.title}
//           amount={`₦${selectedCourse.price_ngn.toLocaleString()}`}
//           selectedCourseId={selectedCourse?.id}
//           selectedCohortId={selectedCohortId}
//         />
//       )}
//     </>
//   );
// };

// export default Program;




/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import RegistrationModal from "../Modal/RegistrationModal";
import { Course, getPublicCohortsDetailed } from "@/lib/api";

// Types
interface Cohort {
  id: string;
  name: string;
  year: number;
  is_active?: boolean;
  registration_open_date?: string;
  registration_close_date: string;
  registration_status: string;
  days_until_close: number;
  program_duration_months?: number;
  max_students?: number;
  courses: Course[];
}

const Program = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // ✅ Format date as "October 25, 2025"
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-"; // Invalid date

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ✅ Fetch cohorts with proper data handling
  const fetchCohorts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getPublicCohortsDetailed();
      
      // Debug log
      console.log("API Response:", data);
      
      // Handle different response structures
      let cohortsData: Cohort[] = [];
      
      if (Array.isArray(data)) {
        // If data is directly an array
        cohortsData = data;
      } else if (data?.cohorts && Array.isArray(data.cohorts)) {
        // If data has cohorts property as array
        cohortsData = data.cohorts;
      } else if (data?.id && data?.courses) {
        // If data is a single cohort object (YOUR CASE)
        cohortsData = [data];
      } else {
        console.warn("Unexpected data structure:", data);
        cohortsData = [];
      }
      
      console.log("Processed cohorts:", cohortsData);
      setCohorts(cohortsData);
      
    } catch (err) {
      console.error("Error fetching cohorts:", err);
      setError("Failed to load programs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCohorts();
  }, [fetchCohorts]);

  // ✅ Modal handler
  const handleOpenModal = (cohortId: string, course: Course) => {
    setSelectedCourse(course);
    setSelectedCohortId(cohortId);
    setShowModal(true);
    setOpenDropdown(null);
  };

  return (
    <>
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#181A25] mt-12 mb-4 pt-5">
              CEFR-Aligned French Language Courses
            </h2>
            <p className="text-lg md:text-xl text-[#181A25] mb-12 max-w-3xl">
              Learn French with courses aligned to the Common European Framework
              of Reference (CEFR) — a globally recognized standard for measuring
              language proficiency. Build real-world skills in speaking,
              listening, reading, and writing.
            </p>
          </motion.div>

          {/* Loading skeleton */}
          {loading && (
            <div className="animate-pulse space-y-10">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-6">
                  <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="border border-gray-200 rounded-xl p-4">
                        <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-48 bg-gray-200 rounded mb-3"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchCohorts}
                className="bg-[#7148E5] text-white px-5 py-3 rounded-lg hover:bg-[#5e36c2] transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && cohorts.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
              <img
                src="/images/empty-state.svg"
                alt="No data"
                className="w-40 h-40 opacity-80 mb-6"
              />
              <p className="text-lg font-medium">
                No programs available at the moment.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please check back later or contact support for updates.
              </p>
            </div>
          )}

          {/* ✅ Loaded State */}
          {!loading &&
            !error &&
            cohorts.length > 0 &&
            cohorts.map((cohort) => (
              <section key={cohort.id} className="pb-16 mt-10 border-b">
                <h4 className="text-2xl md:text-3xl font-semibold mb-3">
                  Single-Level Program
                </h4>
                <h3 className="text-xl md:text-2xl font-medium mb-6">
                  {cohort.name}
                </h3>

                {/* Cohort Details */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full md:w-[65%] bg-white border border-[#C7CAD1] rounded-xl shadow-sm px-6 py-8 mb-10"
                >
                  <ul className="space-y-4 text-[#181A25] text-base md:text-lg font-normal">
                    <li className="flex items-start gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-5 h-5 mt-1"
                      />
                      <span>
                        <strong>Registration is open</strong> until{" "}
                        {formatDate(cohort.registration_close_date)}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-5 h-5 mt-1"
                      />
                      <span>
                        {cohort.program_duration_months || 3}-month program duration
                      </span>
                    </li>
                    {cohort.courses && cohort.courses.length > 0 && (
                      <li className="flex items-start gap-3">
                        <img
                          src="/images/icons/gray-check.svg"
                          alt=""
                          className="w-5 h-5 mt-1"
                        />
                        <span>
                          Classes run from{" "}
                          {formatDate(cohort.courses[0]?.start_date)} to{" "}
                          {formatDate(
                            cohort.courses[cohort.courses.length - 1]?.end_date
                          )}
                        </span>
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-5 h-5 mt-1"
                      />
                      <span>4–5 live classes weekly + community support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <img
                        src="/images/icons/gray-check.svg"
                        alt=""
                        className="w-5 h-5 mt-1"
                      />
                      <span>Zoom/Meet, 100% online</span>
                    </li>
                  </ul>
                </motion.div>

                {/* ✅ Dynamic Grid - 4 cards per row */}
                {cohort.courses && cohort.courses.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cohort.courses.map((course) => (
                      <motion.div
                        key={course.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white rounded-xl border border-[#C7CAD1] shadow-sm p-6 flex flex-col"
                      >
                        {/* Price tags at top */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="bg-[#E6E6FA] text-[#181A25] rounded-lg px-3 py-1 text-sm font-semibold">
                            ₦{course.price_ngn.toLocaleString()}
                          </span>
                          <span className="bg-[#E6E6FA] text-[#181A25] rounded-lg px-3 py-1 text-sm font-semibold">
                            ${course.price_usd}
                          </span>
                        </div>

                        {/* Level in brackets {} BEFORE title */}
                        <div className="mb-3">
                          <h3 className="text-lg text-[#181A25]">
                            <span className="font-bold">{`{${course.level}}`}</span>{" "}
                            {/* <span className="font-normal">{course.title}</span> */}
                            <span className="font-bold">{`{${course.}}`}</span>{" "}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[#3A3D44] mb-4 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Learning outcomes - compact spacing */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-[#3A3D44] mb-2">
                            Learning outcomes
                          </h4>
                          <ul className="space-y-1.5">
                            {course.learning_outcomes && course.learning_outcomes.length > 0 ? (
                              course.learning_outcomes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <img
                                    src="/images/icons/gray-check.svg"
                                    alt=""
                                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                                  />
                                  <span className="font-light text-sm text-[#181A1D] leading-snug">
                                    {item}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-gray-500">
                                No learning outcomes available
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Dropdown Register button - pushed to bottom */}
                        <div className="relative mt-auto pt-4">
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === course.id ? null : course.id
                              )
                            }
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#7148E5] hover:bg-[#7DE5F2] hover:text-[#181A25] text-white text-sm font-medium rounded-lg transition-all"
                          >
                            Register Now <ArrowDown className="w-4 h-4" />
                          </button>

                          {openDropdown === course.id && (
                            <ul className="absolute z-10 mt-2 w-full bg-white border border-[#C7CAD1] rounded-lg shadow-md overflow-hidden">
                              <li
                                className="px-4 py-3 hover:bg-[#F3F0FF] cursor-pointer text-sm"
                                onClick={() => handleOpenModal(cohort.id, course)}
                              >
                                Pay in ₦ Naira
                              </li>
                              <li className="px-4 py-3 hover:bg-[#F3F0FF] opacity-50 cursor-not-allowed text-sm border-t border-gray-100">
                                Pay in $ Dollar (Coming soon)
                              </li>
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            ))}
        </div>
      </section>

      {/* 🧾 Registration Modal */}
      {selectedCourse && selectedCohortId && (
        <RegistrationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          courseTitle={selectedCourse?.title}
          amount={`₦${selectedCourse.price_ngn.toLocaleString()}`}
          selectedCourseId={selectedCourse?.id}
          selectedCohortId={selectedCohortId}
        />
      )}
    </>
  );
};

export default Program;