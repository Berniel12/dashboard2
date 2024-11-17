'use client';

import { useState } from 'react';
import FileUpload from '@/components/HSLookup/FileUpload';
import AnalysisDisplay from '@/components/HSLookup/AnalysisDisplay';

interface HSCodeItem {
  name: string;
  description: string;
  hs_code: string;
  confidence: string;
}

interface AnalysisResult {
  items: HSCodeItem[];
}

export default function HSLookupPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>('');

  const handleUploadComplete = (data: any, preview?: string, type?: string) => {
    console.log('Upload completed, setting analysis result:', data);
    if (data.success && data.analysis && data.analysis.items) {
      setAnalysisResult(data.analysis);
      if (preview) setFilePreview(preview);
      if (type) setFileType(type);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">HS Code Lookup</h1>
      <div className="max-w-4xl mx-auto">
        <FileUpload onUploadComplete={handleUploadComplete} />
        
        {analysisResult && analysisResult.items && analysisResult.items.map((item, index) => (
          <AnalysisDisplay 
            key={index}
            item={item}
            filePreview={filePreview || undefined}
            fileType={fileType}
          />
        ))}
      </div>
    </div>
  );
} 