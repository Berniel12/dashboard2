'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Ship, 
  Users, 
  Settings, 
  Lightbulb,
  AlertCircle,
  Upload,
  BarChart2,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Declarations', href: '/dashboard/declarations', icon: FileText },
  { name: 'Shipments', href: '/dashboard/shipments', icon: Ship },
  { name: 'Insights', href: '/dashboard/insights', icon: Lightbulb },
  { name: 'Clients', href: '/dashboard/clients', icon: Users },
  { name: 'Documents', href: '/dashboard/documents', icon: Upload },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart2 },
  { name: 'Compliance', href: '/dashboard/compliance', icon: AlertCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      {/* Logo */}
      <div className="h-16 flex items-center px-2">
        <span className="text-xl font-bold text-gray-900">CustomsClear</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                isActive ? 'text-blue-700' : 'text-gray-400'
              }`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 