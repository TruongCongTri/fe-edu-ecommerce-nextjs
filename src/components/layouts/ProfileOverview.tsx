"use client";

import React from "react";

export default function ProfileOverview({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <div className="space-y-6 min-h-[100%]">
      <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-bold">
          T
        </div>
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-gray-600">{email}</p>
          <a href="#" className="text-blue-600 text-sm font-medium">
            Update your profile
          </a>
        </div>
      </div>
    </div>
  );
}
