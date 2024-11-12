import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function ClientsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Client
          </button>
        </div>
        
        {/* Content will go here */}
        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
          <p className="text-gray-500">Clients page content coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 