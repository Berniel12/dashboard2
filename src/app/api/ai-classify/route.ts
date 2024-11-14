import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Mock AI classification with structured data
    const mockClassification = {
      primaryCode: "8471.30",
      primaryDescription: "Portable automatic data processing machines",
      confidence: 95,
      alternativeCodes: [
        {
          code: "8471.41",
          description: "Other automatic data processing machines",
          confidence: 85
        },
        {
          code: "8471.49",
          description: "Other data processing machines",
          confidence: 75
        }
      ]
    };

    // Return the mock classification directly without spreading
    return NextResponse.json({
      classification: mockClassification
    });

  } catch (error) {
    console.error('AI classification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 