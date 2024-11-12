import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AIModelSelector from '@/components/settings/AIModelSelector';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* AI Model Settings */}
          <AIModelSelector />

          {/* Other settings sections can go here */}
        </div>
      </div>
    </DashboardLayout>
  );
} 