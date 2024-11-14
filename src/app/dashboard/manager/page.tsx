'use client';

import React from 'react';
import { Users, CheckCircle, AlertTriangle, Clock, TrendingUp, BarChart2, Activity, Package, FileText, Mail, Phone, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface BrokerStats {
  activeDeclarations: number;
  completedThisMonth: number;
  successRate: number;
  averageProcessingTime: string;
  recentActivity: string;
  workloadStatus: 'Low' | 'Medium' | 'High' | 'Overloaded';
  performance: {
    trend: 'up' | 'down';
    percentage: number;
  };
  clientSatisfaction: number;
  complianceScore: number;
  recentIssues: number;
}

interface Broker {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
  phone: string;
  joinedDate: string;
  status: 'Online' | 'Busy' | 'Away' | 'Offline';
  stats: BrokerStats;
}

export default function ManagerDashboard() {
  const brokers: Broker[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'Senior Broker',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      joinedDate: '2020-03-15',
      status: 'Online',
      stats: {
        activeDeclarations: 12,
        completedThisMonth: 45,
        successRate: 98.5,
        averageProcessingTime: '2.5 days',
        recentActivity: '15 minutes ago',
        workloadStatus: 'High',
        performance: {
          trend: 'up',
          percentage: 12
        },
        clientSatisfaction: 4.8,
        complianceScore: 96,
        recentIssues: 0
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      role: 'Customs Broker',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      joinedDate: '2021-06-20',
      status: 'Busy',
      stats: {
        activeDeclarations: 8,
        completedThisMonth: 32,
        successRate: 95.2,
        averageProcessingTime: '3.1 days',
        recentActivity: '45 minutes ago',
        workloadStatus: 'Medium',
        performance: {
          trend: 'up',
          percentage: 8
        },
        clientSatisfaction: 4.6,
        complianceScore: 94,
        recentIssues: 1
      }
    },
    {
      id: '3',
      name: 'Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      role: 'Senior Broker',
      email: 'michael.chen@example.com',
      phone: '+1 234 567 8902',
      joinedDate: '2019-08-10',
      status: 'Online',
      stats: {
        activeDeclarations: 15,
        completedThisMonth: 51,
        successRate: 97.8,
        averageProcessingTime: '2.2 days',
        recentActivity: '5 minutes ago',
        workloadStatus: 'High',
        performance: {
          trend: 'up',
          percentage: 15
        },
        clientSatisfaction: 4.9,
        complianceScore: 98,
        recentIssues: 0
      }
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      role: 'Customs Broker',
      email: 'sarah.johnson@example.com',
      phone: '+1 234 567 8903',
      joinedDate: '2022-01-15',
      status: 'Away',
      stats: {
        activeDeclarations: 6,
        completedThisMonth: 28,
        successRate: 92.5,
        averageProcessingTime: '3.5 days',
        recentActivity: '2 hours ago',
        workloadStatus: 'Medium',
        performance: {
          trend: 'down',
          percentage: 5
        },
        clientSatisfaction: 4.3,
        complianceScore: 91,
        recentIssues: 2
      }
    },
    {
      id: '5',
      name: 'David Kim',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      role: 'Senior Broker',
      email: 'david.kim@example.com',
      phone: '+1 234 567 8904',
      joinedDate: '2020-11-05',
      status: 'Online',
      stats: {
        activeDeclarations: 10,
        completedThisMonth: 38,
        successRate: 96.7,
        averageProcessingTime: '2.8 days',
        recentActivity: '30 minutes ago',
        workloadStatus: 'Medium',
        performance: {
          trend: 'up',
          percentage: 10
        },
        clientSatisfaction: 4.7,
        complianceScore: 95,
        recentIssues: 1
      }
    },
    {
      id: '6',
      name: 'Emily Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      role: 'Customs Broker',
      email: 'emily.brown@example.com',
      phone: '+1 234 567 8905',
      joinedDate: '2021-09-20',
      status: 'Offline',
      stats: {
        activeDeclarations: 4,
        completedThisMonth: 22,
        successRate: 94.1,
        averageProcessingTime: '3.2 days',
        recentActivity: '5 hours ago',
        workloadStatus: 'Low',
        performance: {
          trend: 'down',
          percentage: 3
        },
        clientSatisfaction: 4.5,
        complianceScore: 93,
        recentIssues: 1
      }
    }
  ];

  const getWorkloadColor = (status: BrokerStats['workloadStatus']) => {
    switch (status) {
      case 'Low':
        return 'text-green-600 bg-green-50';
      case 'Medium':
        return 'text-blue-600 bg-blue-50';
      case 'High':
        return 'text-yellow-600 bg-yellow-50';
      case 'Overloaded':
        return 'text-red-600 bg-red-50';
    }
  };

  const getStatusColor = (status: Broker['status']) => {
    switch (status) {
      case 'Online':
        return 'text-green-600';
      case 'Busy':
        return 'text-yellow-600';
      case 'Away':
        return 'text-orange-600';
      case 'Offline':
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Broker Performance Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Export Report
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Team Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {brokers.map((broker) => (
          <div key={broker.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Broker Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={broker.avatar}
                      alt={broker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{broker.name}</h3>
                    <p className="text-sm text-gray-500">{broker.role}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${getStatusColor(broker.status)}`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  <span className="text-sm">{broker.status}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Active Cases</div>
                  <div className="font-semibold text-gray-900">{broker.stats.activeDeclarations}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Success Rate</div>
                  <div className="font-semibold text-gray-900">{broker.stats.successRate}%</div>
                </div>
              </div>

              {/* Workload Indicator */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkloadColor(broker.stats.workloadStatus)}`}>
                  {broker.stats.workloadStatus} Workload
                </span>
                <div className="flex items-center space-x-2 text-sm">
                  {broker.stats.performance.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={broker.stats.performance.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {broker.stats.performance.percentage}% vs last month
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed This Month
                  </div>
                  <div className="font-semibold text-gray-900">{broker.stats.completedThisMonth}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Avg. Processing Time
                  </div>
                  <div className="font-semibold text-gray-900">{broker.stats.averageProcessingTime}</div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Client Satisfaction</span>
                    <span className="font-medium">{broker.stats.clientSatisfaction}/5.0</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(broker.stats.clientSatisfaction / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Compliance Score</span>
                    <span className="font-medium">{broker.stats.complianceScore}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${broker.stats.complianceScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Activity & Contact */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Recent Activity: {broker.stats.recentActivity}</span>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded" title="Send Email">
                      <Mail className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Call">
                      <Phone className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Schedule Meeting">
                      <Calendar className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 