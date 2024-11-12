"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  FileText,
  Users,
  Settings,
  Box,
  AlertCircle
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Declarations', href: '/declarations', icon: FileText },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Inventory', href: '/inventory', icon: Box },
  { name: 'Compliance', href: '/compliance', icon: AlertCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Broker Portal</h2>
      </div>
      <nav className="p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'
                }`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 