// /src/lib/api/admin/skills.ts
import { apiFetch } from '../../api';

export const adminSkillsApi = {
  getAll: () => apiFetch('/api/admin/skills'),
  create: (data: any) =>
    apiFetch('/api/admin/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiFetch(`/api/admin/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiFetch(`/api/admin/skills/${id}`, {
      method: 'DELETE',
    }),
};
