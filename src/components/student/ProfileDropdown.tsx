'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants/routes';
import UserCircleIcon from '../ui/UserCircleIcon';
import CogIcon from '../ui/CogIcon';
import LogoutIcon from '../ui/LogoutIcon';
import { API_URLS } from '@/lib/constants/apiUrls';
import apiClient from '@/lib/api/apiClient';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logout = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef} onMouseEnter={() => setIsOpen(true)}>
      <button
        className="flex items-center cursor-pointer"
        aria-haspopup="true"
        aria-expanded={isOpen}

      >
        <Image
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          alt="User avatar"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full border-gray-300 mr-2"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-xl z-10">
          <ul className="py-1">
            <li>
              <Link href={ROUTES.student.dashboard.profile} className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-base-200">
                <UserCircleIcon className="w-5 h-5 mr-3" />
                Profile
              </Link>
            </li>
            <li>
              <Link href={ROUTES.student.dashboard.settings} className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-base-200">
                <CogIcon className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </li>
            <li>
              <a onClick={(e) => {
                e.preventDefault();
                logout();
              }} className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-base-200">
                <LogoutIcon className="w-5 h-5 mr-3" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
