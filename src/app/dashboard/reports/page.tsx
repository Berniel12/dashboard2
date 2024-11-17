'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Search,
  Building2,
  BarChart2,
  Clock,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

type ReportType = 'client' | 'financial' | 'operational' | 'compliance';
type TimeFrame = 'last7days' | 'last30days' | 'last90days' | 'custom';
type Format = 'pdf' | 'excel' | 'csv';

interface ReportOption {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  icon: React.ElementType;
}

const reportOptions: ReportOption[] = [
  {
    id: 'client-activity',
    title: 'Client Activity Report',
    description: 'Detailed analysis of shipments, declarations, and communication per client',
    type: 'client',
    icon: Users,
  },
  {
    id: 'revenue-analysis',
    title: 'Revenue Analysis',
    description: 'Financial performance breakdown by service type and client',
    type: 'financial',
    icon: TrendingUp,
  },
  {
    id: 'operational-efficiency',
    title: 'Operational Efficiency',
    description: 'Processing times, bottlenecks, and resource utilization metrics',
    type: 'operational',
    icon: BarChart2,
  },
  {
    id: 'compliance-audit',
    title: 'Compliance Audit Report',
    description: 'Compliance rates, issues, and risk assessment by declaration type',
    type: 'compliance',
    icon: FileText,
  },
];

const clientList = [
  { id: 'all', name: 'All Clients' },
  { id: 'client1', name: 'Global Electronics Ltd.' },
  { id: 'client2', name: 'TechCo Industries' },
  { id: 'client3', name: 'MedTech Solutions' },
];

// Sample data for different report types
const reportPreviews = {
  'client-activity': {
    chart: {
      data: [
        { month: 'Jan', declarations: 45, shipments: 32, queries: 28 },
        { month: 'Feb', declarations: 52, shipments: 38, queries: 24 },
        { month: 'Mar', declarations: 48, shipments: 35, queries: 30 },
        { month: 'Apr', declarations: 55, shipments: 42, queries: 26 },
      ],
      metrics: [
        { label: 'Total Declarations', value: '200', change: '+12%' },
        { label: 'Active Shipments', value: '42', change: '+8%' },
        { label: 'Response Rate', value: '98%', change: '+2%' },
      ],
    }
  },
  'revenue-analysis': {
    chart: {
      data: [
        { name: 'Declarations', value: 45 },
        { name: 'Consulting', value: 25 },
        { name: 'Documentation', value: 20 },
        { name: 'Other Services', value: 10 },
      ],
      metrics: [
        { label: 'Total Revenue', value: '$125,000', change: '+15%' },
        { label: 'Avg. Transaction', value: '$2,500', change: '+5%' },
        { label: 'Active Clients', value: '48', change: '+3%' },
      ],
    }
  },
  'operational-efficiency': {
    chart: {
      data: [
        { name: 'Processing', time: 2.5, benchmark: 3.2 },
        { name: 'Review', time: 1.8, benchmark: 2.0 },
        { name: 'Customs', time: 3.2, benchmark: 3.5 },
        { name: 'Documentation', time: 1.5, benchmark: 2.1 },
      ],
      metrics: [
        { label: 'Avg. Processing Time', value: '2.3 days', change: '-15%' },
        { label: 'Efficiency Rate', value: '94%', change: '+4%' },
        { label: 'Automation Rate', value: '65%', change: '+10%' },
      ],
    }
  },
  'compliance-audit': {
    chart: {
      data: [
        { category: 'Documentation', compliance: 98, risk: 2 },
        { category: 'Classification', compliance: 95, risk: 5 },
        { category: 'Valuation', compliance: 97, risk: 3 },
        { category: 'Origin', compliance: 96, risk: 4 },
      ],
      metrics: [
        { label: 'Overall Compliance', value: '96.5%', change: '+1.5%' },
        { label: 'Risk Score', value: '3.5', change: '-0.5' },
        { label: 'Audit Success', value: '98%', change: '+2%' },
      ],
    }
  },
};

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

