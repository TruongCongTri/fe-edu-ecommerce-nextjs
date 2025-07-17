// import { BaseQueryParamsDto } from "@/src/dtos/validation/base-query-params.dto";
import { apiFetch } from "../api";
import { ValidateSlugDto } from "@/src/dtos/validation/validate-slug.dto";
import { CategoryDto } from "@/src/dtos/output/category.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { ICategory } from "@/src/types/ICategory";
import { PaginationMetaDto } from "@/src/dtos/output/pagination-meta.dto";

export interface PaginatedCategoriesResult {
  categories: ICategory[];
  pagination?: PaginationMetaDto;
}

export const categoriesApi = {
  getTotal: async (): Promise<PaginatedCategoriesResult> => {
    const { data, meta } = await apiFetch<{ categories: ICategory[] }>(
      `/api/categories/all`
    );
    return { categories: data?.categories ?? [], pagination: meta.pagination };
  },

  getAll: async (): Promise<PaginatedCategoriesResult> => {
    const { data, meta } = await apiFetch<{ categories: ICategory[] }>(
      `/api/categories`
    );
    return { categories: data?.categories ?? [], pagination: meta.pagination };
  },

  getBySlug: (slug: ValidateSlugDto) => apiFetch(`/api/categories/${slug}`),

  getWithProducts: (slug: ValidateSlugDto) =>
    apiFetch(`/api/categories/${slug}/products`),

  // getAllWithProducts: (query = BaseQueryParamsDto) =>
  //   apiFetch(`/api/categories/products${query}`),
};
