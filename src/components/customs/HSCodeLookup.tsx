"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { hsCodes, searchCodes } from '@/data/hsCodes';
import type { HSCode } from '@/types/customs';

export default function HSCodeLookup() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCode, setSelectedCode] = useState<HSCode | null>(null);

  const filteredCodes = searchCodes(searchTerm);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by HS code or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 border-b">
          <div className="text-sm font-medium text-gray-500">HS Code</div>
          <div className="text-sm font-medium text-gray-500">Description</div>
          <div className="text-sm font-medium text-gray-500">Rate</div>
        </div>
        <div className="divide-y">
          {filteredCodes.map((code) => (
            <button
              key={code.code}
              onClick={() => setSelectedCode(code)}
              className="w-full grid grid-cols-3 gap-4 p-4 hover:bg-gray-50 text-left"
            >
              <div className="text-sm font-medium text-blue-600">{code.code}</div>
              <div className="text-sm text-gray-900">{code.description}</div>
              <div className="text-sm text-gray-500">{code.rate}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Code Details */}
      {selectedCode && (
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCode.code}
              </h3>
              <p className="text-sm text-gray-500">
                Section {selectedCode.section}, Chapter {selectedCode.chapter}
              </p>
            </div>
            <div className="text-lg font-medium text-gray-900">
              Rate: {selectedCode.rate}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900">Description</h4>
            <p className="mt-1 text-sm text-gray-600">
              {selectedCode.description}
            </p>
          </div>

          {selectedCode.notes && selectedCode.notes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Notes</h4>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {selectedCode.notes.map((note, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {/* TODO: Copy to clipboard */}}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Copy Code
            </button>
            <button
              onClick={() => {/* TODO: Add to declaration */}}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Use in Declaration
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 