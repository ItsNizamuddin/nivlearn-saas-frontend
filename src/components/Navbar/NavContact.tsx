import Link from 'next/link';
import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { BsChatSquareTextFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { PiBuildingApartmentFill } from 'react-icons/pi';

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram },
  { label: 'Facebook', href: 'https://facebook.com', Icon: FaFacebookF },
  { label: 'Twitter', href: 'https://twitter.com', Icon: FaTwitter },
  { label: 'YouTube', href: 'https://youtube.com', Icon: FaYoutube },
];

export default function NavContact() {
  return (
    <div className="flex-shrink-0 border-t border-zinc-200 bg-slate-50 px-5 py-3 flex items-center justify-between gap-4 text-xs">
      {/* Contact Channels */}
      <div className="flex items-center gap-6 flex-wrap">
        <Link
          href="https://wa.me/919513001835"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-prime-yellow/15 flex items-center justify-center group-hover:bg-prime-yellow/25 transition-colors flex-shrink-0">
            <BsChatSquareTextFill className="text-prime-yellow text-sm" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-prime-dark block text-xs group-hover:text-prime transition-colors">
              Chat
            </span>
            <span className="text-[10px] text-zinc-500">Average response &lt; 2min</span>
          </div>
        </Link>

        <Link
          href="https://wa.me/919513001835"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-prime-yellow text-xs font-semibold px-2.5 py-1.5 rounded-lg text-white hover:opacity-90 transition-opacity hidden md:inline-block"
        >
          Chat Now
        </Link>

        <Link
          href="mailto:reachus@nivlearn.com"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-prime/10 flex items-center justify-center group-hover:bg-prime/20 transition-colors flex-shrink-0">
            <BiSupport className="text-prime text-sm" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-prime-dark block text-xs group-hover:text-prime transition-colors">
              Support
            </span>
            <span className="text-[10px] text-zinc-500">reachus@nivlearn.com</span>
          </div>
        </Link>

        <Link
          href="mailto:corporate@nivlearn.com"
          className="flex items-center gap-2 group hidden sm:flex"
        >
          <div className="w-8 h-8 rounded-lg bg-prime-dark/10 flex items-center justify-center group-hover:bg-prime-dark/20 transition-colors flex-shrink-0">
            <PiBuildingApartmentFill className="text-prime-dark text-sm" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-prime-dark block text-xs group-hover:text-prime transition-colors">
              Corporate
            </span>
            <span className="text-[10px] text-zinc-500">corporate@nivlearn.com</span>
          </div>
        </Link>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {SOCIALS.map(({ label, href, Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-7 h-7 rounded-full bg-prime-dark text-white flex items-center justify-center hover:bg-prime transition-colors text-[11px]"
          >
            <Icon />
          </Link>
        ))}
      </div>
    </div>
  );
}
