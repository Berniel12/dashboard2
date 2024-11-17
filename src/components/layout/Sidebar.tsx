'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  ChevronUp,
  LogOut,
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

const dashboardTypes = [
  { name: 'Customs Broker', href: '/dashboard' },
  { name: 'Client Portal', href: '/dashboard/client' },
  { name: 'Manager View', href: '/dashboard/manager' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine current dashboard type
  const getCurrentDashboardName = () => {
    if (pathname.includes('/dashboard/client')) return 'Client Portal';
    if (pathname.includes('/dashboard/manager')) return 'Manager View';
    return 'Customs Broker';
  };

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-2 border-b border-blue-700/50">
        <span className="text-2xl font-bold text-white">Versa</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 mt-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                isActive ? 'text-white' : 'text-blue-200'
              }`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Dashboard Switcher */}
      <div className="relative mt-auto pt-4 border-t border-blue-700/50">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-100 rounded-lg hover:bg-blue-700/50"
        >
          <div className="flex items-center">
            <LayoutDashboard className="w-5 h-5 mr-3 text-blue-200" />
            <span>{getCurrentDashboardName()}</span>
          </div>
          <ChevronUp className={`w-4 h-4 transition-transform ${isDropdownOpen ? '' : 'rotate-180'}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute bottom-full left-0 w-full mb-2 bg-blue-800 rounded-lg shadow-lg overflow-hidden">
            {dashboardTypes.map((dashboard) => (
              <Link
                key={dashboard.href}
                href={dashboard.href}
                className={`block px-4 py-2 text-sm text-blue-100 hover:bg-blue-700/50 ${
                  pathname === dashboard.href ? 'bg-blue-700' : ''
                }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                {dashboard.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 