import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IHistory {
    id: string;
    createAt: Date;
    product: IProduct;
    user: IUser;
}