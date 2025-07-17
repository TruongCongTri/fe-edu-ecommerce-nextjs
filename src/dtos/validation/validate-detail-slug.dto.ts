import { IsString, Matches } from "class-validator";

export class ValidateProductDetailSlugDto {
  @IsString({ message: "Slug must be a string." })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "Invalid Product Detail Slug format. Use lowercase letters, numbers, and hyphens only.",
  })
  detailSlug!: string;
}
