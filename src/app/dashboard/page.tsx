"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import DeclarationsTable from '../../components/dashboard/DeclarationsTable';
import TasksList from '../../components/dashboard/TasksList';
import NotificationsPanel from '../../components/dashboard/NotificationsPanel';
import Modal from '@/components/ui/Modal';
import HSCodeLookup from '@/components/customs/HSCodeLookup';

export default function DashboardPage() {
  const [isHSModalOpen, setIsHSModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Pending Declarations"
            value="24"
            trend="+12%"
            trendDirection="up"
            description="Declarations awaiting processing"
          />
          <StatCard
            title="Customs Duties"
            value="$45,890"
            trend="+8%"
            trendDirection="up"
            description="Total duties this month"
          />
          <StatCard
            title="Compliance Rate"
            value="98.5%"
            trend="+0.5%"
            trendDirection="up"
            description="Declaration acceptance rate"
          />
          <StatCard
            title="Average Processing"
            value="1.2 days"
            trend="-0.3"
            trendDirection="down"
            description="Average declaration processing time"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="p-4 bg-white rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900">New Declaration</h3>
            <p className="mt-1 text-xs text-gray-500">Create a new customs declaration</p>
          </button>
          <button 
            onClick={() => setIsHSModalOpen(true)}
            className="p-4 bg-white rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
          >
            <h3 className="text-sm font-medium text-gray-900">HS Code Lookup</h3>
            <p className="mt-1 text-xs text-gray-500">Search harmonized system codes</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900">Duty Calculator</h3>
            <p className="mt-1 text-xs text-gray-500">Calculate import duties and taxes</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900">Document Upload</h3>
            <p className="mt-1 text-xs text-gray-500">Upload supporting documents</p>
          </button>
        </div>

        {/* HS Code Lookup Modal */}
        <Modal
          isOpen={isHSModalOpen}
          onClose={() => setIsHSModalOpen(false)}
          title="HS Code Lookup"
        >
          <HSCodeLookup />
        </Modal>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <DeclarationsTable />
            {/* Compliance Alerts */}
            <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Compliance Alerts</h2>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                  <span>⚠️</span>
                  <span className="ml-2">3 declarations require additional documentation</span>
                </div>
                <div className="flex items-center text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                  <span>ℹ️</span>
                  <span className="ml-2">New tariff rates effective from next month</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <TasksList />
            <NotificationsPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 