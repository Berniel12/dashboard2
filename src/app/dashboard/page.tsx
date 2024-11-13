"use client";

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Calculator, 
  Upload,
  Container,
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  Building2,
  Ship,
  Calendar,
  ArrowRight,
  TrendingUp,
  BarChart3,
  AlertCircle,
  Filter,
  DollarSign,
  Package,
  Activity,
  ZoomIn,
  ZoomOut,
  Move
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker,
  ZoomableGroup 
} from "react-simple-maps";
import { line, curveBasis } from 'd3-geo';

const stats = [
  {
    title: "Active Declarations",
    value: "24",
    change: "+12%",
    description: "Declarations in progress",
    icon: FileText,
    color: "text-blue-500"
  },
  {
    title: "Active Shipments",
    value: "18",
    change: "+8%",
    description: "Shipments in transit",
    icon: Ship,
    color: "text-green-500"
  },
  {
    title: "Active Clients",
    value: "156",
    change: "+5%",
    description: "Current client base",
    icon: Users,
    color: "text-purple-500"
  },
  {
    title: "Compliance Rate",
    value: "98.5%",
    change: "+0.5%",
    description: "Overall compliance score",
    icon: CheckCircle,
    color: "text-emerald-500"
  }
];

const quickActions = [
  {
    name: "New Declaration",
    href: "/dashboard/declarations/new",
    icon: FileText,
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "HS Code Lookup",
    href: "/dashboard/hs-lookup",
    icon: Search,
    color: "bg-purple-100 text-purple-600"
  },
  {
    name: "Duty Calculator",
    href: "/dashboard/calculator",
    icon: Calculator,
    color: "bg-green-100 text-green-600"
  },
  {
    name: "Upload Documents",
    href: "/dashboard/documents/upload",
    icon: Upload,
    color: "bg-orange-100 text-orange-600"
  }
];

const recentDeclarations = [
  {
    id: "DEC-001",
    reference: "CD-2024-1234",
    client: "Global Electronics Ltd.",
    status: "In Progress",
    date: "2024-03-15"
  },
  {
    id: "DEC-002",
    reference: "CD-2024-1235",
    client: "TechCo Industries",
    status: "Pending Review",
    date: "2024-03-14"
  },
  {
    id: "DEC-003",
    reference: "CD-2024-1236",
    client: "MedTech Solutions",
    status: "Completed",
    date: "2024-03-13"
  }
];

const activeShipments = [
  {
    id: "SHP-001",
    reference: "SHIP-2024-001",
    status: "In Transit",
    vessel: "MSC Oscar",
    eta: "2024-03-20"
  },
  {
    id: "SHP-002",
    reference: "SHIP-2024-002",
    status: "At Port",
    vessel: "Maersk Sealand",
    eta: "2024-03-18"
  }
];

const complianceAlerts = [
  {
    id: "ALT-001",
    type: "warning",
    message: "Missing certificate of origin for declaration DEC-2024-123",
    date: "2024-03-15"
  },
  {
    id: "ALT-002",
    type: "critical",
    message: "Expired import license requires immediate attention",
    date: "2024-03-14"
  }
];

const upcomingTasks = [
  {
    id: "TSK-001",
    title: "Customs Audit",
    date: "2024-03-20",
    type: "audit",
    priority: "high"
  },
  {
    id: "TSK-002",
    title: "License Renewal",
    date: "2024-03-25",
    type: "compliance",
    priority: "medium"
  }
];

// Sample data for charts
const monthlyData = [
  { name: 'Jan', declarations: 65 },
  { name: 'Feb', declarations: 59 },
  { name: 'Mar', declarations: 80 },
  { name: 'Apr', declarations: 81 },
  { name: 'May', declarations: 56 },
  { name: 'Jun', declarations: 55 },
];

const pieData = [
  { name: 'Import', value: 60 },
  { name: 'Export', value: 40 },
];

const COLORS = ['#4F46E5', '#10B981'];

