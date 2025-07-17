import React, { Suspense } from "react";

import { IProduct } from "@/src/types/IProduct";
import CourseSearchBar from "../filters/CourseSearchBar";
import { CourseFilter } from "../filters/CourseFilter";
import { ScrollToCourseSession } from "../scroll-behavior/ScrollToCourseSession";
import { CourseListSection } from "../cards/course-cards/CourseListSection";
// import { CourseDetailSection } from "../cards/course-cards/CourseDetailSection";

export default function MainCourseLayout({
  courses,
  selectedCourseSlug,
}: {
  courses: IProduct[];
  selectedCourseSlug: string | null;
}) {
  const selectedCourse =
    selectedCourseSlug && courses.some((course) => course.slug === selectedCourseSlug)
      ? courses.find((course) => course.slug === selectedCourseSlug) ?? null
      : courses.length > 0
      ? courses[0]
      : null;

  return (
    <div>
      <CourseSearchBar />
      <CourseFilter />
      <div className="relative z-10">
        <Suspense fallback={null}>
          <ScrollToCourseSession containerId="course-session" offset={56} />
        </Suspense>
        <div className="relative z-40" id="job-session">
          <div className="sticky top-[56px] bg-white shadow-inner">
            <div className="h-[calc(100vh-56px)] grid grid-cols-1 md:grid-cols-5 gap-6 overflow-hidden">
              {/* Left scrollable job list */}
              <div className="overflow-y-auto pr-2 col-span-1 md:col-span-2">
                <CourseListSection courses={courses} selectedCourseSlug={selectedCourse?.slug} />
              </div>
              {/* Right scrollable detail with sticky header */}
              <div className="overflow-y-auto pl-2 col-span-1 md:col-span-3 hidden md:block">
                {/* {selectedCourse && <CourseDetailSection course={selectedCourse} />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
