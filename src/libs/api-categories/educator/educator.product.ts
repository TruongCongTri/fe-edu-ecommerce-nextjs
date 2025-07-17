import { apiFetch } from '../../api';
import { CreateProductDto } from '@/src/dtos/validation/create-product.dto';
import { UpdateProductDto } from '@/src/dtos/validation/update-product.dto';


export const educatorsProductsApi = {
  // GET /api/educator/products?query...
  getAll: (query = '') =>
    apiFetch(`/api/educator/products${query}`),

  // POST /api/educator/products/create
  create: (data: CreateProductDto) =>
    apiFetch('/api/educator/products/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // PUT /api/educator/products/:slug
  update: (slug: string, data: UpdateProductDto) =>
    apiFetch(`/api/educator/products/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // DELETE /api/educator/products/:slug
  delete: (slug: string) =>
    apiFetch(`/api/educator/products/${slug}`, {
      method: 'DELETE',
    }),
};
