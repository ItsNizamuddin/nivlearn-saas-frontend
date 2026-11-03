'use client';

import React from 'react';
import Link from 'next/link';
import { ResourceLink } from './types';
import NavContact from './NavContact';

const RESOURCE_LINKS: ResourceLink[] = [
  { name: 'Blog', link: '/blog', descp: 'Stay ahead with expert articles and insights' },
  { name: 'Become an Instructor', link: '/become-an-instructor', descp: 'Lead engaging live sessions worldwide' },
  { name: 'Trainers', link: '/trainers', descp: 'Learn from top-certified industry mentors' },
  { name: 'Accreditations', link: '/accreditations', descp: 'Earn globally recognized certifications' },
  { name: 'Hire From Us', link: '/hire-from-us', descp: 'Access job-ready, pre-vetted tech talent' },
  { name: 'Guest Author', link: '/become-a-guest-author', descp: 'Share insights with our learner community' },
];

const POPULAR_PROGRAMS = [
  { name: 'Full Stack Web Development', link: '/courses' },
  { name: 'MERN Stack Bootcamp', link: '/courses' },
  { name: 'Cloud & DevOps Engineering', link: '/courses' },
  { name: 'Data Science & AI', link: '/courses' },
];

interface ResourcesMenuProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ResourcesMenu({ onClose, onMouseEnter, onMouseLeave }: ResourcesMenuProps) {
  return (
    <div
      className="fixed inset-0 top-16 z-40 bg-black/25 backdrop-blur-[1px] flex justify-center pt-2 px-4 cursor-default"
      onClick={onClose}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl border border-zinc-200/90 w-full max-w-5xl mx-auto overflow-hidden flex flex-col h-[480px] cursor-auto"
      >
        {/* Main Content Area */}
        <div className="flex flex-1 min-h-0 p-6 gap-6">
          {/* Main Resources */}
          <div className="flex-1 border-r border-zinc-100 pr-6 overflow-y-auto custom-scrollbar">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex-shrink-0">
              Resources &amp; Community
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {RESOURCE_LINKS.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={onClose}
                  className="group block p-3 rounded-lg border border-zinc-100 hover:border-prime/40 hover:bg-prime/5 transition-all"
                >
                  <span className="font-semibold text-xs text-prime-dark group-hover:text-prime transition-colors block">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                    {item.descp}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Programs */}
          <div className="w-64 sm:w-72 flex-shrink-0 overflow-y-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex-shrink-0">
              Featured Bootcamps
            </h4>
            <div className="space-y-2">
              {POPULAR_PROGRAMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={onClose}
                  className="block p-3 rounded-lg border border-zinc-100 hover:border-prime/40 hover:bg-prime/5 transition-all"
                >
                  <span className="font-semibold text-xs text-prime-dark block">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-prime font-medium mt-0.5 block">
                    Explore curriculum &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Contact Footer (Anchored) */}
        <NavContact />
      </div>
    </div>
  );
}
