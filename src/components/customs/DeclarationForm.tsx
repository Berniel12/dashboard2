import React from 'react';
import { useState, useEffect } from "react";
import { DeclarationLoader } from "./DeclarationLoader";
import { AnimatedField } from "./AnimatedField";
import { Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { SubmissionLoader } from "./SubmissionLoader";
import { useRouter } from 'next/navigation';
import { ComparisonLoader } from "./ComparisonLoader";
import { FormCreationLoader } from "./FormCreationLoader";

type DocumentType = 'invoice' | 'billOfLading';

interface FormData {
  // Shipment Details
  shipperName: string;
  shipperAddress: string;
  shipperCountry: string;
  consigneeName: string;
  consigneeAddress: string;
  consigneeCountry: string;
  
  // Goods Details
  hsCode: string;
  goodsDescription: string;
  packageType: string;
  quantity: string;
  weight: string;
  value: string;
  currency: string;
  
  // Transport Details
  transportMode: string;
  carrierName: string;
  vesselName: string;
  voyageNumber: string;
  
  // Documentation
  invoiceNumber: string;
  invoiceDate: string;
  originCountry: string;
  destinationCountry: string;
  
  // Additional Information
  incoterms: string;
  paymentTerms: string;
  remarks: string;
  
  // Bill of Lading specific fields
  blNumber: string;
  portOfLoading: string;
  portOfDischarge: string;
  containerNumbers: string[];
  sealNumbers: string[];
  grossWeight: string;
  measurement: string;
}

interface Discrepancy {
  field: string;
  invoiceValue: string;
  blValue: string;
}

export function DeclarationForm() {
  const [currentPhase, setCurrentPhase] = useState<'invoice' | 'billOfLading' | 'comparison' | 'review'>('invoice');
  const [isLoading, setIsLoading] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [invoiceData, setInvoiceData] = useState<FormData | null>(null);
  const [blData, setBlData] = useState<FormData | null>(null);
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [editedData, setEditedData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showComparisonResults, setShowComparisonResults] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const router = useRouter();

  const handleInvoiceUpload = async (invoiceData: File) => {
    setInvoiceData(null);
    setShowFields(false);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const extractedData: FormData = {
        // Shipment Details
        shipperName: "Global Electronics Ltd.",
        shipperAddress: "123 Tech Park, Silicon Valley",
        shipperCountry: "United States",
        consigneeName: "European Distributors Inc.",
        consigneeAddress: "456 Business Center, London",
        consigneeCountry: "United Kingdom",
        
        // Goods Details
        hsCode: "8471.30.0000",
        goodsDescription: "Laptop Computers - Model XYZ",
        packageType: "Pallets",
        quantity: "100 units",
        weight: "450 KG",
        value: "75000",
        currency: "USD",
        
        // Transport Details
        transportMode: "Sea Freight",
        carrierName: "Maersk Line",
        vesselName: "MSC Oscar",
        voyageNumber: "VOY-2024-123",
        
        // Documentation
        invoiceNumber: "INV-2024-001",
        invoiceDate: "2024-03-15",
        originCountry: "United States",
        destinationCountry: "United Kingdom",
        
        // Additional Information
        incoterms: "CIF London",
        paymentTerms: "Net 30",
        remarks: "Fragile electronic equipment",
        
        // Bill of Lading specific fields
        blNumber: "MAEU123456789",
        portOfLoading: "Los Angeles",
        portOfDischarge: "Southampton",
        containerNumbers: ["CONT123456", "CONT123457"],
        sealNumbers: ["SEAL123", "SEAL124"],
        grossWeight: "455 KG",
        measurement: "48 CBM"
      };

      setInvoiceData(extractedData);
    } catch (error) {
      console.error('Error processing invoice:', error);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowFields(true);
    }, 500);
  };

  const handleBLUpload = async (blFile: File) => {
    setShowFields(false);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const extractedBLData: FormData = {
        // Shipment Details
        shipperName: "Global Electronics Ltd.",
        shipperAddress: "123 Tech Park, Silicon Valley",
        shipperCountry: "United States",
        consigneeName: "European Distributors Inc.",
        consigneeAddress: "456 Business Center, London",
        consigneeCountry: "United Kingdom",
        
        // Goods Details
        hsCode: "8471.30.0000",
        goodsDescription: "Laptop Computers - Model XYZ",
        packageType: "Pallets",
        quantity: "100 units",
        weight: "455 KG", // Slight difference from invoice
        value: "75000",
        currency: "USD",
        
        // Transport Details
        transportMode: "Sea Freight",
        carrierName: "Maersk Line",
        vesselName: "MSC Oscar",
        voyageNumber: "VOY-2024-123",
        
        // Documentation
        invoiceNumber: "INV-2024-001",
        invoiceDate: "2024-03-15",
        originCountry: "United States",
        destinationCountry: "United Kingdom",
        
        // Additional Information
        incoterms: "CIF London",
        paymentTerms: "Net 30",
        remarks: "Fragile electronic equipment",
        
        // Bill of Lading specific fields
        blNumber: "MAEU123456789",
        portOfLoading: "Los Angeles",
        portOfDischarge: "Southampton",
        containerNumbers: ["CONT123456", "CONT123457"],
        sealNumbers: ["SEAL123", "SEAL124"],
        grossWeight: "455 KG",
        measurement: "48 CBM"
      };

      setBlData(extractedBLData);
      findDiscrepancies(invoiceData!, extractedBLData);
    } catch (error) {
      console.error('Error processing B/L:', error);
    }
  };

  const findDiscrepancies = (invoice: FormData, bl: FormData) => {
    const discrepancies: Discrepancy[] = [];
    
    // Compare common fields
    if (invoice.weight !== bl.grossWeight) {
      discrepancies.push({
        field: 'Weight',
        invoiceValue: invoice.weight,
        blValue: bl.grossWeight
      });
    }
    // Add more field comparisons...

    setDiscrepancies(discrepancies);
  };

  useEffect(() => {
    if (invoiceData && blData) {
      setEditedData({
        ...invoiceData,
        ...blData
      });
    }
  }, [invoiceData, blData]);

  const handleFieldChange = (field: keyof FormData, value: any) => {
    if (!editedData) return;
    
    setEditedData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const renderInvoiceFields = () => {
    if (!showFields || !invoiceData) return null;

    return (
      <div className="space-y-8">
        {/* Shipment Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedField label="Shipper Name" value={invoiceData.shipperName} delay={500} />
            <AnimatedField label="Shipper Address" value={invoiceData.shipperAddress} delay={700} />
            <AnimatedField label="Shipper Country" value={invoiceData.shipperCountry} delay={900} />
            <AnimatedField label="Consignee Name" value={invoiceData.consigneeName} delay={1100} />
            <AnimatedField label="Consignee Address" value={invoiceData.consigneeAddress} delay={1300} />
            <AnimatedField label="Consignee Country" value={invoiceData.consigneeCountry} delay={1500} />
          </div>
        </div>

        {/* Goods Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Goods Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedField label="HS Code" value={invoiceData.hsCode} delay={1700} />
            <AnimatedField label="Goods Description" value={invoiceData.goodsDescription} delay={1900} />
            <AnimatedField label="Package Type" value={invoiceData.packageType} delay={2100} />
            <AnimatedField label="Quantity" value={invoiceData.quantity} delay={2300} />
            <AnimatedField label="Weight" value={invoiceData.weight} delay={2500} />
            <AnimatedField label="Value" value={`${invoiceData.value} ${invoiceData.currency}`} delay={2700} />
          </div>
        </div>

        {/* Transport Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Transport Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedField label="Transport Mode" value={invoiceData.transportMode} delay={2900} />
            <AnimatedField label="Carrier Name" value={invoiceData.carrierName} delay={3100} />
            <AnimatedField label="Vessel Name" value={invoiceData.vesselName} delay={3300} />
            <AnimatedField label="Voyage Number" value={invoiceData.voyageNumber} delay={3500} />
          </div>
        </div>

        {/* Documentation Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Documentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedField label="Invoice Number" value={invoiceData.invoiceNumber} delay={3700} />
            <AnimatedField label="Invoice Date" value={invoiceData.invoiceDate} delay={3900} />
            <AnimatedField label="Origin Country" value={invoiceData.originCountry} delay={4100} />
            <AnimatedField label="Destination Country" value={invoiceData.destinationCountry} delay={4300} />
          </div>
        </div>

        {/* Additional Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedField label="Incoterms" value={invoiceData.incoterms} delay={4500} />
            <AnimatedField label="Payment Terms" value={invoiceData.paymentTerms} delay={4700} />
            <AnimatedField label="Remarks" value={invoiceData.remarks} delay={4900} />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setCurrentPhase('billOfLading')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue to Bill of Lading
          </button>
        </div>
      </div>
    );
  };

  const renderBLFields = () => {
    if (!showFields || !blData) return null;

    return (
      <div className="space-y-8">
        {/* B/L Specific Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Bill of Lading Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedField label="B/L Number" value={blData.blNumber} delay={500} />
            <AnimatedField label="Port of Loading" value={blData.portOfLoading} delay={700} />
            <AnimatedField label="Port of Discharge" value={blData.portOfDischarge} delay={900} />
            <AnimatedField label="Vessel Name" value={blData.vesselName} delay={1100} />
            <AnimatedField label="Gross Weight" value={blData.grossWeight} delay={1300} />
            <AnimatedField label="Measurement" value={blData.measurement} delay={1500} />
          </div>
        </div>

        {/* Container Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Container Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedField 
              label="Container Numbers" 
              value={blData.containerNumbers.join(", ")} 
              delay={1700} 
            />
            <AnimatedField 
              label="Seal Numbers" 
              value={blData.sealNumbers.join(", ")} 
              delay={1900} 
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setCurrentPhase('comparison')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Compare Documents
          </button>
        </div>
      </div>
    );
  };

  const renderFinalReview = () => {
    if (!editedData) return null;

    return (
      <div className="space-y-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            Please review all information before submitting. You can modify any field if needed.
          </p>
        </div>

        {/* Declaration Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-bold">Customs Declaration</h3>
            <p className="text-sm text-gray-500">Reference: CD-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</p>
          </div>

          {/* Document References */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Declaration Date</label>
              <input
                type="date"
                value={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
              <input
                type="text"
                value={editedData.invoiceNumber}
                onChange={(e) => handleFieldChange('invoiceNumber', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">B/L Number</label>
              <input
                type="text"
                value={editedData.blNumber}
                onChange={(e) => handleFieldChange('blNumber', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Parties Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Exporter/Shipper */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">1. Exporter/Shipper</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editedData.shipperName}
                    onChange={(e) => handleFieldChange('shipperName', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={editedData.shipperAddress}
                    onChange={(e) => handleFieldChange('shipperAddress', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={editedData.shipperCountry}
                    onChange={(e) => handleFieldChange('shipperCountry', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Importer/Consignee */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">2. Importer/Consignee</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editedData.consigneeName}
                    onChange={(e) => handleFieldChange('consigneeName', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={editedData.consigneeAddress}
                    onChange={(e) => handleFieldChange('consigneeAddress', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={editedData.consigneeCountry}
                    onChange={(e) => handleFieldChange('consigneeCountry', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Transport Information */}
          <div className="border rounded-lg p-4 mb-8">
            <h4 className="font-semibold mb-3">3. Transport Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Transport</label>
                <input
                  type="text"
                  value={editedData.transportMode}
                  onChange={(e) => handleFieldChange('transportMode', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vessel Name</label>
                <input
                  type="text"
                  value={editedData.vesselName}
                  onChange={(e) => handleFieldChange('vesselName', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Voyage Number</label>
                <input
                  type="text"
                  value={editedData.voyageNumber}
                  onChange={(e) => handleFieldChange('voyageNumber', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Port of Loading</label>
                <input
                  type="text"
                  value={editedData.portOfLoading}
                  onChange={(e) => handleFieldChange('portOfLoading', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Port of Discharge</label>
                <input
                  type="text"
                  value={editedData.portOfDischarge}
                  onChange={(e) => handleFieldChange('portOfDischarge', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
          </div>
        </div>

          {/* Goods Information */}
          <div className="border rounded-lg p-4 mb-8">
            <h4 className="font-semibold mb-3">4. Goods Information</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HS Code</label>
              <input
                type="text"
                value={editedData.hsCode}
                onChange={(e) => handleFieldChange('hsCode', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description of Goods</label>
              <input
                type="text"
                value={editedData.goodsDescription}
                onChange={(e) => handleFieldChange('goodsDescription', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                  <input
                    type="text"
                    value={editedData.packageType}
                    onChange={(e) => handleFieldChange('packageType', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="text"
                    value={editedData.quantity}
                    onChange={(e) => handleFieldChange('quantity', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
          </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gross Weight</label>
                  <input
                    type="text"
                    value={editedData.grossWeight}
                    onChange={(e) => handleFieldChange('grossWeight', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
        </div>
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Measurement</label>
              <input
                type="text"
                    value={editedData.measurement}
                    onChange={(e) => handleFieldChange('measurement', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
                </div>
              </div>
            </div>
          </div>

          {/* Container Information */}
          <div className="border rounded-lg p-4 mb-8">
            <h4 className="font-semibold mb-3">5. Container Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Container Numbers</label>
                <textarea
                  value={editedData.containerNumbers.join("\n")}
                  onChange={(e) => handleFieldChange('containerNumbers', e.target.value.split("\n"))}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seal Numbers</label>
                <textarea
                  value={editedData.sealNumbers.join("\n")}
                  onChange={(e) => handleFieldChange('sealNumbers', e.target.value.split("\n"))}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
          </div>
        </div>

          {/* Commercial Information */}
          <div className="border rounded-lg p-4 mb-8">
            <h4 className="font-semibold mb-3">6. Commercial Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incoterms</label>
              <input
                type="text"
                  value={editedData.incoterms}
                  onChange={(e) => handleFieldChange('incoterms', e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <div className="flex">
                  <input
                    type="text"
                    value={editedData.value}
                    onChange={(e) => handleFieldChange('value', e.target.value)}
                    className="w-full px-4 py-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={editedData.currency}
                    onChange={(e) => handleFieldChange('currency', e.target.value)}
                    className="w-20 px-4 py-2 border-t border-b border-r rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
              <input
                type="text"
                  value={editedData.paymentTerms}
                  onChange={(e) => handleFieldChange('paymentTerms', e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">7. Additional Information</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
              <textarea
                value={editedData.remarks}
                onChange={(e) => handleFieldChange('remarks', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setCurrentPhase('comparison')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back to Comparison
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Submit Declaration
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API calls with proper timing
      await new Promise(resolve => setTimeout(resolve, 7000)); // Total duration of loader steps
      
      // After submission is complete, redirect to declarations list
      router.push('/dashboard/declarations');
    } catch (error) {
      console.error('Error submitting declaration:', error);
      // Handle error appropriately
    }
  };

  const renderPhaseContent = () => {
    if (isSubmitting) {
      return <SubmissionLoader onComplete={() => router.push('/dashboard/declarations')} />;
    }

    switch (currentPhase) {
      case 'invoice':
        return (
          <div className="space-y-6">
            {!invoiceData ? (
              <div className="mb-8">
                <label
                  htmlFor="invoice-upload"
                  className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <span className="text-gray-600">
                    Drop your Commercial Invoice here or click to upload
                  </span>
                  <input
                    id="invoice-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleInvoiceUpload(file);
                    }}
                  />
                </label>
              </div>
            ) : null}
            {renderInvoiceFields()}
          </div>
        );

      case 'billOfLading':
        return (
          <div className="space-y-6">
            {!blData ? (
              <div className="mb-8">
                <label
                  htmlFor="bl-upload"
                  className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <span className="text-gray-600">
                    Drop your Bill of Lading here or click to upload
                  </span>
                  <input
                    id="bl-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleBLUpload(file);
                    }}
                  />
                </label>
              </div>
            ) : null}
            {renderBLFields()}
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-6">
            {!showComparisonResults ? (
              <ComparisonLoader onComplete={() => {
                setShowComparisonResults(true);
              }} />
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Document Comparison</h3>
                {discrepancies.length > 0 ? (
                  <div className="space-y-4">
                    {discrepancies.map((discrepancy, index) => (
                      <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-medium">{discrepancy.field} Discrepancy</h4>
                            <p className="text-sm text-gray-600">
                              Invoice: {discrepancy.invoiceValue}<br />
                              B/L: {discrepancy.blValue}
                            </p>
                            <div className="mt-2">
                              <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              >
                                <option value={discrepancy.invoiceValue}>Use Invoice Value</option>
                                <option value={discrepancy.blValue}>Use B/L Value</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setCurrentPhase('review')}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Proceed to Final Review
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-6">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <p className="text-green-700">No discrepancies found between documents</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentPhase('review')}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Proceed to Final Review
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            {!showReviewForm ? (
              <FormCreationLoader onComplete={() => setShowReviewForm(true)} />
            ) : (
              <div>
                <h3 className="text-2xl font-bold mb-6">Final Review</h3>
                {renderFinalReview()}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['invoice', 'billOfLading', 'comparison', 'review'].map((phase, index) => (
            <React.Fragment key={phase}>
              <div className={`flex flex-col items-center ${
                currentPhase === phase ? 'text-blue-600' : 
                index < ['invoice', 'billOfLading', 'comparison', 'review'].indexOf(currentPhase) 
                  ? 'text-green-600' 
                  : 'text-gray-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentPhase === phase ? 'border-blue-600 bg-blue-50' :
                  index < ['invoice', 'billOfLading', 'comparison', 'review'].indexOf(currentPhase)
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300'
                }`}>
                  {index + 1}
                </div>
                <span className="text-xs mt-1">{phase.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
              {index < 3 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  index < ['invoice', 'billOfLading', 'comparison', 'review'].indexOf(currentPhase)
                    ? 'bg-green-600'
                    : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {isLoading && <DeclarationLoader onComplete={handleLoadingComplete} />}
      
      {renderPhaseContent()}
    </div>
  );
} 