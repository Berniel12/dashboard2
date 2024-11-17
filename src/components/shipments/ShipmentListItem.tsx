'use client';

import React from 'react';
import { Ship } from 'lucide-react';
import Link from 'next/link';

interface ShipmentListItemProps {
  id: string;
  origin: {
    port: string;
    country: string;
    countryCode: string;
  };
  destination: {
    port: string;
    country: string;
    countryCode: string;
  };
  details: {
    vessel: string;
    voyage: string;
    eta: string;
    status: 'In Transit' | 'At Port' | 'Customs Hold' | 'Cleared' | 'Delivered';
    progress: number;
    containerCount?: number;
    containerType?: '20ft' | '40ft';
    commodity?: string;
    bookingRef?: string;
  };
}

const LocationInfo = ({ port, country, countryCode }: { port: string; country: string; countryCode: string }) => (
  <div className="flex items-center gap-3 min-w-[200px]">
    <div className="w-14 h-10 relative rounded-md overflow-hidden shadow-lg ring-1 ring-black/5">
      <img
        src={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`}
        alt={`Flag of ${country}`}
        className="w-full h-full object-fill"
      />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900">{country}</span>
      <span className="text-xs text-gray-500">{port}</span>
    </div>
  </div>
);

export const ShipmentListItem: React.FC<ShipmentListItemProps> = ({
  id,
  origin,
  destination,
  details,
}) => {
  const getStatusColor = (status: ShipmentListItemProps['details']['status']) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-50 text-blue-700';
      case 'At Port':
        return 'bg-yellow-50 text-yellow-700';
      case 'Customs Hold':
        return 'bg-red-50 text-red-700';
      case 'Cleared':
        return 'bg-green-50 text-green-700';
      case 'Delivered':
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <Link href={`/dashboard/shipments/${id}`}>
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="flex items-center justify-between gap-6">
          {/* Origin */}
          <LocationInfo {...origin} />

          {/* Middle Section with Progress and Details */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Ship className="w-6 h-6 text-blue-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{details.vessel}</span>
                    <span className="text-xs text-gray-500 ml-2">Voyage: {details.voyage}</span>
                  </div>
                </div>
                {details.containerCount && details.containerType && (
                  <span className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                    {details.containerCount}x {details.containerType}
                  </span>
                )}
                {details.commodity && (
                  <span className="text-xs text-gray-600">
                    Cargo: {details.commodity}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {details.bookingRef && (
                  <span className="text-xs text-gray-500">
                    Booking: {details.bookingRef}
                  </span>
                )}
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(details.status)}`}>
                  {details.status}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 w-full bg-gray-100 rounded-full">
                <div 
                  className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${details.progress}%` }}
                />
              </div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
                style={{ left: `${details.progress}%` }}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md -translate-x-1/2 -translate-y-1">
                  <Ship className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">ETA: {details.eta}</span>
              <span className="text-xs text-gray-500">{details.progress}% Complete</span>
            </div>
          </div>

          {/* Destination */}
          <LocationInfo {...destination} />
        </div>
      </div>
    </Link>
  );
}; 