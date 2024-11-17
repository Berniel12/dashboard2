'use client';

import { useState } from 'react';
import { Upload, message, Input, Button } from 'antd';
import { InboxOutlined, SendOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Dragger } = Upload;
const { TextArea } = Input;

interface FileUploadProps {
  onUploadComplete: (data: any, preview?: string, type?: string) => void;
}

const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState('');

  const getFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        resolve('');
      }
    });
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) {
      message.warning('Please enter some text to analyze');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      // Create a text file from the input
      const textFile = new Blob([textInput], { type: 'text/plain' });
      formData.append('file', textFile, 'input.txt');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Text analysis response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      if (data.success && data.analysis) {
        onUploadComplete(data, '', 'text/plain');
        message.success('Text analyzed successfully');
        setTextInput(''); // Clear the input after successful analysis
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error: any) {
      console.error('Text analysis error:', error);
      message.error(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.docx,.doc,image/*',
    customRequest: async ({ file, onSuccess, onError }: any) => {
      try {
        setLoading(true);
        console.log('Starting upload for file:', file.name);

        const preview = await getFilePreview(file);
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('Upload response:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        if (data.success && data.analysis) {
          console.log('Calling onUploadComplete with data:', data);
          onUploadComplete(data, preview, file.type);
          onSuccess(data);
          message.success(`File ${file.name} analyzed successfully`);
        } else {
          throw new Error('Analysis failed');
        }
      } catch (error: any) {
        console.error('Upload error:', error);
        onError(error);
        message.error(`Upload failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Upload File</h3>
        <Dragger {...uploadProps} disabled={loading}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag document to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for PDF, Word documents, and images
          </p>
        </Dragger>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Or Enter Text Description</h3>
        <div className="space-y-4">
          <TextArea
            placeholder="Enter item description here (e.g., 'Canned pineapple chunks in juice' or 'USB-C charging cable')"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={4}
            disabled={loading}
            className="w-full border rounded-md p-2"
            style={{ minHeight: '100px' }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleTextSubmit}
            loading={loading}
            disabled={!textInput.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white h-10"
          >
            Analyze Text
          </Button>
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-600 mt-4">
          Processing your input...
        </div>
      )}
    </div>
  );
};

export default FileUpload; 