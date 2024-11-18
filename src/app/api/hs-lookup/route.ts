import { NextResponse } from 'next/server';
import { getHSCodeSuggestion } from '@/utils/openai';

interface HSCodeSuggestion {
  hsCode: string;
  description: string;
  confidence: number;
  reasoning: string;
  alternativeCodes: Array<{
    code: string;
    description: string;
    confidence: number;
  }>;
}

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    let result: HSCodeSuggestion;
    try {
      result = await getHSCodeSuggestion(content);
      return NextResponse.json({
        suggestedCode: result.hsCode || 'Not found',
        confidence: result.confidence || 0,
        reasoning: result.reasoning || 'No reasoning provided',
        alternativeCodes: result.alternativeCodes || [],
        description: result.description || 'No description available'
      });
    } catch (error) {
      console.error('HS code suggestion error:', error);
      return NextResponse.json(
        { error: 'Failed to get HS code suggestion' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 