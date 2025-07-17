import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentDetailDto {
  // @IsUUID()
  // userId!: string;

  @IsOptional()
  @IsNotEmpty()
  bio?: string;
}
