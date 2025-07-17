import React from "react";

import { CourseCardHorizontal } from "./CourseCardHorizontal";
import { IFavorite } from "@/src/types/IFavorite";

interface SavedCoursesTabProps {
  savedCourses: IFavorite[];
}

export default function SavedCoursesTab({
  savedCourses,
}: SavedCoursesTabProps) {
  return (
    <div className="p-4 min-h-[500px]">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <span className="pb-2 border-b-2 border-red-500 font-semibold text-red-500">
          Saved Courses ({savedCourses.length})
        </span>
      </div>

      {savedCourses.length === 0 ? (
        <p className="text-gray-600">You haven&apos;t saved any courses yet.</p>
      ) : (
        <div className="space-y-4">
          {savedCourses.map((course) => (
            <CourseCardHorizontal key={course.id} product={course.product} />
            // <div key={course.id}>{course.id}</div>
          ))}
        </div>
      )}
    </div>
  );
}
