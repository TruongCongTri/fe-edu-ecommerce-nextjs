import { ErrorResponseMeta } from "@/src/types/api-response";

// lib/errors/ApiError.ts
export class ApiError extends Error {
  status: number;
  meta: ErrorResponseMeta;

  constructor(status: number, meta: ErrorResponseMeta) {
    super(meta.message);
    this.status = status;
    this.meta = meta;
  }
}
