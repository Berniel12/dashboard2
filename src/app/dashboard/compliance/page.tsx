import React from 'react';
import IntegrationStatus from '@/components/compliance/IntegrationStatus';
import OpenCases from '@/components/compliance/OpenCases';

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Compliance</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Run Audit
        </button>
      </div>
      
      {/* Integration Status */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Integration Status</h2>
        <IntegrationStatus />
      </div>

      {/* Open Cases */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Open Cases</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Cases
          </button>
        </div>
        <OpenCases />
      </div>
    </div>
  );
} 