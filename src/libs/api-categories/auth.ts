// src/lib/api/auth.ts
import { apiFetch } from '../api';

import { UserLoginDto } from '@/src/dtos/validation/login.dto';
import { CreateUserDto } from '@/src/dtos/validation/register.dto';
import { ChangePasswordDto } from '@/src/dtos/validation/change-password.dto';

export const authApi = {
  login: (data: UserLoginDto) => apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  register: (data: CreateUserDto) => apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  registerEducator: (data: CreateUserDto) => apiFetch('/api/auth/educator/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  registerAdmin: (data: CreateUserDto) => apiFetch('/api/auth/admin/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  changePassword: (data: ChangePasswordDto) => apiFetch('/api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};
