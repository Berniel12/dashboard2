import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

interface HTSRecord {
  'HTS Number': string;
  'Description': string;
  'Unit of Quantity': string;
  'General Rate of Duty': string;
  'Special Rate of Duty': string;
  'Indent': string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read HTS data
    const csvPath = path.join(process.cwd(), 'htsdata.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    }) as HTSRecord[];

    // Create a context string with relevant HS codes
    const htsContext = records
      .filter((record: HTSRecord) => record['HTS Number'] && record['Description'])
      .map((record: HTSRecord) => `${record['HTS Number']}: ${record['Description']}`)
      .join('\n')
      .slice(0, 4000); // Limit context size

    // Convert the file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Call GPT-4o with HTS data context
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a customs classification expert. Use the following HTS codes as reference:\n\n${htsContext}\n\n
          When analyzing images, provide:
          1. The exact HS code from the list
          2. Full descriptions for each level (chapter, heading, subheading)
          3. Be as specific and accurate as possible
          
          For example, for a laptop computer:
          - Chapter 84: Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof
          - Heading 8471: Automatic data processing machines and units thereof
          - Subheading 8471.30: Portable automatic data processing machines, weighing not more than 10 kg
          
          Return response as JSON.`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and provide the most relevant HS code with full descriptions. Return the result as JSON with the following structure: { extractedText: string, classification: { code: string, description: string, chapterDescription: string, headingDescription: string, subheadingDescription: string } }"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      response_format: { type: "json_object" },
    });

    const cleanResponse = response.choices[0]?.message?.content?.trim() || '{}';
    const aiSuggestions = JSON.parse(cleanResponse);

    // Get full HTS details for the suggested code
    const htsDetails = records.find((record: HTSRecord) => {
      const cleanRecordCode = record['HTS Number']?.toString().replace(/['"]/g, '');
      const cleanSuggestionCode = aiSuggestions.classification?.code?.toString();
      return cleanRecordCode === cleanSuggestionCode;
    });

    // Get chapter and heading descriptions from AI suggestions
    return NextResponse.json({
      success: true,
      extractedText: aiSuggestions.extractedText,
      classification: {
        primaryCode: aiSuggestions.classification?.code || '',
        primaryDescription: aiSuggestions.classification?.subheadingDescription || '',
        chapterDescription: aiSuggestions.classification?.chapterDescription || '',
        headingDescription: aiSuggestions.classification?.headingDescription || '',
        subheadingDescription: aiSuggestions.classification?.subheadingDescription || '',
        unitOfQuantity: htsDetails?.['Unit of Quantity'] ? 
          JSON.parse(htsDetails['Unit of Quantity']) : [],
        generalRate: htsDetails?.['General Rate of Duty'] || '',
        specialRate: htsDetails?.['Special Rate of Duty'] || '',
        confidence: 95
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 