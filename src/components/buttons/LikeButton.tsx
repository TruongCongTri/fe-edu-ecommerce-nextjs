"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { favoriteApi } from "@/src/libs/api-categories/favorite";
import { CreateFavoriteDto } from "@/src/dtos/validation/create-favorite.dto";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type LikeButtonProps = {
  courseId: string;
};

type DecodedToken = {
  id: string;
  email: string;
  exp: number;
};

export const LikeButton = ({ courseId }: LikeButtonProps) => {
  const route = useRouter();
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [favoriteId, setFavoriteId] = useState<string | null>(null); // if already liked, store its id

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.error("Invalid token");
      }
    }

    route.push("/login")
  }, [route]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const { favorites } = await favoriteApi.getAll(); // modify backend to accept query filter if needed
        console.log(favorites);

        const found = favorites.find((fav) => fav.product.id === courseId);
        if (found) {
          setLiked(true);
          console.log(found.id);

          setFavoriteId(found.id);
        }
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };

    fetchFavorites();
  }, [userId, courseId]);

  const handleToggle = async () => {
    console.log("like...");
    console.log(userId);

    if (!userId) return;

    try {
      if (liked && favoriteId) {
        await favoriteApi.remove(favoriteId);
        setLiked(false);
        setFavoriteId(null);
        toast.success("You unsaved a course.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const res = await favoriteApi.add({
          productId: courseId,
        } as CreateFavoriteDto);
        setLiked(true);
        setFavoriteId(res.favorite.id);
        toast.success("This course has been added to your Saved courses.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Toggle like failed:", error);
      toast.error("Failed to Like!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`border px-4 py-2 rounded-lg text-sm font-medium transition ${
        liked
          ? "text-red-600 border-red-500 bg-red-50"
          : "text-gray-600 border-gray-300 hover:bg-gray-100"
      }`}
    >
      <i className={`far fa-heart mr-2 ${liked ? "fas text-red-600" : ""}`}></i>
      {liked ? "Saved" : "Save"}
    </button>
  );
};
