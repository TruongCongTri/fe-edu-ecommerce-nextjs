"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavbarProps } from "@/src/types/nav";
import NavDropdown from "../dropdowns/NavDropdown";
import { FaBars, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type DecodedToken = {
  email: string;
  name: string;
  id: string;
  exp: number;
};

const Navbar = ({ courseMenu }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserEmail(decoded.email);
        setUserName(decoded.name);
        
      } catch (err) {
        console.error("Invalid token");
        Cookies.remove("auth_token");
        Cookies.remove("auth_user");
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("auth_user");
    setUserEmail(null);
    router.push("/");
  };

  return (
    <header className="bg-gradient-to-r from-black via-[#0a1a0a] to-[#0e4d0e] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <i className="fas fa-book text-green-400 text-2xl"></i>
              <span className="text-lg sm:text-xl font-bold text-green-400">
                Antoree
              </span>
            </Link>

            <nav className="hidden md:flex gap-4">
              <NavDropdown label="All Courses" menu={courseMenu} />
            </nav>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {userEmail && userName ? (
              <>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-sm font-medium hover:underline"
                >
                  {userName}
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/educator"
                  className="text-sm font-medium hover:underline"
                >
                  For Educator
                </Link>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:underline"
                >
                  Sign In / Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-green-400 hover:text-green-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black bg-opacity-90 border-t border-green-700">
          <div className="flex flex-col space-y-2 p-4">
            <NavDropdown label="All Courses" menu={courseMenu} />

            {userEmail ? (
              <>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/dashboard");
                  }}
                  className="text-sm font-medium hover:underline py-2 text-left"
                >
                  {userEmail}
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium hover:underline py-2 text-red-400 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/educator"
                  className="text-sm font-medium hover:underline py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  For Educator
                </Link>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:underline py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In / Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
