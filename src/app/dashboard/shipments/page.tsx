'use client';

import React from 'react';
import { ShipmentListItem } from '@/components/shipments/ShipmentListItem';

type ShipmentStatus = 'In Transit' | 'At Port' | 'Customs Hold' | 'Cleared' | 'Delivered';

const getStatusPriority = (status: ShipmentStatus): number => {
  const priorities: { [key in ShipmentStatus]: number } = {
    'In Transit': 1,
    'At Port': 2,
    'Customs Hold': 3,
    'Cleared': 4,
    'Delivered': 5,
  };
  return priorities[status];
};

export default function ShipmentsPage() {
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
    {
      id: 'SHP004',
      origin: {
        port: 'Hamburg Port',
        country: 'Germany',
        countryCode: 'DE',
      },
      destination: {
        port: 'New York Port',
        country: 'United States',
        countryCode: 'US',
      },
      details: {
        vessel: 'MAERSK SEALAND',
        voyage: 'VOY901234',
        eta: '2024-03-30',
        status: 'Cleared' as const,
        progress: 95,
        containerCount: 4,
        containerType: '40ft' as const,
        commodity: 'Chemical Products',
        bookingRef: 'BK901234',
      },
    },
    {
      id: 'SHP005',
      origin: {
        port: 'Singapore Port',
        country: 'Singapore',
        countryCode: 'SG',
      },
      destination: {
        port: 'Sydney Port',
        country: 'Australia',
        countryCode: 'AU',
      },
      details: {
        vessel: 'CMA CGM MARCO POLO',
        voyage: 'VOY567890',
        eta: '2024-04-05',
        status: 'In Transit' as const,
        progress: 45,
        containerCount: 2,
        containerType: '40ft' as const,
        commodity: 'Consumer Goods',
        bookingRef: 'BK567890',
      },
    },
  ];

  const sortedShipments = [...shipments].sort((a, b) => {
    // First, sort by status priority
    const statusDiff = getStatusPriority(a.details.status) - getStatusPriority(b.details.status);
    if (statusDiff !== 0) return statusDiff;

    // For same status, sort by progress (lower progress first)
    const progressDiff = a.details.progress - b.details.progress;
    if (progressDiff !== 0) return progressDiff;

    // If progress is the same, sort by ETA (earlier dates first)
    return new Date(a.details.eta).getTime() - new Date(b.details.eta).getTime();
  });

  const activeShipments = sortedShipments.filter(
    shipment => !['Cleared', 'Delivered'].includes(shipment.details.status)
  );

  const completedShipments = sortedShipments.filter(
    shipment => ['Cleared', 'Delivered'].includes(shipment.details.status)
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Shipments</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage your shipments</p>
      </div>

      {/* Active Shipments */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
          <h2 className="text-lg font-medium text-gray-900">Active Shipments</h2>
          <span className="text-sm text-gray-500">({activeShipments.length})</span>
        </div>
        <div className="space-y-4">
          {activeShipments.map((shipment) => (
            <ShipmentListItem
              key={shipment.id}
              {...shipment}
            />
          ))}
        </div>
      </div>

      {/* Completed Shipments */}
      {completedShipments.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-green-500 rounded-full"></div>
            <h2 className="text-lg font-medium text-gray-900">Completed Shipments</h2>
            <span className="text-sm text-gray-500">({completedShipments.length})</span>
          </div>
          <div className="space-y-4">
            {completedShipments.map((shipment) => (
              <ShipmentListItem
                key={shipment.id}
                {...shipment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 