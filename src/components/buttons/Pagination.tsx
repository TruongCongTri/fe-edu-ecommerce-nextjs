import { PaginationProps } from "@/src/types/pagination.type";
import clsx from "clsx";

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  const {
    current_page: page,
    per_page: perPage,
    total_page: totalPage,
    total,
  } = pagination;
  const pageNumbers = getPageNumbers(page, totalPage);
  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center space-x-2">
      {/* Previous */}
      <button
        className={buttonStyle(false)}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>

      {pageNumbers.map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-3 py-2 text-gray-600 bg-white border rounded shadow-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            className={buttonStyle(page === p)}
            onClick={() => onPageChange(page)}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        className={buttonStyle(false)}
        onClick={() => onPageChange(page  + 1)}
        disabled={page  === totalPage}
      >
        &gt;
      </button>
    </div>
  );
}

function buttonStyle(isActive: boolean): string {
  return clsx(
    "px-3 py-2 rounded border shadow-sm transition rounded-xl",
    isActive
      ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
  );
}

// Simple helper to generate page numbers
function getPageNumbers(current: number, total: number): (number | string)[] {
  const delta = 1;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
