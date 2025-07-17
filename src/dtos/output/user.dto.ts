import { IUser } from "@/src/types/IUser";
import { Expose } from "class-transformer";

export class UserDto implements IUser{
  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  fullName!: string;

  @Expose()
  role!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

}