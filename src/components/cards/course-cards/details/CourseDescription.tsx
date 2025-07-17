import { IProduct } from "@/src/types/IProduct";
import React from "react";

type Props = {
  course: IProduct;
};

export default function CourseDescription({ course }: Props) {
  if (!course.longDesc && !course.imageUrl) return null;

  return (
    <div className="pb-6 border-b border-gray-500 ">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Image */}
        {course.imageUrl && (
          <img
            src={course.imageUrl}
            alt={course.name}
            className="max-w-full md:max-w-lg rounded-lg shadow border object-cover"
          />
        )}

        {/* Description */}
        {course.longDesc && (
          <div className="max-w-3xl text-gray-800 text-base leading-relaxed px-2 md:px-0">
            <p>{course.longDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
