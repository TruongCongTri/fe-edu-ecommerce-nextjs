import { ISkill } from "./ISkill";
import { IUser } from "./IUser";

export interface EducatorCardProps {
  logoUrl: string;
  courseCount: number;
  href?: string;
  educator: IUser;
  skills: ISkill[];
}
