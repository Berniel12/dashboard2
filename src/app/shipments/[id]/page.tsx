'use client';

import React from 'react';
import { ShipmentProgress } from '@/components/shipments/ShipmentProgress';
import { ShipmentTimeline } from '@/components/shipments/ShipmentTimeline';
import { ShipmentDetailsCard } from '@/components/shipments/ShipmentDetailsCard';

export default function ShipmentPage() {
  // This would typically come from an API call using the shipment ID
  const shipmentData = {
    progress: {
      origin: "Shanghai, China",
      destination: "Los Angeles, USA",
      progress: 65,
      status: "In Transit" as const,
    },
    details: {
      transportDetails: {
        vessel: "EVER GIVEN",
        voyage: "VOY123456",
        eta: "2024-03-20",
      },
      cargoDetails: {
        description: "Laptop Computers and Accessories",
        hsCode: "8471.30.0100",
        packages: 250,
        grossWeight: "5000 kg",
        volume: "48 m³",
      },
      customsDetails: {
        entryNumber: "ENTRY123456",
        declarationDate: "2024-03-15",
        duties: "$12,500",
        taxes: "$5,000",
      },
      parties: {
        exporter: {
          name: "Shanghai Electronics Co., Ltd",
          address: "123 Export Zone, Shanghai, China",
        },
        importer: {
          name: "US Tech Imports Inc.",
          address: "456 Import Drive, Los Angeles, CA, USA",
        },
        consignee: {
          name: "West Coast Distribution LLC",
          address: "789 Harbor Blvd, Long Beach, CA, USA",
        },
      },
    },
    timeline: [
      {
        date: "2024-03-15",
        status: "Customs Declaration Filed",
        description: "Customs declaration submitted to US Customs",
        icon: "document",
        documents: [
          {
            name: "Commercial Invoice",
            status: "verified",
            verificationDate: "2024-03-15",
          },
          {
            name: "Packing List",
            status: "verified",
            verificationDate: "2024-03-15",
          },
        ],
      },
      // Add more timeline events as needed
    ],
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Left column - Progress */}
        <div className="col-span-3 h-[calc(100vh-2rem)]">
          <ShipmentProgress {...shipmentData.progress} />
        </div>

        {/* Middle column - Details */}
        <div className="col-span-6">
          <ShipmentDetailsCard {...shipmentData.details} />
        </div>

        {/* Right column - Timeline */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <ShipmentTimeline events={shipmentData.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
} 