const shipmentLocations = [
  { 
    id: 'SHIP-001',
    vesselName: 'MSC Oscar',
    status: 'In Transit',
    position: [-175.0000, 35.0000], // Middle of Pacific Ocean
  },
  { 
    id: 'SHIP-002',
    vesselName: 'Maersk Sealand',
    status: 'At Port',
    position: [3.7492, 51.2217], // Port of Rotterdam
  },
  { 
    id: 'SHIP-003',
    vesselName: 'CMA CGM Marco Polo',
    status: 'In Transit',
    position: [60.8198, 15.3521], // Arabian Sea
  },
  { 
    id: 'SHIP-004',
    vesselName: 'COSCO Pacific',
    status: 'At Port',
    position: [121.4737, 31.2304], // Port of Shanghai
  },
  { 
    id: 'SHIP-005',
    vesselName: 'Evergreen Ever Given',
    status: 'In Transit',
    position: [40.0000, 12.0000], // Indian Ocean
  },
  { 
    id: 'SHIP-006',
    vesselName: 'ONE Commitment',
    status: 'At Port',
    position: [-118.2437, 33.7271], // Port of Los Angeles
  }
];

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const calculateIntermediatePoint = (start: [number, number], end: [number, number], progress: number) => {
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  const curveDirection = start[1] > 0 ? -1 : 1;
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
  );
  const curveHeight = distance * 0.15 * curveDirection;
  const controlX = midX;
  const controlY = midY + curveHeight;

  // Quadratic Bézier curve formula
  const t = progress;
  const x = Math.pow(1 - t, 2) * start[0] + 
           2 * (1 - t) * t * controlX + 
           Math.pow(t, 2) * end[0];
  const y = Math.pow(1 - t, 2) * start[1] + 
           2 * (1 - t) * t * controlY + 
           Math.pow(t, 2) * end[1];

  return [x, y] as [number, number];
};

const generateCurvedPath = (start: [number, number], end: [number, number]) => {
  // Calculate the midpoint
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;
  
  // Calculate the distance between points
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Calculate curve direction based on hemisphere
  const curveDirection = start[1] > 0 ? -1 : 1;
  
  // Calculate the curve height based on distance and latitude
  const curveHeight = distance * 0.15 * curveDirection;
  
  // Calculate the control point (perpendicular to the midpoint)
  const controlX = midX;
  const controlY = midY + curveHeight; // Curve follows ocean routes
  
  // Create an SVG path with a quadratic Bézier curve
  return `M ${start[0]} ${start[1]} Q ${controlX} ${controlY} ${end[0]} ${end[1]}`;
};

