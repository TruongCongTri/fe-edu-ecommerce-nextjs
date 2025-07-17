import React from "react";
import { CourseCard } from "./CourseCard";
import { CourseListSectionProps } from "@/src/types/course.type";

export const CourseListSection = ({
  courses,
  selectedCourseSlug,
}: // onSelect,
CourseListSectionProps) => {

  return (
    <div className="bg-gray-100 job-list-container space-y-3 pt-1 pl-2 pr-2 scrollbar-hide">
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          course={course}
          selected={
            selectedCourseSlug === course.slug &&
            courses.some((j) => j.slug === selectedCourseSlug)
          }
          // onClick={() => onSelect(job.slug)}
        />
      ))}
    </div>
  );
};
