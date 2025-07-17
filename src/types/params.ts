import { FilterProductSearchParams } from "./FilterProductSearchParams";

export type PageParamsWithSlug = {
  params: { slug: string };
  searchParams: FilterProductSearchParams;
};
export type PageParams = {
  searchParams: FilterProductSearchParams;
};
