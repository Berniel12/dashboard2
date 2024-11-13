'use client';

import React, { useState } from 'react';
import { Calculator, Search, Plus, Trash2, ArrowRight, Info } from 'lucide-react';
import { searchHSCodes } from '@/data/hsCodes';

interface CalculatorItem {
  id: string;
  hsCode: string;
  description: string;
  value: number;
  currency: string;
  rate: string;
  duty: number;
}

export default function DutyCalculatorPage() {
  const [items, setItems] = useState<CalculatorItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);

  const handleSearch = () => {
    const results = searchHSCodes(searchTerm);
    setSearchResults(results);
  };

  const addItem = (hsCode: any) => {
    const newItem: CalculatorItem = {
      id: `item-${Date.now()}`,
      hsCode: hsCode.code,
      description: hsCode.description,
      value: 0,
      currency: selectedCurrency,
      rate: hsCode.rate || '0%',
      duty: 0
    };
    setItems([...items, newItem]);
    setShowSearch(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemValue = (id: string, value: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const rate = parseFloat(item.rate.replace('%', '')) / 100;
        return {
          ...item,
          value,
          duty: value * rate
        };
      }
      return item;
    }));
  };

  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  const totalDuty = items.reduce((sum, item) => sum + item.duty, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Duty Calculator</h1>
        <p className="text-gray-600">Calculate import duties based on HS codes and values</p>
      </div>

      {/* Currency Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              {/* Add more currencies as needed */}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exchange Rate (to Local Currency)
            </label>
            <input
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Add Items Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <button
          onClick={() => setShowSearch(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Item
        </button>

        {showSearch && (
          <div className="mt-4">
            <div className="flex space-x-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by HS code or description..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="border rounded-lg divide-y">
                {searchResults.map((result) => (
                  <div
                    key={result.code}
                    className="p-4 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-medium">{result.code}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                          Rate: {result.rate || '0%'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                    </div>
                    <button
                      onClick={() => addItem(result)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Calculation Details</h2>
          </div>
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-medium">{item.hsCode}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                        Rate: {item.rate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Value ({selectedCurrency})
                    </label>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => updateItemValue(item.id, parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calculated Duty ({selectedCurrency})
                    </label>
                    <input
                      type="text"
                      value={item.duty.toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border rounded-md bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Value</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{totalValue.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{selectedCurrency}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{(totalValue * exchangeRate).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Local Currency</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Duty</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">{totalDuty.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{selectedCurrency}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{(totalDuty * exchangeRate).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Local Currency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Note */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Note:</p>
            <p>
              This calculator provides an estimate of import duties based on HS codes and declared values. 
              Actual duties may vary based on additional factors such as trade agreements, special programs, 
              and other applicable regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 