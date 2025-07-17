import Navbar from "@/src/components/layouts/Navbar";
import { getNavMenuData } from "@/src/libs/server/getNavMenuData";
import React from "react";

export default async function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [coursesMenu] = await Promise.all([getNavMenuData()]);

  return (
    <div className="bg-gray-100">
      <Navbar courseMenu={coursesMenu} />
      {children}
    </div>
  );
}
