import React from "react";
import { EducatorCard } from "./EducatorCard";
import { educatorsApi } from "@/src/libs/api-categories/educator";
import { skillsApi } from "@/src/libs/api-categories/skills";

export default async function EducatorListSection() {
  const educators = await educatorsApi.getAll();
  const skills = await skillsApi.getTotal();

  return (
    <div className="py-8 sm:py-12 md:py-16 mt-8 sm:mt-12 md:mt-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
          Top Educators
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {educators.educators.map((edu) => (
            <EducatorCard
              key={edu.id}
              educator={edu}
              logoUrl="/image-not-found.png"
              skills={skills.skills.slice(0, 4)}
              courseCount={4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
