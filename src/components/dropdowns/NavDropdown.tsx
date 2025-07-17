"use client";

import { NavDropdownProps } from "@/src/types/nav";
import { useRef, useState } from "react";
import NavDropdownItem from "./NavDropdownItem";

const NavDropdown = ({ label, menu }: NavDropdownProps) => {
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
  return (
    <div
      className="relative px-4 py-4 transition text-gray-400 hover:text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className=" font-medium transition flex items-center">
        {label} <i className="fas fa-chevron-down ml-1 text-xs" />
      </button>

      {open && (
        //  mt-2
        <div className="absolute left-0 top-full mt-0 bg-black border shadow-lg z-50 w-[250px]">
          {menu.map((item, i) => (
            <NavDropdownItem key={i} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
