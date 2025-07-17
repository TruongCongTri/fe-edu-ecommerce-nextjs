// lib/validation/isValidSlug.ts
import { SLUG_WITH_ID_REGEX } from "./slugPattern";

export function isValidSlugFormat(slug: string): boolean {
  return SLUG_WITH_ID_REGEX.test(slug.trim());
}
