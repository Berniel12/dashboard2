'use client';

import React from 'react';
import { Clock, FileText, CheckCircle, AlertCircle, Ship, Package, DollarSign } from 'lucide-react';

interface TimelineEvent {
  date: string;
  status: string;
  description: string;
  documents?: {
    name: string;
    status: 'verified' | 'pending' | 'missing';
    verificationDate?: string;
  }[];
  icon?: 'document' | 'shipping' | 'customs' | 'delivery';
}

interface ShipmentTimelineProps {
  events: TimelineEvent[];
}

export const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({ events }) => {
  const getEventIcon = (type: TimelineEvent['icon']) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'shipping':
        return Ship;
      case 'customs':
        return DollarSign;
      case 'delivery':
        return Package;
      default:
        return Clock;
    }
  };

  const getDocumentStatusColor = (status: 'verified' | 'pending' | 'missing') => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'missing':
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="relative space-y-4 ml-4">
      {events.map((event, index) => {
        const Icon = getEventIcon(event.icon);
        return (
          <div key={index} className="relative">
            <div className="absolute -left-8 mt-0.5">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-blue-600" />
              </div>
            </div>
            {index < events.length - 1 && (
              <div className="absolute -left-6 top-6 bottom-0 w-0.5 bg-gray-200" />
            )}

            <div className="pl-3">
              <div className="font-medium text-gray-900 text-sm">{event.status}</div>
              <div className="text-xs text-gray-500">{event.date}</div>
              <div className="mt-1 text-xs text-gray-600">{event.description}</div>
              
              {event.documents && event.documents.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {event.documents.map((doc, docIndex) => (
                    <div 
                      key={docIndex}
                      className="flex items-center justify-between p-1.5 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-3 h-3 text-gray-400" />
                        <span className="text-xs font-medium">{doc.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.verificationDate && (
                          <span className="text-xs text-gray-500">
                            Verified: {doc.verificationDate}
                          </span>
                        )}
                        <span className={`
                          px-1.5 py-0.5 rounded-full text-xs font-medium
                          ${getDocumentStatusColor(doc.status)}
                        `}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}; 