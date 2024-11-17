'use client';

import React from 'react';
import { Truck, FileCheck, Package, Users, Building2, Thermometer, AlertTriangle, Box, Container as ContainerIcon, Scale, PackageCheck } from 'lucide-react';

interface PartyInfo {
  name: string;
  address: string;
  domain?: string;
}

interface CustomsDocument {
  name: string;
  status: 'completed' | 'pending' | 'not-started';
  date?: string;
}

interface CargoClassification {
  type: 'non-hazardous' | 'non-refrigerated' | 'container-20ft' | 'container-40ft' | 'dry-cargo' | 'stackable';
  label: string;
}

interface ShipmentDetailsCardProps {
  transportDetails: {
    vessel: string;
    voyage: string;
    eta: string;
  };
  cargoDetails: {
    description: string;
    hsCode: string;
    packages: number;
    grossWeight: string;
    volume: string;
    classifications: CargoClassification[];
  };
  customsDetails: {
    entryNumber: string;
    declarationDate: string;
    duties: string;
    taxes: string;
    documents: CustomsDocument[];
  };
  parties: {
    exporter: PartyInfo;
    importer: PartyInfo;
    consignee: PartyInfo;
  };
}

export const ShipmentDetailsCard: React.FC<ShipmentDetailsCardProps> = ({
  transportDetails,
  cargoDetails,
  customsDetails,
  parties,
}) => {
  const DetailSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100 h-[280px] flex flex-col">
      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-2 gap-2 text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );

  const PartyCard = ({ title, name, address, domain }: { title: string; name: string; address: string; domain?: string }) => {
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const getRandomColor = (text: string) => {
      const colors = [
        'bg-blue-100 text-blue-600',
        'bg-purple-100 text-purple-600',
        'bg-green-100 text-green-600',
        'bg-amber-100 text-amber-600',
        'bg-rose-100 text-rose-600',
        'bg-indigo-100 text-indigo-600',
      ];
      const index = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return colors[index % colors.length];
    };

    const colorClass = getRandomColor(name);

    return (
      <div className="bg-white rounded-lg p-2.5 border border-gray-100">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${colorClass} flex items-center justify-center font-semibold text-sm`}>
            {getInitials(name)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                {title}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900 truncate mt-0.5">{name}</div>
            <div className="text-[11px] text-gray-600 truncate mt-0.5">{address}</div>
          </div>
        </div>
      </div>
    );
  };

  const DocumentStatus = ({ status }: { status: CustomsDocument['status'] }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'completed':
          return 'bg-green-500';
        case 'pending':
          return 'bg-yellow-500';
        case 'not-started':
          return 'bg-gray-300';
      }
    };

    return (
      <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
    );
  };

  const CargoClassificationIcon = ({ type, label }: CargoClassification) => {
    const getIcon = () => {
      switch (type) {
        case 'non-hazardous':
          return <AlertTriangle className="w-3.5 h-3.5 text-green-500" />;
        case 'non-refrigerated':
          return <Thermometer className="w-3.5 h-3.5 text-blue-500" />;
        case 'container-40ft':
          return <ContainerIcon className="w-3.5 h-3.5 text-gray-500" />;
        case 'dry-cargo':
          return <Box className="w-3.5 h-3.5 text-amber-500" />;
        case 'stackable':
          return <Scale className="w-3.5 h-3.5 text-purple-500" />;
        default:
          return <Box className="w-3.5 h-3.5 text-gray-400" />;
      }
    };

    return (
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
          {getIcon()}
        </div>
        <span className="text-[9px] text-gray-600 text-center leading-tight">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      <DetailSection title="Transport Details">
        <div className="flex flex-col h-full">
          <div className="relative h-24 w-full rounded-lg overflow-hidden bg-gray-100">
            <img
              src="/images/vessel-cma-cgm.jpg"
              alt={`Vessel ${transportDetails.vessel}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5">
              <span className="text-white text-xs font-medium">
                {transportDetails.vessel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3">
            <DetailRow label="Vessel" value={transportDetails.vessel} />
            <DetailRow label="Voyage" value={transportDetails.voyage} />
            <DetailRow label="ETA" value={transportDetails.eta} />
            <DetailRow label="Status" value="On Schedule" />
            <DetailRow label="Port of Loading" value="Shanghai" />
            <DetailRow label="Port of Discharge" value="Los Angeles" />
            <DetailRow label="Transit Time" value="14 days" />
            <DetailRow label="Service" value="TPX" />
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Customs Status">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            <DetailRow label="Entry Number" value={customsDetails.entryNumber} />
            <DetailRow label="Declaration Date" value={customsDetails.declarationDate} />
            <DetailRow label="Duties" value={customsDetails.duties} />
            <DetailRow label="Taxes" value={customsDetails.taxes} />
            <DetailRow label="AMS Number" value="AMS123456" />
            <DetailRow label="ISF Status" value="Filed" />
            <DetailRow label="Exam Status" value="No Exam" />
            <DetailRow label="Release Status" value="Pending" />
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="text-xs font-medium text-gray-600 mb-1.5">Required Documents</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {customsDetails.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[10px]">
                  <DocumentStatus status={doc.status} />
                  <span className="text-gray-700 truncate">{doc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Cargo Details">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            <DetailRow label="Description" value={cargoDetails.description} />
            <DetailRow label="HS Code" value={cargoDetails.hsCode} />
            <DetailRow label="Packages" value={cargoDetails.packages.toString()} />
            <DetailRow label="Gross Weight" value={cargoDetails.grossWeight} />
            <DetailRow label="Volume" value={cargoDetails.volume} />
            <DetailRow label="Value" value="$250,000" />
            <DetailRow label="Incoterms" value="FOB Shanghai" />
            <DetailRow label="Insurance" value="CIF" />
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="text-xs font-medium text-gray-600 mb-1.5">Cargo Classification</div>
            <div className="flex justify-between items-start px-1">
              {cargoDetails.classifications.map((classification, index) => (
                <CargoClassificationIcon 
                  key={index}
                  type={classification.type}
                  label={classification.label}
                />
              ))}
            </div>
          </div>
        </div>
      </DetailSection>

      <DetailSection title="Parties">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-2">
            <PartyCard 
              title="Exporter"
              name={parties.exporter.name}
              address={parties.exporter.address}
              domain={parties.exporter.domain}
            />
            <PartyCard 
              title="Importer"
              name={parties.importer.name}
              address={parties.importer.address}
              domain={parties.importer.domain}
            />
            <PartyCard 
              title="Consignee"
              name={parties.consignee.name}
              address={parties.consignee.address}
              domain={parties.consignee.domain}
            />
            <PartyCard 
              title="Customs Broker"
              name="ABC Customs Brokers"
              address="789 Broker St, LA"
              domain="abccustoms.com"
            />
            <PartyCard 
              title="Shipping Agent"
              name="XYZ Shipping Agency"
              address="456 Port Ave, LA"
              domain="xyzshipping.com"
            />
            <PartyCard 
              title="Insurance Provider"
              name="Global Marine Ins."
              address="123 Insurance Rd, LA"
              domain="globalmarineins.com"
            />
          </div>
        </div>
      </DetailSection>
    </div>
  );
}; 