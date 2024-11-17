'use client';

import React from 'react';
import { Ship } from 'lucide-react';

interface ShipmentDetails {
  vessel: string;
  status: 'In Transit' | 'At Port' | 'Customs Hold';
  progress: number;
  eta: string;
}

interface ShipmentLocation {
  country: string;
  countryCode: string;
}

interface ShipmentProps {
  id: string;
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  details: ShipmentDetails;
}

interface MiniShipmentListProps {
  shipments: ShipmentProps[];
}

const MiniShipmentList: React.FC<MiniShipmentListProps> = ({ shipments }) => {
  return (
    <div className="space-y-3">
      {shipments.map((shipment) => (
        <div key={shipment.id} className="bg-white rounded-lg p-3 border border-gray-100">
          {/* Top Row: Route with Flags */}
          <div className="flex items-center justify-between mb-3">
            {/* Origin */}
            <div className="flex items-center">
              <div className="w-8 h-5 relative rounded overflow-hidden shadow-sm ring-1 ring-black/5">
                <img
                  src={`https://flagcdn.com/w320/${shipment.origin.countryCode.toLowerCase()}.png`}
                  alt={shipment.origin.country}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-600 ml-2">{shipment.origin.country}</span>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 mx-4 relative">
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full p-1.5 z-10"
                style={{ 
                  left: `${shipment.details.progress}%`,
                }}
              >
                <Ship className="w-3 h-3 text-white" />
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full relative top-[2px]">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${shipment.details.progress}%` }}
                />
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center">
              <span className="text-xs text-gray-600 mr-2">{shipment.destination.country}</span>
              <div className="w-8 h-5 relative rounded overflow-hidden shadow-sm ring-1 ring-black/5">
                <img
                  src={`https://flagcdn.com/w320/${shipment.destination.countryCode.toLowerCase()}.png`}
                  alt={shipment.destination.country}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Bottom Row: Vessel, ETA, and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-1.5 mr-2 border border-blue-500">
                  <Ship className="w-3 h-3 text-blue-500" />
                </div>
                <span className="font-medium text-sm text-gray-900">{shipment.details.vessel}</span>
              </div>
              <span className="text-xs text-gray-500">ETA: {shipment.details.eta}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              shipment.details.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
              shipment.details.status === 'At Port' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {shipment.details.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniShipmentList; 