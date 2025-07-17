import { ValidateProductDetailSlugDto } from '@/src/dtos/validation/validate-detail-slug.dto';
import { apiFetch } from '../api';
import { ValidateProductSlugDto } from '@/src/dtos/validation/validate-product-slug.dto';

export const productsDetailsApi = {
  // GET /api/products/:productSlug/details
  getByProductSlug: (productSlug: ValidateProductSlugDto) =>
    apiFetch(`/api/products/${productSlug}/details`),

  // GET /api/products/details/:detailSlug
  getByDetailSlug: (detailSlug: ValidateProductDetailSlugDto) =>
    apiFetch(`/api/products/details/${detailSlug}`),
};
