'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Building2, Mail, Phone, MapPin, Clock, CheckCircle, AlertTriangle, MessageSquare, MessageCircle, Send, FileText, ArrowRight, Ship, Settings } from 'lucide-react';

interface ClientShipment {
  id: string;
  reference: string;
  status: 'In Transit' | 'At Port' | 'Delivered';
  eta?: string;
}

interface ClientDeclaration {
  id: string;
  reference: string;
  status: 'In Progress' | 'Pending Review' | 'Completed';
  date: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Pending' | 'Inactive';
  declarations: number;
  lastActivity: string;
  recentShipments: ClientShipment[];
  recentDeclarations: ClientDeclaration[];
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
      lastActivity: '2024-03-15',
      recentShipments: [
        {
          id: 'SHP-001',
          reference: 'SHIP-2024-001',
          status: 'In Transit',
          eta: '2024-03-20'
        },
        {
          id: 'SHP-002',
          reference: 'SHIP-2024-002',
          status: 'At Port',
          eta: '2024-03-18'
        }
      ],
      recentDeclarations: [
        {
          id: 'DEC-001',
          reference: 'CD-2024-1234',
          status: 'In Progress',
          date: '2024-03-15'
        },
        {
          id: 'DEC-002',
          reference: 'CD-2024-1235',
          status: 'Completed',
          date: '2024-03-14'
        }
      ]
    },
    {
      id: 'CLT-002',
      name: 'TechCo Industries',
      email: 'info@techco.com',
      phone: '+1 234 567 8901',
      address: '456 Innovation Drive, Boston, MA',
      status: 'Active',
      declarations: 18,
      lastActivity: '2024-03-14',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-003',
      name: 'Pacific Trading Co.',
      email: 'trade@pacifictrading.com',
      phone: '+1 234 567 8902',
      address: '789 Harbor Blvd, Los Angeles, CA',
      status: 'Pending',
      declarations: 0,
      lastActivity: '2024-03-13',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-004',
      name: 'MedTech Solutions',
      email: 'operations@medtechsolutions.com',
      phone: '+1 234 567 8903',
      address: '321 Medical Center Way, Houston, TX',
      status: 'Active',
      declarations: 15,
      lastActivity: '2024-03-15',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-005',
      name: 'Automotive Parts Inc.',
      email: 'imports@autoparts.com',
      phone: '+1 234 567 8904',
      address: '567 Industrial Park, Detroit, MI',
      status: 'Active',
      declarations: 32,
      lastActivity: '2024-03-14',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-006',
      name: 'Fashion Imports Co.',
      email: 'orders@fashionimports.com',
      phone: '+1 234 567 8905',
      address: '890 Fashion Ave, New York, NY',
      status: 'Inactive',
      declarations: 8,
      lastActivity: '2024-02-28',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-007',
      name: 'Green Energy Systems',
      email: 'logistics@greenenergy.com',
      phone: '+1 234 567 8906',
      address: '123 Solar Road, Phoenix, AZ',
      status: 'Active',
      declarations: 12,
      lastActivity: '2024-03-15',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-008',
      name: 'Food & Beverage Traders',
      email: 'imports@fbtraders.com',
      phone: '+1 234 567 8907',
      address: '456 Gourmet Lane, Chicago, IL',
      status: 'Active',
      declarations: 45,
      lastActivity: '2024-03-15',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-009',
      name: 'Chemical Solutions Ltd.',
      email: 'regulatory@chemsolutions.com',
      phone: '+1 234 567 8908',
      address: '789 Laboratory Drive, New Jersey, NJ',
      status: 'Pending',
      declarations: 3,
      lastActivity: '2024-03-12',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-010',
      name: 'Furniture Wholesale Co.',
      email: 'shipping@furniturewholesale.com',
      phone: '+1 234 567 8909',
      address: '101 Warehouse Blvd, North Carolina, NC',
      status: 'Active',
      declarations: 28,
      lastActivity: '2024-03-15',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-011',
      name: 'Sports Equipment Direct',
      email: 'customs@sportsequip.com',
      phone: '+1 234 567 8910',
      address: '202 Stadium Way, Denver, CO',
      status: 'Active',
      declarations: 16,
      lastActivity: '2024-03-14',
      recentShipments: [],
      recentDeclarations: []
    },
    {
      id: 'CLT-012',
      name: 'Textile Imports LLC',
      email: 'operations@textileimports.com',
      phone: '+1 234 567 8911',
      address: '303 Fashion District, Los Angeles, CA',
      status: 'Inactive',
      declarations: 5,
      lastActivity: '2024-02-20',
      recentShipments: [],
      recentDeclarations: []
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
            <div key={client.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between mb-4 pb-4 border-b">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <Building2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{client.name}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {client.status}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                >
                  View Details
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>

              <div className="space-y-2 text-sm mb-4 pb-4 border-b">
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <a href={`mailto:${client.email}`} className="hover:text-blue-600 truncate max-w-[200px]">
                      {client.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCommunication('email', client.email)}
                    className="p-1 rounded-full hover:bg-white text-gray-500 hover:text-blue-600 transition-colors"
                    title="Send Email"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <a href={`tel:${client.phone}`} className="hover:text-blue-600">
                      {client.phone}
                    </a>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleCommunication('whatsapp', client.phone)}
                      className="p-1 rounded-full hover:bg-white text-gray-500 hover:text-green-600 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleCommunication('sms', client.phone)}
                      className="p-1 rounded-full hover:bg-white text-gray-500 hover:text-purple-600 transition-colors"
                      title="Send SMS"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start bg-gray-50 p-2 rounded">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                  <span className="text-xs text-gray-600">{client.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b">
                <div className="bg-indigo-50 p-3 rounded">
                  <div className="text-xs text-indigo-600 mb-1">Declarations</div>
                  <div className="font-semibold text-indigo-900">{client.declarations}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-xs text-blue-600 mb-1">Last Activity</div>
                  <div className="font-semibold text-blue-900">{client.lastActivity}</div>
                </div>
              </div>

              {(client.recentShipments.length > 0 || client.recentDeclarations.length > 0) && (
                <div className="space-y-3 mb-4 pb-4 border-b">
                  {client.recentShipments.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                        <Ship className="w-3 h-3 mr-1 text-gray-400" />
                        Recent Shipments
                      </h4>
                      <div className="space-y-1.5">
                        {client.recentShipments.slice(0, 2).map((shipment) => (
                          <div
                            key={shipment.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs hover:bg-gray-100 transition-colors"
                          >
                            <span className="font-medium">{shipment.reference}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                                shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                                shipment.status === 'At Port' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {shipment.status}
                              </span>
                              {shipment.eta && (
                                <span className="text-[10px] text-gray-500">
                                  ETA: {shipment.eta}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {client.recentDeclarations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                        <FileText className="w-3 h-3 mr-1 text-gray-400" />
                        Recent Declarations
                      </h4>
                      <div className="space-y-1.5">
                        {client.recentDeclarations.slice(0, 2).map((declaration) => (
                          <div
                            key={declaration.id}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs hover:bg-gray-100 transition-colors"
                          >
                            <span className="font-medium">{declaration.reference}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                                declaration.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                declaration.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {declaration.status}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {declaration.date}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded transition-colors flex items-center justify-center">
                  <FileText className="w-3 h-3 mr-1" />
                  New Declaration
                </button>
                <button className="flex-1 px-3 py-1.5 text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center justify-center">
                  <Settings className="w-3 h-3 mr-1" />
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