'use client';

import React from 'react';
import { 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  FileText,
  MessageSquare,
  Zap,
  Activity,
  BarChart2,
  Calendar,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Sample data for time-based metrics
const timeMetricsData = [
  { month: 'Jan', clientComm: 45, docPrep: 32, customs: 28 },
  { month: 'Feb', clientComm: 42, docPrep: 28, customs: 25 },
  { month: 'Mar', clientComm: 38, docPrep: 25, customs: 22 },
  { month: 'Apr', clientComm: 35, docPrep: 24, customs: 20 },
];

// Sample data for performance metrics
const performanceData = [
  { month: 'Jan', current: 85, previous: 78 },
  { month: 'Feb', current: 88, previous: 80 },
  { month: 'Mar', current: 92, previous: 82 },
  { month: 'Apr', current: 95, previous: 85 },
];

// AI-generated insights
const insights = [
  {
    id: 1,
    type: 'improvement',
    title: 'Documentation Processing Time',
    message: 'Your average document processing time has improved by 18% this month. Keep utilizing templates and checklists.',
    metric: '+18%',
    trend: 'up',
  },
  {
    id: 2,
    type: 'attention',
    title: 'Client Communication',
    message: 'Response time to client queries has increased by 12%. Consider implementing automated status updates.',
    metric: '-12%',
    trend: 'down',
  },
  {
    id: 3,
    type: 'opportunity',
    title: 'Customs Clearance Efficiency',
    message: "You're clearing shipments 15% faster than the industry average. Potential to handle 20% more volume.",
    metric: '15%',
    trend: 'up',
  },
];

// Bottleneck analysis
const bottlenecks = [
  {
    id: 1,
    area: 'Document Collection',
    impact: 'High',
    timeSpent: '35%',
    trend: '+5%',
    suggestion: 'Implement automated document reminders',
  },
  {
    id: 2,
    area: 'Classification Verification',
    impact: 'Medium',
    timeSpent: '25%',
    trend: '-3%',
    suggestion: 'Use AI-powered HS code verification',
  },
  {
    id: 3,
    area: 'Customs Response',
    impact: 'Medium',
    timeSpent: '20%',
    trend: '0%',
    suggestion: 'Establish dedicated customs liaison',
  },
];

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Performance Insights</h1>
            <p className="text-sm text-gray-500">AI-powered analysis of your operations</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Last updated: Today, 09:45 AM</span>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Calendar className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  {insight.type === 'improvement' ? (
                    <div className="p-2 bg-green-100 rounded-full">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  ) : insight.type === 'attention' ? (
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <h3 className="font-semibold text-sm">{insight.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">{insight.message}</p>
              </div>
              <span className={`text-sm font-bold ${
                insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {insight.metric}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Time Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Time Distribution Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Time Distribution Trend</h3>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span>Client Communication</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Document Preparation</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                <span>Customs Processing</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeMetricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="clientComm" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="docPrep" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="customs" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Performance vs Previous Period</h3>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                <span>Previous</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#3B82F6" />
                <Bar dataKey="previous" fill="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottlenecks Analysis */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-sm mb-4">Process Bottlenecks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottlenecks.map((bottleneck) => (
            <div 
              key={bottleneck.id}
              className="p-4 rounded-lg border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{bottleneck.area}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  bottleneck.impact === 'High' ? 'bg-red-100 text-red-700' :
                  bottleneck.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {bottleneck.impact} Impact
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time Spent</span>
                  <span className="font-medium">{bottleneck.timeSpent}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Trend</span>
                  <span className={`font-medium ${
                    bottleneck.trend.startsWith('+') ? 'text-red-600' :
                    bottleneck.trend.startsWith('-') ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {bottleneck.trend}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium text-blue-600">Suggestion: </span>
                    {bottleneck.suggestion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <h3 className="font-semibold text-sm">Avg. Processing Time</h3>
          </div>
          <div className="mt-1">
            <div className="text-2xl font-bold">2.3 days</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingDown className="w-4 h-4 mr-1" />
              -15% vs last month
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 text-purple-500" />
            <h3 className="font-semibold text-sm">Response Time</h3>
          </div>
          <div className="mt-1">
            <div className="text-2xl font-bold">45 mins</div>
            <div className="text-sm text-red-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% vs last month
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <h3 className="font-semibold text-sm">First-Time Accuracy</h3>
          </div>
          <div className="mt-1">
            <div className="text-2xl font-bold">94.5%</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3.2% vs last month
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-orange-500" />
            <h3 className="font-semibold text-sm">Workload Balance</h3>
          </div>
          <div className="mt-1">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-blue-600 flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Optimal Range
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 