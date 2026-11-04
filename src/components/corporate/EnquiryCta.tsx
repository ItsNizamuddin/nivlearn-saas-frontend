import Image from 'next/image';
import EnquiryForm from '@/components/ui/form/EnquiryForm';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { CTA, ENQUIRY_ID } from './data';

export default function EnquiryCta() {
  return (
    <Section id={ENQUIRY_ID}>
      <div className="grid items-center gap-10 rounded-2xl border border-prime/10 bg-surface p-6 shadow-card sm:p-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
        <Image src={CTA.image} alt="" sizes="(min-width: 1024px) 35vw, 0px" className="hidden h-auto w-full rounded-xl lg:block" />
        <div>
          <SectionHeading eyebrow={CTA.eyebrow} title={CTA.title} />
          <div className="mt-8">
            <EnquiryForm formId="corporate" submitLabel="Make an Appointment" />
          </div>
        </div>
      </div>
    </Section>
  );
}
