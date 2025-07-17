import { ISkill } from "@/src/types/ISkill";
import { Expose } from "class-transformer";

export class SkillDto implements ISkill{
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  slug!: string;

  @Expose()
  description?: string;

  @Expose()
  createdAt!: Date;

}
