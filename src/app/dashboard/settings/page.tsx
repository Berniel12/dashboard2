'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  Key, 
  Globe, 
  Mail, 
  Smartphone,
  Database,
  Webhook,
  Shield,
  Printer,
  Languages,
  Clock
} from 'lucide-react';

interface NotificationSetting {
  id: string;
  type: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  description: string;
}

interface IntegrationSetting {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'decl-submit',
      type: 'Declaration Submissions',
      email: true,
      sms: false,
      push: true,
      description: 'Notifications when declarations are submitted'
    },
    {
      id: 'decl-status',
      type: 'Status Updates',
      email: true,
      sms: true,
      push: true,
      description: 'Updates on declaration status changes'
    },
    {
      id: 'compliance',
      type: 'Compliance Alerts',
      email: true,
      sms: true,
      push: true,
      description: 'Critical compliance and regulatory updates'
    }
  ]);

  const [integrations, setIntegrations] = useState<IntegrationSetting[]>([
    {
      id: 'customs-api',
      name: 'Customs Authority API',
      status: 'connected',
      lastSync: '2024-03-15 14:30'
    },
    {
      id: 'shipping-api',
      name: 'Shipping Line Integration',
      status: 'connected',
      lastSync: '2024-03-15 15:45'
    },
    {
      id: 'erp',
      name: 'ERP System',
      status: 'disconnected'
    }
  ]);

  const handleNotificationToggle = (settingId: string, channel: 'email' | 'sms' | 'push') => {
    setNotifications(prev => prev.map(setting => {
      if (setting.id === settingId) {
        return {
          ...setting,
          [channel]: !setting[channel]
        };
      }
      return setting;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Settings
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {notifications.map(setting => (
                <div key={setting.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{setting.type}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleNotificationToggle(setting.id, 'email')}
                      className={`p-2 rounded-lg ${
                        setting.email 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      title="Email notifications"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleNotificationToggle(setting.id, 'sms')}
                      className={`p-2 rounded-lg ${
                        setting.sms 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      title="SMS notifications"
                    >
                      <Smartphone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleNotificationToggle(setting.id, 'push')}
                      className={`p-2 rounded-lg ${
                        setting.push 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      title="Push notifications"
                    >
                      <Bell className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Integrations */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <Webhook className="w-5 h-5 mr-2" />
              API Integrations
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {integrations.map(integration => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <Database className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      {integration.lastSync && (
                        <p className="text-sm text-gray-500">
                          Last synced: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      integration.status === 'connected' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {integration.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              General Settings
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Language Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center mb-2">
                    <Languages className="w-4 h-4 mr-2" />
                    Language
                  </div>
                </label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>

              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    Time Zone
                  </div>
                </label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                </select>
              </div>

              {/* Default Printer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center mb-2">
                    <Printer className="w-4 h-4 mr-2" />
                    Default Printer
                  </div>
                </label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option value="printer1">Main Office Printer</option>
                  <option value="printer2">Warehouse Printer</option>
                </select>
              </div>

              {/* Security Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center mb-2">
                    <Shield className="w-4 h-4 mr-2" />
                    Security
                  </div>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    <span className="ml-2 text-sm text-gray-600">Enable Two-Factor Authentication</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    <span className="ml-2 text-sm text-gray-600">Require password change every 90 days</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 