import React, { Suspense } from "react";

import { PageParamsWithSlug } from "@/src/types/params";
import { productsApi } from "@/src/libs/api-categories/products";

import { ScrollToCourseSession } from "@/src/components/scroll-behavior/ScrollToCourseSession";
import { CourseListSection } from "@/src/components/cards/course-cards/CourseListSection";
import { CourseFilter } from "@/src/components/filters/CourseFilter";
import { isValidSlugFormat } from "@/src/libs/validation/isValidSlug";
import { ApiError } from "@/src/libs/error/ApiError";
import { redirect } from "next/navigation";
import { CourseDetailSection } from "@/src/components/cards/course-cards/CourseDetailSection";
import { parseFilterQuery } from "@/src/utils/parse-filter-query";
import { buildFilterUrl } from "@/src/utils/build-filter-url";
import SingleCoursePage from "@/src/components/cards/course-cards/SingleCoursePage";
import HeroLayout from "@/src/components/layouts/HeroLayout";
import { CoursePagination } from "@/src/components/cards/course-cards/CoursePagination";

export default async function CoursesPage({
  params,
  searchParams,
}: PageParamsWithSlug) {
  const { slug } = params;
  const trimmed = slug.trim();
  const filterQuery = parseFilterQuery(searchParams);

  // 1. If slug is a course.slug → render course detail page directly
  if (isValidSlugFormat(trimmed)) {
    // It's a valid product-slug-1234 pattern
    try {
      const courseDetail = await productsApi.getBySlug(trimmed);
      if (courseDetail) {
        return <SingleCoursePage courseDetail={courseDetail} />;
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) {
          console.warn("Product not found, fallback to search.");
        } else {
          console.error("API error:", err.meta);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }

  // 2. If not a course.slug
  // Fallback: treat as search term
  // const searchResults = await productsApi.getAll(trimmed);
  filterQuery.search = trimmed;
  const searchResults = await productsApi.filter(filterQuery);

  if (!searchResults || searchResults.products.length === 0) {
    // You can also render your own empty state
    return (
      <div className="w-full">
        <HeroLayout />
        {/* <div className="w-full h-40 bg-gray-400">Filters</div> */}
        <CourseFilter />
        <div className="relative z-10">
          <Suspense fallback={null}>
            <ScrollToCourseSession containerId="job-session" offset={56} />
          </Suspense>

          <div className="relative z-40" id="job-session">
            <div className="sticky top-[56px] bg-gray-100 shadow-inner">
              <h2 className="text-xl font-bold">
                Oops! The course you&apos;re looking for doesn&apos;t exist.
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedSlug =
    typeof (await searchParams).course_selected === "string"
      ? (await searchParams).course_selected
      : null;

  // 3. Find selected course from filtered list
  const selectedCourse = selectedSlug
    ? searchResults.products.find((course) => course.slug === selectedSlug) ??
      null
    : null;

  if (!selectedCourse) {
    // redirect(`/courses/${trimmed}?course_selected=${searchResults[0].slug}`);
    const redirectUrl = buildFilterUrl(
      `/courses/${trimmed}`,
      filterQuery,
      searchResults.products[0].slug
    );
    redirect(redirectUrl);
  }

  return (
    <div className="bg-gray-100">
          {/* <div className="w-full h-40 bg-gray-200">Search bar</div> */}
          <HeroLayout />
          {/* <div className="w-full h-40 bg-gray-400">Filters</div> */}
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
            <div className="mx-auto sm:mx-0">
              <CourseFilter />
            </div>
          </div>
          <div className="relative z-10 rounded-xl">
            <Suspense fallback={null}>
              <ScrollToCourseSession containerId="job-session" offset={56} />
            </Suspense>
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-4 pb-8">
              <div className="relative z-40 rounded-xl" id="job-session">
                <div className="sticky top-[56px] bg-gray-100 shadow-inner rounded-xl">
                  <div className="h-[calc(100vh-56px)] grid grid-cols-1 md:grid-cols-5 gap-6 overflow-hidden rounded-xl">
                    {/* Left scrollable course list */}
                    <div className="overflow-y-auto pr-2 col-span-1 md:col-span-2 rounded-xl">
                      <CourseListSection
                        courses={searchResults.products}
                        selectedCourseSlug={selectedSlug}
                      />
                    </div>
    
                    {/* Right scrollable detail with sticky header */}
                    <div className="overflow-y-auto pl-2 hidden md:block md:col-span-3 rounded-xl">
                      {selectedCourse && (
                        <CourseDetailSection course={selectedCourse} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full items-center flex justify-center mt-10 mb-20">
                {searchResults.pagination && (
                  <CoursePagination pagination={searchResults.pagination} />
                )}
              </div>
            </div>
          </div>
        </div>
  );
}
