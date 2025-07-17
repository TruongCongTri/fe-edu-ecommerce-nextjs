import { IProduct } from "./IProduct";

export type CourseTag = {
  icon: string; // FontAwesome icon class (e.g., "fa-laptop-house")
  text: string; // Tag label (e.g., "Remote")
  class: string; // Tailwind class for styling (e.g., "bg-blue-50 text-blue-600")
};

export type CourseDetailItem = {
  label: string;
  icon: string;
  value: string;
};

export type CourseSection = {
  title: string;
  content: string[] | string;
};

export type CourseLink = {
  label: string;
  href: string;
};
export type CourseLocation = {
  id: number;
  label: string;
  locationSlug: string;
};
// export type Product = {
//   id: number;
//   logo: string;
//   title: string;
//   slug: string;
//   company: string;
//   location: ProductLocation[];
//   postedAt: string;
//   tags: ProductTag[];
//   skills: string[];
//   details: ProductDetailItem[];
//   sections: ProductSection[];
//   about: string;
//   links: ProductLink[];
// };

export type CourseCardProps = {
  course: IProduct;
  selected: boolean;
  // onClick: () => void;
};
export type CourseListSectionProps = {
  courses: IProduct[];
  selectedCourseSlug: string | null | undefined;
  // onSelect: (slug: string) => void;
};
export type CourseDetailSectionProps = {
  course: IProduct;
};
