'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Clock, 
  Search,
  Filter,
  Calendar,
  AlertCircle,
  BookOpen,
  RefreshCw
} from 'lucide-react';

interface ComplianceAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  date: string;
  status: 'active' | 'resolved';
  declaration?: string;
}

interface ComplianceAudit {
  id: string;
  type: 'Internal' | 'External' | 'Customs';
  date: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Action Required';
  findings: number;
  scope: string;
}

interface RegulationUpdate {
  id: string;
  title: string;
  authority: string;
  effectiveDate: string;
  status: 'Upcoming' | 'In Effect' | 'Under Review';
  impact: 'High' | 'Medium' | 'Low';
}

export default function CompliancePage() {
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([
    {
      id: 'ALT-001',
      type: 'warning',
      message: 'Missing certificate of origin for declaration DEC-2024-123',
      date: '2024-03-15',
      status: 'active',
      declaration: 'DEC-2024-123'
    },
    {
      id: 'ALT-002',
      type: 'critical',
      message: 'Expired import license requires immediate attention',
      date: '2024-03-14',
      status: 'active'
    },
    {
      id: 'ALT-003',
      type: 'info',
      message: 'New HS code classification guidelines available',
      date: '2024-03-13',
      status: 'resolved'
    }
  ]);

  const [audits, setAudits] = useState<ComplianceAudit[]>([
    {
      id: 'AUD-001',
      type: 'Customs',
      date: '2024-04-15',
      status: 'Scheduled',
      findings: 0,
      scope: 'Annual customs compliance review'
    },
    {
      id: 'AUD-002',
      type: 'Internal',
      date: '2024-03-10',
      status: 'Completed',
      findings: 3,
      scope: 'Q1 2024 Documentation Review'
    }
  ]);

  const [updates, setUpdates] = useState<RegulationUpdate[]>([
    {
      id: 'REG-001',
      title: 'New Import Documentation Requirements',
      authority: 'Customs Authority',
      effectiveDate: '2024-04-01',
      status: 'Upcoming',
      impact: 'High'
    },
    {
      id: 'REG-002',
      title: 'Updated Tariff Classifications',
      authority: 'World Customs Organization',
      effectiveDate: '2024-03-15',
      status: 'In Effect',
      impact: 'Medium'
    }
  ]);

  const getAlertColor = (type: ComplianceAlert['type']) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getAuditStatusColor = (status: ComplianceAudit['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'text-blue-600 bg-blue-50';
      case 'In Progress':
        return 'text-yellow-600 bg-yellow-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'Action Required':
        return 'text-red-600 bg-red-50';
    }
  };

  const getImpactColor = (impact: RegulationUpdate['impact']) => {
    switch (impact) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Compliance Management</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search compliance records..."
              className="pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Audits</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Compliance Rate</p>
              <p className="text-2xl font-bold">98.5%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Reviews</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Compliance Alerts */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Compliance Alerts</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.status === 'resolved' ? 'border-gray-200 bg-gray-50' : 'border-l-4'
                } ${
                  alert.status === 'active' ? 
                    alert.type === 'critical' ? 'border-l-red-500' :
                    alert.type === 'warning' ? 'border-l-yellow-500' :
                    'border-l-blue-500'
                  : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-0.5 ${
                      alert.type === 'critical' ? 'text-red-500' :
                      alert.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}>
                      {alert.type === 'critical' ? <AlertCircle className="w-5 h-5" /> :
                       alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                       <AlertCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{alert.date}</span>
                        {alert.declaration && (
                          <>
                            <span>•</span>
                            <span>Ref: {alert.declaration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {alert.status === 'active' && (
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audits and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Upcoming Audits</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {audits.map((audit) => (
                <div key={audit.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{audit.scope}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{audit.type}</span>
                          <span>•</span>
                          <span>{audit.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAuditStatusColor(audit.status)}`}>
                      {audit.status}
                    </span>
                  </div>
                  {audit.findings > 0 && (
                    <div className="mt-2 text-sm text-red-600">
                      {audit.findings} finding{audit.findings !== 1 ? 's' : ''} require attention
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Regulatory Updates</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{update.title}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{update.authority}</span>
                          <span>•</span>
                          <span>Effective: {update.effectiveDate}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(update.impact)}`}>
                      {update.impact} Impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2 text-blue-600">
          <BookOpen className="w-5 h-5" />
          <span>View Compliance Guidelines</span>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2 text-blue-600">
          <Calendar className="w-5 h-5" />
          <span>Schedule Internal Audit</span>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2 text-blue-600">
          <RefreshCw className="w-5 h-5" />
          <span>Update Risk Assessment</span>
        </button>
      </div>
    </div>
  );
} 