export default function DashboardPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'text-blue-600 bg-blue-50';
      case 'Pending Review':
        return 'text-yellow-600 bg-yellow-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'In Transit':
        return 'text-purple-600 bg-purple-50';
      case 'At Port':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress':
        return Clock;
      case 'Pending Review':
        return AlertTriangle;
      case 'Completed':
        return CheckCircle;
      case 'In Transit':
        return Ship;
      case 'At Port':
        return Container;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Welcome Message */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Welcome back, John</h1>
            <p className="text-sm text-gray-500">Here's what's happening with your operations today.</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Global Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-56 pl-8 pr-4 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
            {/* Quick Filters */}
            <button className="p-1.5 rounded-lg hover:bg-gray-100 relative">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
            {/* Calendar */}
            <button className="p-1.5 rounded-lg hover:bg-gray-100">
              <Calendar className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-blue-100">Monthly Revenue</p>
              <h3 className="text-2xl font-bold mt-0.5">$45,231</h3>
              <p className="text-xs text-blue-100 mt-0.5">+12.5% from last month</p>
            </div>
            <DollarSign className="w-6 h-6 text-blue-100" />
          </div>
        </div>

        {/* Declarations Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-green-100">Active Declarations</p>
              <h3 className="text-2xl font-bold mt-0.5">24</h3>
              <p className="text-xs text-green-100 mt-0.5">18 pending review</p>
            </div>
            <FileText className="w-6 h-6 text-green-100" />
          </div>
        </div>

        {/* Shipments Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-purple-100">Active Shipments</p>
              <h3 className="text-2xl font-bold mt-0.5">18</h3>
              <p className="text-xs text-purple-100 mt-0.5">12 in transit</p>
            </div>
            <Ship className="w-6 h-6 text-purple-100" />
          </div>
        </div>

        {/* Compliance Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg shadow-sm text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-orange-100">Compliance Rate</p>
              <h3 className="text-2xl font-bold mt-0.5">98.5%</h3>
              <p className="text-xs text-orange-100 mt-0.5">+0.5% this week</p>
            </div>
            <Activity className="w-6 h-6 text-orange-100" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Monthly Declarations Trend - 4 columns */}
        <div className="lg:col-span-4 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Monthly Declarations</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="declarations" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Declaration Types - 3 columns */}
        <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Declaration Types</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-xs text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* World Map with Shipments - 5 columns */}
        <div className="lg:col-span-5 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Active Shipments</h3>
            <div className="flex space-x-2">
              <button 
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                onClick={() => {
                  // Add zoom in functionality
                }}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                onClick={() => {
                  // Add zoom out functionality
                }}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                onClick={() => {
                  // Add reset position functionality
                }}
              >
                <Move className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-[200px] relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 100,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <ZoomableGroup center={[0, 30]} zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#E5E7EB"
                        stroke="#D1D5DB"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            fill: "#E5E7EB",
                            stroke: "#D1D5DB",
                            strokeWidth: 0.5,
                            outline: "none"
                          },
                          hover: {
                            fill: "#F3F4F6",
                            stroke: "#D1D5DB",
                            strokeWidth: 0.5,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#E5E7EB",
                            stroke: "#D1D5DB",
                            strokeWidth: 0.5,
                            outline: "none"
                          }
                        }}
                      />
                    ))
                  }
                </Geographies>
                
                {/* Ship Markers */}
                {shipmentLocations.map((shipment) => (
                  <Marker 
                    key={shipment.id} 
                    coordinates={shipment.position as [number, number]}
                  >
                    <g transform="translate(-12, -24)">
                      {shipment.status === 'At Port' ? (
                        // Port icon (anchor)
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
                          fill="#10B981"
                          stroke="#fff"
                          strokeWidth="1"
                        />
                      ) : (
                        // Ship icon (vessel)
                        <path
                          d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"
                          fill="#4F46E5"
                          stroke="#fff"
                          strokeWidth="1"
                        />
                      )}
                      <text
                        textAnchor="middle"
                        y={-8}
                        style={{
                          fontFamily: "system-ui",
                          fontSize: "10px",
                          fill: "#4B5563",
                          fontWeight: "500",
                          pointerEvents: "none"
                        }}
                      >
                        {shipment.vesselName}
                      </text>
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>
          <div className="flex justify-center space-x-6 mt-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2" />
              <span className="text-xs text-gray-600">Active Vessels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions and Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className={`flex items-center p-2 rounded-lg ${action.color} hover:opacity-90 transition-opacity`}
              >
                <action.icon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Declarations */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Recent Declarations</h3>
            <Link href="/dashboard/declarations" className="text-xs text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentDeclarations.map((declaration) => {
              const StatusIcon = getStatusIcon(declaration.status);
              return (
                <div key={declaration.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{declaration.reference}</p>
                      <p className="text-sm text-gray-500">{declaration.client}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(declaration.status)}`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {declaration.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Shipments */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Active Shipments</h3>
            <Link href="/dashboard/shipments" className="text-xs text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {activeShipments.map((shipment) => {
              const StatusIcon = getStatusIcon(shipment.status);
              return (
                <div key={shipment.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Ship className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{shipment.reference}</p>
                      <p className="text-sm text-gray-500">{shipment.vessel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {shipment.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">ETA: {shipment.eta}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compliance and Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Compliance Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Compliance Alerts</h3>
            <Link href="/dashboard/compliance" className="text-xs text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {complianceAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3">
                <div className={`mt-0.5 ${
                  alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Upcoming Tasks</h3>
            <button className="text-xs text-blue-600 hover:text-blue-800">View Calendar</button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.date}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 