import { CartButton } from "@/src/components/buttons/CartButton";
import { LikeButton } from "@/src/components/buttons/LikeButton";
import { IProduct } from "@/src/types/IProduct";
import Link from "next/link";
import React from "react";

type Props = {
  course: IProduct;
};
export default function CourseHeader({ course }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <img
          src="/image-not-found.png"
          alt={course.name}
          className="w-16 h-16 rounded border object-cover"
        />
        <div>
          <Link href={`/courses/${course.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              {course.name}
            </h2>
          </Link>
          <p className="text-gray-700 mt-1">{course.educator?.fullName}</p>
          <div className="text-green-600 text-sm mt-1 flex items-center gap-1">
            <i className="fas fa-dollar-sign text-xs" />
            <span className="font-semibold">
              {course.price?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3">
        <CartButton courseId={course.id} />
        <LikeButton courseId={course.id} />
      </div>
    </div>
  );
}
