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

const ROW = 'flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-200';
const LINK_ROW = `${ROW} hover:bg-on-dark/5`;

export default function DirectContact() {
  const { title, chat, whatsappLogo, emails, address } = DIRECT_CONTACT;

  return (
    <aside className="relative h-full overflow-hidden rounded-2xl bg-prime-dark shadow-card">
      <Glow />
      <div className="relative flex h-full flex-col p-6 sm:p-8 xl:p-10">
      <h2 className="text-xl font-bold text-on-dark">{title}</h2>

      {/* Rows spread over the card height (matches the form beside it);
          the -mx-3 lets row hover backgrounds line up with the card padding. */}
      <ul className="-mx-3 mt-6 flex flex-1 flex-col justify-around divide-y divide-dashed divide-on-dark/15 [&>li]:py-4">
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
        {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex size-11 items-center justify-center rounded-full bg-prime-yellow text-prime-dark transition-transform duration-200 hover:scale-110"
            >
              <Icon className="text-lg" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      </div>
    </aside>
  );
}
