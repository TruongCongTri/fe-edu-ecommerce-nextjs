// src/lib/api/users.ts
import { apiFetch } from '../api';
import { UpdateUserDto } from '@/src/dtos/validation/update-user.dto';

export const usersApi = {
  getProfile: () => apiFetch('/api/users/me/profile'),
  
  updateProfile: (data: UpdateUserDto) => apiFetch('/api/users/me/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};
