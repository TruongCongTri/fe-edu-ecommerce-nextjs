import { PartialType } from "@/src/utils/partial-type";
import { CreateEducatorDetailDto } from "./create-educator-detail.dto";

export class UpdateEducatorDetailDto extends PartialType(
  CreateEducatorDetailDto
) {}