"use client";

import React, { useState, useRef, useEffect } from 'react';

interface AIClassification {
  primaryCode: string;
  primaryDescription: string;
  confidence: number;
  alternativeCodes?: Array<{
    code: string;
    description: string;
    confidence: number;
  }>;
}

interface HSCodeResult {
  code: string;
  description: string;
  indent: number;
  details: {
    unitOfQuantity: string[];
    generalRate: string;
    specialRate: string;
  };
  children?: HSCodeResult[];
}

interface HSCodeLookupProps {
  onHSCodeSelect?: (code: string, description: string) => void;
}

export const HSCodeLookup: React.FC<HSCodeLookupProps> = ({ onHSCodeSelect }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<HSCodeResult[]>([]);
  const [aiResult, setAiResult] = useState<AIClassification | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'invoice'>('text');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setAiResult(null);
    setResults([]);

    try {
      console.log('Sending search request with description:', description);

      const response = await fetch('/api/hs-codes/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch HS codes');
      }

      const data = await response.json();
      console.log('Received search results:', data.results);
      setResults(data.results || []);

    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (activeTab === 'image') {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    setLoading(true);
    setError(null);
    setAiResult(null);
    setResults([]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const uploadData = await uploadResponse.json();
      
      if (uploadData.extractedText) {
        setDescription(uploadData.extractedText);
      }
      
      if (uploadData.classification) {
        const code = uploadData.classification.primaryCode;
        const hierarchicalResults: HSCodeResult[] = [{
          code: code.slice(0, 2),
          description: uploadData.classification.chapterDescription,
          indent: 0,
          details: {
            unitOfQuantity: [],
            generalRate: "",
            specialRate: ""
          },
          children: [{
            code: code.slice(0, 4),
            description: uploadData.classification.headingDescription,
            indent: 1,
            details: {
              unitOfQuantity: [],
              generalRate: "",
              specialRate: ""
            },
            children: [{
              code: code,
              description: uploadData.classification.subheadingDescription,
              indent: 2,
              details: {
                unitOfQuantity: uploadData.classification.unitOfQuantity || [],
                generalRate: uploadData.classification.generalRate || "",
                specialRate: uploadData.classification.specialRate || ""
              }
            }]
          }]
        }];

        setResults(hierarchicalResults);
      }

    } catch (err) {
      console.error('File upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex space-x-4">
        <button
          onClick={() => {
            setActiveTab('text');
            setPreviewUrl(null);
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'text'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Enter Text
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'image'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upload Image
        </button>
        <button
          onClick={() => {
            setActiveTab('invoice');
            setPreviewUrl(null);
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'invoice'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upload Invoice
        </button>
      </div>

      {activeTab === 'text' && (
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 shadow-sm font-medium"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      )}

      {(activeTab === 'image' || activeTab === 'invoice') && (
        <div className="flex flex-col items-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept={activeTab === 'image' ? "image/*" : ".pdf,.doc,.docx,.xls,.xlsx"}
            className="hidden"
          />
          
          <div className="w-full flex items-start gap-6">
            {previewUrl && activeTab === 'image' && (
              <div className="flex-shrink-0 relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                />
                {loading && (
                  <>
                    <div className="absolute inset-0 bg-blue-500/5 rounded-lg overflow-hidden">
                      <div className="absolute inset-x-0 h-24 animate-scan-line">
                        <div className="h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
                      </div>
                      <div className="absolute inset-0 rounded-lg animate-scan-glow" />
                    </div>
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 animate-[progress_2.5s_ease-in-out_infinite]" />
                    </div>
                    <div className="absolute -bottom-8 left-0 right-0 text-center text-sm text-blue-600 animate-pulse">
                      Processing image...
                    </div>
                  </>
                )}
              </div>
            )}

            {description && (
              <div className="flex-grow">
                <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Extracted Description</h3>
                  <div className="relative">
                    <p className="text-gray-900 whitespace-pre-wrap animate-typewriter overflow-hidden border-r-2 border-blue-500 animate-blink">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!previewUrl && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium mt-4"
                disabled={loading}
              >
                {loading ? 'Processing...' : activeTab === 'image' ? 'Choose Image' : 'Choose Invoice'}
              </button>
              <p className="mt-3 text-sm text-gray-600">
                {activeTab === 'image' 
                  ? 'Upload a clear image of your product'
                  : 'Upload your invoice document (PDF, DOC, XLS)'
                }
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-grow">
          {aiResult && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  {previewUrl && activeTab === 'image' && (
                    <div className="flex-shrink-0 w-48">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                  
                  <div className="flex-grow space-y-6">
                    {description && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Product Description</h3>
                        <p className="text-gray-900 animate-fadeIn">
                          {description}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">HS Classification</h3>
                      <div className="bg-blue-50 p-4 rounded-lg transform transition-all duration-500">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xl font-bold text-blue-600 animate-slideInFromRight" style={{ animationDelay: '0.3s' }}>
                            {aiResult.primaryCode}
                          </div>
                          <div className="text-sm text-blue-600 animate-slideInFromRight" style={{ animationDelay: '0.7s' }}>
                            {aiResult.confidence}% Confidence
                          </div>
                        </div>
                        <div className="text-gray-700 animate-slideInFromRight" style={{ animationDelay: '0.5s' }}>
                          {aiResult.primaryDescription}
                        </div>
                      </div>
                    </div>

                    {aiResult.alternativeCodes && aiResult.alternativeCodes.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Alternative Classifications</h3>
                        <div className="space-y-3">
                          {aiResult.alternativeCodes.map((alt, index) => (
                            <div 
                              key={index} 
                              className="bg-gray-50 p-3 rounded-lg animate-slideInFromRight"
                              style={{ animationDelay: `${0.9 + index * 0.2}s` }}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-medium text-gray-900">{alt.code}</div>
                                <div className="text-sm text-gray-600">
                                  {alt.confidence}% Confidence
                                </div>
                              </div>
                              <div className="text-gray-600">{alt.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 mt-6">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className="p-6 space-y-8 overflow-hidden"
                >
                  {/* Chapter Level (2 digits) */}
                  <div 
                    className="transform translate-x-full animate-[slideIn_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-center space-x-4 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                      <div className="w-24 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-sm transform transition-all hover:scale-105 hover:shadow-md">
                        <span className="font-bold text-2xl text-gray-700">{result.code}</span>
                      </div>
                      <p className="text-gray-700 font-medium flex-1">{result.description}</p>
                    </div>
                  </div>

                  {/* Heading Level (4 digits) */}
                  {result.children?.map((heading, hIndex) => (
                    <div 
                      key={hIndex}
                      className="pl-12 transform translate-x-full animate-[slideIn_0.5s_ease-out_forwards]"
                      style={{ animationDelay: `${(index * 0.2) + ((hIndex + 1) * 0.15)}s` }}
                    >
                      <div className="flex items-center space-x-4 hover:bg-blue-50/50 p-4 rounded-lg transition-colors">
                        <div className="w-24 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center shadow-sm transform transition-all hover:scale-105 hover:shadow-md">
                          <span className="font-bold text-2xl text-blue-600">{heading.code}</span>
                        </div>
                        <p className="text-gray-700 font-medium flex-1">{heading.description}</p>
                      </div>

                      {/* Subheading Level (6 digits) */}
                      {heading.children?.map((subheading, sIndex) => (
                        <div 
                          key={sIndex}
                          className="pl-12 mt-6 transform translate-x-full animate-[slideIn_0.5s_ease-out_forwards]"
                          style={{ animationDelay: `${(index * 0.2) + ((hIndex + 1) * 0.15) + ((sIndex + 1) * 0.1)}s` }}
                        >
                          <div className="flex items-start space-x-4 hover:bg-indigo-50/50 p-4 rounded-lg transition-colors">
                            <div className="min-w-[6rem] w-24 h-16 flex-shrink-0 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm transform transition-all hover:scale-105 hover:shadow-md">
                              <span className="font-bold text-xl text-indigo-600 px-2 text-center break-words">
                                {subheading.code}
                              </span>
                            </div>
                            <p className="text-gray-700 font-medium flex-1 break-words">
                              {subheading.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HSCodeLookup; 