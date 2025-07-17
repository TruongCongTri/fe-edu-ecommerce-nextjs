"use client";

import React from "react";
import Link from "next/link";

export type ProfileCardUser = {
  fullName: string;
  email: string;
  roleLabel?: string;      // e.g., "Student", "Educator", "Web developer"
  avatarUrl?: string | null;
};

interface ProfileCardProps {
  user: ProfileCardUser | null;
  updateProfileHref?: string; // default /profile-dashboard/edit
  className?: string;
}

function getInitials(name: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  updateProfileHref = "/profile-dashboard/edit",
  className = "",
}) => {
  if (!user) {
    return (
      <div
        className={`rounded-xl bg-white shadow-sm p-6 text-center ${className}`}
      >
        <p className="text-gray-500 mb-3">No profile data.</p>
        <Link
          href={updateProfileHref}
          className="text-sm text-green-600 hover:underline font-medium"
        >
          Create your profile →
        </Link>
      </div>
    );
  }

  const { fullName, email, roleLabel, avatarUrl } = user;

  return (
    <div
      className={`rounded-xl bg-white shadow-sm p-6 flex items-center gap-6 ${className}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-bold">
            {getInitials(fullName)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold text-gray-900 truncate">
          {fullName}
        </h2>
        {roleLabel && (
          <div className="text-gray-600 text-sm mt-1 flex items-center gap-2">
            <i className="fas fa-briefcase text-xs" />
            {roleLabel}
          </div>
        )}
        <div className="text-gray-600 text-sm mt-1 flex items-center gap-2 break-all">
          <i className="fas fa-envelope text-xs" />
          {email}
        </div>
        <Link
          href={updateProfileHref}
          className="mt-2 inline-block text-sm text-green-600 hover:underline font-medium"
        >
          Update your profile →
        </Link>
      </div>
    </div>
  );
};
