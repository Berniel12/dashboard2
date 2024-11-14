import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import OpenAI from 'openai';

interface HSCodeResult {
  code: string;
  description: string;
  level: 'chapter' | 'heading' | 'subheading';
  children?: HSCodeResult[];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, code } = body;

    console.log('Search request:', { description, code });

    if (!description && !code) {
      return NextResponse.json(
        { error: 'Description or code is required' },
        { status: 400 }
      );
    }

    // Use GPT-4o to classify the product
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a customs classification expert. Analyze products and provide their HS codes.
          Return a hierarchical structure with:
          - Chapter (2 digits) with general description
          - Heading (4 digits) with more specific description
          - Subheading (6 digits) with most specific description
          Return response as clean JSON without markdown formatting.`
        },
        {
          role: "user",
          content: `Classify this product: ${description}
          Return as clean JSON: {
            "results": [
              {
                "code": "84",
                "description": "Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof",
                "level": "chapter",
                "children": [
                  {
                    "code": "8471",
                    "description": "Automatic data processing machines and units thereof",
                    "level": "heading",
                    "children": [
                      {
                        "code": "8471.30",
                        "description": "Portable automatic data processing machines, weighing not more than 10 kg",
                        "level": "subheading"
                      }
                    ]
                  }
                ]
              }
            ]
          }`
        }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const cleanResponse = aiResponse.choices[0]?.message?.content?.trim() || '{"results": []}';
    const parsedResponse = JSON.parse(cleanResponse);
    console.log('AI Classification:', parsedResponse);

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error('HS Code search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 