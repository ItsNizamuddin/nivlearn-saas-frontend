'use client';

import React from 'react';
import Link from 'next/link';
import { COMPANY_LINKS, RESOURCE_LINKS } from './navLinks';
import NavContact from './NavContact';

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

          {/* Company */}
          <div className="w-64 sm:w-72 flex-shrink-0 overflow-y-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex-shrink-0">
              Company
            </h4>
            <div className="space-y-1">
              {COMPANY_LINKS.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold text-prime-dark hover:bg-prime/5 hover:text-prime transition-colors"
                >
                  {item.name}
                  <span aria-hidden>&rarr;</span>
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
