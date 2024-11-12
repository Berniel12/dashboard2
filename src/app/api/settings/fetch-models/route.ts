import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: NextRequest) {
  try {
    const response = await openai.models.list();
    
    // Map all models with their details
    const allModels = response.data.map(model => ({
      id: model.id,
      name: formatModelName(model.id),
      description: getModelDescription(model.id),
      contextWindow: getContextWindow(model.id),
      trainingData: getTrainingData(model.id),
    }));

    // Sort models by name for better organization
    allModels.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ models: allModels });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}

function formatModelName(modelId: string): string {
  // Convert model ID to a more readable name
  return modelId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getModelDescription(modelId: string): string {
  // Provide descriptions for known models
  const descriptions: Record<string, string> = {
    'gpt-4-turbo-preview': 'Latest GPT-4 model with improved performance and features',
    'gpt-4': 'Highly capable model for complex tasks and reasoning',
    'gpt-3.5-turbo': 'Fast and efficient model for most tasks',
    'text-embedding-ada-002': 'Efficient text embeddings model',
    'dall-e-3': 'Advanced image generation model',
    'whisper-1': 'Speech recognition model',
    'tts-1': 'Text-to-speech model',
    'tts-1-hd': 'High-definition text-to-speech model',
    'moderation-latest': 'Content moderation model'
  };
  
  // Return description if available, otherwise provide a generic one
  return descriptions[modelId] || 'OpenAI model for various AI tasks';
}

function getContextWindow(modelId: string): string {
  // Define context windows for known models
  const contextWindows: Record<string, string> = {
    'gpt-4-turbo-preview': '128K tokens',
    'gpt-4': '8K tokens',
    'gpt-4-32k': '32K tokens',
    'gpt-3.5-turbo': '4K tokens',
    'gpt-3.5-turbo-16k': '16K tokens'
  };
  
  return contextWindows[modelId] || 'Varies';
}

function getTrainingData(modelId: string): string {
  // Define training data cutoffs for known models
  const trainingData: Record<string, string> = {
    'gpt-4-turbo-preview': 'Up to Dec 2023',
    'gpt-4': 'Up to Sep 2021',
    'gpt-3.5-turbo': 'Up to Sep 2021',
    'text-embedding-ada-002': 'Up to 2022',
    'dall-e-3': 'Up to 2023',
    'whisper-1': 'Up to 2023'
  };
  
  return trainingData[modelId] || 'Not specified';
} 