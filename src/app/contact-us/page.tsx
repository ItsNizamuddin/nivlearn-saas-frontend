import type { Metadata } from 'next';
import ContactUs from '@/components/contact-us';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Questions about NivLearn courses or corporate training? Chat, email or send us a message.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/contact-us' },
};

export default function ContactUsPage() {
  return <ContactUs />;
}
