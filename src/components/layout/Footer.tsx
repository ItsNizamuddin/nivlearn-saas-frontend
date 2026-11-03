'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <span className="text-lg font-semibold text-prime">
              {SITE_CONFIG.name}
            </span>
            <p className="text-xs text-zinc-500">
              © {year} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-zinc-500 hover:text-prime"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
