import { IProduct } from './IProduct';
import { IUser } from './IUser';

export interface IProductDetail {
  id: string;
  slug: string;
  product: IProduct;
  title: string;
  content: string;
  videoUrl?: string;
  order: number;
  isFreePreview: boolean;
  createdAt: Date;
  educator?: IUser;
}
