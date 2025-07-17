import { EducatorCardProps } from "@/src/types/educator.type";
import Link from "next/link";

export function EducatorCard({
  educator,
  logoUrl,
  skills,
  courseCount,
  href = "#",
}: EducatorCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden group w-full max-w-[26rem] mx-auto"
    >
      <div className="flex flex-col items-center p-4">
        <div className="w-24 h-24 sm:w-26 sm:h-26 rounded bg-gray-50 flex items-center justify-center overflow-hidden mb-4">
          <img
            src={logoUrl}
            alt={educator.fullName}
            className="object-contain w-full h-full"
          />
        </div>
        <h3 className="text-center text-base sm:text-lg font-bold text-gray-900 mb-4">
          {educator.fullName}
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-4 mb-4">
        {skills.slice(0, 10).map((skill) => (
          <span
            key={skill.id}
            className="bg-gray-100 text-gray-800 text-xs sm:text-sm px-3 py-1 rounded-full"
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50">
        <p className="text-xs sm:text-sm text-gray-700 truncate"></p>
        <span className="flex items-center text-green-600 text-xs sm:text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
          {courseCount} Courses
          <i className="fas fa-chevron-right text-xs ml-1"></i>
        </span>
      </div>
    </Link>
  );
}
