import { ErrorResponseMeta, SuccessResponseBody } from "../types/api-response";
import { ApiError } from "./error/ApiError";
import Cookies from "js-cookie"; 

type ExtendedRequestInit = RequestInit & {
  withAuth?: boolean;
};

// src/libs/api.ts
export async function apiFetch<T>(
  path: string,
  options: ExtendedRequestInit = {}
): Promise<SuccessResponseBody<T>>{
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const { withAuth, ...restOptions } = options;

  // Setup headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(restOptions.headers as Record<string, string>),
  };

  // If auth is needed, append Authorization header
  if (withAuth) {
    const token = Cookies.get("auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...restOptions,
    headers,
    credentials: "include", // always include cookies
  });

  // Handle 204 No Content
  if (res.status === 204) {
    return {
      data: null as T,
      meta: {
        success: true,
        message: "No content",
      },
    };
  }

  // Parse JSON body (for non-204)
  const text = await res.text();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let json: any;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    throw new ApiError(res.status, {
      success: false,
      message: "Invalid JSON response",
      error_code: "invalid_json",
    });
  }

  if (!res.ok || !json.meta?.success) {
    // Parse error meta if available
    const errorMeta: ErrorResponseMeta = {
      success: false,
      message: json?.meta?.message || 'API Error',
      error_code: json?.meta?.error_code,
      errors: json?.meta?.errors,
    };

    throw new ApiError(res.status, errorMeta);
  }

  return {
    data: json.data as T,
    meta: json.meta,
  };
}
