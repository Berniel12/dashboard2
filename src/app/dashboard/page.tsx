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
  Mail,
  Star,
  Circle,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MiniShipmentList from '@/components/dashboard/MiniShipmentList';

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
    origin: {
      country: "China",
      countryCode: "CN",
    },
    destination: {
      country: "United States",
      countryCode: "US",
    },
    details: {
      vessel: "MSC Oscar",
      status: "In Transit" as const,
      progress: 65,
      eta: "2024-03-20",
    },
  },
  {
    id: "SHP-002",
    origin: {
      country: "Japan",
      countryCode: "JP",
    },
    destination: {
      country: "Canada",
      countryCode: "CA",
    },
    details: {
      vessel: "Maersk Sealand",
      status: "At Port" as const,
      progress: 85,
      eta: "2024-03-18",
    },
  },
  {
    id: "SHP-003",
    origin: {
      country: "South Korea",
      countryCode: "KR",
    },
    destination: {
      country: "Germany",
      countryCode: "DE",
    },
    details: {
      vessel: "COSCO Shipping",
      status: "In Transit" as const,
      progress: 35,
      eta: "2024-03-25",
    },
  },
  {
    id: "SHP-004",
    origin: {
      country: "Vietnam",
      countryCode: "VN",
    },
    destination: {
      country: "Netherlands",
      countryCode: "NL",
    },
    details: {
      vessel: "Ever Given",
      status: "Customs Hold" as const,
      progress: 92,
      eta: "2024-03-17",
    },
  },
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

// New messages data
const recentMessages = [
  {
    id: "MSG-001",
    sender: "Customs Authority",
    subject: "Declaration CD-2024-1234 Status Update",
    preview: "Your declaration has been selected for document review...",
    status: "unread",
    priority: "high",
    timestamp: "2 hours ago"
  },
  {
    id: "MSG-002",
    sender: "Port Authority",
    subject: "Vessel Schedule Change Notice",
    preview: "Please be advised of the following changes to vessel arrival...",
    status: "read",
    priority: "medium",
    timestamp: "5 hours ago"
  },
  {
    id: "MSG-003",
    sender: "System Notification",
    subject: "New HS Code Updates Available",
    preview: "The latest HS code database updates are now available...",
    status: "unread",
    priority: "low",
    timestamp: "1 day ago"
  }
];

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

      {/* Charts Section - Updated */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Message Inbox - Replacing Monthly Declarations */}
        <div className="lg:col-span-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Message Inbox</h3>
            <Link href="/dashboard/messages" className="text-xs text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg border ${
                  message.status === 'unread' ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    message.priority === 'high' ? 'text-red-500' :
                    message.priority === 'medium' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    <Circle className="w-2 h-2 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{message.subject}</p>
                    <p className="text-xs text-gray-500 truncate">{message.sender}</p>
                    <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Overview - With added matrices */}
        <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Compliance Overview</h3>
          <div className="space-y-4">
            {/* Progress Bars */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Document Compliance</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Declaration Accuracy</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customs Response</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            {/* Risk Assessment Matrix */}
            <div className="pt-2">
              <h4 className="text-xs font-medium text-gray-600 mb-2">Risk Assessment</h4>
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-red-100 text-red-800 text-xs font-medium p-2 rounded text-center">
                  High Risk
                  <div className="text-lg font-bold">3</div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs font-medium p-2 rounded text-center">
                  Medium Risk
                  <div className="text-lg font-bold">8</div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs font-medium p-2 rounded text-center">
                  Low Risk
                  <div className="text-lg font-bold">24</div>
                </div>
              </div>
            </div>

            {/* Document Status Matrix */}
            <div className="pt-2">
              <h4 className="text-xs font-medium text-gray-600 mb-2">Document Status</h4>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                  <span className="text-xs text-blue-700">Pending Review</span>
                  <span className="text-sm font-bold text-blue-700">12</span>
                </div>
                <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
                  <span className="text-xs text-purple-700">In Process</span>
                  <span className="text-sm font-bold text-purple-700">8</span>
                </div>
                <div className="flex items-center justify-between bg-yellow-50 p-2 rounded">
                  <span className="text-xs text-yellow-700">Requires Action</span>
                  <span className="text-sm font-bold text-yellow-700">5</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                  <span className="text-xs text-green-700">Completed</span>
                  <span className="text-sm font-bold text-green-700">35</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keep Active Shipments section */}
        <div className="lg:col-span-5 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Active Shipments</h3>
            <Link href="/dashboard/shipments" className="text-xs text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <MiniShipmentList shipments={activeShipments} />
        </div>
      </div>

      {/* Quick Actions and Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Keep Quick Actions section */}
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

        {/* Keep Recent Declarations section */}
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

        {/* Keep Compliance Alerts section */}
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
      </div>

      {/* Compliance and Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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