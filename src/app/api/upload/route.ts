import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import OpenAI from 'openai';

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

    // Convert the file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Call GPT-4o
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and provide a JSON response with this exact structure, no markdown. Use whole numbers for confidence (e.g., 95 instead of 0.95): { extractedText: 'detailed product description', classification: { primaryCode: 'code', primaryDescription: 'description', confidence: number, alternativeCodes: [{ code: 'code', description: 'description', confidence: number }] } }"
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
      max_tokens: 1000,
    });

    // Parse the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from GPT-4o');
    }

    try {
      // Clean up the response by removing markdown formatting
      const cleanContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      console.log('Cleaned content:', cleanContent);
      
      const parsedResponse = JSON.parse(cleanContent);
      return NextResponse.json({
        success: true,
        extractedText: parsedResponse.extractedText,
        classification: parsedResponse.classification,
        results: [
          {
            code: parsedResponse.classification.primaryCode,
            description: parsedResponse.classification.primaryDescription,
          },
          ...(parsedResponse.classification.alternativeCodes || []).map((alt: any) => ({
            code: alt.code,
            description: alt.description,
          }))
        ]
      });
    } catch (parseError) {
      console.error('Error parsing GPT response:', parseError);
      console.log('Raw content:', content);
      
      // More robust fallback parsing
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonContent = jsonMatch[0];
          const parsedResponse = JSON.parse(jsonContent);
          return NextResponse.json({
            success: true,
            extractedText: parsedResponse.extractedText,
            classification: parsedResponse.classification,
            results: [
              {
                code: parsedResponse.classification.primaryCode,
                description: parsedResponse.classification.primaryDescription,
              }
            ]
          });
        }
      } catch (fallbackError) {
        console.error('Fallback parsing failed:', fallbackError);
      }

      // If all parsing fails, return a basic response with whole number confidence
      const extractedText = content.match(/extractedText["\s:]+([^"}\n]+)/)?.[1] || '';
      const primaryCode = content.match(/primaryCode["\s:]+([^"}\n]+)/)?.[1] || '';
      const primaryDescription = content.match(/primaryDescription["\s:]+([^"}\n]+)/)?.[1] || '';
      const confidence = parseInt(content.match(/confidence["\s:]+(\d+)/)?.[1] || '95'); // Default to 95

      const classification: AIClassification = {
        primaryCode,
        primaryDescription,
        confidence,
        alternativeCodes: []
      };

      return NextResponse.json({
        success: true,
        extractedText,
        classification,
        results: [{
          code: primaryCode,
          description: primaryDescription,
        }]
      });
    }

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