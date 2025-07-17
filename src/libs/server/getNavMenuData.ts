import { CategoryDto } from "@/src/dtos/output/category.dto";
import { categoriesApi } from "../api-categories/categories";
import { skillsApi } from "../api-categories/skills";
import { SkillDto } from "@/src/dtos/output/skill.dto";
import { NavDropdownItemProps } from "@/src/types/nav";

export async function getNavMenuData(): Promise<NavDropdownItemProps[]> {
  const [categories, skills] = await Promise.all([
    categoriesApi.getTotal(),
    skillsApi.getTotal(),
  ]);

  return [
    {
      type: "submenu",
      label: "Courses by Category",
      submenu: categories.categories.slice(0, 10).map((cat) => ({
        type: "link",
        label: cat.name,
        href: `/courses/${cat.name}`,
      })),
      footerLink: {
        label: "View all courses",
        href: "/courses",
      },
    },
    {
      type: "submenu",
      label: "Courses by Skill",
      submenu: skills.skills.slice(0, 10).map((skill) => ({
        type: "link",
        label: skill.name,
        href: `/courses/${skill.name}`,
      })),
      footerLink: {
        label: "View all courses",
        href: "/courses",
      },
    },
  ] as NavDropdownItemProps[];
}
