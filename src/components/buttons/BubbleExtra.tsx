import Link from "next/link";
import React from "react";

export default function BubbleExtra({ name }: { name: string }) {
  return (
    <Link href={`/courses/${name}`}>
      <span className="bg-gray-100 border border-gray-300 text-gray-800 text-sm px-3 py-1 rounded-full ">
        {name}
      </span>
    </Link>
  );
}
