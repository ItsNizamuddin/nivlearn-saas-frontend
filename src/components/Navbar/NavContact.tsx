import Link from 'next/link';
import React from 'react';
import { MessageSquare, Headphones, Building2 } from 'lucide-react';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-3 h-3 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
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
            <MessageSquare size={15} className="text-prime-yellow" />
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
            <Headphones size={15} className="text-prime" />
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
            <Building2 size={15} className="text-prime-dark" />
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
        {SOCIALS.map(({ label, href, icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-7 h-7 rounded-full bg-prime-dark text-white flex items-center justify-center hover:bg-prime transition-colors text-[11px]"
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
