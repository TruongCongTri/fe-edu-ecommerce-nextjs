import { IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "Full name must be a string." })
  @Length(2, 50, { message: "Full name must be between 2 and 50 characters." })
  fullName?: string;

}
