/**
 * Shared domain types.
 *
 * NOTE: there are other `Course` shapes in src/lib/api.tsx and
 * src/lib/adminapi.tsx. Those are API response DTOs for the cohort and admin
 * endpoints and are intentionally left separate — do not merge them with the
 * catalog `Course` below.
 */

/** Audience a course belongs to, as returned by GET /courses?type= (lowercase) */
export type CourseType = "adults" | "kids";

/** Audience selector used by /academy?type= */
export type AcademyAudience = "adults" | "kids";

/** A course in the public catalog (GET /courses?type=) */
export interface Course {
  courseKey: string;
  name: string;
  type: CourseType;
  levels: string[];
  priceNGN: number;
  priceUSD: number;
}

/** Static marketing copy attached to a courseKey */
export interface CourseStaticInfo {
  subtitle: string;
  description: string;
}

/** A course card rendered on the homepage courses grid */
export interface CourseCardData {
  /** Canonical id, matches Course.courseKey. Use this to deep-link + enrol. */
  courseKey: string;
  title: string;
  description: string;
  type: CourseType;
}

/** One row in the sidebar card (Level, Duration, Age, ...) */
export interface CourseDetailFact {
  label: string;
  value: string;
}

export interface CourseFaq {
  question: string;
  answer: string;
}

/** Static content for the course detail page, keyed by courseKey */
export interface CourseDetail {
  courseKey: string;
  title: string;
  intro: string;
  outcomesIntro: string;
  outcomes: string[];
  audience: string[];
  facts: CourseDetailFact[];
  faqs: CourseFaq[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface blog {
  id: string;
  date: string;
  title: string;
  /** Short summary used for search results */
  description: string;
  /** Article image in /public, used for link previews */
  image?: string;
  previewBg: string;
  /** Article body as Markdown: blank line between paragraphs, `## ` for headings */
  content?: string;
}
