import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        
        {/* Content will go here */}
        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
          <p className="text-gray-500">Settings page content coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 