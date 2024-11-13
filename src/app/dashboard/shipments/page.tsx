'use client';

import React, { useState } from 'react';
import { 
  Container, // Changed from Package
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Truck,
  Ship, // Added Ship icon
  Calendar
} from 'lucide-react';

interface Shipment {
  id: string;
  reference: string;
  description: string;
  status: 'In Transit' | 'At Port' | 'Cleared' | 'On Hold';
  location: string;
  containerCount: string;
  eta: string;
  client: string;
  declarationRef: string;
  vessel: string;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: 'SHP-001',
      reference: 'SHIP-2024-001',
      description: 'Laptop Computers - Model XYZ',
      status: 'In Transit',
      location: 'Port of Los Angeles',
      containerCount: '2 x 40HC',
      eta: '2024-03-20',
      client: 'Global Electronics Ltd.',
      declarationRef: 'DEC-001',
      vessel: 'MSC Oscar'
    },
    {
      id: 'SHP-002',
      reference: 'SHIP-2024-002',
      description: 'Medical Supplies',
      status: 'At Port',
      location: 'Main Customs Terminal',
      containerCount: '1 x 20GP',
      eta: '2024-03-15',
      client: 'MedTech Solutions',
      declarationRef: 'DEC-002',
      vessel: 'Maersk Sealand'
    },
    {
      id: 'SHP-003',
      reference: 'SHIP-2024-003',
      description: 'Auto Parts',
      status: 'On Hold',
      location: 'Customs Inspection Area',
      containerCount: '1 x 40HC',
      eta: '2024-03-18',
      client: 'AutoParts Inc.',
      declarationRef: 'DEC-003',
      vessel: 'CMA CGM Marco Polo'
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
      case 'On Hold':
        return 'text-yellow-600 bg-yellow-50';
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
      case 'On Hold':
        return AlertTriangle;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipment Tracking</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search shipments..."
              className="pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Shipments</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <Container className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Transit</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Ship className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">At Port</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Truck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On Hold</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Containers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
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
                        <Container className="w-5 h-5 text-gray-400 mr-2" />
                        {shipment.reference}
                      </div>
                    </td>
                    <td className="px-6 py-4">{shipment.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{shipment.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{shipment.containerCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{shipment.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {shipment.eta}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800">
                        View Details
                      </button>
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