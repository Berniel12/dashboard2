'use client';

import React from 'react';
import { ShipmentProgress } from '@/components/shipments/ShipmentProgress';
import { ShipmentTimeline } from '@/components/shipments/ShipmentTimeline';
import { ShipmentDetailsCard } from '@/components/shipments/ShipmentDetailsCard';

const shipmentDatabase = {
  'SHP001': {
    progress: {
      origin: {
        port: "Shanghai Port",
        country: "China",
        countryCode: "CN",
      },
      destination: {
        port: "Los Angeles Port",
        country: "United States",
        countryCode: "US",
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
        containerType: "40ft" as const,
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
        ] as const,
      },
      customsDetails: {
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
          },
          {
            name: "Bill of Lading",
            status: "completed" as const,
            date: "2024-03-12",
          },
          {
            name: "Import License",
            status: "pending" as const,
            date: "2024-03-15",
          },
          {
            name: "Certificate of Origin",
            status: "pending" as const,
          },
          {
            name: "Insurance Certificate",
            status: "not-started" as const,
          },
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
        date: "2024-03-05",
        status: "Export Customs Clearance",
        description: "Goods cleared for export from China",
        icon: "customs" as const,
        documents: [
          {
            name: "Export Declaration",
            status: "verified" as const,
            verificationDate: "2024-03-05",
          },
          {
            name: "Certificate of Origin",
            status: "verified" as const,
            verificationDate: "2024-03-05",
          }
        ],
      },
      {
        date: "2024-03-10",
        status: "Departed Port of Loading",
        description: "Vessel EVER GIVEN departed from Shanghai Port",
        icon: "shipping" as const,
        documents: [
          {
            name: "Bill of Lading",
            status: "verified" as const,
            verificationDate: "2024-03-10",
          }
        ],
      },
      {
        date: "2024-03-15",
        status: "In Transit",
        description: "Vessel currently crossing Pacific Ocean",
        icon: "shipping" as const,
      },
      {
        date: "2024-03-25",
        status: "Arrival at Destination Port",
        description: "Expected arrival at Los Angeles Port",
        icon: "shipping" as const,
        documents: [
          {
            name: "Arrival Notice",
            status: "pending" as const,
          }
        ],
      },
      {
        date: "2024-03-26",
        status: "Import Customs Clearance",
        description: "Pending customs clearance at Los Angeles",
        icon: "customs" as const,
        documents: [
          {
            name: "Import Declaration",
            status: "missing" as const,
          },
          {
            name: "Commercial Invoice",
            status: "pending" as const,
          }
        ],
      },
    ],
  },
  'SHP002': {
    progress: {
      origin: {
        port: "Busan Port",
        country: "South Korea",
        countryCode: "KR",
      },
      destination: {
        port: "Rotterdam Port",
        country: "Netherlands",
        countryCode: "NL",
      },
      progress: 30,
      status: "At Port" as const,
    },
    details: {
      transportDetails: {
        vessel: "MSC OSCAR",
        voyage: "VOY789012",
        eta: "2024-03-25",
        containerCount: 2,
        containerType: "20ft" as const,
        commodity: "Auto Parts",
        bookingRef: "BK789012",
      },
      cargoDetails: {
        description: "Automotive Spare Parts",
        hsCode: "8708.99.0000",
        packages: 180,
        grossWeight: "3500 kg",
        volume: "35 m³",
        classifications: [
          { type: "non-hazardous", label: "Non-Hazardous" },
          { type: "non-refrigerated", label: "Non-Refrigerated" },
          { type: "container-20ft", label: "20ft Container" },
          { type: "dry-cargo", label: "Dry Cargo" },
          { type: "stackable", label: "Stackable" }
        ] as const,
      },
      customsDetails: {
        entryNumber: "ENTRY789012",
        declarationDate: "2024-03-22",
        duties: "$8,750",
        taxes: "$3,500",
        documents: [
          {
            name: "Commercial Invoice",
            status: "completed" as const,
            date: "2024-03-15",
          },
          {
            name: "Packing List",
            status: "completed" as const,
            date: "2024-03-15",
          },
          {
            name: "Bill of Lading",
            status: "pending" as const,
          },
        ],
      },
      parties: {
        exporter: {
          name: "Korea Auto Parts Co., Ltd",
          address: "456 Industrial Complex, Busan, South Korea",
          domain: "koreaparts.kr",
        },
        importer: {
          name: "European Motors GmbH",
          address: "789 Harbor Street, Rotterdam, Netherlands",
          domain: "europeanmotors.nl",
        },
        consignee: {
          name: "Dutch Auto Distributors",
          address: "321 Distribution Center, Amsterdam, Netherlands",
          domain: "dutchauto.nl",
        },
      },
    },
    timeline: [
      {
        date: "2024-03-15",
        status: "Documentation Complete",
        description: "All export documents prepared",
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
          }
        ],
      },
      {
        date: "2024-03-18",
        status: "At Port",
        description: "Cargo arrived at Busan Port",
        icon: "shipping" as const,
      },
      // ... add more timeline events
    ],
  },
  'SHP003': {
    progress: {
      origin: {
        port: "Yokohama Port",
        country: "Japan",
        countryCode: "JP",
      },
      destination: {
        port: "Vancouver Port",
        country: "Canada",
        countryCode: "CA",
      },
      progress: 85,
      status: "Customs Hold" as const,
    },
    details: {
      transportDetails: {
        vessel: "ONE HARMONY",
        voyage: "VOY345678",
        eta: "2024-03-18",
        containerCount: 1,
        containerType: "40ft" as const,
        commodity: "Machinery",
        bookingRef: "BK345678",
      },
      cargoDetails: {
        description: "Industrial Manufacturing Equipment",
        hsCode: "8457.10.0000",
        packages: 120,
        grossWeight: "8500 kg",
        volume: "65 m³",
        classifications: [
          { type: "non-hazardous", label: "Non-Hazardous" },
          { type: "non-refrigerated", label: "Non-Refrigerated" },
          { type: "container-40ft", label: "40ft Container" },
          { type: "dry-cargo", label: "Dry Cargo" },
          { type: "stackable", label: "Stackable" }
        ] as const,
      },
      customsDetails: {
        entryNumber: "ENTRY345678",
        declarationDate: "2024-03-16",
        duties: "$15,750",
        taxes: "$6,300",
        documents: [
          {
            name: "Commercial Invoice",
            status: "completed" as const,
            date: "2024-03-12",
          },
          {
            name: "Packing List",
            status: "completed" as const,
            date: "2024-03-12",
          },
          {
            name: "Certificate of Origin",
            status: "completed" as const,
            date: "2024-03-13",
          },
          {
            name: "Import License",
            status: "pending" as const,
          },
          {
            name: "Technical Documentation",
            status: "pending" as const,
          },
        ],
      },
      parties: {
        exporter: {
          name: "Japan Machinery Corp",
          address: "789 Industrial District, Yokohama, Japan",
          domain: "japanmachinery.jp",
        },
        importer: {
          name: "Canadian Manufacturing Inc",
          address: "456 Factory Lane, Vancouver, Canada",
          domain: "canadianmfg.ca",
        },
        consignee: {
          name: "West Coast Industries",
          address: "123 Industrial Park, Vancouver, Canada",
          domain: "westcoastind.ca",
        },
      },
    },
    timeline: [
      {
        date: "2024-03-12",
        status: "Documentation Complete",
        description: "All export documents prepared",
        icon: "document" as const,
        documents: [
          {
            name: "Commercial Invoice",
            status: "verified" as const,
            verificationDate: "2024-03-12",
          },
          {
            name: "Packing List",
            status: "verified" as const,
            verificationDate: "2024-03-12",
          }
        ],
      },
      {
        date: "2024-03-14",
        status: "Departed Port of Loading",
        description: "Vessel ONE HARMONY departed from Yokohama Port",
        icon: "shipping" as const,
        documents: [
          {
            name: "Bill of Lading",
            status: "verified" as const,
            verificationDate: "2024-03-14",
          }
        ],
      },
      {
        date: "2024-03-16",
        status: "Customs Hold",
        description: "Additional documentation required for clearance",
        icon: "customs" as const,
        documents: [
          {
            name: "Technical Documentation",
            status: "pending" as const,
          }
        ],
      }
    ],
  },
  'SHP004': {
    progress: {
      origin: {
        port: "Hamburg Port",
        country: "Germany",
        countryCode: "DE",
      },
      destination: {
        port: "New York Port",
        country: "United States",
        countryCode: "US",
      },
      progress: 95,
      status: "Cleared" as const,
    },
    details: {
      transportDetails: {
        vessel: "MAERSK SEALAND",
        voyage: "VOY901234",
        eta: "2024-03-30",
        containerCount: 4,
        containerType: "40ft" as const,
        commodity: "Chemical Products",
        bookingRef: "BK901234",
      },
      cargoDetails: {
        description: "Industrial Chemicals",
        hsCode: "2815.12.0000",
        packages: 400,
        grossWeight: "12000 kg",
        volume: "85 m³",
        classifications: [
          { type: "non-refrigerated", label: "Non-Refrigerated" },
          { type: "container-40ft", label: "40ft Container" },
          { type: "dry-cargo", label: "Dry Cargo" },
          { type: "stackable", label: "Stackable" }
        ] as const,
      },
      customsDetails: {
        entryNumber: "ENTRY901234",
        declarationDate: "2024-03-28",
        duties: "$22,500",
        taxes: "$9,000",
        documents: [
          {
            name: "Commercial Invoice",
            status: "completed" as const,
            date: "2024-03-25",
          },
          {
            name: "Packing List",
            status: "completed" as const,
            date: "2024-03-25",
          },
          {
            name: "Safety Data Sheets",
            status: "completed" as const,
            date: "2024-03-26",
          },
          {
            name: "Import License",
            status: "completed" as const,
            date: "2024-03-27",
          }
        ],
      },
      parties: {
        exporter: {
          name: "German Chemical GmbH",
          address: "123 Chemical Park, Hamburg, Germany",
          domain: "germanchemical.de",
        },
        importer: {
          name: "US Chemical Solutions",
          address: "789 Industrial Ave, New York, USA",
          domain: "uschemsolutions.com",
        },
        consignee: {
          name: "East Coast Chemical Corp",
          address: "456 Storage Blvd, New Jersey, USA",
          domain: "eastcoastchem.com",
        },
      },
    },
    timeline: [
      // ... add appropriate timeline events
    ],
  },
  'SHP005': {
    progress: {
      origin: {
        port: "Singapore Port",
        country: "Singapore",
        countryCode: "SG",
      },
      destination: {
        port: "Sydney Port",
        country: "Australia",
        countryCode: "AU",
      },
      progress: 45,
      status: "In Transit" as const,
    },
    details: {
      transportDetails: {
        vessel: "CMA CGM MARCO POLO",
        voyage: "VOY567890",
        eta: "2024-04-05",
        containerCount: 2,
        containerType: "40ft" as const,
        commodity: "Consumer Goods",
        bookingRef: "BK567890",
      },
      cargoDetails: {
        description: "Home Appliances and Electronics",
        hsCode: "8418.10.0000",
        packages: 300,
        grossWeight: "7500 kg",
        volume: "55 m³",
        classifications: [
          { type: "non-hazardous", label: "Non-Hazardous" },
          { type: "non-refrigerated", label: "Non-Refrigerated" },
          { type: "container-40ft", label: "40ft Container" },
          { type: "dry-cargo", label: "Dry Cargo" },
          { type: "stackable", label: "Stackable" }
        ] as const,
      },
      customsDetails: {
        entryNumber: "ENTRY567890",
        declarationDate: "2024-04-03",
        duties: "$18,900",
        taxes: "$7,560",
        documents: [
          {
            name: "Commercial Invoice",
            status: "completed" as const,
            date: "2024-03-20",
          },
          {
            name: "Packing List",
            status: "completed" as const,
            date: "2024-03-20",
          },
          {
            name: "Certificate of Origin",
            status: "pending" as const,
          }
        ],
      },
      parties: {
        exporter: {
          name: "Singapore Electronics Ltd",
          address: "456 Tech Park, Singapore",
          domain: "sgelectronics.sg",
        },
        importer: {
          name: "Australian Retail Group",
          address: "789 Distribution Center, Sydney, Australia",
          domain: "ausretail.com.au",
        },
        consignee: {
          name: "Sydney Logistics Solutions",
          address: "123 Warehouse Way, Sydney, Australia",
          domain: "sydneylogistics.com.au",
        },
      },
    },
    timeline: [
      {
        date: "2024-03-20",
        status: "Documentation Complete",
        description: "Export documentation prepared and verified",
        icon: "document" as const,
        documents: [
          {
            name: "Commercial Invoice",
            status: "verified" as const,
            verificationDate: "2024-03-20",
          },
          {
            name: "Packing List",
            status: "verified" as const,
            verificationDate: "2024-03-20",
          }
        ],
      },
      {
        date: "2024-03-22",
        status: "Export Customs Cleared",
        description: "Shipment cleared for export from Singapore",
        icon: "customs" as const,
        documents: [
          {
            name: "Export Declaration",
            status: "verified" as const,
            verificationDate: "2024-03-22",
          }
        ],
      },
      {
        date: "2024-03-23",
        status: "Departed Port of Loading",
        description: "Vessel CMA CGM MARCO POLO departed from Singapore Port",
        icon: "shipping" as const,
        documents: [
          {
            name: "Bill of Lading",
            status: "verified" as const,
            verificationDate: "2024-03-23",
          }
        ],
      },
      {
        date: "2024-03-25",
        status: "In Transit",
        description: "Vessel en route to Sydney via South China Sea",
        icon: "shipping" as const,
      },
      {
        date: "2024-04-02",
        status: "Import Documentation",
        description: "Import documentation in preparation",
        icon: "document" as const,
        documents: [
          {
            name: "Certificate of Origin",
            status: "pending" as const,
          },
          {
            name: "Import Declaration",
            status: "missing" as const,
          }
        ],
      }
    ],
  },
};

