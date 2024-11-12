import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  description?: string;
}

export default function StatCard({ title, value, trend, trendDirection, description }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          trendDirection === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {trendDirection === 'up' ? (
            <ArrowUp className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDown className="mr-1 h-3 w-3" />
          )}
          {trend}
        </div>
      </div>
      <p className="mt-4 text-4xl font-bold text-gray-900">{value}</p>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
} 