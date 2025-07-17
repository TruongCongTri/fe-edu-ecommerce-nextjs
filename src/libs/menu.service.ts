import jobMenu from "@/data/jobMenu.json";
import companyMenu from "@/data/companyMenu.json";
import blogMenu from "@/data/blogMenu.json";
import { NavDropdownItemProps } from "../types/nav";

export async function getCategoryMenu(): Promise<NavDropdownItemProps[]> {
  // Simulate DB fetch delay
  // return await prisma.skill.findMany(); // convert to DropdownItem[]
  return jobMenu as NavDropdownItemProps[];
}

export async function getEducatorMenu(): Promise<NavDropdownItemProps[]> {
  return companyMenu as NavDropdownItemProps[];
}

export async function getBlogMenu(): Promise<NavDropdownItemProps[]> {
  return blogMenu as NavDropdownItemProps[];
}