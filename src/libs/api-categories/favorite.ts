import { PaginationMetaDto } from "@/src/dtos/output/pagination-meta.dto";
import { apiFetch } from "../api";
import { CreateFavoriteDto } from "@/src/dtos/validation/create-favorite.dto";
import { IFavorite } from "@/src/types/IFavorite";
import { ApiError } from "../error/ApiError";

export interface PaginatedFavoritesResult {
  favorites: IFavorite[];
  pagination?: PaginationMetaDto;
}
export interface PaginatedFavoriteResult {
  favorite: IFavorite;
  pagination?: PaginationMetaDto;
}
export const favoriteApi = {
  getAll: async (): Promise<PaginatedFavoritesResult> => {
    const { data, meta } = await apiFetch<{ favorites: IFavorite[] }>(
      `/api/users/me/favorite`,
      {
        method: "GET",
        withAuth: true,
      }
    );
    return { favorites: data?.favorites ?? [], pagination: meta.pagination };
  },
  add: async (body: CreateFavoriteDto): Promise<PaginatedFavoriteResult> => {
    const { data, meta } = await apiFetch<{ favorite: IFavorite }>(
      "/api/users/me/favorite",
      {
        method: "POST",
        body: JSON.stringify(body),
        withAuth: true,
      }
    );

    if (!data) {
          throw new ApiError(404, {
            success: false,
            message: `Failed to like product.`,
          });
        }
        
    return { favorite: data?.favorite, pagination: meta.pagination };
  },

  remove: async (id: string) => {
    return await apiFetch(`/api/users/me/favorite/${id}`, {
      method: "DELETE",
      withAuth: true,
    });
  },
};
