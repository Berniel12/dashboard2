import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, aiClassification } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Here you would typically query your database or external API
    // using both the description and AI classification
    const mockResults = [
      {
        code: '8471.30',
        description: 'Portable automatic data processing machines, weighing not more than 10 kg, consisting of at least a central processing unit, a keyboard and a display',
      },
      {
        code: '8471.41',
        description: 'Other automatic data processing machines comprising in the same housing at least a central processing unit and an input and output unit',
      },
    ].filter(item => 
      item.description.toLowerCase().includes(description.toLowerCase())
    );

    return NextResponse.json({
      results: mockResults,
    });

  } catch (error) {
    console.error('HS Code search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 