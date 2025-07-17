
export interface FilterProductQuery {
  page?: number;
  per_page?: number;
  search?: string;
  category_slugs?: string[];
  skill_slugs?: string[];
  min_price?: number;
  max_price?: number;
}
