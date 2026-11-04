import { Suspense } from 'react';
import Container from '@/components/layout/Container';
import BrandBackdrop from '@/components/ui/BrandBackdrop';
import Glow from '@/components/ui/Glow';
import SectionHeading from '@/components/ui/SectionHeading';
import { getCategories } from '@/services/catalog.service';
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
    <section className="relative overflow-hidden bg-linear-to-b from-light to-surface py-8 md:py-10">
      <Glow />
      <BrandBackdrop className="hidden md:block" />
      <Container className="relative">
        <SectionHeading
          as="h1"
          align="center"
          eyebrow={CONTACT_INTRO.eyebrow}
          title={CONTACT_INTRO.title}
          description={CONTACT_INTRO.description}
        />

        <div className="mt-5 grid gap-4 md:mt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6">
          <DirectContact />

          <div className="rounded-lg border border-prime/15 bg-surface md:p-2 shadow-card">
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
