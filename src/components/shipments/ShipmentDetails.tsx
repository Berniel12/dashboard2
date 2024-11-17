'use client';

import React from 'react';
import { Truck, FileCheck, Package, Users } from 'lucide-react';

interface ShipmentDetailsProps {
  transportDetails: {
    mode: string;
    carrier: string;
    vesselName?: string;
    eta: string;
  };
  customsStatus: {
    status: string;
    clearanceDate?: string;
    brokerReference: string;
    customsOffice: string;
  };
  cargoDetails: {
    type: string;
    weight: string;
    volume: string;
    packages: number;
  };
  parties: {
    shipper: string;
    consignee: string;
    notifyParty?: string;
  };
}

export const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  transportDetails,
  customsStatus,
  cargoDetails,
  parties,
}) => {
  const DetailCard = ({ 
    title, 
    icon: Icon, 
    children 
  }: { 
    title: string; 
    icon: React.ElementType; 
    children: React.ReactNode 
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <div className="space-y-1.5">
        {children}
      </div>
    </div>
  );

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 ml-2">{value}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      <DetailCard title="Transport Details" icon={Truck}>
        <DetailRow label="Mode" value={transportDetails.mode} />
        <DetailRow label="Carrier" value={transportDetails.carrier} />
        {transportDetails.vesselName && (
          <DetailRow label="Vessel" value={transportDetails.vesselName} />
        )}
        <DetailRow label="ETA" value={transportDetails.eta} />
      </DetailCard>

      <DetailCard title="Customs Status" icon={FileCheck}>
        <DetailRow label="Status" value={customsStatus.status} />
        {customsStatus.clearanceDate && (
          <DetailRow label="Clearance Date" value={customsStatus.clearanceDate} />
        )}
        <DetailRow label="Reference" value={customsStatus.brokerReference} />
        <DetailRow label="Customs Office" value={customsStatus.customsOffice} />
      </DetailCard>

      <DetailCard title="Cargo Details" icon={Package}>
        <DetailRow label="Type" value={cargoDetails.type} />
        <DetailRow label="Weight" value={cargoDetails.weight} />
        <DetailRow label="Volume" value={cargoDetails.volume} />
        <DetailRow label="Packages" value={cargoDetails.packages.toString()} />
      </DetailCard>

      <DetailCard title="Parties" icon={Users}>
        <DetailRow label="Shipper" value={parties.shipper} />
        <DetailRow label="Consignee" value={parties.consignee} />
        {parties.notifyParty && (
          <DetailRow label="Notify Party" value={parties.notifyParty} />
        )}
      </DetailCard>
    </div>
  );
}; 