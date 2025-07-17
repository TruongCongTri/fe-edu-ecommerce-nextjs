import React from "react";
import { CourseCardHorizontal } from "./CourseCardHorizontal";
import { IFavorite } from "@/src/types/IFavorite";

interface RecentViewedTabProps {
  recentCourses: IFavorite[];
}

export function RecentViewedTab({ recentCourses }: RecentViewedTabProps) {
  return (
    <div className="p-4 min-h-[500px]">
      <h1 className="text-2xl font-bold mb-6">My Recent Viewed</h1>
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <span className="pb-2 border-b-2 border-red-500 font-semibold text-red-500">
          Viewed Courses ({recentCourses.length})
        </span>
      </div>
      {recentCourses.length === 0 ? (
        <p className="text-gray-500">
          You haven&apos;t viewed any courses yet.
        </p>
      ) : (
        recentCourses.map((course) => (
          <CourseCardHorizontal key={course.id} product={course.product} />
        ))
      )}
    </div>
  );
}
