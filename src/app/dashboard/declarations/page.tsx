'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, Clock, CheckCircle, AlertTriangle, Search, Filter } from 'lucide-react';

interface Declaration {
  id: string;
  reference: string;
  client: string;
  type: 'Import' | 'Export';
  status: 'In Progress' | 'Pending Review' | 'Completed';
  date: string;
  value: string;
  currency: string;
  hsCode: string;
  origin: string;
  destination: string;
}

export default function DeclarationsPage() {
  const [declarations, setDeclarations] = useState<Declaration[]>([
    {
      id: 'DEC-001',
      reference: 'CD-2024-1234',
      client: 'Global Electronics Ltd.',
      type: 'Import',
      status: 'In Progress',
      date: '2024-03-15',
      value: '75,000',
      currency: 'USD',
      hsCode: '8471.30.0000',
      origin: 'China',
      destination: 'United States'
    },
    {
      id: 'DEC-002',
      reference: 'CD-2024-1235',
      client: 'MedTech Solutions',
      type: 'Import',
      status: 'Pending Review',
      date: '2024-03-14',
      value: '120,000',
      currency: 'EUR',
      hsCode: '9018.90.0000',
      origin: 'Germany',
      destination: 'United States'
    },
    {
      id: 'DEC-003',
      reference: 'CD-2024-1236',
      client: 'Automotive Parts Inc.',
      type: 'Import',
      status: 'Completed',
      date: '2024-03-13',
      value: '45,000',
      currency: 'USD',
      hsCode: '8708.29.0000',
      origin: 'Japan',
      destination: 'United States'
    },
    {
      id: 'DEC-004',
      reference: 'CD-2024-1237',
      client: 'Fashion Imports Co.',
      type: 'Import',
      status: 'In Progress',
      date: '2024-03-15',
      value: '85,000',
      currency: 'USD',
      hsCode: '6204.32.0000',
      origin: 'Vietnam',
      destination: 'United States'
    },
    {
      id: 'DEC-005',
      reference: 'CD-2024-1238',
      client: 'Chemical Solutions Ltd.',
      type: 'Export',
      status: 'Pending Review',
      date: '2024-03-14',
      value: '250,000',
      currency: 'USD',
      hsCode: '2833.21.0000',
      origin: 'United States',
      destination: 'Mexico'
    },
    {
      id: 'DEC-006',
      reference: 'CD-2024-1239',
      client: 'Food & Beverage Traders',
      type: 'Import',
      status: 'Completed',
      date: '2024-03-12',
      value: '65,000',
      currency: 'EUR',
      hsCode: '2106.90.0000',
      origin: 'Italy',
      destination: 'United States'
    },
    {
      id: 'DEC-007',
      reference: 'CD-2024-1240',
      client: 'Sports Equipment Direct',
      type: 'Export',
      status: 'In Progress',
      date: '2024-03-15',
      value: '95,000',
      currency: 'USD',
      hsCode: '9506.91.0000',
      origin: 'United States',
      destination: 'Canada'
    },
    {
      id: 'DEC-008',
      reference: 'CD-2024-1241',
      client: 'Furniture Wholesale Co.',
      type: 'Import',
      status: 'Completed',
      date: '2024-03-11',
      value: '180,000',
      currency: 'USD',
      hsCode: '9403.50.0000',
      origin: 'Malaysia',
      destination: 'United States'
    }
  ]);

  const getStatusColor = (status: Declaration['status']) => {
    switch (status) {
      case 'In Progress':
        return 'text-blue-600 bg-blue-50';
      case 'Pending Review':
        return 'text-yellow-600 bg-yellow-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: Declaration['status']) => {
    switch (status) {
      case 'In Progress':
        return Clock;
      case 'Pending Review':
        return AlertTriangle;
      case 'Completed':
        return CheckCircle;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Declarations</h1>
        <Link
          href="/dashboard/declarations/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Declaration
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search declarations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Declarations Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {declarations.map((declaration) => {
                const StatusIcon = getStatusIcon(declaration.status);
                return (
                  <tr key={declaration.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-2" />
                        {declaration.reference}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{declaration.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        declaration.type === 'Import' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {declaration.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {declaration.value} {declaration.currency}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{declaration.origin}</p>
                        <p className="text-sm text-gray-500">{declaration.destination}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(declaration.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {declaration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{declaration.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/dashboard/declarations/${declaration.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 