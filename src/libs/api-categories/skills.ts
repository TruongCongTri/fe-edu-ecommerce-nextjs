// import { BaseQueryParamsDto } from "@/src/dtos/validation/base-query-params.dto";
import { PaginationMetaDto } from "@/src/dtos/output/pagination-meta.dto";
import { apiFetch } from "../api";
import { ValidateSlugDto } from "@/src/dtos/validation/validate-slug.dto";
import { ISkill } from "@/src/types/ISkill";

export interface PaginatedSkillsResult {
  skills: ISkill[];
  pagination?: PaginationMetaDto;
}

export const skillsApi = {
  getTotal: async (): Promise<PaginatedSkillsResult> => {
    const { data, meta } = await apiFetch<{ skills: ISkill[] }>(`/api/skills/all`);

    return { skills: data?.skills ?? [], pagination: meta.pagination };
  },
  getAll: async (): Promise<PaginatedSkillsResult> => {
    const { data, meta } = await apiFetch<{ skills: ISkill[] }>(`/api/skills`);

    return { skills: data?.skills ?? [], pagination: meta.pagination };
  },

  getBySlug: (slug: ValidateSlugDto) => apiFetch(`/api/skills/${slug}`),

  getWithProducts: (slug: ValidateSlugDto) =>
    apiFetch(`/api/skills/${slug}/products`),

  // getAllWithProducts: (query = BaseQueryParamsDto) =>
  //   apiFetch(`/api/skills/products${query}`),
};
