import React from "react";

import { CourseDetailSectionProps } from "@/src/types/course.type";
import CourseHeader from "./details/CourseHeader";
import CourseSkills from "./details/CourseSkill";
import CourseCurriculum from "./details/CourseCurriculum";
import CourseAboutEducator from "./details/CourseAboutEducator";
import CourseDescription from "./details/CourseDescription";

export const CourseDetailSection = ({ course }: CourseDetailSectionProps) => {
  if (!course) {
    return (
      <div className="p-6 text-center text-gray-500">
        Course not found or unavailable.
      </div>
    );
  }
  return (
    <div className="relative flex flex-col bg-green-50 rounded-lg shadow overflow-hidden h-full max-h-[90vh]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-green-50 border-b shadow-sm p-5 md:p-6">
        <CourseHeader course={course} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-8">
        <CourseSkills course={course} />
        <CourseDescription course={course} />
        <CourseCurriculum course={course} />
        <CourseAboutEducator course={course} />
      </div>
    </div>
  );
};
