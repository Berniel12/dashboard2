"use client";

import React, { useEffect, useState } from 'react';
import { Settings, Info, Loader2, Save } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  description: string;
  contextWindow: string;
  trainingData: string;
}

export default function AIModelSelector() {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [showInfo, setShowInfo] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchModels();
    // Load saved model preference
    const savedModel = localStorage.getItem('preferredModel');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/settings/fetch-models');
      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }
      const data = await response.json();
      setModels(data.models);
      // Set default model if none is selected
      if (!selectedModel && data.models.length > 0) {
        setSelectedModel(data.models[0].id);
      }
    } catch (error) {
      setError('Failed to load available models');
      console.error('Error fetching models:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      const response = await fetch('/api/settings/update-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelId: selectedModel }),
      });

      if (!response.ok) {
        throw new Error('Failed to update model');
      }

      // Save to localStorage
      localStorage.setItem('preferredModel', selectedModel);
      setSaveMessage({ type: 'success', text: 'Model preference saved successfully' });
    } catch (error) {
      console.error('Error saving model preference:', error);
      setSaveMessage({ type: 'error', text: 'Failed to save model preference' });
    } finally {
      setIsSaving(false);
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const selectedModelDetails = models.find(model => model.id === selectedModel);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 rounded-xl overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center">
        <Settings className="h-5 w-5 text-gray-400 dark:text-gray-300 mr-2" />
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">AI Model Settings</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select AI Model
            </label>
            <div className="flex gap-4">
              <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
          </div>

          {showInfo && selectedModelDetails && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedModelDetails.description}</p>
              <div className="flex space-x-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                  Context: {selectedModelDetails.contextWindow}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                  Training: {selectedModelDetails.trainingData}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {saveMessage && (
              <p className={`text-sm ${
                saveMessage.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {saveMessage.text}
              </p>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Preference
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-sm text-gray-500 dark:text-gray-400">
          <p>The selected model will be used for:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Extracting data from commercial invoices</li>
            <li>Analyzing customs documentation</li>
            <li>Generating customs declarations</li>
            <li>Providing compliance recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 