// Local-first profile + generated lessons (no auth required).
// Profile persists in localStorage. Generated lessons live in sessionStorage
// so they reset on page refresh per product spec.

export interface LocalProfile {
  name: string;
  xp: number;
  streak: number;
  completed: string[];
  bookmarks: string[];
  createdAt: number;
}

export interface LocalLesson {
  id: string;
  title: string;
  subject: string;
  exam_type: string;
  content: string;
  key_points: string[];
  formula: string | null;
  examples: string[];
  mcq_question: string | null;
  mcq_options: string[];
  mcq_answer: number;
  difficulty: string;
  created_at: string;
}

const PROFILE_KEY = "nl_profile";
const LESSONS_KEY = "nl_lessons"; // sessionStorage

export function getProfile(): LocalProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as LocalProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: LocalProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("nl-profile-change"));
}

export function createProfile(name: string): LocalProfile {
  const p: LocalProfile = {
    name,
    xp: 0,
    streak: 0,
    completed: [],
    bookmarks: [],
    createdAt: Date.now(),
  };
  saveProfile(p);
  return p;
}

export function addXP(amount: number) {
  const p = getProfile();
  if (!p) return;
  p.xp += amount;
  saveProfile(p);
}

export function getLessons(): LocalLesson[] {
  try {
    const raw = sessionStorage.getItem(LESSONS_KEY);
    return raw ? (JSON.parse(raw) as LocalLesson[]) : [];
  } catch {
    return [];
  }
}

export function addLesson(lesson: LocalLesson) {
  const all = getLessons();
  all.unshift(lesson);
  sessionStorage.setItem(LESSONS_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("nl-lessons-change"));
}

export function lessonsByExam(examType: string): LocalLesson[] {
  return getLessons().filter((l) => l.exam_type === examType);
}
