"use client";
import Sidebar from "@/src/components/layouts/Sidebar";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import ProfileOverview from "@/src/components/layouts/ProfileOverview";


type DecodedToken = {
  id: string;
  email: string;
  exp: number;
  name: string;
};

export default function ProfileDashboardPage() {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserName(decoded.name);
        setUserEmail(decoded.email);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar active="dashboard" name={userName} />
      <div className="flex-1 p-6">
        <ProfileOverview name={userName} email={userEmail} />
      </div>
    </div>
  );
}
