'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Ship, Container, Clock, CheckCircle, AlertTriangle, Calendar, Search, Filter } from 'lucide-react';

interface Shipment {
  id: string;
  reference: string;
  client: string;
  vessel: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'At Port' | 'Cleared' | 'Delayed' | 'Loading' | 'Unloading';
  eta: string;
  containerCount: string;
  type: 'FCL' | 'LCL';
  carrier: string;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: 'SHP-001',
      reference: 'SHIP-2024-001',
      client: 'Global Electronics Ltd.',
      vessel: 'MSC Oscar',
      origin: 'Shanghai',
      destination: 'Los Angeles',
      status: 'In Transit',
      eta: '2024-03-20',
      containerCount: '2 x 40HC',
      type: 'FCL',
      carrier: 'MSC'
    },
    {
      id: 'SHP-002',
      reference: 'SHIP-2024-002',
      client: 'MedTech Solutions',
      vessel: 'Maersk Sealand',
      origin: 'Rotterdam',
      destination: 'New York',
      status: 'At Port',
      eta: '2024-03-18',
      containerCount: '1 x 20GP',
      type: 'FCL',
      carrier: 'Maersk'
    },
    {
      id: 'SHP-003',
      reference: 'SHIP-2024-003',
      client: 'Automotive Parts Inc.',
      vessel: 'CMA CGM Marco Polo',
      origin: 'Singapore',
      destination: 'Dubai',
      status: 'Delayed',
      eta: '2024-03-25',
      containerCount: '1 x 40HC',
      type: 'FCL',
      carrier: 'CMA CGM'
    },
    {
      id: 'SHP-004',
      reference: 'SHIP-2024-004',
      client: 'Fashion Imports Co.',
      vessel: 'COSCO Asia',
      origin: 'Hong Kong',
      destination: 'Vancouver',
      status: 'Loading',
      eta: '2024-03-28',
      containerCount: 'LCL 12 CBM',
      type: 'LCL',
      carrier: 'COSCO'
    },
    {
      id: 'SHP-005',
      reference: 'SHIP-2024-005',
      client: 'Chemical Solutions Ltd.',
      vessel: 'ONE Commitment',
      origin: 'Hamburg',
      destination: 'Santos',
      status: 'In Transit',
      eta: '2024-03-22',
      containerCount: '3 x 20GP',
      type: 'FCL',
      carrier: 'ONE'
    },
    {
      id: 'SHP-006',
      reference: 'SHIP-2024-006',
      client: 'Food & Beverage Traders',
      vessel: 'Evergreen Ever Glory',
      origin: 'Busan',
      destination: 'Melbourne',
      status: 'Unloading',
      eta: '2024-03-17',
      containerCount: '1 x 40RF',
      type: 'FCL',
      carrier: 'Evergreen'
    },
    {
      id: 'SHP-007',
      reference: 'SHIP-2024-007',
      client: 'Sports Equipment Direct',
      vessel: 'Yang Ming Unity',
      origin: 'Kaohsiung',
      destination: 'Oakland',
      status: 'In Transit',
      eta: '2024-03-24',
      containerCount: 'LCL 8 CBM',
      type: 'LCL',
      carrier: 'Yang Ming'
    },
    {
      id: 'SHP-008',
      reference: 'SHIP-2024-008',
      client: 'Textile Imports LLC',
      vessel: 'HMM Helsinki',
      origin: 'Chennai',
      destination: 'Felixstowe',
      status: 'Cleared',
      eta: '2024-03-16',
      containerCount: '2 x 40HC',
      type: 'FCL',
      carrier: 'HMM'
    }
  ]);

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'In Transit':
        return 'text-blue-600 bg-blue-50';
      case 'At Port':
        return 'text-green-600 bg-green-50';
      case 'Cleared':
        return 'text-purple-600 bg-purple-50';
      case 'Delayed':
        return 'text-red-600 bg-red-50';
      case 'Loading':
        return 'text-yellow-600 bg-yellow-50';
      case 'Unloading':
        return 'text-orange-600 bg-orange-50';
    }
  };

  const getStatusIcon = (status: Shipment['status']) => {
    switch (status) {
      case 'In Transit':
        return Ship;
      case 'At Port':
        return Container;
      case 'Cleared':
        return CheckCircle;
      case 'Delayed':
        return AlertTriangle;
      case 'Loading':
        return Clock;
      case 'Unloading':
        return Clock;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Link
          href="/dashboard/shipments/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Shipment
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search shipments..."
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

      {/* Shipments Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vessel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Container</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shipments.map((shipment) => {
                const StatusIcon = getStatusIcon(shipment.status);
                return (
                  <tr key={shipment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Ship className="w-5 h-5 text-gray-400 mr-2" />
                        {shipment.reference}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{shipment.client}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{shipment.vessel}</p>
                        <p className="text-sm text-gray-500">{shipment.carrier}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{shipment.origin}</p>
                        <p className="text-sm text-gray-500">{shipment.destination}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {shipment.eta}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Container className="w-4 h-4 text-gray-400 mr-2" />
                        {shipment.containerCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/dashboard/shipments/${shipment.id}`}
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