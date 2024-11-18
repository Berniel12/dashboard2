import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// This is the only configuration we should have
export const runtime = 'edge';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure PDF.js
if (typeof window === 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function POST(req: Request) {
  try {
    console.log('Starting file upload processing');

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file found in request');
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Handle different file types
    let content: string;
    if (file.type === 'application/pdf') {
      console.log('Processing PDF document');
      content = await extractTextFromPDF(buffer);
      console.log('Extracted text from PDF:', content.substring(0, 200) + '...');
    } else if (file.type.startsWith('image/')) {
      console.log('Processing as image');
      // Convert image to base64 URL format
      const base64 = buffer.toString('base64');
      content = `data:${file.type};base64,${base64}`;
    } else {
      console.log('Processing as text document');
      content = buffer.toString('utf-8');
    }

    // Create message content based on file type
    let messages;
    if (file.type.startsWith('image/')) {
      messages = [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this invoice/image and identify the items with their HS codes. Return the response as JSON. For each item provide: \n1. Full item name\n2. Detailed description\n3. HS code (most specific possible)\n4. Confidence level (high/medium/low) based on how certain you are about the classification."
            },
            {
              type: "image_url",
              image_url: {
                url: content
              }
            }
          ],
        },
      ];
    } else {
      messages = [
        {
          role: "system",
          content: "You are a customs expert. Analyze the following text and identify the items with their HS codes. Return the response as JSON with items array containing these details."
        },
        {
          role: "user",
          content: `Please analyze this text and provide a JSON response with the following structure for each item:
{
  "items": [
    {
      "name": "item name",
      "description": "detailed description",
      "hs_code": "HS code",
      "confidence": "confidence level"
    }
  ]
}

Text to analyze: ${content}`
        }
      ];
    }

    console.log('Making OpenAI API call');

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      max_tokens: 4096,
      response_format: { type: "json_object" }
    });

    console.log('OpenAI response received:', response.choices[0].message);

    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    
    // Handle both item and items formats
    let items = [];
    if (analysis.item) {
      items = [{
        name: analysis.item.fullItemName || analysis.item.full_item_name || analysis.item.name || 'Unknown Item',
        description: analysis.item.detailedDescription || analysis.item.detailed_description || analysis.item.description || 'No description available',
        hs_code: analysis.item.hsCode || analysis.item.hs_code || '000000',
        confidence: analysis.item.confidenceLevel || analysis.item.confidence_level || analysis.item.confidence || 'low'
      }];
    } else if (analysis.items) {
      items = analysis.items.map((item: any) => ({
        name: item.fullItemName || item.full_item_name || item.name || 'Unknown Item',
        description: item.detailedDescription || item.detailed_description || item.description || 'No description available',
        hs_code: item.hsCode || item.hs_code || '000000',
        confidence: item.confidenceLevel || item.confidence_level || item.confidence || 'low'
      }));
    }

    const standardizedAnalysis = {
      success: true,
      analysis: {
        items: items
      }
    };

    console.log('Parsed and normalized analysis:', standardizedAnalysis);

    return NextResponse.json(standardizedAnalysis);

  } catch (error: any) {
    console.error('File upload error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code,
      response: error.response
    });

    return NextResponse.json(
      { 
        error: `File upload error: ${error.message}`,
        details: error.response?.data || error.message
      },
      { status: error.status || 500 }
    );
  }
} 