import { Expose, Type } from "class-transformer";
import { UserDto } from "./user.dto";
import { ProductDto } from "./product.dto";
import { IProductDetail } from "@/src/types/IProductDetail";

export class ProductDetailDto implements IProductDetail {
  @Expose()
  id!: string;

  @Expose()
  slug!: string;

  @Expose()
  @Type(() => ProductDto)
  product!: ProductDto;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  videoUrl?: string;

  @Expose()
  order!: number;

  @Expose()
  isFreePreview!: boolean;

  @Expose()
  createdAt!: Date;

  @Expose()
  @Type(() => UserDto)
  educator?: UserDto;
}
