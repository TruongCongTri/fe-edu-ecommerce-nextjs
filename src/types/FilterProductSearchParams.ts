
export interface FilterProductSearchParams {
  category_slugs?: string | string[];
  skill_slugs?: string | string[];
  min_price?: string;
  max_price?: string;
  search?: string;
  page?: string;
  per_page?: string;
  course_selected?: string;
}
