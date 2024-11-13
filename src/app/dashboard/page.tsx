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
  Bell
} from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header with Welcome Message */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, John</h1>
            <p className="text-gray-500">Here's what's happening with your operations today.</p>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Calendar className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="mt-2">
              <span className={`text-sm ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-3 rounded-full ${action.color} mb-3`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Declarations */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Declarations</h2>
              <Link href="/dashboard/declarations" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
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
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(declaration.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {declaration.status}
                      </span>
                      <span className="text-sm text-gray-500">{declaration.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Shipments */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Active Shipments</h2>
              <Link href="/dashboard/shipments" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activeShipments.map((shipment) => {
                const StatusIcon = getStatusIcon(shipment.status);
                return (
                  <div key={shipment.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Container className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{shipment.reference}</p>
                        <p className="text-sm text-gray-500">{shipment.vessel}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {shipment.status}
                      </span>
                      <span className="text-sm text-gray-500">ETA: {shipment.eta}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Alerts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Compliance Alerts</h2>
              <Link href="/dashboard/compliance" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
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

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm">View Calendar</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
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

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Performance Metrics</h2>
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Declaration Success Rate</p>
              <p className="text-2xl font-bold">96.8%</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Processing Time</p>
              <p className="text-2xl font-bold">1.2 days</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Declarations</p>
              <p className="text-2xl font-bold">+12.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 