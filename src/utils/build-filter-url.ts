import { FilterProductQuery } from "@/src/types/FilterProductQuery";

export function buildFilterUrl(
  basePath: string,
  filter: FilterProductQuery,
  courseSelectedSlug?: string
): string {
  const params = new URLSearchParams();

  // Handle arrays
  filter.category_slugs?.forEach((slug) =>
    params.append("category_slugs", slug)
  );
  filter.skill_slugs?.forEach((slug) => params.append("skill_slugs", slug));

  // Handle numbers and strings
  if (filter.min_price !== undefined)
    params.set("min_price", String(filter.min_price));
  if (filter.max_price !== undefined)
    params.set("max_price", String(filter.max_price));
  if (filter.search) params.set("search", filter.search);
  if (filter.page !== undefined) params.set("page", String(filter.page));
  if (filter.per_page !== undefined)
    params.set("per_page", String(filter.per_page));

  // Remove any accidental course_selected
  params.delete("course_selected");

  // Build the rest of the query string
  const restQuery = params.toString();

  // Add or replace course_selected

  // if (courseSelectedSlug) {
  //   params.set("course_selected", courseSelectedSlug);
  // }
  // Always put course_selected first
  let finalQuery = "";
  if (courseSelectedSlug) {
    finalQuery += `course_selected=${encodeURIComponent(courseSelectedSlug)}`;
  }
  if (restQuery) {
    finalQuery += `&${restQuery}`;
  }
  return `${basePath}?${finalQuery}`;
}
