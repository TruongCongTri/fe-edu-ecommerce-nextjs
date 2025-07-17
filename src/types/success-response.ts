import { PaginationMetaDto } from "../dtos/output/pagination-meta.dto";

export interface SuccessResponseMeta {
  success: true;
  message: string;
  pagination?: PaginationMetaDto;
}

export interface SuccessResponseBody<T> {
  data?: T;
  meta: SuccessResponseMeta;
}
