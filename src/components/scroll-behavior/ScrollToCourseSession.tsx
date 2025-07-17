"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  containerId: string;
  offset?: number; // Optional offset (e.g. for sticky navbar height)
};

export const ScrollToCourseSession = ({ containerId, offset = 64 }: Props) => {
  const searchParams = useSearchParams();
  const selected = searchParams.get("course_selected");

  useEffect(() => {
    if (!selected) return;

    const el = document.getElementById(containerId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

      // Wait for potential layout shift (e.g. SSR content hydration)
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100); // You can tweak this delay
    }
  }, [selected, containerId, offset]);

  return null;
};
