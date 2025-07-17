import { ICategory } from './ICategory';
import { ISkill } from './ISkill';
import { IUser } from './IUser';
import { IProductDetail } from './IProductDetail';

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
  category: ICategory;
  educator?: IUser;
  skills: ISkill[];
  curriculum?: IProductDetail[];
  createdAt: Date;
}
