"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const roles = [
  { name: 'Broker', path: '/dashboard' },
  { name: 'Client', path: '/dashboard/client' },
  { name: 'Manager', path: '/dashboard/manager' },
];

export const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get the current role based on the URL path
  const currentRole = roles.find(role => pathname.startsWith(role.path)) || roles[0];

  const handleRoleChange = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-gray-700 font-medium">{currentRole.name} View</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-48 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {roles.map((role) => (
            <button
              key={role.path}
              onClick={() => handleRoleChange(role.path)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                pathname.startsWith(role.path)
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700'
              }`}
            >
              {role.name} View
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 