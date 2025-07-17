import React from "react";
import { IProduct } from "@/src/types/IProduct";

type Props = {
  course: IProduct;
};

export default function CourseAboutEducator({ course }: Props) {
  if (!course.educator) return null;
  
  return (
    <div className="pt-6 border-t">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        About the Educator
      </h3>
      <div className="space-y-2">
        <p className="text-gray-800 font-medium">{course.educator.fullName}</p>
        <p className="text-gray-700">{course.educator.educator?.bio}</p>
      </div>
    </div>
  );
}
