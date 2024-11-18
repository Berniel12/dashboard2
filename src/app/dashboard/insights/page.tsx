'use client';

import React, { useState, useEffect } from 'react';
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
import { CircularProgress, LinearProgress } from '@mui/material';

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

// Add new types for log analysis
type LogEntry = {
  id: string;
  type: 'shipment' | 'document' | 'communication' | 'customs';
  timestamp: string;
  description: string;
};

// Expanded mock logs for scrolling effect
const mockLogs: LogEntry[] = [
  { 
    id: 'log_1',
    type: 'shipment',
    timestamp: '2024-03-15 09:23:45',
    description: 'Shipment CONT123456 cleared customs in 1.5 days'
  },
  { 
    id: 'log_2',
    type: 'document',
    timestamp: '2024-03-15 10:15:30',
    description: 'Commercial Invoice processed for BOL789012'
  },
  // Add many more logs for scrolling effect
  ...[...Array(50)].map((_, index) => ({
    id: `log_${index + 3}`,
    type: ['shipment', 'document', 'communication', 'customs'][Math.floor(Math.random() * 4)] as LogEntry['type'],
    timestamp: new Date(2024, 2, 15, 9 + Math.floor(index / 10), Math.floor(Math.random() * 60)).toLocaleString(),
    description: [
      `Shipment CONT${Math.random().toString().slice(2, 8)} processing time: ${Math.floor(Math.random() * 48)} hours`,
      `Document ${['Invoice', 'Packing List', 'BOL', 'Certificate'][Math.floor(Math.random() * 4)]} processed in ${Math.floor(Math.random() * 30)} minutes`,
      `Client response handled in ${Math.floor(Math.random() * 60)} minutes`,
      `HS Code ${Math.random().toString().slice(2, 8)} verification completed`,
    ][Math.floor(Math.random() * 4)]
  }))
];

// Modify AnalysisStep type
type AnalysisStep = {
  message: string;
  progress: number;
  currentLog?: LogEntry;
  insight?: string;
};

const analysisSteps: AnalysisStep[] = [
  { 
    message: "Initializing log analysis...",
    progress: 5
  },
  { 
    message: "Processing shipment clearance logs...",
    progress: 20,
    currentLog: mockLogs[0],
    insight: "Average clearance time: 1.5 days"
  },
  { 
    message: "Analyzing document processing efficiency...",
    progress: 40,
    currentLog: mockLogs[1],
    insight: "Document processing improved by 18%"
  },
  { 
    message: "Evaluating communication patterns...",
    progress: 60,
    currentLog: mockLogs[2],
    insight: "Response time needs improvement"
  },
  { 
    message: "Examining customs procedures...",
    progress: 80,
    currentLog: mockLogs[3],
    insight: "HS Code verification is efficient"
  },
  { 
    message: "Generating final insights...",
    progress: 95
  },
  { 
    message: "Analysis complete",
    progress: 100
  }
];

export default function InsightsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [highlightedLog, setHighlightedLog] = useState<number>(0);

  const handleStartAnalysis = () => {
    setHasStarted(true);
    setIsAnalyzing(true);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    let logIndex = 0;
    const logUpdateInterval = setInterval(() => {
      if (logIndex < mockLogs.length) {
        setVisibleLogs(prev => {
          const newLogs = [...prev, mockLogs[logIndex]];
          return newLogs.slice(-15);
        });
        setHighlightedLog(prev => (prev + 1) % 15);
        logIndex++;
      } else {
        clearInterval(logUpdateInterval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowContent(true);
        }, 500);
      }
    }, 50);

    return () => clearInterval(logUpdateInterval);
  }, [isAnalyzing]);

  // Initial state with just the analyze button
  if (!hasStarted) {
    return (
      <div className="relative min-h-screen">
        {/* Blurred content in background */}
        <div className="absolute inset-0 filter blur-sm opacity-30">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Placeholder for cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm h-32 bg-gray-200 animate-pulse"></div>
              ))}
            </div>
            
            {/* Placeholder for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm h-[400px] bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Centered analyze button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleStartAnalysis}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Activity className="w-6 h-6" />
            <span>Analyze Performance</span>
          </button>
        </div>
      </div>
    );
  }

  // Analysis animation view
  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="w-full max-w-3xl space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Analyzing System Logs
            </h2>
            <p className="text-sm text-gray-600">
              Processing historical data to generate insights...
            </p>
          </div>

          {/* Terminal-style log viewer */}
          <div className="bg-gray-900 rounded-lg p-4 h-[400px] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
            
            <div className="font-mono text-xs space-y-1 transform transition-transform duration-200">
              {visibleLogs?.map((log, index) => (
                <div
                  key={log?.id || index}
                  className={`text-gray-300 py-1 px-2 rounded ${
                    index === highlightedLog ? 'bg-blue-500/20 text-white' : ''
                  }`}
                >
                  <span className="text-gray-500">{log?.timestamp}</span>
                  <span className={`mx-2 px-1 rounded text-xs ${
                    log?.type === 'shipment' ? 'text-green-400' :
                    log?.type === 'document' ? 'text-blue-400' :
                    log?.type === 'communication' ? 'text-purple-400' :
                    'text-yellow-400'
                  }`}>
                    {log?.type?.toUpperCase()}
                  </span>
                  <span>{log?.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-200"
              style={{ 
                width: `${Math.min((visibleLogs.length / mockLogs.length) * 100, 100)}%` 
              }}
            ></div>
          </div>

          <div className="text-center text-sm text-gray-600">
            Processed {Math.min(visibleLogs.length, mockLogs.length)} of {mockLogs.length} logs
          </div>
        </div>
      </div>
    );
  }

  // Final content view
  return (
    <div className={`space-y-6 transition-opacity duration-500 ${
      showContent ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Performance Insights</h1>
            <p className="text-sm text-gray-500">AI-powered analysis of your operations</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleStartAnalysis}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>Analyze Performance</span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Last updated: Today, 09:45 AM</span>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Calendar className="w-4 h-4 text-gray-500" />
              </button>
            </div>
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