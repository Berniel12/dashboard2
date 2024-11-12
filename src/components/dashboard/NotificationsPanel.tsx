import React from "react";
import { Bell, Package, FileCheck, AlertCircle } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: "New Declaration Submitted",
    description: "Acme Corp submitted a new import declaration",
    time: "5 minutes ago",
    icon: Package,
    type: "info"
  },
  {
    id: 2,
    title: "Declaration Approved",
    description: "Declaration DEC-2024-001 has been approved",
    time: "1 hour ago",
    icon: FileCheck,
    type: "success"
  },
  {
    id: 3,
    title: "Missing Documentation",
    description: "Required documents missing for DEC-2024-003",
    time: "2 hours ago",
    icon: AlertCircle,
    type: "warning"
  }
];

export default function NotificationsPanel() {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
        <Bell className="h-5 w-5 text-gray-400" />
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className="p-4 hover:bg-gray-50">
              <div className="flex space-x-3">
                <div className={`
                  flex-shrink-0 rounded-full p-2
                  ${notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'}
                `}>
                  <Icon className={`h-5 w-5
                    ${notification.type === 'success' ? 'text-green-600' :
                      notification.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'}
                  `} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.description}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 