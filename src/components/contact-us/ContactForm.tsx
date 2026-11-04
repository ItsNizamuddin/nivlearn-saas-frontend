'use client';

import LeadForm from '@/components/forms/LeadForm';
import type { CourseOptionItem } from '@/components/forms/types';

export interface CourseOption {
  name: string;
  slug: string;
}

interface ContactFormProps {
  courses?: readonly CourseOption[] | CourseOptionItem[];
}

export default function ContactForm({ courses = [] }: ContactFormProps) {
  const formattedCourses: CourseOptionItem[] = courses.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  return (
    <div className="w-full">
      <LeadForm
        layout="standard"
        formTitle=""
        formDescription=""
        courses={formattedCourses}
        config={{
          showCourse: true,
          showMessage: true,
          purpose: true,
        }}
        defaultValues={{
          leadSource: 'contact-us-page',
          purpose: 'Upskilling',
        }}
        submitButtonText="Send Message"
      />
    </div>
  );
}
