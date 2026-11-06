import CoursesSection from '@/components/home/CoursesSection';
import { getCategories } from '@/lib/categories';
import { COURSES } from './data';

/**
 * Same category tabs + course cards as the home page (the section renders
 * id="courses", which the banner's "Explore Courses" button scrolls to).
 */
export default async function Courses() {
  const categories = await getCategories();
  if (categories.length === 0) return null;
  return <CoursesSection categories={categories} title={COURSES.title} subtitle={COURSES.subtitle} />;
}
