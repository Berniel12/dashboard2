"use client";

import React from 'react';
import { Save } from 'lucide-react';

interface FormData {
  client: string;
  type: 'Import' | 'Export' | 'Transit';
  port: string;
  value: string;
  description: string;
}

interface NewDeclarationFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export default function NewDeclarationForm({ onSubmit, onCancel }: NewDeclarationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      client: formData.get('client') as string,
      type: formData.get('type') as 'Import' | 'Export' | 'Transit',
      port: formData.get('port') as string,
      value: formData.get('value') as string,
      description: formData.get('description') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <select
            id="client"
            name="client"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="">Select a client</option>
            <option value="acme-corp">Acme Corp</option>
            <option value="techco-ltd">TechCo Ltd</option>
            <option value="global-trade">Global Trade Inc</option>
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Declaration Type
          </label>
          <select
            id="type"
            name="type"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
            <option value="Transit">Transit</option>
          </select>
        </div>

        <div>
          <label htmlFor="port" className="block text-sm font-medium text-gray-700">
            Port of Entry/Exit
          </label>
          <input
            type="text"
            id="port"
            name="port"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">
            Shipment Value
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="value"
              id="value"
              required
              className="block w-full rounded-md border border-gray-300 pl-7 pr-12 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Save className="h-4 w-4" />
          Create Declaration
        </button>
      </div>
    </form>
  );
} 