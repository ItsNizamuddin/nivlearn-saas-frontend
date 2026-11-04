import type { StaticImageData } from 'next/image';

import chatIcon from '../../../public/contactus/getintouch/chat.webp';
import supportIcon from '../../../public/contactus/getintouch/support.webp';
import corporateIcon from '../../../public/contactus/getintouch/corporate.webp';
import addressIcon from '../../../public/contactus/getintouch/addressIcon.webp';
import whatsappLogo from '../../../public/contactus/getintouch/whatsapplogo.webp';
import flagIndia from '../../../public/contactus/country/india.webp';
import flagUk from '../../../public/contactus/country/Uk.webp';
import flagUsa from '../../../public/contactus/country/Unitedstatesofamerica.webp';

/*
 * ⚠ DUMMY CONTACT DETAILS — replace every value marked DUMMY with the real
 *   NivLearn details before going live.
 */

export const CONTACT_INTRO = {
  eyebrow: 'Get in touch',
  title: 'Contact Us',
  description: 'Any question or remarks? Just write us a message!',
} as const;

export interface ContactChannel {
  icon: StaticImageData;
  title: string;
  detail: string;
  href?: string;
  external?: boolean;
}

export const DIRECT_CONTACT = {
  title: 'Direct Contact',
  chat: {
    icon: chatIcon,
    title: 'Chat',
    detail: 'Avg response time: less than a min',
    href: 'https://wa.me/910000000000', // DUMMY
    external: true,
  } satisfies ContactChannel,
  whatsappLogo,
  emails: [
    { icon: supportIcon, title: 'Support', detail: 'support@example.com', href: 'mailto:support@example.com' }, // DUMMY
    { icon: corporateIcon, title: 'Corporate', detail: 'corporate@example.com', href: 'mailto:corporate@example.com' }, // DUMMY
  ] satisfies ContactChannel[],
  address: {
    icon: addressIcon,
    title: 'Address',
    detail: '123 Example Street, Sector 0, Example City, State 000000', // DUMMY
  } satisfies ContactChannel,
} as const;

export interface SocialLink {
  name: string;
  href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: 'Facebook', href: 'https://www.facebook.com/' }, // DUMMY
  { name: 'Instagram', href: 'https://www.instagram.com/' }, // DUMMY
  { name: 'YouTube', href: 'https://www.youtube.com/' }, // DUMMY
  { name: 'LinkedIn', href: 'https://www.linkedin.com/' }, // DUMMY
];

/* ------------------------------ Country numbers ----------------------------- */

/** Flag shown next to a number, matched by its dial-code prefix. */
export const COUNTRY_FLAGS: readonly { dial: string; country: string; flag: StaticImageData }[] = [
  { dial: '+1', country: 'USA', flag: flagUsa },
  { dial: '+44', country: 'UK', flag: flagUk },
  { dial: '+91', country: 'India', flag: flagIndia },
];

/**
 * Phone numbers listed under the form, e.g. '+91 98765 43210'.
 * Empty = the row is hidden. (The old site loaded these from its footer API.)
 */
export const CONTACT_NUMBERS: readonly string[] = [];
