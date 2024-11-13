'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Truck,
  Building2,
  Calendar
} from 'lucide-react';

interface InventoryItem {
  id: string;
  reference: string;
  description: string;
  status: 'In Transit' | 'In Warehouse' | 'Cleared' | 'On Hold';
  location: string;
  quantity: string;
  arrivalDate: string;
  client: string;
  declarationRef: string;
  warehouse: string;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'INV-001',
      reference: 'SHIP-2024-001',
      description: 'Laptop Computers - Model XYZ',
      status: 'In Transit',
      location: 'Port of Los Angeles',
      quantity: '100 units',
      arrivalDate: '2024-03-20',
      client: 'Global Electronics Ltd.',
      declarationRef: 'DEC-001',
      warehouse: 'Warehouse A'
    },
    {
      id: 'INV-002',
      reference: 'SHIP-2024-002',
      description: 'Medical Supplies',
      status: 'In Warehouse',
      location: 'Main Customs Warehouse',
      quantity: '500 boxes',
      arrivalDate: '2024-03-15',
      client: 'MedTech Solutions',
      declarationRef: 'DEC-002',
      warehouse: 'Warehouse B'
    },
    {
      id: 'INV-003',
      reference: 'SHIP-2024-003',
      description: 'Auto Parts',
      status: 'On Hold',
      location: 'Customs Inspection Area',
      quantity: '200 pieces',
      arrivalDate: '2024-03-18',
      client: 'AutoParts Inc.',
      declarationRef: 'DEC-003',
      warehouse: 'Warehouse C'
    }
  ]);

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'In Transit':
        return 'text-blue-600 bg-blue-50';
      case 'In Warehouse':
        return 'text-green-600 bg-green-50';
      case 'Cleared':
        return 'text-purple-600 bg-purple-50';
      case 'On Hold':
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusIcon = (status: InventoryItem['status']) => {
    switch (status) {
      case 'In Transit':
        return Truck;
      case 'In Warehouse':
        return Building2;
      case 'Cleared':
        return CheckCircle;
      case 'On Hold':
        return AlertTriangle;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inventory..."
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
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold">800</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Transit</p>
              <p className="text-2xl font-bold">120</p>
            </div>
            <Truck className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Warehouse</p>
              <p className="text-2xl font-bold">450</p>
            </div>
            <Building2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On Hold</p>
              <p className="text-2xl font-bold">30</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => {
                const StatusIcon = getStatusIcon(item.status);
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="w-5 h-5 text-gray-400 mr-2" />
                        {item.reference}
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {item.arrivalDate}
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