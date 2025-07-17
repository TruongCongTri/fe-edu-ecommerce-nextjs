import { apiFetch } from '../api';
import { UpdateStudentDetailDto } from '@/src/dtos/validation/update-student-detail.dto';

export const studentsApi = {
  getProfile: () => apiFetch('/api/students/me/profile'),

  updateProfile: (data: UpdateStudentDetailDto) =>
    apiFetch('/api/students/me/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
