import type {
  CourseCardData,
  CourseStaticInfo,
  CourseDetail,
  CourseFaq,
} from "@/types";

/** Marketing copy for a course, keyed by Course.courseKey */
export const COURSE_STATIC: Record<string, CourseStaticInfo> = {
  BEGINNER_A1: {
    subtitle: "No prior knowledge required",
    description:
      "You'll be able to understand and respond to simple everyday conversations, read basic texts and write short sentences about your daily life.",
  },
  ELEMENTARY_A2: {
    subtitle: "A1 level or equivalent required",
    description:
      "You'll confidently join everyday interactions, describe your routines, understand short texts and write simple messages about familiar topics.",
  },
  INTERMEDIATE_B1: {
    subtitle: "A2 level or equivalent required",
    description:
      "You'll participate in conversations on familiar topics, understand and summarize everyday texts, and write clear texts about your experiences.",
  },
  UPPER_INTERMEDIATE_B2: {
    subtitle: "B1 level or equivalent required",
    description:
      "You'll understand complex discussions, express ideas fluently, read detailed texts, and write structured content.",
  },
  BEGINNER_TO_INTERMEDIATE: {
    subtitle: "No prior knowledge required",
    description:
      "You'll communicate confidently in French from beginner to intermediate, developing strong reading, writing, speaking, and listening skills.",
  },
  CONVERSATION_PRACTICE: {
    subtitle: "Builds on your existing French knowledge",
    description:
      "You'll enhance your French speaking skills through guided conversation practice and live interactive sessions.",
  },
};

/**
 * Course keys rendered as individual A1/A2/B1/B2 cards.
 * Typed as readonly string[] so `.includes(course.courseKey)` (a `string`)
 * keeps compiling without a cast at the call site.
 */
export const SINGLE_LEVEL_KEYS: readonly string[] = [
  "BEGINNER_A1",
  "ELEMENTARY_A2",
  "INTERMEDIATE_B1",
  "UPPER_INTERMEDIATE_B2",
];

export const BEGINNER_TO_INTERMEDIATE_KEY = "BEGINNER_TO_INTERMEDIATE";
export const CONVERSATION_PRACTICE_KEY = "CONVERSATION_PRACTICE";
export const BEGINNER_KIDS_KEY = "BEGINNER_KIDS";

/** Every courseKey the /courses catalog returns */
export const COURSE_KEYS: readonly string[] = [
  ...SINGLE_LEVEL_KEYS,
  BEGINNER_TO_INTERMEDIATE_KEY,
  CONVERSATION_PRACTICE_KEY,
  BEGINNER_KIDS_KEY,
];

/**
 * Homepage courses grid. Render order is significant — do not reorder.
 * `courseKey` matches Course.courseKey so cards can deep-link to /academy.
 */
export const frenchCourses: CourseCardData[] = [
  {
    courseKey: "BEGINNER_TO_INTERMEDIATE",
    title: "A1-B2",
    description:
      "Build your French from A1 to B2 and prepare for DELF, TEF or TCF exams.",
    type: "adults",
  },
  {
    courseKey: "BEGINNER_A1",
    title: "Beginner A1",
    description: "Build your foundation and prepare for DELF A1 exam.",
    type: "adults",
  },
  {
    courseKey: "ELEMENTARY_A2",
    title: "Elementary A2",
    description: "Improve your French and prepare for DELF A2 exam.",
    type: "adults",
  },
  {
    courseKey: "INTERMEDIATE_B1",
    title: "Intermediate B1",
    description: "Strengthen your French and prepare for DELF B1 exam.",
    type: "adults",
  },
  {
    courseKey: "UPPER_INTERMEDIATE_B2",
    title: "Upper intermediate B2",
    description:
      "Develop greater fluency and prepare for DELF, TEF or TCF exams.",
    type: "adults",
  },
  {
    courseKey: "BEGINNER_KIDS",
    title: "French for kids",
    description: "Learn French through engaging, age-appropriate lessons.",
    type: "kids",
  },
  {
    courseKey: "CONVERSATION_PRACTICE",
    title: "Conversational Practice",
    description:
      "Build confidence and get more comfortable speaking French.",
    type: "adults",
  },
];

