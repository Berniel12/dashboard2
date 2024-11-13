'use client';

import { FileText, Home, Settings, Container, Users, Clock, Bell } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    name: 'Declarations',
    href: '/dashboard/declarations',
    icon: FileText
  },
  {
    name: 'Clients',
    href: '/dashboard/clients',
    icon: Users
  },
  {
    name: 'Shipments',
    href: '/dashboard/shipments',
    icon: Container
  },
  {
    name: 'Compliance',
    href: '/dashboard/compliance',
    icon: Clock
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-indigo-700 text-xl font-bold">V</span>
            </div>
            <h2 className="text-xl font-bold">Versa</h2>
          </div>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-indigo-100 hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-200'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* User Profile Section */}
        <div className="p-6 border-t border-indigo-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-indigo-200">Senior Broker</p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-white/5 text-indigo-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {navigationItems.find(item => pathname.startsWith(item.href))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </div>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-700 font-medium">JD</span>
              </div>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 