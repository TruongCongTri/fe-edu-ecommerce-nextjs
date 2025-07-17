"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import CourseSearchBar from "../filters/CourseSearchBar";

type DecodedToken = {
  email: string;
  id: string;
  name: string;
  exp: number;
  // Add `name?: string` if your token includes the user's name
};

export default function HeroLayout() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserEmail(decoded.email);
        setUserName(decoded.name);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div className="w-full min-h-[350px] bg-gradient-to-r from-black via-[#0a1a0a] to-[#0e4d0e] text-white flex items-center justify-center py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center sm:text-left">
          940 Online Courses &quot;Chất&quot; for{" "}
          {userEmail && userName ? (
            <span className="text-green-400">{userName}</span>
          ) : (
            "Students"
          )}
        </h1>
        <div className="max-w-2xl mx-auto sm:mx-0">
          <CourseSearchBar />
        </div>
      </div>
    </div>
  );
}
