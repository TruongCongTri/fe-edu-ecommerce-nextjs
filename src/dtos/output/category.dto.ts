import { ICategory } from "@/src/types/ICategory";
import { Expose } from "class-transformer";

export class CategoryDto implements ICategory {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  slug!: string;

  @Expose()
  description?: string;

  @Expose()
  createdAt!: Date;
}
