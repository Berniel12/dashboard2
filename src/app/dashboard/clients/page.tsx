'use client';

import React from 'react';
import { 
  Building2, 
  Package, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink
} from 'lucide-react';

interface ClientMetrics {
  activeShipments: number;
  monthlyShipments: number;
  avgClearanceTime: string;
  recentDelays: number;
  complianceScore: number;
  revenueChange: number;
}

interface Client {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  since: string;
  metrics: ClientMetrics;
}

const clients: Client[] = [
  {
    id: 'client1',
    name: 'Tech Global Industries',
    industry: 'Electronics Manufacturing',
    location: 'Singapore',
    since: '2020',
    metrics: {
      activeShipments: 12,
      monthlyShipments: 45,
      avgClearanceTime: '2.3 days',
      recentDelays: 2,
      complianceScore: 98,
      revenueChange: 15.4
    }
  },
  {
    id: 'client2',
    name: 'AutoParts International',
    industry: 'Automotive',
    location: 'Germany',
    since: '2019',
    metrics: {
      activeShipments: 8,
      monthlyShipments: 32,
      avgClearanceTime: '1.8 days',
      recentDelays: 1,
      complianceScore: 95,
      revenueChange: -3.2
    }
  },
  {
    id: 'client3',
    name: 'PharmaCare Solutions',
    industry: 'Pharmaceuticals',
    location: 'Switzerland',
    since: '2021',
    metrics: {
      activeShipments: 15,
      monthlyShipments: 38,
      avgClearanceTime: '1.5 days',
      recentDelays: 0,
      complianceScore: 99,
      revenueChange: 22.7
    }
  },
  {
    id: 'client4',
    name: 'Global Textiles Co',
    industry: 'Textiles & Apparel',
    location: 'India',
    since: '2018',
    metrics: {
      activeShipments: 25,
      monthlyShipments: 60,
      avgClearanceTime: '2.8 days',
      recentDelays: 4,
      complianceScore: 92,
      revenueChange: 8.5
    }
  },
  {
    id: 'client5',
    name: 'Fresh Foods Export',
    industry: 'Food & Beverages',
    location: 'Brazil',
    since: '2022',
    metrics: {
      activeShipments: 18,
      monthlyShipments: 42,
      avgClearanceTime: '1.9 days',
      recentDelays: 3,
      complianceScore: 94,
      revenueChange: 17.8
    }
  },
  {
    id: 'client6',
    name: 'Nordic Machinery AB',
    industry: 'Industrial Equipment',
    location: 'Sweden',
    since: '2017',
    metrics: {
      activeShipments: 6,
      monthlyShipments: 15,
      avgClearanceTime: '2.1 days',
      recentDelays: 1,
      complianceScore: 97,
      revenueChange: -1.5
    }
  },
  {
    id: 'client7',
    name: 'Pacific Chemical Corp',
    industry: 'Chemicals',
    location: 'Japan',
    since: '2019',
    metrics: {
      activeShipments: 10,
      monthlyShipments: 28,
      avgClearanceTime: '2.5 days',
      recentDelays: 2,
      complianceScore: 96,
      revenueChange: 5.3
    }
  },
  {
    id: 'client8',
    name: 'Smart Devices Ltd',
    industry: 'Consumer Electronics',
    location: 'South Korea',
    since: '2020',
    metrics: {
      activeShipments: 20,
      monthlyShipments: 55,
      avgClearanceTime: '2.0 days',
      recentDelays: 1,
      complianceScore: 97,
      revenueChange: 12.9
    }
  }
];

export default function ClientsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500">Manage and monitor client performance</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Filter
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Client
          </button>
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <div 
            key={client.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            {/* Client Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="w-8 h-8" />
                  ) : (
                    <Building2 className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{client.industry}</span>
                    <span>•</span>
                    <span>{client.location}</span>
                    <span>•</span>
                    <span>Since {client.since}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg">
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Active Shipments */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-2">
                  <Package className="w-4 h-4" />
                  <span>Active Shipments</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {client.metrics.activeShipments}
                </div>
                <div className="text-sm text-blue-600">
                  {client.metrics.monthlyShipments} monthly avg
                </div>
              </div>

              {/* Clearance Time */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-green-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Avg Clearance</span>
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {client.metrics.avgClearanceTime}
                </div>
                <div className="text-sm text-green-600">
                  {client.metrics.recentDelays} recent delays
                </div>
              </div>

              {/* Revenue Change */}
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-purple-600 mb-2">
                  <BarChart2 className="w-4 h-4" />
                  <span>Revenue Change</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-2xl font-bold text-purple-700">
                    {Math.abs(client.metrics.revenueChange)}%
                  </div>
                  {client.metrics.revenueChange > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="text-sm text-purple-600">
                  Last 30 days
                </div>
              </div>

              {/* Compliance Score */}
              <div className="col-span-3 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-600">Compliance Score</div>
                  <div className="text-sm font-medium text-gray-900">{client.metrics.complianceScore}%</div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${client.metrics.complianceScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 