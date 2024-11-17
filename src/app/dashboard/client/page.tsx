'use client';

import React from 'react';
import { 
  FileText, 
  Search, 
  Calendar, 
  Filter, 
  DollarSign, 
  Package, 
  Clock,
  Settings,
  Ship,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ShipmentListItem } from '@/components/shipments/ShipmentListItem';

type ShipmentStatus = 'In Transit' | 'At Port' | 'Customs Hold' | 'Cleared' | 'Delivered';

const shipments = [
  {
    id: 'SHP001',
    origin: {
      port: 'Shanghai Port',
      country: 'China',
      countryCode: 'CN',
    },
    destination: {
      port: 'Los Angeles Port',
      country: 'United States',
      countryCode: 'US',
    },
    details: {
      vessel: 'EVER GIVEN',
      voyage: 'VOY123456',
      eta: '2024-03-20',
      status: 'In Transit' as const,
      progress: 65,
      containerCount: 3,
      containerType: '40ft' as const,
      commodity: 'Electronics',
      bookingRef: 'BK123456',
    },
  },
  {
    id: 'SHP002',
    origin: {
      port: 'Busan Port',
      country: 'South Korea',
      countryCode: 'KR',
    },
    destination: {
      port: 'Rotterdam Port',
      country: 'Netherlands',
      countryCode: 'NL',
    },
    details: {
      vessel: 'MSC OSCAR',
      voyage: 'VOY789012',
      eta: '2024-03-25',
      status: 'At Port' as const,
      progress: 30,
      containerCount: 2,
      containerType: '20ft' as const,
      commodity: 'Auto Parts',
      bookingRef: 'BK789012',
    },
  },
  {
    id: 'SHP003',
    origin: {
      port: 'Yokohama Port',
      country: 'Japan',
      countryCode: 'JP',
    },
    destination: {
      port: 'Vancouver Port',
      country: 'Canada',
      countryCode: 'CA',
    },
    details: {
      vessel: 'ONE HARMONY',
      voyage: 'VOY345678',
      eta: '2024-03-18',
      status: 'Customs Hold' as const,
      progress: 85,
      containerCount: 1,
      containerType: '40ft' as const,
      commodity: 'Machinery',
      bookingRef: 'BK345678',
    },
  },
];

export default function ClientDashboard() {
  const activeShipments = shipments.filter(
    shipment => !['Cleared', 'Delivered'].includes(shipment.details.status)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Client Portal</h1>
            <p className="text-sm text-gray-500">Track your shipments and declarations</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Global Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-56 pl-8 pr-4 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            {/* Quick Filters */}
            <button className="p-1.5 rounded-lg hover:bg-gray-100 relative">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
            {/* Calendar */}
            <button className="p-1.5 rounded-lg hover:bg-gray-100">
              <Calendar className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Active Shipments */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-blue-100">Active Shipments</p>
              <h3 className="text-2xl font-bold mt-0.5">3</h3>
              <p className="text-xs text-blue-100 mt-0.5">2 in transit</p>
            </div>
            <Ship className="w-6 h-6 text-blue-100" />
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-purple-100">Pending Documents</p>
              <h3 className="text-2xl font-bold mt-0.5">2</h3>
              <p className="text-xs text-purple-100 mt-0.5">Action required</p>
            </div>
            <FileText className="w-6 h-6 text-purple-100" />
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-green-100">Avg. Processing</p>
              <h3 className="text-2xl font-bold mt-0.5">2.3 days</h3>
              <p className="text-xs text-green-100 mt-0.5">-8% from last month</p>
            </div>
            <Clock className="w-6 h-6 text-green-100" />
          </div>
        </div>

        {/* Monthly Spend */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-orange-100">Monthly Spend</p>
              <h3 className="text-2xl font-bold mt-0.5">$12,450</h3>
              <p className="text-xs text-orange-100 mt-0.5">Within budget</p>
            </div>
            <DollarSign className="w-6 h-6 text-orange-100" />
          </div>
        </div>
      </div>

      {/* Active Shipments */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <h2 className="text-lg font-medium text-gray-900">Active Shipments</h2>
              <span className="text-sm text-gray-500">({activeShipments.length})</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search shipments..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Track Shipment
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y">
          {activeShipments.map((shipment) => (
            <ShipmentListItem
              key={shipment.id}
              {...shipment}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 