import { ValidateProductDetailSlugDto } from "@/src/dtos/validation/validate-detail-slug.dto";
import { apiFetch } from "../../api";
import { ValidateProductSlugDto } from "@/src/dtos/validation/validate-product-slug.dto";
import { BaseQueryParamsDto } from "@/src/dtos/validation/base-query-params.dto";
import { CreateProductDetailDto } from "@/src/dtos/validation/create-product-detail.dto";
import { UpdateProductDetailDto } from "@/src/dtos/validation/update-product-detail.dto";

export const educatorsProductsDetailsApi = {
  // GET /api/educator/products/:productSlug/details
  getAllByProductSlug: (
    productSlug: ValidateProductSlugDto, 
    query = BaseQueryParamsDto
) =>
    apiFetch(`/api/educator/products/${productSlug}/details${query}`),

  // POST /api/educator/products/:productSlug/details
  create: (
    productSlug: ValidateProductSlugDto, 
    data: CreateProductDetailDto
) =>
    apiFetch(`/api/educator/products/${productSlug}/details`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // PUT /api/educator/products/:productSlug/details/:detailSlug
  update: (
    productSlug: ValidateProductSlugDto,
    detailSlug: ValidateProductDetailSlugDto,
    data: UpdateProductDetailDto
  ) =>
    apiFetch(`/api/educator/products/${productSlug}/details/${detailSlug}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // DELETE /api/educator/products/:productSlug/details/:detailSlug
  delete: (
    productSlug: ValidateProductSlugDto,
    detailSlug: ValidateProductDetailSlugDto
  ) =>
    apiFetch(`/api/educator/products/${productSlug}/details/${detailSlug}`, {
      method: "DELETE",
    }),
};
