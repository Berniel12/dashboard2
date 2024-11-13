"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, Search, Calculator, Upload } from 'lucide-react';

const stats = [
  {
    title: "Active Declarations",
    value: "24",
    change: "+12%",
    description: "Declarations in progress"
  },
  {
    title: "Pending Reviews",
    value: "8",
    change: "-3",
    description: "Awaiting approval"
  },
  {
    title: "Monthly Revenue",
    value: "$156K",
    change: "+23%",
    description: "This month's earnings"
  },
  {
    title: "Compliance Rate",
    value: "98.5%",
    change: "+0.5%",
    description: "Declaration accuracy"
  }
];

const quickActions = [
  {
    name: "New Declaration",
    href: "/dashboard/declarations/new",
    icon: FileText,
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "HS Code Lookup",
    href: "/dashboard/hs-lookup",
    icon: Search,
    color: "bg-purple-100 text-purple-600"
  },
  {
    name: "Duty Calculator",
    href: "/dashboard/calculator",
    icon: Calculator,
    color: "bg-green-100 text-green-600"
  },
  {
    name: "Upload Documents",
    href: "/dashboard/documents/upload",
    icon: Upload,
    color: "bg-orange-100 text-orange-600"
  }
];

export default function DashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            {/* Theme toggle icon */}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            {/* Notifications icon */}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <span className={`text-sm ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`p-3 rounded-full ${action.color} mb-3`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">{action.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 