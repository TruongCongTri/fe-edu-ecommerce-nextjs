"use client";

import { IPagination } from "@/src/types/IPagination";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../../buttons/Pagination";

interface Props {
  pagination: IPagination;
}
export function CoursePagination({ pagination }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (newPage: number) => {
    // Build new URLSearchParams from existing ones
    const params = new URLSearchParams(searchParams.toString());

    // Remove course_selected
    params.delete("course_selected");

    // Update the page
    params.set("page", newPage.toString());

    // Push to the new URL
    router.push(`?${params.toString()}`);
  };

  return <Pagination pagination={pagination} onPageChange={onPageChange} />;
}
