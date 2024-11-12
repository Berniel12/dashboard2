"use client";

import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { Search, Filter, Download } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import NewDeclarationForm from '@/components/declarations/NewDeclarationForm';

const declarations = [
  {
    id: 'DEC-001',
    client: 'Acme Corp',
    type: 'Import',
    status: 'In Progress',
    date: '2024-01-15',
    value: '$45,000',
    port: 'Port of Los Angeles',
    agent: 'John Smith'
  },
  {
    id: 'DEC-002',
    client: 'TechCo Ltd',
    type: 'Export',
    status: 'Pending Review',
    date: '2024-01-14',
    value: '$32,500',
    port: 'Port of New York',
    agent: 'Sarah Johnson'
  },
  {
    id: 'DEC-003',
    client: 'Global Trade Inc',
    type: 'Import',
    status: 'Completed',
    date: '2024-01-13',
    value: '$78,900',
    port: 'Port of Miami',
    agent: 'Mike Brown'
  },
  {
    id: 'DEC-004',
    client: 'Innovate Systems',
    type: 'Export',
    status: 'Draft',
    date: '2024-01-12',
    value: '$21,300',
    port: 'Port of Seattle',
    agent: 'Emily Davis'
  },
  {
    id: 'DEC-005',
    client: 'Trade Solutions',
    type: 'Import',
    status: 'In Progress',
    date: '2024-01-11',
    value: '$94,200',
    port: 'Port of Houston',
    agent: 'Alex Wilson'
  }
];

export default function DeclarationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewDeclaration = (data: any) => {
    console.log('New Declaration Data:', data);
    // Here you would typically:
    // 1. Send data to your API
    // 2. Update the declarations list
    // 3. Show a success message
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Declarations</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            New Declaration
          </button>
        </div>

        {/* New Declaration Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Declaration"
        >
          <NewDeclarationForm
            onSubmit={handleNewDeclaration}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>

        {/* Filters and Search */}
        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search declarations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <select className="border rounded-lg px-4 py-2">
              <option>All Types</option>
              <option>Import</option>
              <option>Export</option>
              <option>Transit</option>
            </select>

            <select className="border rounded-lg px-4 py-2">
              <option>All Status</option>
              <option>Draft</option>
              <option>In Progress</option>
              <option>Pending Review</option>
              <option>Completed</option>
            </select>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                More Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Declarations Table */}
        <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Declaration ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Port
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {declarations.map((declaration) => (
                  <tr key={declaration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                      <a href={`/declarations/${declaration.id}`}>{declaration.id}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {declaration.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {declaration.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${declaration.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          declaration.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {declaration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {declaration.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {declaration.port}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {declaration.agent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {declaration.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 