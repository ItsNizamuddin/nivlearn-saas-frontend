import React from 'react';
import Image from 'next/image';
import { CgMenuGridO } from 'react-icons/cg';
import { IoIosArrowDown } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';

export default function NavbarFallback() {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-zinc-200">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 py-3">
          {/* Left: Brand + Course Button + Search */}
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="NivLearn"
                width={202}
                height={36}
                priority
                className="h-7 w-[157px] md:h-9 md:w-[202px] object-contain"
              />
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="bg-prime-dark text-white rounded-md px-3 py-1.5 flex items-center gap-2">
                <CgMenuGridO size={20} color="white" />
                <span className="font-montserrat text-sm font-medium">Courses</span>
                <IoIosArrowDown size={14} className="opacity-70" />
              </div>

              <div className="relative w-full w-80 lg:w-96 xl:w-[420px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <IoSearch size={16} />
                </span>
                <input
                  type="text"
                  disabled
                  placeholder="What do you want to learn today?"
                  className="w-full py-1.5 pl-9 pr-3.5 border border-zinc-200 rounded-md text-xs sm:text-sm text-zinc-400 bg-white cursor-default"
                />
              </div>
            </div>
          </div>

          {/* Right: Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="text-sm font-medium font-montserrat text-zinc-800">Enterprise</span>
            <span className="text-sm font-medium font-montserrat text-zinc-800">Placement Assistance</span>
            <span className="text-sm font-medium font-montserrat text-zinc-800 flex items-center gap-1">
              <span>Resources</span>
              <IoIosArrowDown size={14} className="text-zinc-500" />
            </span>
          </div>

          {/* Mobile Icons */}
          <div className="flex lg:hidden items-center gap-1">
            <div className="p-2 text-zinc-700">
              <IoSearch size={20} />
            </div>
            <div className="p-2 text-zinc-700">
              <IoMdMenu size={24} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

