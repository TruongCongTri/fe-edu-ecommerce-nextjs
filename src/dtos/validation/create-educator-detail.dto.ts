import { IsOptional } from 'class-validator';

export class CreateEducatorDetailDto {
  // @IsUUID()
  // userId!: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  expertise?: string;
}
