'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface Declaration {
  id: string;
  reference: string;
  client: string;
  type: 'Import' | 'Export';
  status: 'In Progress' | 'Pending Review' | 'Completed';
  date: string;
}

export default function DeclarationsPage() {
  const [declarations, setDeclarations] = useState<Declaration[]>([
    {
      id: 'DEC-001',
      reference: 'CD-2024-1234',
      client: 'Global Electronics Ltd.',
      type: 'Import',
      status: 'In Progress',
      date: '2024-03-15'
    }
    // Add more sample declarations as needed
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

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
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
                    <td className="px-6 py-4 whitespace-nowrap">{declaration.type}</td>
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