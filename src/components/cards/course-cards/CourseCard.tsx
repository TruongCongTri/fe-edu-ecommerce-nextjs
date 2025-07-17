/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useMemo } from "react";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { CourseCardProps } from "@/src/types/course.type";
import Bubble from "../../buttons/Bubble";
import BubbleExtra from "../../buttons/BubbleExtra";

export const CourseCard = ({ course, selected }: CourseCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const topSkills = useMemo(() => {
    return course.skills.slice(0, 4);
  }, [course.skills]);

  const extraSkillCount =
    course.skills.length > 4 ? course.skills.length - 4 : 0;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("course_selected", course.slug);
    const newQuery = `?${params.toString()}`;

    router.push(newQuery, { scroll: false });
  };
  return (
    <div
      className={`relative bg-green-50 rounded-xl p-5 transition cursor-pointer shadow-sm hover:shadow-md ${
        selected ? "ring-2 ring-green-600" : ""
      }`}
      // onClick={() =>
      //   router.push(`?course_selected=${course.slug}`, { scroll: false })
      // }
      onClick={handleClick}
    >
      {/* SUPER HOT Badge */}
      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold flex items-center gap-1">
        <i className="fas fa-fire"></i> SUPER HOT
      </div>

      {/* Posted time */}
      <p className="text-sm text-gray-500 mb-2">
        Posted {course.createdAt.toString()}
      </p>

      {/* Title */}
      <Link href={`/courses/${course.slug}`}>
        <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
      </Link>

      {/* Company info */}
      <div className="flex items-center gap-3 mt-2">
        <img
          src="/image-not-found.png"
          alt={course.name}
          className="w-10 h-10 rounded"
        />
        <p className="text-gray-800 font-medium">{course.educator?.fullName}</p>
      </div>

      {/* Salary */}
      <div className="text-green-600 text-sm mt-1 flex items-center gap-1">
        <i className="fas fa-dollar-sign text-xs" />
        <span className="font-semibold">{course.price?.toLocaleString()}</span>
      </div>

      {/* Category */}
      <div className="text-sm text-gray-700 mt-2 flex items-center gap-2">
        <i className="fas fa-briefcase" />
        <span>{course.category.name}</span>
      </div>

      {/* Location */}
      {/* <div className="text-sm text-gray-700 mt-1 flex items-center gap-2">
        <i className="fas fa-user-alt" />
        <span>Hybrid</span>
        <span>•</span>
        <span>{courseLocationLabel}</span>
      </div> */}

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {topSkills.map((skill) => (
          <Bubble key={skill.id} name={skill.name} />
        ))}
        {course.skills.length > 4 && (
          <BubbleExtra name={`+${extraSkillCount}`} />
        )}
      </div>

      {/* Perks */}
      <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-1">
        <li>{course.shortDesc}</li>
        {/* <li>Very competitive remuneration package</li>
        <li>Build products for millions of users in Australia</li>
        <li>Hybrid and flexible working environment</li> */}
      </ul>
    </div>
  );
};