/* -------------------------------------------------------------------------- */
/*  Course detail pages                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Detail-page content, keyed by Course.courseKey (same keys as COURSE_KEYS).
 * Prices are intentionally NOT here: read priceNGN / priceUSD from the
 * GET /courses response so the page and the payment amount can't drift apart.
 *
 * `facts` is an ordered list of sidebar rows so kids can show "Age"
 * where adults show "Level".
 */

const SUPPORT = "fluensyfrench learners club";

// ---- Individual FAQs (write each answer once) ----
const FAQ_DELIVERY: CourseFaq = {
  question: "How are classes delivered?",
  answer: "Classes are held live online via Google Meet.",
};
const FAQ_CERTIFICATE: CourseFaq = {
  question: "Is there a certificate after the course?",
  answer: "No, the course does not include a certificate.",
};
const FAQ_OUTSIDE_NIGERIA: CourseFaq = {
  question: "Can I join if I'm not in Nigeria?",
  answer: "Yes. The course is delivered online, so you can join from anywhere.",
};

// Kids only
const FAQ_KIDS_PRIOR_FRENCH: CourseFaq = {
  question: "Does my child need to know French already?",
  answer: "No. Children can join with little or no previous knowledge of French.",
};
const FAQ_KIDS_CONTINUE: CourseFaq = {
  question: "Can my child continue learning French after the programme?",
  answer: "Yes. They can continue with the next level or another suitable French programme.",
};

// Conversational Practice only
const FAQ_CONVO_FLUENT: CourseFaq = {
  question: "Do I need to be fluent in French?",
  answer: "No. You should have a basic understanding of French so you can participate in simple conversations.",
};
const FAQ_CONVO_TOPICS: CourseFaq = {
  question: "What will we talk about during the sessions?",
  answer: "You'll practise conversations around everyday topics and situations.",
};
const FAQ_CONVO_CORRECTIONS: CourseFaq = {
  question: "Will I be corrected when I make mistakes?",
  answer: "Yes. You'll receive guidance and corrections to help you improve your French.",
};

// ---- Per-course sets ----
const ADULT_FAQS: CourseFaq[] = [
  FAQ_DELIVERY,
  FAQ_CERTIFICATE,
  FAQ_OUTSIDE_NIGERIA,
];

const KIDS_FAQS: CourseFaq[] = [
  FAQ_DELIVERY,
  FAQ_CERTIFICATE,
  FAQ_OUTSIDE_NIGERIA,
  FAQ_KIDS_PRIOR_FRENCH,
  FAQ_KIDS_CONTINUE,
];

