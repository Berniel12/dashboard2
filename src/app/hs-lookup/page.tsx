'use client';

import { useState } from 'react';
import FileUpload from '@/components/HSLookup/FileUpload';

interface HSCodeItem {
  name: string;
  description: string;
  hs_code: string;
  confidence: string;
}

interface AnalysisResult {
  items: HSCodeItem[];
}

export default function HSLookup() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleUploadComplete = (data: any) => {
    console.log('Upload completed, setting analysis result:', data);
    if (data.success && data.analysis && data.analysis.items) {
      setAnalysisResult(data.analysis);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">HS Code Lookup</h1>
      <div className="max-w-4xl mx-auto">
        <FileUpload onUploadComplete={handleUploadComplete} />
        
        {analysisResult && analysisResult.items && analysisResult.items.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Analysis Result</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      HS Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analysisResult.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {item.hs_code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(item.confidence)}`}>
                          {item.confidence}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
} 