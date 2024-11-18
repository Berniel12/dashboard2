"use client";

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { hsCodes, searchCodes } from '@/data/hsCodes';

interface FormData {
  client: string;
  declarationType: 'Import' | 'Export' | 'Transit';
  portOfEntry: string;
  shipmentValue: string;
  description: string;
  hsCode: string;
  countryOfOrigin: string;
  weight: string;
  quantity: string;
}

interface NewDeclarationFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

interface HSCode {
  code: string;
  description: string;
}

export default function NewDeclarationForm({ onSubmit, onCancel }: NewDeclarationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    client: '',
    declarationType: 'Import',
    portOfEntry: '',
    shipmentValue: '',
    description: '',
    hsCode: '',
    countryOfOrigin: '',
    weight: '',
    quantity: '',
  });

  const [hsSearchTerm, setHsSearchTerm] = useState('');
  const filteredHSCodes: HSCode[] = searchCodes(hsSearchTerm);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64File = reader.result?.toString().split(',')[1];
          const response = await fetch('/api/parse-pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file: base64File }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to parse PDF');
          }

          const { data } = await response.json();
          
          // Parse the extracted data
          let parsedData;
          try {
            parsedData = typeof data === 'string' ? JSON.parse(data) : data;
          } catch (e) {
            console.error('Error parsing JSON:', e);
            throw new Error('Invalid data format received');
          }

          setFormData((prev) => ({
            ...prev,
            client: parsedData.client || prev.client,
            declarationType: parsedData.declarationType || prev.declarationType,
            portOfEntry: parsedData.portOfEntry || prev.portOfEntry,
            shipmentValue: parsedData.shipmentValue || prev.shipmentValue,
            description: parsedData.description || prev.description,
            hsCode: parsedData.hsCode || prev.hsCode,
            countryOfOrigin: parsedData.countryOfOrigin || prev.countryOfOrigin,
            weight: parsedData.weight || prev.weight,
            quantity: parsedData.quantity || prev.quantity,
          }));
        } catch (error) {
          console.error('Error processing file:', error);
          // Type guard to check if error is an Error object
          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert('Failed to process the PDF file');
          }
        }
      };

      reader.onerror = () => {
        console.error('Error reading file:', reader.error);
        alert('Error reading the file');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing PDF:', error);
      // Type guard for outer try-catch block
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Error processing the PDF file');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {
      'application/pdf': ['.pdf']
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Drag and Drop Area */}
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-500 dark:text-gray-400">Drop the files here ...</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Drag 'n' drop a commercial invoice PDF here, or click to select one</p>
          )}
        </div>

        {/* Other form fields */}
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Client
          </label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="declarationType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Declaration Type
          </label>
          <select
            id="declarationType"
            name="declarationType"
            value={formData.declarationType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="Import">Import</option>
            <option value="Export">Export</option>
            <option value="Transit">Transit</option>
          </select>
        </div>

        <div>
          <label htmlFor="portOfEntry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Port of Entry/Exit
          </label>
          <input
            type="text"
            id="portOfEntry"
            name="portOfEntry"
            value={formData.portOfEntry}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="shipmentValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Shipment Value
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="shipmentValue"
              id="shipmentValue"
              value={formData.shipmentValue}
              onChange={handleChange}
              required
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 pl-7 pr-12 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="hsCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            HS Code
          </label>
          <input
            type="text"
            id="hsCode"
            name="hsCode"
            value={formData.hsCode}
            onChange={handleChange}
            onFocus={() => setHsSearchTerm(formData.hsCode)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          {hsSearchTerm && (
            <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md">
              {filteredHSCodes.map((code: HSCode) => (
                <button
                  key={code.code}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, hsCode: code.code }));
                    setHsSearchTerm('');
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {code.code} - {code.description}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="countryOfOrigin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Country of Origin
          </label>
          <input
            type="text"
            id="countryOfOrigin"
            name="countryOfOrigin"
            value={formData.countryOfOrigin}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Weight (kg)
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create Declaration
        </button>
      </div>
    </form>
  );
} 