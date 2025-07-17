'use client';

import Link from 'next/link';
import { useState } from 'react';

type NavOption = {
  name: string;
  href: string;
};

type NavSelectorProps = {
  label: string;
  options: NavOption[];
};

const NavSelector = ({ label, options }: NavSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="text-gray-600 hover:text-blue-500 transition font-medium"
      >
        {label}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-md min-w-[150px] z-50">
          {options.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavSelector;
