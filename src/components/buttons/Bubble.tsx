import Link from "next/link";
import React from "react";

export default function Bubble({ name }: { name: string }) {
  return (
    <Link href={`/courses/${name}`}>
      <span className="bg-white border border-green-200 text-green-800 text-sm px-3 py-1 rounded-full shadow-sm hover:bg-green-100 transition">
        {name}
      </span>
    </Link>
  );
}
