import EducatorListSection from "@/src/components/cards/educator-cards/EducatorListSection";
import CourseSearchBar from "@/src/components/filters/CourseSearchBar";
import { categoriesApi } from "@/src/libs/api-categories/categories";
import { skillsApi } from "@/src/libs/api-categories/skills";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const [categories, skills] = await Promise.all([
    categoriesApi.getTotal(),
    skillsApi.getTotal(),
  ]);

  return (
    <>
      <div className="min-h-[350px] bg-gradient-to-r from-black via-[#0a1a0a] to-[#0e4d0e] text-white flex items-center justify-center py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center sm:text-left">
            940 Online Courses &quot;Chất&quot; for Trương Công Trí
          </h1>

          <div className="max-w-2xl mx-auto sm:mx-0">
            <CourseSearchBar />
          </div>

          <div className="mt-6 text-base sm:text-lg flex flex-wrap justify-center sm:justify-start">
            <span className="text-gray-300 block w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
              Suggestions for you:
            </span>

            {categories.categories.slice(0, 4).map((cat) => (
              <Link key={cat.id} href={`/courses/${cat.name}`}>
                <span className="inline-block border border-green-600 bg-black hover:bg-gray-800 px-3 py-1 rounded-full mx-1 my-1 text-sm sm:text-base">
                  {cat.name}
                </span>
              </Link>
            ))}
            {skills.skills.slice(0, 4).map((skill) => (
              <Link key={skill.id} href={`/courses/${skill.name}`}>
                <span className="inline-block border border-green-600 bg-black hover:bg-gray-800 px-3 py-1 rounded-full mx-1 my-1 text-sm sm:text-base">
                  {skill.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <EducatorListSection />
    </>
  );
}