function ReportPreviewContent({ type, data }: { type: string, data: any }) {
  switch(type) {
    case 'client-activity':
      return (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
            <p className="text-sm text-gray-600">
              Overall client activity has shown positive growth with a 12% increase in total declarations 
              and an 8% improvement in processing efficiency. Key metrics indicate strong performance 
              across all major service areas.
            </p>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-3 gap-4">
            {data.metrics.map((metric: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600">{metric.label}</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <span className={`ml-2 text-sm ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Breakdown Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Period
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous Period
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { type: 'Import Declarations', current: 145, previous: 132, change: '+9.8%' },
                  { type: 'Export Declarations', current: 98, previous: 85, change: '+15.3%' },
                  { type: 'Document Processing', current: 243, previous: 217, change: '+12.0%' },
                  { type: 'Client Inquiries', current: 156, previous: 178, change: '-12.4%' },
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.current}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.previous}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${
                        row.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {row.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Trend Analysis */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Activity Trend Analysis</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="declarations" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Declarations"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="shipments" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Shipments"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="queries" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    name="Client Queries"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Recommendations</h4>
            <ul className="space-y-2">
              <li className="text-sm text-blue-700 flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                Consider implementing automated status updates to reduce client inquiries
              </li>
              <li className="text-sm text-blue-700 flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                Focus on maintaining the positive trend in declaration processing efficiency
              </li>
              <li className="text-sm text-blue-700 flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                Review document processing workflows to identify further optimization opportunities
              </li>
            </ul>
          </div>
        </div>
      );

    case 'revenue-analysis':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {data.metrics.map((metric: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">{metric.label}</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <span className={`ml-2 text-sm ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6">
            {data.data.map((entry: any, index: number) => (
              <div key={entry.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'operational-efficiency':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {data.metrics.map((metric: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">{metric.label}</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <span className={`ml-2 text-sm ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="time" fill="#3B82F6" name="Actual Time" />
                <Bar dataKey="benchmark" fill="#E5E7EB" name="Benchmark" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    case 'compliance-audit':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {data.metrics.map((metric: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">{metric.label}</p>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <span className={`ml-2 text-sm ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="compliance" fill="#10B981" name="Compliance Rate" />
                <Bar dataKey="risk" fill="#EF4444" name="Risk Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-48 flex items-center justify-center">
          <p className="text-gray-500">Select a report type to see preview</p>
        </div>
      );
  }
}

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<ReportType | ''>('');
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('last30days');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState<Format>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would typically trigger the actual report generation
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header - Remove generate button */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-xl font-bold">Reports</h1>
          <p className="text-sm text-gray-500">Generate custom reports for your business insights</p>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-6">
          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  setSelectedType(option.type);
                  setSelectedReport(option.id);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedReport === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedReport === option.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{option.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedReport && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Time Frame Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Time Frame</label>
                <select
                  value={selectedTimeFrame}
                  onChange={(e) => setSelectedTimeFrame(e.target.value as TimeFrame)}
                  className="w-full rounded-lg border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last90days">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Client Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Client</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full rounded-lg border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {clientList.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Format</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as Format)}
                  className="w-full rounded-lg border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV File</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Updated Report Preview with Generate Button */}
      {selectedReport && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                {reportOptions.find(r => r.id === selectedReport)?.title}
              </h2>
              <p className="text-sm text-gray-500">
                Generated for: {clientList.find(c => c.id === selectedClient)?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Time Frame: {selectedTimeFrame === 'custom' ? 'Custom Range' : `Last ${
                  selectedTimeFrame === 'last7days' ? '7' :
                  selectedTimeFrame === 'last30days' ? '30' : '90'
                } Days`}
              </div>
              <button 
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className={`px-6 py-2.5 rounded-lg flex items-center space-x-2 ${
                  isGenerating
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Generate {selectedFormat.toUpperCase()}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <ReportPreviewContent 
            type={selectedReport} 
            data={reportPreviews[selectedReport as keyof typeof reportPreviews].chart} 
          />
        </div>
      )}
    </div>
  );
} 