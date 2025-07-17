import { IPagination } from "./IPagination";

export type PaginationProps = {
  pagination: IPagination;
  onPageChange: (page: number) => void;
};
