import { IEducator } from "./IEducator";
import { IProduct } from "./IProduct";
import { IStudent } from "./IStudent";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
  products?: IProduct[];
  student?: IStudent;
  educator?: IEducator;
}