const CONVERSATION_FAQS: CourseFaq[] = [
  FAQ_DELIVERY,
  FAQ_OUTSIDE_NIGERIA,
  FAQ_CONVO_FLUENT,
  FAQ_CONVO_TOPICS,
  FAQ_CONVO_CORRECTIONS,
];

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  BEGINNER_A1: {
    courseKey: "BEGINNER_A1",
    title: "French A1 Beginner",
    intro:
      "The French A1 course is a 3-month beginner programme designed to help you build a strong foundation in French. You’ll learn essential vocabulary and grammar, develop your listening, reading, writing and speaking skills, and prepare for your DELF A1 exam.",
    outcomesIntro: "By the end of A1, you’ll be able to:",
    outcomes: [
      "Introduce yourself and give basic information about yourself",
      "Talk about your family, work, interests and daily routine",
      "Ask and answer simple questions",
      "Understand common everyday expressions",
      "Talk about familiar people, places and activities",
      "Build your foundation in speaking, listening, reading and writing",
      "Prepare for DELF A1 exam",
    ],
    audience: [
      "Complete beginners and learners with little or no prior knowledge of French.",
      "Learners preparing to take the DELF A1 exam.",
    ],
    facts: [
      { label: "Level", value: "A1" },
      { label: "Duration", value: "3 months" },
      { label: "Format", value: "Live online classes" },
      { label: "Session", value: "3 days a week" },
      { label: "Class size", value: "Small classes" },
      { label: "Support", value: SUPPORT },
    ],
    faqs: ADULT_FAQS,
  },

  ELEMENTARY_A2: {
    courseKey: "ELEMENTARY_A2",
    title: "French A2 Elementary",
    intro:
      "The French A2 course is a 3-month programme designed to help you build on your French foundation and become more confident using the language. You’ll expand your vocabulary and grammar, strengthen your listening, reading, writing and speaking skills, and prepare for your DELF A2 exam.",
    outcomesIntro: "By the end of A2, you’ll be able to:",
    outcomes: [
      "Talk about your experiences and plans",
      "Describe people, places and situations",
      "Explain your thoughts using basic reasons",
      "Talk about past and future events",
      "Develop your speaking, listening, reading and writing skills",
      "Prepare for DELF A2 exam",
    ],
    audience: [
      "Learners who have a basic foundation in French and want to improve their skills.",
      "Learners preparing to take the DELF A2 exam.",
    ],
    facts: [
      { label: "Level", value: "A2" },
      { label: "Duration", value: "3 months" },
      { label: "Format", value: "Live online classes" },
      { label: "Session", value: "3 days a week" },
      { label: "Class size", value: "Small classes" },
      { label: "Support", value: SUPPORT },
    ],
    faqs: ADULT_FAQS,
  },

  INTERMEDIATE_B1: {
    courseKey: "INTERMEDIATE_B1",
    title: "French B1\nIntermediate",
    intro:
      "The French B1 course is a 3-month programme designed to help you build confidence and become more independent in using French. You’ll strengthen your vocabulary and grammar, develop your listening, reading, writing and speaking skills, and prepare for your DELF B1 exam.",
    outcomesIntro: "By the end of B1, you’ll be able to:",
    outcomes: [
      "Talk about your experiences in greater detail",
      "Explain your opinions and give reasons",
      "Follow the main points of everyday conversations",
      "Tell stories and describe experiences",
      "Build confidence in speaking and improve your listening, reading and writing",
      "Prepare for DELF B1 exam",
    ],
    audience: [
      "Learners with a basic to intermediate foundation in French who want to communicate with more confidence.",
      "Learners preparing to take the DELF B1 exam.",
    ],
    facts: [
      { label: "Level", value: "B1" },
      { label: "Duration", value: "3 months" },
      { label: "Format", value: "Live online classes" },
      { label: "Session", value: "3 days a week" },
      { label: "Class size", value: "Small classes" },
      { label: "Support", value: SUPPORT },
    ],
    faqs: ADULT_FAQS,
  },

  UPPER_INTERMEDIATE_B2: {
    courseKey: "UPPER_INTERMEDIATE_B2",
    title: "French B2 Upper-\nIntermediate",
    intro:
      "The French B2 course is a 3-month programme designed to help you become a more confident and independent French speaker. You’ll develop greater fluency and accuracy, strengthen your listening, reading, writing and speaking skills, and prepare for your DELF B2 exam.",
    outcomesIntro: "By the end of B2, you’ll be able to:",
    outcomes: [
      "Discuss a wider range of topics",
      "Express and defend your opinions",
      "Follow longer conversations and discussions",
      "Understand the main ideas in more complex texts",
      "Improve grammatical accuracy",
      "Communicate more spontaneously",
      "Develop greater confidence in French",
      "Prepare for TEF, TCF or DELF B2 exam",
    ],
    audience: [
      "Learners with an intermediate level of French who want to develop greater fluency and accuracy.",
      "Learners preparing to take TEF, TCF or DELF B2 exam.",
    ],
    facts: [
      { label: "Level", value: "B2" },
      { label: "Duration", value: "3 months" },
      { label: "Format", value: "Live online classes" },
      { label: "Session", value: "3 days a week" },
      { label: "Class size", value: "Small classes" },
      { label: "Support", value: SUPPORT },
    ],
    faqs: ADULT_FAQS,
  },

  BEGINNER_TO_INTERMEDIATE: {
    courseKey: "BEGINNER_TO_INTERMEDIATE",
    title: "French A1-B2",
    intro:
      "The French A1–B2 course is a structured 9 month programme designed to take you from the basics to confident, independent use of French. You’ll develop your listening, reading, writing and speaking skills, build your vocabulary and grammar, and prepare for DELF, TEF or TCF exams.",
    outcomesIntro: "By the end of A1-B2, you’ll be able to:",
    // NOTE: copied from the design, where these match the B2 list exactly.
    // You may want A1-B2-specific outcomes here.
    outcomes: [
      "Discuss a wider range of topics",
      "Express and defend your opinions",
      "Follow longer conversations and discussions",
      "Understand the main ideas in more complex texts",
      "Improve grammatical accuracy",
      "Communicate more spontaneously",
      "Develop greater confidence in French",
      "Prepare for TEF, TCF or DELF B2 exam",
    ],
    audience: [
      "Learners starting French from scratch or building on an existing foundation.",
      "Learners who want to develop their French across A1 to B2.",
      "Learners preparing for TEF, TCF or DELF B2 exam",
    ],
    facts: [
      { label: "Level", value: "A1-B2" },
      { label: "Duration", value: "9 months" },
      { label: "Format", value: "Live online classes" },
      { label: "Session", value: "3 days a week" },
      { label: "Class size", value: "Small classes" },
      { label: "Support", value: SUPPORT },
    ],
    faqs: ADULT_FAQS,
  },

  BEGINNER_KIDS: {
    courseKey: "BEGINNER_KIDS",
    title: "French for Kids",
    intro:
      "The French course for kids is a 2-month programme designed to help children learn French in a fun and engaging way. Through age-appropriate lessons and activities, they’ll build their vocabulary, develop their listening, speaking, reading and writing skills, and become more comfortable using French.",
    outcomesIntro: "By the end of the programme, your child will be able to:",
    outcomes: [
      "Build basic French vocabulary and expressions",
      "Develop speaking, listening, reading and writing skills",
      "Understand and use simple French sentences",
      "Become more confident using French",
    ],
    audience: [
      "Children who are new to French.",
      "Children who already have some knowledge of French and want to improve.",
    ],
    facts: [
      { label: "Age", value: "5-12" },
      { label: "Duration", value: "2 months" },
      { label: "Format", value: "Live online classes" },
      { label: "Session", value: "Saturdays and Sundays" },
      { label: "Class size", value: "Small classes" },
      { label: "Support", value: SUPPORT },
    ],
    faqs: KIDS_FAQS,
  },

  CONVERSATION_PRACTICE: {
    courseKey: "CONVERSATION_PRACTICE",
    title: "French Conversational\nPractice",
    intro:
      "The French Conversational Practice is a 1-month programme designed to help you become more comfortable speaking French through guided, practical conversations. You’ll practise expressing yourself, responding naturally and using the French you already know in everyday conversations.",
    outcomesIntro: "By the end of the programme, you’ll be able to:",
    outcomes: [
      "Express your thoughts and ideas with greater confidence",
      "Respond more naturally in conversations",
      "Use familiar vocabulary and expressions in context",
      "Keep a conversation going in everyday situations",
      "Become more comfortable speaking without overthinking every sentence",
    ],
    audience: [
      "A1–A2 learners who want more speaking practice.",
      "Learners who understand French but struggle to speak confidently.",
      "Learners who want to practise French through guided conversations.",
    ],
    facts: [
      { label: "Level", value: "A1, A2" },
      { label: "Duration", value: "1 month" },
      { label: "Format", value: "Live online classes" },
      { label: "Session", value: "4 days a week" },
      { label: "Class size", value: "Small classes" },
      { label: "Support", value: SUPPORT },
    ],
    faqs: CONVERSATION_FAQS,
  },
};

/**
 * Detail titles use "\n" for line breaks on the detail page heading. Use this
 * wherever the title must sit on one line (navbar, registration modal).
 */
export function toSingleLine(title: string): string {
  return title.replace(/-\n/g, "-").replace(/\s*\n\s*/g, " ");
}

/** Returns undefined for unknown keys so the page can 404 cleanly. */
export function getCourseDetail(courseKey: string): CourseDetail | undefined {
  return COURSE_DETAILS[courseKey];
}