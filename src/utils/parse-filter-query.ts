import { FilterProductQuery } from "@/src/types/FilterProductQuery";
import { FilterProductSearchParams } from "../types/FilterProductSearchParams";


/**
 * Converts Next.js searchParams (all strings or string[]) into FilterProductQuery
 */
export function parseFilterQuery(searchParams: FilterProductSearchParams): FilterProductQuery {
  const toArray = (v: string | string[] | undefined): string[] | undefined =>
    v === undefined ? undefined : Array.isArray(v) ? v : [v];

  const toNumber = (v: string | string[] | undefined): number | undefined => {
    if (v === undefined) return undefined;
    const s = Array.isArray(v) ? v[0] : v;
    const n = Number(s);
    return isNaN(n) ? undefined : n;
  };

  return {
    category_slugs: toArray(searchParams.category_slugs),
    skill_slugs: toArray(searchParams.skill_slugs),
    search: '',
    min_price: toNumber(searchParams.min_price),
    max_price: toNumber(searchParams.max_price),
    page: toNumber(searchParams.page) || 1,
    per_page: toNumber(searchParams.per_page) || 5,
  };
}
