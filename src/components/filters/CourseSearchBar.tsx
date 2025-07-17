"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CourseSearchBar() {
  const router = useRouter();
  const params = useParams();

  const [keyword, setKeyword] = useState("");

  // 1. Sync state with URL on initial render
  useEffect(() => {
    const rawSlug = params.slug;
    const slugParts =
      typeof rawSlug === "string"
        ? [rawSlug]
        : Array.isArray(rawSlug)
        ? rawSlug
        : [];

    // Extract from [...slug]
    if (slugParts.length === 1) {
      const slug = slugParts[0];
      setKeyword(decodeURIComponent(slug).replace(/-/g, " "));
    } else {
      setKeyword("");
    }
  }, [params.slug]);

  // 2. Handle Search
  const handleSearch = async () => {
    const hasKeyword = keyword.trim() !== "";

    if (!hasKeyword) {
      router.push("/courses");
      return;
    }

    try {
      const params = new URLSearchParams();
      if (hasKeyword) params.append("q", keyword);

      const res = await fetch(`/api/products/search?${params.toString()}`);
      const courses = await res.json();
      const firstCourse = courses[0];

      let path = "/courses";
      if (hasKeyword)
        path += `/${encodeURIComponent(keyword.replace(/\s+/g, "-"))}`;
      //   if (hasCity) path += `/${city}`;
      if (firstCourse?.slug) path += `?course_selected=${firstCourse.slug}`;

      router.push(path);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      // Fallback without job_selected
      let path = "/courses";
      if (hasKeyword)
        path += `/${encodeURIComponent(keyword.replace(/\s+/g, "-"))}`;
      //   if (hasCity) path += `/${city}`;
      router.push(path);
    }
  };

  return (
    //p-4 md:p-6
    <div className="rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Keyword Input */}
        <div className="relative flex-grow w-full">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword skill (Java, iOS...), category, course title..."
            className="w-full pl-10 pr-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <i className="fas fa-search absolute left-3 top-4.5 text-gray-400" />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition w-full md:w-auto flex items-center"
        >
          <i className="fas fa-search mr-2" />
          Search
        </button>
      </div>
    </div>
  );
}
