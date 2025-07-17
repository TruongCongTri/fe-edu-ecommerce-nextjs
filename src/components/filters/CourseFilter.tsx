"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MultiSelectDropdown, Option } from "../dropdowns/MultiSelectDropdown";
import { categoriesApi } from "@/src/libs/api-categories/categories";
import { skillsApi } from "@/src/libs/api-categories/skills";
import { categoriesToOptions, skillsToOptions } from "@/src/utils/toOption";
import { PriceRangeSlider } from "../sliders/PriceRangeSlider";

// Categories
// export const jobTypes: Option[] = [
//   { label: "Full-time", value: "full-time" },
//   { label: "Part-time", value: "part-time" },
//   { label: "Remote", value: "remote" },
//   { label: "Hybrid", value: "hybrid" },
// ];

// Skills
// export const jobLevels: Option[] = [
//   { label: "Intern", value: "intern" },
//   { label: "Fresher", value: "fresher" },
//   { label: "Junior", value: "junior" },
//   { label: "Middle", value: "middle" },
//   { label: "Senior", value: "senior" },
//   { label: "Manager", value: "manager" },
// ];

// Price Ranges
// export const salaries: Option[] = [
//   { label: "Under NPR 50,000", value: "0-50000" },
//   { label: "NPR 50,000 - 100,000", value: "50000-100000" },
//   { label: "Above NPR 100,000", value: "100000+" },
// ];

export const CourseFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [skillOptions, setSkillOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [categories, skills] = await Promise.all([
          categoriesApi.getAll(),
          skillsApi.getAll(),
        ]);

        setCategoryOptions(categoriesToOptions(categories.categories));
        setSkillOptions(skillsToOptions(skills.skills));
      } catch (err) {
        console.error("Error fetching categories/skills:", err);
      }
    }

    fetchOptions();
  }, []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>();
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>();

  // ✅ Sync state with URL on initial render
  useEffect(() => {
    const urlCate = searchParams.getAll("category_slugs");
    const urlSkill = searchParams.getAll("skill_slugs");
    const urlMinPrice = searchParams.get("min_price");
    const urlMaxPrice = searchParams.get("max_price");

    setSelectedCategories(urlCate);
    setSelectedSkills(urlSkill);
    setSelectedMinPrice(Number(urlMinPrice));
    setSelectedMaxPrice(Number(urlMaxPrice));
  }, [searchParams]);

  // ✅ Handle Filter
  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category_slugs");
    params.delete("skill_slugs");
    params.delete("min_price");
    params.delete("max_price");

    selectedCategories.forEach((cate) => params.append("category_slugs", cate));
    selectedSkills.forEach((skill) => params.append("skill_slugs", skill));
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedMinPrice && params.append("min_price", selectedMinPrice.toString());
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedMaxPrice && params.append("max_price", selectedMaxPrice.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    // Clear local state
    setSelectedCategories([]);
    setSelectedSkills([]);
    setSelectedMinPrice(250);
    setSelectedMaxPrice(750);

    const params = new URLSearchParams(searchParams.toString());

    // Remove only filter params
    params.delete("category_slugs");
    params.delete("skill_slugs");
    params.delete("min_price");
    params.delete("max_price");

    // Push updated URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const showClearBtn =
    selectedCategories.length > 0 ||
    selectedSkills.length > 0 ||
    selectedMinPrice ||
    selectedMaxPrice;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
        <MultiSelectDropdown
          label="Categories"
          placeholder="Categories"
          options={categoryOptions}
          selectedValues={selectedCategories}
          onChange={setSelectedCategories}
          showSearch={true}
        />
        <MultiSelectDropdown
          label="Skills"
          placeholder="Skills"
          options={skillOptions}
          selectedValues={selectedSkills}
          onChange={setSelectedSkills}
          showSearch={true}
        />
        {/* <MultiSelectDropdown
          label="Price"
          placeholder="Price"
          options={salaries}
          selectedValues={selectedMinPrice}
          showSearch={true}
          onChange={setSelectedPrices}
        /> */}

        <PriceRangeSlider
          minPrice={0}
          maxPrice={1000}
          defaultMin={selectedMinPrice || 0}
          defaultMax={selectedMaxPrice || 1000}
          onApply={(min, max) => {
            setSelectedMinPrice(min);
            setSelectedMaxPrice(max);
          }}
        />

        {showClearBtn && (
          <button
            onClick={handleClear}
            className="text-gray-600 hover:text-green-500"
          >
            <i className="fas fa-times mr-1"></i> Clear Filters
          </button>
        )}
        <div className="ml-auto flex gap-2">
          <button
            onClick={handleFilter}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition w-full md:w-auto flex items-center"
          >
            <i className="fas fa-filter mr-2" />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};
