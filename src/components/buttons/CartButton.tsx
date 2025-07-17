"use client";

import React, { useState } from "react";

type CartButtonProps = {
  courseId: string;
};

export const CartButton = ({ courseId }: CartButtonProps) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

//   const handleApply = async () => {
//     setIsApplying(true);
//     try {
//       // TODO: call your API (e.g., Firebase/Express) here
//       // await applyJob(jobId, userId);
//       setTimeout(() => {
//         setApplied(true);
//         setIsApplying(false);
//       }, 1000);
//     } catch (error) {
//       console.error("Apply failed:", error);
//       setIsApplying(false);
//     }
//   };

  return (
    <button
    //   onClick={handleApply}
      disabled={isApplying || applied}
      className={`w-full px-5 py-2 rounded-lg text-sm font-semibold transition ${
        applied
          ? "bg-green-600 text-white cursor-default"
          : "bg-red-600 hover:bg-red-700 text-white"
      }`}
    >
      {applied ? "Bought" : isApplying ? "Buying..." : "Buy now"}
    </button>
  );
};
