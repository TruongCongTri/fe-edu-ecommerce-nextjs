import { PaginationMetaDto } from "../dtos/output/pagination-meta.dto";
import { IUser } from "./IUser";

export interface SuccessResponseMeta {
  success: true;
  message: string;
  pagination?: PaginationMetaDto;
}

export interface SuccessResponseBody<T> {
  data?: T;
  meta: SuccessResponseMeta;
}

export interface ErrorResponseMeta {
  success: false;
  message: string;
  error_code?: string | number;
  errors?: unknown;
}

export interface ErrorResponseBody {
  meta: ErrorResponseMeta;
}

// src/types/api-response.ts

export interface LoginResponse {
  data: {
    login: {
      token: string;
      user: IUser;
    };
  };
  meta: {
    success: boolean;
    message: string;
  };
}
export interface DecodedUser {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  // Add more fields as per your JWT payload
}