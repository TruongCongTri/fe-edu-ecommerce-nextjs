'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type MobileDrawerProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
};

const MobileDrawer = ({ isOpen, isLoggedIn, onClose }: MobileDrawerProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const timeout = setTimeout(() => setVisible(false), 200); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          ${visible ? 'block' : 'hidden'}
          md:hidden
        `}
      >
        <div className="flex flex-col p-4 space-y-3 mt-16">
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
              onClick={onClose}
            >
              <i className="fas fa-user mr-2"></i>Profile
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                onClick={onClose}
              >
                <i className="fas fa-user-plus mr-2"></i>Sign Up
              </Link>
              <Link
                href="/login"
                className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
                onClick={onClose}
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
