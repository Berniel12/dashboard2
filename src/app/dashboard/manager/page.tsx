'use client';

import React from 'react';
import AgencyPerformanceWidget from '@/components/dashboard/AgencyPerformanceWidget';
import BrokerRankingWidget from '@/components/dashboard/BrokerRankingWidget';
import TopClientsWidget from '@/components/dashboard/TopClientsWidget';

export default function ManagerDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Manager Dashboard</h1>
        <p className="text-gray-600">Agency-wide performance metrics</p>
      </div>
      
      <div className="space-y-6">
        <AgencyPerformanceWidget />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BrokerRankingWidget />
          <TopClientsWidget />
        </div>
      </div>
    </div>
  );
} 