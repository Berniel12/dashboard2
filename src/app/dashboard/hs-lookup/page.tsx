'use client';

import React, { useState } from 'react';
import { Search, Info, ArrowRight } from 'lucide-react';

interface HSCode {
  code: string;
  description: string;
  rate?: string;
  unit?: string;
  notes?: string;
}

interface APIResponse {
  code: string;
  text: string;
  score: number;
}

export default function HSLookupPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<HSCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/hs-lookup?term=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch HS codes');
      }

      const data: APIResponse[] = await response.json();
      
      const transformedResults: HSCode[] = data.map(item => ({
        code: item.code,
        description: item.text,
        // We'll add rate and unit info later when implementing the duty lookup
      }));

      setSearchResults(transformedResults);
    } catch (err) {
      console.error('Error fetching HS codes:', err);
      setError('Failed to fetch HS codes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch duty information for a specific HS code
  const fetchDutyInfo = async (code: string) => {
    try {
      const response = await fetch(
        `https://www.tariffnumber.com/api/v1/cnDuties?term=${code}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch duty information');
      }

      const data = await response.json();
      // Handle duty information...
      console.log('Duty info:', data);
    } catch (err) {
      console.error('Error fetching duty information:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">HS Code Lookup</h1>
        <p className="text-gray-600">Search for Harmonized System (HS) codes by number or description</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="max-w-3xl">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter HS code or description..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              Search
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Example: "laptop computer" or "8471.30"
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Search Results</h2>
          </div>
          <div className="divide-y">
            {searchResults.map((result) => (
              <div key={result.code} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-lg font-semibold">{result.code}</span>
                      {result.rate && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                          Rate: {result.rate}
                        </span>
                      )}
                      {result.unit && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                          Unit: {result.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{result.description}</p>
                    {result.notes && (
                      <div className="flex items-start space-x-2 text-sm text-gray-500">
                        <Info className="w-4 h-4 mt-0.5" />
                        <span>{result.notes}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => fetchDutyInfo(result.code)}
                    className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {searchTerm && searchResults.length === 0 && !isLoading && !error && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse through our HS code categories.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 