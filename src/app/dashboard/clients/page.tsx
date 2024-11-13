'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Building2, Mail, Phone, MapPin, Clock, CheckCircle, AlertTriangle, MessageSquare, MessageCircle, Send } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Pending' | 'Inactive';
  declarations: number;
  lastActivity: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 'CLT-001',
      name: 'Global Electronics Ltd.',
      email: 'contact@globalelectronics.com',
      phone: '+1 234 567 8900',
      address: '123 Tech Park, Silicon Valley, CA',
      status: 'Active',
      declarations: 24,
      lastActivity: '2024-03-15'
    },
    {
      id: 'CLT-002',
      name: 'TechCo Industries',
      email: 'info@techco.com',
      phone: '+1 234 567 8901',
      address: '456 Innovation Drive, Boston, MA',
      status: 'Active',
      declarations: 18,
      lastActivity: '2024-03-14'
    },
    {
      id: 'CLT-003',
      name: 'Pacific Trading Co.',
      email: 'trade@pacifictrading.com',
      phone: '+1 234 567 8902',
      address: '789 Harbor Blvd, Los Angeles, CA',
      status: 'Pending',
      declarations: 0,
      lastActivity: '2024-03-13'
    }
  ]);

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-50';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'Inactive':
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: Client['status']) => {
    switch (status) {
      case 'Active':
        return CheckCircle;
      case 'Pending':
        return Clock;
      case 'Inactive':
        return AlertTriangle;
    }
  };

  const handleCommunication = (type: 'email' | 'whatsapp' | 'sms', contact: string) => {
    switch (type) {
      case 'email':
        window.location.href = `mailto:${contact}`;
        break;
      case 'whatsapp':
        // Remove any non-numeric characters from phone
        const whatsappNumber = contact.replace(/\D/g, '');
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        break;
      case 'sms':
        window.location.href = `sms:${contact}`;
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link
          href="/dashboard/clients/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Client
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => {
          const StatusIcon = getStatusIcon(client.status);
          return (
            <div key={client.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Building2 className="w-10 h-10 text-gray-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {client.status}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Details
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${client.email}`} className="hover:text-blue-600">
                      {client.email}
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCommunication('email', client.email)}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                      title="Send Email"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={`tel:${client.phone}`} className="hover:text-blue-600">
                      {client.phone}
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCommunication('whatsapp', client.phone)}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-green-600 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCommunication('sms', client.phone)}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-purple-600 transition-colors"
                      title="Send SMS"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 mt-1" />
                  <span>{client.address}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Declarations</span>
                  <span className="font-medium">{client.declarations}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Last Activity</span>
                  <span className="font-medium">{client.lastActivity}</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  New Declaration
                </button>
                <button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                  Edit Client
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 