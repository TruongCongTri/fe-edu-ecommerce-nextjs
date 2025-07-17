"use client";
import Sidebar from "@/src/components/layouts/Sidebar";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { IFavorite } from "@/src/types/IFavorite";
import { viewHistoryApi } from "@/src/libs/api-categories/view-history";
import { RecentViewedTab } from "@/src/components/layouts/RecentViewedTab";


type DecodedToken = {
  id: string;
  email: string;
  exp: number;
  name: string;
};


export default function RecentViewedPage() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [viewedCourses, setViewedCourses] = useState<IFavorite[]>([]);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.id);
        setUserName(decoded.name);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const { viewHistories } = await viewHistoryApi.getAll();
        setViewedCourses(viewHistories);
      } catch (err) {
        console.error("Failed to load recent history", err);
      }
    };

    fetchFavorites();
  }, [userId]);
  return (
    <div className="flex">
      <Sidebar active="recent" name={userName} />
      <div className="flex-1 p-6">
        <RecentViewedTab recentCourses={viewedCourses} />
      </div>
    </div>
  );
}
