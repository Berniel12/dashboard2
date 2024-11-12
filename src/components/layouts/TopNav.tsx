"use client";

import React from 'react';
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell } from 'lucide-react';

export default function TopNav() {
  const { user } = useUser();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-gray-900">Customs Broker Portal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative p-2 text-gray-600 hover:text-gray-900"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            
            <div className="flex items-center gap-2">
              <UserButton afterSignOutUrl="/sign-in" />
              <span className="text-sm font-medium text-gray-700">{user?.fullName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 