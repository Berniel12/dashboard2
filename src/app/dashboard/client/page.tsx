'use client';

import React, { useState } from 'react';
import { Upload, FileText, Ship, AlertCircle, Package, Clock, CheckCircle, XCircle, ArrowRight, Calendar, MapPin, Search, X, Plus } from 'lucide-react';

interface Shipment {
  id: string;
  reference: string;
  status: 'In Transit' | 'At Port' | 'Delivered' | 'Customs Hold' | 'Cleared';
  eta?: string;
  origin: string;
  destination: string;
  documents: {
    invoice: boolean;
    bl: boolean;
    packingList: boolean;
  };
  lastUpdate: string;
  customsStatus?: 'Pending' | 'In Review' | 'Cleared' | 'Hold';
}

interface NewShipmentDocuments {
  invoice?: File;
  bl?: File;
}

interface ValidationStatus {
  invoice?: {
    status: 'scanning' | 'success' | 'error';
    message?: string;
  };
  bl?: {
    status: 'scanning' | 'success' | 'error';
    message?: string;
  };
}

export default function ClientDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: 'SHP-001',
      reference: 'SHIP-2024-001',
      status: 'In Transit',
      eta: '2024-03-20',
      origin: 'Shanghai, CN',
      destination: 'Los Angeles, US',
      documents: {
        invoice: true,
        bl: true,
        packingList: false
      },
      lastUpdate: '2024-03-15',
      customsStatus: 'In Review'
    },
    {
      id: 'SHP-002',
      reference: 'SHIP-2024-002',
      status: 'At Port',
      eta: '2024-03-18',
      origin: 'Hamburg, DE',
      destination: 'New York, US',
      documents: {
        invoice: true,
        bl: false,
        packingList: true
      },
      lastUpdate: '2024-03-16',
      customsStatus: 'Pending'
    },
    {
      id: 'SHP-003',
      reference: 'SHIP-2024-003',
      status: 'Customs Hold',
      origin: 'Tokyo, JP',
      destination: 'Seattle, US',
      documents: {
        invoice: true,
        bl: true,
        packingList: true
      },
      lastUpdate: '2024-03-14',
      customsStatus: 'Hold'
    }
  ]);
  const [isNewShipmentModalOpen, setIsNewShipmentModalOpen] = useState(false);
  const [documents, setDocuments] = useState<NewShipmentDocuments>({});
  const [uploading, setUploading] = useState(false);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [brokerMessage, setBrokerMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'At Port':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Customs Hold':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Cleared':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getCustomsStatusColor = (status: Shipment['customsStatus']) => {
    switch (status) {
      case 'Pending':
        return 'text-gray-600';
      case 'In Review':
        return 'text-blue-600';
      case 'Cleared':
        return 'text-green-600';
      case 'Hold':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleFileUpload = (type: 'invoice' | 'bl', file: File) => {
    setDocuments(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const validateDocuments = async () => {
    setValidationStatus({
      invoice: { status: 'scanning' },
      bl: { status: 'scanning' }
    });

    // Simulate document validation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setValidationStatus(prev => ({
      ...prev,
      invoice: { status: 'success', message: 'Invoice validated successfully' }
    }));

    await new Promise(resolve => setTimeout(resolve, 1500));
    setValidationStatus(prev => ({
      ...prev,
      bl: { status: 'success', message: 'Bill of Lading validated successfully' }
    }));

    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowConfirmationModal(true);
  };

  const handleCreateShipment = async () => {
    setUploading(true);
    try {
      await validateDocuments();
    } catch (error) {
      console.error('Error creating shipment:', error);
      setError('Failed to validate documents');
    } finally {
      setUploading(false);
    }
  };

  const handleSendToBroker = async () => {
    try {
      // Here you would send the documents and message to the broker
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add new shipment to the list
      const newShipment: Shipment = {
        id: `SHP-${Math.random().toString(36).substr(2, 9)}`,
        reference: `SHIP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        status: 'In Transit',
        eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        origin: 'Shanghai, CN',
        destination: 'Los Angeles, US',
        documents: {
          invoice: !!documents.invoice,
          bl: !!documents.bl,
          packingList: false
        },
        lastUpdate: new Date().toISOString().split('T')[0],
        customsStatus: 'Pending'
      };

      setShipments(prev => [newShipment, ...prev]);
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
      
      // Reset all states
      setTimeout(() => {
        setShowSuccessModal(false);
        setIsNewShipmentModalOpen(false);
        setDocuments({});
        setIsUrgent(false);
        setBrokerMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error sending to broker:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with New Shipment button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">My Shipments</h2>
        <button
          onClick={() => setIsNewShipmentModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Shipment</span>
        </button>
      </div>

      {/* New Shipment Modal */}
      {isNewShipmentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Create New Shipment</h3>
              <button
                onClick={() => setIsNewShipmentModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Invoice Upload */}
                <div 
                  onClick={() => document.getElementById('invoice-upload')?.click()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    documents.invoice ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  <input
                    type="file"
                    id="invoice-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('invoice', e.target.files[0])}
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-2 rounded-full ${documents.invoice ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <FileText className={`w-6 h-6 ${documents.invoice ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      {documents.invoice ? (
                        <p className="text-green-600 font-medium">{documents.invoice.name}</p>
                      ) : (
                        <>
                          <p className="font-medium">Upload Invoice</p>
                          <p className="text-sm text-gray-500">PDF or DOC up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bill of Lading Upload */}
                <div 
                  onClick={() => document.getElementById('bl-upload')?.click()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    documents.bl ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  <input
                    type="file"
                    id="bl-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('bl', e.target.files[0])}
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-2 rounded-full ${documents.bl ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Ship className={`w-6 h-6 ${documents.bl ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      {documents.bl ? (
                        <p className="text-green-600 font-medium">{documents.bl.name}</p>
                      ) : (
                        <>
                          <p className="font-medium">Upload Bill of Lading</p>
                          <p className="text-sm text-gray-500">PDF or DOC up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsNewShipmentModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateShipment}
                disabled={!documents.invoice || !documents.bl || uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Create Shipment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Validation Modal */}
      {isNewShipmentModalOpen && validationStatus.invoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6">
            <h3 className="text-lg font-medium mb-4">Validating Documents</h3>
            
            <div className="space-y-4">
              {/* Invoice Validation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    validationStatus.invoice.status === 'scanning' ? 'bg-blue-100 animate-pulse' :
                    validationStatus.invoice.status === 'success' ? 'bg-green-100' :
                    'bg-red-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      validationStatus.invoice.status === 'scanning' ? 'text-blue-600' :
                      validationStatus.invoice.status === 'success' ? 'text-green-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <span className="font-medium">Invoice</span>
                </div>
                {validationStatus.invoice.status === 'scanning' && (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
                {validationStatus.invoice.status === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>

              {/* B/L Validation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    validationStatus.bl?.status === 'scanning' ? 'bg-blue-100 animate-pulse' :
                    validationStatus.bl?.status === 'success' ? 'bg-green-100' :
                    'bg-red-100'
                  }`}>
                    <Ship className={`w-5 h-5 ${
                      validationStatus.bl?.status === 'scanning' ? 'text-blue-600' :
                      validationStatus.bl?.status === 'success' ? 'text-green-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <span className="font-medium">Bill of Lading</span>
                </div>
                {validationStatus.bl?.status === 'scanning' && (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
                {validationStatus.bl?.status === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6">
            <h3 className="text-lg font-medium mb-4">Send to Broker</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                  Mark as Urgent
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message to Broker
                </label>
                <textarea
                  value={brokerMessage}
                  onChange={(e) => setBrokerMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Add any additional information for the broker..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendToBroker}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send to Broker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Documents Sent Successfully
            </h3>
            <p className="text-gray-500">
              Your documents have been sent to the broker{isUrgent ? ' with urgent priority' : ''}.
              You will be notified of any updates.
            </p>
          </div>
        </div>
      )}

      {/* Shipments List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">My Shipments</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search shipments..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Track Shipment
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded">
                    <Ship className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{shipment.reference}</h3>
                    <p className="text-sm text-gray-500">Last update: {shipment.lastUpdate}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Origin</div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {shipment.origin}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Destination</div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {shipment.destination}
                  </div>
                </div>
                {shipment.eta && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">ETA</div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {shipment.eta}
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Customs Status</div>
                  <div className={`flex items-center text-sm ${getCustomsStatusColor(shipment.customsStatus)}`}>
                    <Clock className="w-4 h-4 mr-1" />
                    {shipment.customsStatus}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${shipment.documents.invoice ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <FileText className={`w-4 h-4 ${shipment.documents.invoice ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className={`p-1 rounded ${shipment.documents.bl ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Ship className={`w-4 h-4 ${shipment.documents.bl ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className={`p-1 rounded ${shipment.documents.packingList ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Package className={`w-4 h-4 ${shipment.documents.packingList ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  {(!shipment.documents.invoice || !shipment.documents.bl || !shipment.documents.packingList) && (
                    <span className="text-xs text-red-600">Missing Documents</span>
                  )}
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 