import { PaginationMetaDto } from "@/src/dtos/output/pagination-meta.dto";
import { apiFetch } from "../api";
import { UpdateEducatorDetailDto } from "@/src/dtos/validation/update-educator-detail.dto";

import { IUser } from "@/src/types/IUser";
import { ApiError } from "../error/ApiError";

export interface PaginatedEducatorsResult {
  educators: IUser[];
  pagination?: PaginationMetaDto;
}

export const educatorsApi = {
  getProfile: () => apiFetch("/api/educators/me/profile"),

  updateProfile: (data: UpdateEducatorDetailDto) =>
    apiFetch("/api/educators/me/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getAll: async (query?: string): Promise<PaginatedEducatorsResult> => {
    const params = query ? `?search=${encodeURIComponent(query)}` : "";
    const { data, meta } = await apiFetch<{ educators: IUser[] }>(
      `/api/educators/all${params}`
    );
    return { educators: data?.educators ?? [], pagination: meta.pagination };
  },

  getById: async (id: string): Promise<IUser> => {
      const { data } = await apiFetch<IUser>(`/api/educators/all/${id}`);
      if (!data) {
        throw new ApiError(404, {
          success: false,
          message: `Educator with slug '${id}' not found.`,
        });
      }
  
      return data;
    },
};
