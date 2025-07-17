
import { apiFetch } from "../api";
import { PaginationMetaDto } from "@/src/dtos/output/pagination-meta.dto";
import { IHistory } from "@/src/types/IHistory";
import { CreateFavoriteDto } from "@/src/dtos/validation/create-favorite.dto";
import { ApiError } from "../error/ApiError";

export interface PaginatedHistoriesResult {
  viewHistories: IHistory[];
  pagination?: PaginationMetaDto;
}
export interface PaginatedHistoryResult {
  viewHistory: IHistory;
  pagination?: PaginationMetaDto;
}

export const viewHistoryApi = {
  getAll: async (): Promise<PaginatedHistoriesResult> => {
    const { data, meta } = await apiFetch<{ "view-histories": IHistory[] }>(
      `/api/users/me/view-history`,
      {
        method: "GET",
        withAuth: true,
      }
    );
    return {
      viewHistories: data?.["view-histories"] ?? [],
      pagination: meta.pagination,
    };
  },

  add: async (body: CreateFavoriteDto): Promise<PaginatedHistoryResult> => {
    const { data, meta } = await apiFetch<{ "view-history": IHistory }>(
      "/api/users/me/view-history",
      {
        method: "POST",
        body: JSON.stringify(body),
        withAuth: true,
      }
    );
    if (!data) {
      throw new ApiError(404, {
        success: false,
        message: `Failed to view product.`,
      });
    }

    return {
      viewHistory: data?.["view-history"],
      pagination: meta.pagination,
    };
  },

  remove: async (id: string) => {
    return await apiFetch(`/api/users/me/view-history/${id}`, {
      method: "DELETE",
      withAuth: true,
    });
  },
};
