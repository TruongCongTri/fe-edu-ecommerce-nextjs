import Bubble from "@/src/components/buttons/Bubble";
import { IProduct } from "@/src/types/IProduct";
import React from "react";

type Props = {
  course: IProduct;
};
export default function CourseSkills({ course }: Props) {
  if (!course.skills?.length) return null;

  return (
    <div className="pb-6 border-b border-gray-500 ">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 ">
        Skills You&apos;ll Learn
      </h3>
      <div className="flex flex-wrap gap-2">
        {course.skills.map((skill) => (
          <Bubble key={skill.id} name={skill.name} />
        ))}
      </div>
    </div>
  );
}
