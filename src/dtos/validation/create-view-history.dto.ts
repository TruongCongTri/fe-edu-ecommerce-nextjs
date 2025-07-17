import { IsUUID } from 'class-validator';

export class CreateViewHistoryDto {
  @IsUUID()
  productId!: string;
}