const getShipmentData = (id: string) => {
  const shipment = shipmentDatabase[id as keyof typeof shipmentDatabase];
  if (!shipment) {
    // Return default data or handle error
    return shipmentDatabase['SHP001'];
  }
  return shipment;
};

export default function ShipmentPage({ params }: { params: { id: string } }) {
  const shipmentData = getShipmentData(params.id);

  React.useEffect(() => {
    // Preload images
    const images = [
      '/images/company-placeholder.png',
      '/images/vessel-cma-cgm.jpg'
    ];
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] p-6 bg-gray-50">
      <div className="h-full grid grid-cols-12 gap-5">
        {/* Left section - Progress bar with country cards */}
        <div className="col-span-2 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-[680px]">
            <ShipmentProgress 
              origin={shipmentData.progress.origin}
              destination={shipmentData.progress.destination}
              progress={shipmentData.progress.progress}
              status={shipmentData.progress.status}
            />
          </div>
        </div>

        {/* Middle section - Timeline */}
        <div className="col-span-3 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-[680px]">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <h2 className="text-base font-semibold text-gray-900">Shipment Timeline</h2>
            </div>
            <ShipmentTimeline events={shipmentData.timeline} />
          </div>
        </div>

        {/* Right section - 2x2 Details Grid */}
        <div className="col-span-7">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-[680px]">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <h2 className="text-base font-semibold text-gray-900">Shipment Details</h2>
            </div>
            <ShipmentDetailsCard {...shipmentData.details} />
          </div>
        </div>
      </div>
    </div>
  );
} 