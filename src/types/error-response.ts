
export interface ErrorResponseMeta {
  success: false;
  message: string;
  error_code?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
}

export interface ErrorResponseBody {
  meta: ErrorResponseMeta;
}