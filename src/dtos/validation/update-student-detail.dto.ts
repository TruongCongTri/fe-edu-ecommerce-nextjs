
import { PartialType } from "@/src/utils/partial-type";
import { CreateStudentDetailDto } from "./create-student-detail.dto";

export class UpdateStudentDetailDto extends PartialType(
  CreateStudentDetailDto
) {}
