'use client';

import React from 'react';
import { ShipmentProgress } from '@/components/shipments/ShipmentProgress';
import { ShipmentTimeline } from '@/components/shipments/ShipmentTimeline';
import { ShipmentDetailsCard } from '@/components/shipments/ShipmentDetailsCard';

// First, define the LocationInfo interface if it's not already defined
interface LocationInfo {
  port: string;
  country: string;
  countryCode: string;
}

interface ShipmentProgressProps {
  origin: LocationInfo;
  destination: LocationInfo;
  progress: number;
  status: "In Transit" | "At Port" | "Customs Hold" | "Cleared";
}

export default function ShipmentPage({ params }: { params: { id: string } }) {
  // This would typically come from an API call using the shipment ID
  const shipmentData = {
    progress: {
      origin: {
        port: "Shanghai Port",
        country: "China",
        countryCode: "CN"
      },
      destination: {
        port: "Los Angeles Port",
        country: "United States",
        countryCode: "US"
      },
      progress: 65,
      status: "In Transit" as const,
    },
    details: {
      transportDetails: {
        vessel: "EVER GIVEN",
        voyage: "VOY123456",
        eta: "2024-03-20",
        containerCount: 3,
        containerType: "40ft",
        commodity: "Electronics",
        bookingRef: "BK123456",
      },
      cargoDetails: {
        description: "Laptop Computers and Accessories",
        hsCode: "8471.30.0100",
        packages: 250,
        grossWeight: "5000 kg",
        volume: "48 m³",
        classifications: [
          { type: "non-hazardous", label: "Non-Hazardous" },
          { type: "non-refrigerated", label: "Non-Refrigerated" },
          { type: "container-40ft", label: "40ft Container" },
          { type: "dry-cargo", label: "Dry Cargo" },
          { type: "stackable", label: "Stackable" }
        ],
      },
      customsDetails: {
        declarationType: "Import",
        status: "In Progress",
        customsOffice: "Los Angeles Customs",
        declarationNumber: "DEC123456",
        entryNumber: "ENTRY123456",
        declarationDate: "2024-03-15",
        duties: "$12,500",
        taxes: "$5,000",
        documents: [
          {
            name: "Commercial Invoice",
            status: "completed" as const,
            date: "2024-03-10",
          },
          {
            name: "Packing List",
            status: "completed" as const,
            date: "2024-03-10",
          }
        ],
      },
      parties: {
        exporter: {
          name: "Shanghai Electronics Co., Ltd",
          address: "123 Export Zone, Shanghai, China",
          domain: "shanghai-electronics.com",
        },
        importer: {
          name: "US Tech Imports Inc.",
          address: "456 Import Drive, Los Angeles, CA, USA",
          domain: "ustechimports.com",
        },
        consignee: {
          name: "West Coast Distribution LLC",
          address: "789 Harbor Blvd, Long Beach, CA, USA",
          domain: "westcoastdist.com",
        },
      },
    },
    timeline: [
      {
        date: "2024-03-15",
        status: "Customs Declaration Filed",
        description: "Customs declaration submitted to US Customs",
        icon: "document" as const,
        documents: [
          {
            name: "Commercial Invoice",
            status: "verified" as const,
            verificationDate: "2024-03-15",
          },
          {
            name: "Packing List",
            status: "verified" as const,
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
          <ShipmentProgress 
            origin={shipmentData.progress.origin}
            destination={shipmentData.progress.destination}
            progress={shipmentData.progress.progress}
            status={shipmentData.progress.status}
          />
        </div>

        {/* Middle column - Details */}
        <div className="col-span-6">
          <ShipmentDetailsCard 
            {...{
              ...shipmentData.details,
              cargoDetails: {
                ...shipmentData.details.cargoDetails,
                classifications: [...shipmentData.details.cargoDetails.classifications]
              },
              customsDetails: {
                ...shipmentData.details.customsDetails,
                status: shipmentData.details.customsDetails.status || "Pending",
              },
              parties: {
                shipper: shipmentData.details.parties.exporter.name,
                consignee: shipmentData.details.parties.consignee.name,
                notifyParty: shipmentData.details.parties.importer.name
              }
            }}
          />
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