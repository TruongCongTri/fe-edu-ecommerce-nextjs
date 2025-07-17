"use client";

import { NavDropdownItemProps } from "@/src/types/nav";
import Link from "next/link";
import { useRef, useState } from "react";

const NavDropdownItem = (item: NavDropdownItemProps) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 10); // slight delay so users can move between button and panel
  };
  if (item.type === "link") {
    return (
      <Link
        href={item.href}
        className="block px-4 py-2 hover:bg-gray-600 text-gray-400 whitespace-nowrap"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative transition hover:bg-gray-600 text-gray-400 hover:text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center px-4 py-4  cursor-pointer">
        {item.label}
        <i className="fas fa-chevron-right text-xs ml-2"></i>
      </div>

      {open && (
        <div className="absolute top-0 left-full w-[500px] bg-black border shadow-lg grid grid-cols-3 gap-4 z-50  mt-[-1px]">
          {item.submenu.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="text-gray-400 hover:text-white hover:bg-gray-600 text-sm px-2 py-5"
            >
              {sub.label}
            </Link>
          ))}
          {item.footerLink && (
            <div className="col-span-3 mt-4 border-t py-2 px-2">
              <Link
                href={item.footerLink.href}
                className="text-sm text-gray-400 hover:text-white hover:underline"
              >
                {item.footerLink.label}{" "}
                <i className="fas fa-chevron-right ml-1 text-xs"></i>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavDropdownItem;
