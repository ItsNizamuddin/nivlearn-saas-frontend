import { Suspense } from 'react';
import Container from '@/components/layout/Container';
import Glow from '@/components/ui/Glow';
import SectionHeading from '@/components/ui/SectionHeading';
import { getCategories } from '@/lib/categories';
import ContactForm from './ContactForm';
import ContactNumbers from './ContactNumbers';
import DirectContact from './DirectContact';
import { CONTACT_INTRO } from './data';

/** Loads the course list (same cached call the navbar uses) for the form's dropdown. */
async function ContactFormWithCourses() {
  const categories = await getCategories();
  const courses = categories.flatMap((c) => c.courses.map(({ name, slug }) => ({ name, slug })));
  return <ContactForm courses={courses} />;
}

export default function ContactUs() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-light to-surface py-16 md:py-24">
      <Glow />
      <Container className="relative">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow={CONTACT_INTRO.eyebrow}
          title={CONTACT_INTRO.title}
          description={CONTACT_INTRO.description}
        />

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
          <DirectContact />

          <div className="rounded-2xl border border-prime/15 bg-surface p-6 shadow-card sm:p-8 xl:p-10">
            {/* Form is usable immediately; the course list streams in. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithCourses />
            </Suspense>
          </div>
        </div>

        <div className="mt-12">
          <ContactNumbers />
        </div>
      </Container>
    </section>
  );
}
