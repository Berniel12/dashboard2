'use client';

import { FileText, Home, Settings, FileSpreadsheet, Users, Clock } from 'lucide-react';
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
    name: 'Inventory',
    href: '/dashboard/inventory',
    icon: FileSpreadsheet
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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Customs Broker</h2>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 