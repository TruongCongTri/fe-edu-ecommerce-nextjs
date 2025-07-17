import { Expose, Type } from "class-transformer";
import { CategoryDto } from "./category.dto";
import { SkillDto } from "./skill.dto";
import { ProductDetailDto } from "./product-detail.dto";
import { UserDto } from "./user.dto";
import { IProduct } from "@/src/types/IProduct";

export class ProductDto implements IProduct {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  slug!: string;

  @Expose()
  shortDesc!: string;

  @Expose()
  longDesc!: string;

  @Expose()
  imageUrl!: string;

  @Expose()
  price?: number;

  @Expose()
  isActive!: boolean;

  @Expose()
  @Type(() => CategoryDto)
  category?: CategoryDto;

  @Expose()
  @Type(() => UserDto)
  educator?: UserDto;

  @Expose()
  @Type(() => SkillDto)
  skills?: SkillDto[];

  @Expose()
  @Type(() => ProductDetailDto)
  curriculum?: ProductDetailDto[];

  @Expose()
  createdAt!: Date;
}
