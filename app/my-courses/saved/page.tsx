"use client";
import SavedCoursesTab from "@/src/components/layouts/SavedCoursesTab";
import Sidebar from "@/src/components/layouts/Sidebar";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { IFavorite } from "@/src/types/IFavorite";
import { favoriteApi } from "@/src/libs/api-categories/favorite";

type DecodedToken = {
  id: string;
  email: string;
  exp: number;
  name: string;
};

export default function SavedPage() {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [likedCourses, setLikedCourses] = useState<IFavorite[]>([]);

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
        const { favorites } = await favoriteApi.getAll();
        setLikedCourses(favorites)
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };

    fetchFavorites();
  }, [userId]);

  console.log(likedCourses);
  
  return (
    <div className="flex">
      <Sidebar active="saved" name={userName} />
      <div className="flex-1 p-6">
        <SavedCoursesTab savedCourses={likedCourses} />
      </div>
    </div>
  );
}
