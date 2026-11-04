import Image from 'next/image';
import Glow from '@/components/ui/Glow';
import { DIRECT_CONTACT, SOCIAL_LINKS, type ContactChannel } from './data';

function ChannelIcon({ icon }: { icon: ContactChannel['icon'] }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-on-dark/10">
      <Image src={icon} alt="" className="size-8" />
    </span>
  );
}

function ChannelText({ title, detail }: Pick<ContactChannel, 'title' | 'detail'>) {
  return (
    <span className="min-w-0">
      <span className="block text-base font-semibold text-on-dark">{title}</span>
      <span className="block text-sm text-on-dark/70">{detail}</span>
    </span>
  );
}

function SocialIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes('facebook')) {
    return (
      <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (n.includes('insta')) {
    return (
      <svg className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }
  if (n.includes('youtube')) {
    return (
      <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (n.includes('linkedin')) {
    return (
      <svg className="size-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  return null;
}

const ROW = 'flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-200';
const LINK_ROW = `${ROW} hover:bg-on-dark/5`;

export default function DirectContact() {
  const { title, chat, whatsappLogo, emails, address } = DIRECT_CONTACT;

  return (
    <aside className="relative h-full overflow-hidden rounded-lg bg-prime-dark shadow-card">
      <Glow />
      <div className="relative flex h-full flex-col p-5">
        <h2 className="text-xl font-bold text-on-dark">{title}</h2>

        {/* Rows spread over the card height (matches the form beside it);
            the -mx-3 lets row hover backgrounds line up with the card padding. */}
        <ul className="-mx-3 flex flex-1 flex-col justify-around divide-y divide-dashed divide-on-dark/15 [&>li]:py-4">
          <li>
            <a href={chat.href} target="_blank" rel="noopener noreferrer" className={LINK_ROW}>
              <ChannelIcon icon={chat.icon} />
              <span className="flex-1">
                <ChannelText title={chat.title} detail={chat.detail} />
              </span>
              <Image src={whatsappLogo} alt="WhatsApp" className="h-8 w-auto" />
            </a>
          </li>

          <li className="space-y-2">
            {emails.map((email) => (
              <a key={email.title} href={email.href} className={LINK_ROW}>
                <ChannelIcon icon={email.icon} />
                <ChannelText title={email.title} detail={email.detail} />
              </a>
            ))}
          </li>

          <li>
            <div className={ROW}>
              <ChannelIcon icon={address.icon} />
              <address className="not-italic">
                <ChannelText title={address.title} detail={address.detail} />
              </address>
            </div>
          </li>
        </ul>

        <ul className="mt-8 flex gap-3" aria-label="Social media">
          {SOCIAL_LINKS.map(({ name, href }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex size-11 items-center justify-center rounded-full bg-prime-yellow text-prime-dark transition-transform duration-200 hover:scale-110"
              >
                <SocialIcon name={name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
