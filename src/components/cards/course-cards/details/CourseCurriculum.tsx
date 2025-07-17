import React from "react";
import { IProduct } from "@/src/types/IProduct";

type Props = {
  course: IProduct;
};
export default function CourseCurriculum({ course }: Props) {
  if (!course.curriculum?.length)
    return (
      <div className="">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Course Curriculum
        </h3>
      </div>
    );

  return (
    <div className="pb-6 border-b border-gray-500 ">
      {/* Centered Image */}
      {course.imageUrl && (
        <div className="flex justify-center">
          <img
            src={course.imageUrl}
            alt={course.name}
            className="max-w-full md:max-w-lg rounded-lg shadow border object-cover"
          />
        </div>
      )}

      {/* Left-aligned Description */}
      {course.longDesc && (
        <div
          className="prose prose-lg max-w-3xl mx-auto text-gray-800"
          dangerouslySetInnerHTML={{ __html: course.longDesc }}
        />
      )}
    </div>
  );
}
