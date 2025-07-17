import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IFavorite {
    id: string;
    createAt: Date;
    product: IProduct;
    user: IUser;
}