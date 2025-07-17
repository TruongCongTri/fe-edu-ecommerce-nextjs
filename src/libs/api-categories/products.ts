import { ValidateSlugDto } from "@/src/dtos/validation/validate-slug.dto";
import { apiFetch } from "../api";
import { IProduct } from "@/src/types/IProduct";
import { FilterProductQuery } from "@/src/types/FilterProductQuery";
import { PaginationMetaDto } from "@/src/dtos/output/pagination-meta.dto";
import { ApiError } from "../error/ApiError";
import { IPagination } from "@/src/types/IPagination";

export interface PaginatedProductsResult {
  products: IProduct[];
  pagination?: IPagination;
}

export const productsApi = {
  filter: async (
    query: FilterProductQuery
  ): Promise<PaginatedProductsResult> => {
    const params = new URLSearchParams();

    if (query.page) params.set("page", query.page.toString());
    if (query.per_page) params.set("per_page", query.per_page.toString());
    if (query.search) params.set("search", query.search);

    query.category_slugs?.forEach((slug) =>
      params.append("category_slugs", slug)
    );
    query.skill_slugs?.forEach((slug) => params.append("skill_slugs", slug));

    if (query.min_price !== undefined)
      params.set("min_price", String(query.min_price));
    if (query.max_price !== undefined)
      params.set("max_price", String(query.max_price));

    const url = `/api/products/filter?${params.toString()}`;
    const { data, meta } = await apiFetch<{ products: IProduct[] }>(url);

    return { products: data?.products ?? [], pagination: meta.pagination };
  },

  getAll: async (query?: string): Promise<PaginatedProductsResult> => {
    const params = query ? `?search=${encodeURIComponent(query)}` : "";
    const { data, meta } = await apiFetch<{ products: IProduct[] }>(
      `/api/products${params}`
    );
    return { products: data?.products ?? [], pagination: meta.pagination };
  },

  getBySlug: async (slug: string): Promise<IProduct> => {
    const { data } = await apiFetch<IProduct>(`/api/products/${slug}`);
    if (!data) {
      throw new ApiError(404, {
        success: false,
        message: `Product with slug '${slug}' not found.`,
      });
    }

    return data;
  },

  getDetailBySlug: async (slug: ValidateSlugDto): Promise<IProduct> => {
    const { data } = await apiFetch<IProduct>(`/api/products/${slug}/detail`);
    if (!data) {
    throw new ApiError(404, {
      success: false,
      message: `Product detail with slug '${slug}' not found.`,
    });
  }

    return data;
  },


};
