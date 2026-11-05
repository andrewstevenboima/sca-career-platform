/**
 * Courses published from the SCAI-LMS GitHub repository.
 *
 * The repo's GitHub Action writes catalog.json (one entry per folder under
 * courses/) and publishes the repo to GitHub Pages. This module reads that
 * catalog and turns each entry into a Course the LMS pages already know how
 * to show and play. Their ids start with "gh-" so they never collide with
 * courses added by hand in Firestore.
 */
import type { Course } from '@/types/lms';

export const COURSE_LIBRARY_URL = (
  import.meta.env.VITE_COURSE_LIBRARY_URL || 'https://andrewstevenboima.github.io/SCAI-LMS/'
).replace(/\/?$/, '/');

const ID_PREFIX = 'gh-';
const CACHE_MS = 5 * 60 * 1000;

interface CatalogEntry {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  lessons?: string[];
  lessonsCount?: number;
  launch: string;
  cover?: string | null;
  category?: string;
  level?: string;
  price?: number;
  currency?: string;
  duration?: string;
  instructor?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  updatedAt?: string;
}

let cache: { at: number; courses: Course[] } | null = null;

export const isLibraryCourseId = (id: string) => id.startsWith(ID_PREFIX);

function toCourse(e: CatalogEntry): Course {
  const lessons = Array.isArray(e.lessons) ? e.lessons : [];
  return {
    id: `${ID_PREFIX}${e.slug}`,
    title: e.title,
    subtitle: e.subtitle || '',
    description: e.description || '',
    thumbnailUrl: e.cover ? new URL(e.cover, COURSE_LIBRARY_URL).toString() : '/logo.png',
    category: e.category || 'Digital Skills',
    level: e.level || 'Beginner',
    price: Number(e.price ?? 0),
    currency: e.currency === 'USD' ? 'USD' : 'RWF',
    duration: e.duration || (lessons.length ? `${lessons.length} lessons` : ''),
    lessonsCount: e.lessonsCount ?? lessons.length,
    lessons,
    instructor: e.instructor || 'Student Companion Academy',
    tags: Array.isArray(e.tags) ? e.tags : [],
    isPublished: e.published !== false,
    isFeatured: Boolean(e.featured),
    scormUrl: new URL(e.launch, COURSE_LIBRARY_URL).toString(),
    source: 'github',
    updatedAt: e.updatedAt,
  };
}

/** Published courses from the library; empty if it cannot be reached. */
export async function getLibraryCourses(): Promise<Course[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.courses;
  try {
    const res = await fetch(`${COURSE_LIBRARY_URL}catalog.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { courses?: CatalogEntry[] };
    const courses = (data.courses || [])
      .filter((e) => e && e.slug && e.title && e.launch)
      .map(toCourse)
      .filter((c) => c.isPublished);
    cache = { at: Date.now(), courses };
    return courses;
  } catch (err) {
    console.warn('[lms] course library unavailable:', err);
    return cache?.courses ?? [];
  }
}

export async function getLibraryCourse(id: string): Promise<Course | null> {
  const courses = await getLibraryCourses();
  return courses.find((c) => c.id === id) ?? null;
}
