import Image from 'next/image';
import { COUNTRY_FLAGS, CONTACT_NUMBERS } from './data';

/** Country phone numbers with flags. Renders nothing while the list is empty. */
export default function ContactNumbers({ numbers = CONTACT_NUMBERS }: { numbers?: readonly string[] }) {
  if (numbers.length === 0) return null;

  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {numbers.map((number) => {
        const match = COUNTRY_FLAGS.find((c) => number.trim().startsWith(c.dial));
        return (
          <li key={number}>
            <a
              href={`tel:${number.replace(/\s+/g, '')}`}
              className="flex min-h-11 items-center gap-3 rounded-xl border border-prime-yellow/30 bg-prime-yellow/10 px-4 py-2.5 text-sm font-semibold text-prime-dark transition-colors duration-200 hover:bg-prime-yellow/20"
            >
              {match && <Image src={match.flag} alt="" width={28} height={28} className="rounded-sm" />}
              <span>{match ? `${match.country}: ${number}` : number}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
