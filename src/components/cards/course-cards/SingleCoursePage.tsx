import { IProduct } from "@/src/types/IProduct";
import React from "react";
import { CourseDetailSection } from "./CourseDetailSection";
import { EducatorCard } from "../educator-cards/EducatorCard";
import { educatorsApi } from "@/src/libs/api-categories/educator";
import { skillsApi } from "@/src/libs/api-categories/skills";

interface Props {
  courseDetail: IProduct;
}
export default async function SingleCoursePage({ courseDetail }: Props) {
  
  const course = await courseDetail;
  const educator = await educatorsApi.getById(courseDetail.educator?.id || "");
  const skills = await skillsApi.getTotal();
  return (
    <div className="">
      <div className="relative z-10">
        <div className="relative z-40" id="job-session">
          <div className="sticky top-[56px] bg-gray-100 shadow-inner">
            <div className="h-[calc(100vh-56px)] grid grid-cols-1 md:grid-cols-5 gap-6 overflow-hidden">
              <div className="overflow-y-auto pl-2 col-span-1 md:col-span-3 hidden md:block ">
                <CourseDetailSection course={course} />
              </div>
              {/* Left scrollable job list */}
              <div className="overflow-y-auto pr-2 col-span-1 md:col-span-2">
                <EducatorCard
                  educator={educator}
                  logoUrl="/image-not-found.png"
                  skills={skills.skills.slice(0, 4)}
                  courseCount={4}
                />
              </div>

              {/* Right scrollable detail with sticky header */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
