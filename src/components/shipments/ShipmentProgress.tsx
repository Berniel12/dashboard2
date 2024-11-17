'use client';

import React from 'react';
import { Ship } from 'lucide-react';

interface LocationInfo {
  port: string;
  country: string;
  countryCode: string;
}

interface ShipmentProgressProps {
  origin: LocationInfo;
  destination: LocationInfo;
  progress: number;
  status: 'In Transit' | 'At Port' | 'Customs Hold' | 'Cleared' | 'Delivered';
}

export const ShipmentProgress: React.FC<ShipmentProgressProps> = ({
  origin,
  destination,
  progress,
  status,
}) => {
  const LocationCard = ({ location, type }: { location: LocationInfo, type: 'origin' | 'destination' }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 w-full">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {type === 'origin' ? 'From' : 'To'}
          </span>
          
          <div className="w-14 h-10 relative rounded-md overflow-hidden shadow-lg ring-1 ring-black/5">
            <img
              src={`https://flagcdn.com/w320/${location.countryCode.toLowerCase()}.png`}
              alt={`Flag of ${location.country}`}
              className="w-full h-full object-fill"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-base font-semibold text-gray-900">{location.country}</h3>
            <p className="text-xs text-gray-600">{location.port}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <LocationCard location={origin} type="origin" />

      <div className="relative mx-auto flex-1 my-6">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 rounded-full -translate-x-1/2">
          <div 
            className="w-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ height: `${progress}%` }}
          />
        </div>

        <div 
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-500"
          style={{ top: `${progress}%` }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
              <Ship className="w-4 h-4 text-white" />
            </div>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
              {status}
            </span>
          </div>
        </div>
      </div>

      <LocationCard location={destination} type="destination" />
    </div>
  );
}; 