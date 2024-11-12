"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import DeclarationsTable from '../../components/dashboard/DeclarationsTable';
import TasksList from '../../components/dashboard/TasksList';
import NotificationsPanel from '../../components/dashboard/NotificationsPanel';
import Modal from '@/components/ui/Modal';
import NewDeclarationForm from '@/components/declarations/NewDeclarationForm';
import HSCodeLookup from '@/components/customs/HSCodeLookup';
import { FileText, Calculator, Search, Upload, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const [isHSModalOpen, setIsHSModalOpen] = useState(false);
  const [isDeclarationModalOpen, setIsDeclarationModalOpen] = useState(false);

  const handleNewDeclaration = (data: any) => {
    console.log('New Declaration Data:', data);
    setIsDeclarationModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Declarations"
            value="24"
            trend="+12%"
            trendDirection="up"
            description="Declarations in progress"
          />
          <StatCard
            title="Pending Reviews"
            value="8"
            trend="-3"
            trendDirection="down"
            description="Awaiting approval"
          />
          <StatCard
            title="Monthly Revenue"
            value="$156K"
            trend="+23%"
            trendDirection="up"
            description="This month's earnings"
          />
          <StatCard
            title="Compliance Rate"
            value="98.5%"
            trend="+0.5%"
            trendDirection="up"
            description="Declaration accuracy"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setIsDeclarationModalOpen(true)}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-900">New Declaration</span>
            </button>
            
            <button 
              onClick={() => setIsHSModalOpen(true)}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-900">HS Code Lookup</span>
            </button>
            
            <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-900">Duty Calculator</span>
            </button>
            
            <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-colors">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-900">Upload Documents</span>
            </button>
          </div>
        </div>

        {/* New Declaration Modal */}
        <Modal
          isOpen={isDeclarationModalOpen}
          onClose={() => setIsDeclarationModalOpen(false)}
          title="Create New Declaration"
        >
          <NewDeclarationForm
            onSubmit={handleNewDeclaration}
            onCancel={() => setIsDeclarationModalOpen(false)}
          />
        </Modal>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Declarations */}
          <div className="lg:col-span-2 space-y-8">
            <DeclarationsTable />
            
            {/* Compliance Alerts */}
            <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <h2 className="text-base font-semibold text-gray-900">Compliance Alerts</h2>
              </div>
              <div className="p-6 space-y-4">
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

          {/* Right Column - Tasks & Notifications */}
          <div className="space-y-8">
            <TasksList />
            <NotificationsPanel />
          </div>
        </div>

        {/* HS Code Lookup Modal */}
        <Modal
          isOpen={isHSModalOpen}
          onClose={() => setIsHSModalOpen(false)}
          title="HS Code Lookup"
        >
          <HSCodeLookup />
        </Modal>
      </div>
    </DashboardLayout>
  );
} 