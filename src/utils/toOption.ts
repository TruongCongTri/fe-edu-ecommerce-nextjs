// src/lib/utils/toOption.ts

import { ICategory } from '@/src/types/ICategory';
import { ISkill } from '@/src/types/ISkill';
import { Option } from "@/src/components/dropdowns/MultiSelectDropdown";

export function categoriesToOptions(categories: ICategory[]): Option[] {
  return categories.map((c) => ({
    label: c.name,
    value: c.slug,
  }));
}

export function skillsToOptions(skills: ISkill[]): Option[] {
  return skills.map((s) => ({
    label: s.name,
    value: s.slug,
  }));
}
