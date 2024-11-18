import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import * as pdfjs from 'pdfjs-dist/build/pdf';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize PDF.js worker and configure
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// Configure PDF.js
const pdfjsConfig = {
  standardFontDataUrl: 'node_modules/pdfjs-dist/standard_fonts/',
  cMapUrl: 'node_modules/pdfjs-dist/cmaps/',
  cMapPacked: true,
  disableFontFace: true
};

export async function POST(request: NextRequest) {
  try {
    const { file } = await request.json();
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert base64 to Uint8Array
    const binaryString = atob(file);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Load PDF document using pdfjs.getDocument
    const loadingTask = pdfjs.getDocument({ data: bytes, ...pdfjsConfig });
    const pdf = await loadingTask.promise;

    // Extract text from all pages
    let extractedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(' ');
      extractedText += pageText + '\n';
    }

    // Use OpenAI to extract structured data
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a customs broker assistant that extracts information from commercial invoices. 
          Extract the following fields from the text and return them in a structured format:
          - client (company name)
          - declarationType (Import/Export/Transit)
          - portOfEntry (port name)
          - shipmentValue (numeric value)
          - description (goods description)
          - hsCode (if present)
          - countryOfOrigin
          - weight (numeric with unit)
          - quantity (numeric with unit)
          
          Return your response in this exact JSON format:
          {
            "client": "company name",
            "declarationType": "Import/Export/Transit",
            "portOfEntry": "port name",
            "shipmentValue": "numeric value",
            "description": "goods description",
            "hsCode": "code if present",
            "countryOfOrigin": "country name",
            "weight": "numeric with unit",
            "quantity": "numeric with unit"
          }`
        },
        {
          role: "user",
          content: extractedText
        }
      ]
    });

    const extractedData = completion.choices[0].message.content;

    return NextResponse.json({ data: extractedData });
  } catch (error: any) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process PDF' },
      { status: 500 }
    );
  }
} 