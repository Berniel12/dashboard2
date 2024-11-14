import { NextResponse } from 'next/server';
import { searchHSCodes, getHSCodeByCode } from '@/data/hsCodes';
import { getHSCodeSuggestion, analyzeProductImage, analyzeTechnicalDrawing } from '@/services/aiService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { type, content } = data;

    let result;
    switch (type) {
      case 'description':
        result = await getHSCodeSuggestion(content);
        return NextResponse.json({
          suggestedCode: result.suggestedCode || 'Not found',
          confidence: result.confidence || 0,
          reasoning: result.reasoning || 'No reasoning provided',
          alternativeCodes: result.alternativeCodes || [],
          keyFeatures: result.keyFeatures || [],
          section: result.section || { number: 'N/A', title: 'Not specified' },
          chapter: result.chapter || { number: 'N/A', title: 'Not specified' },
          rate: result.rate || 'Not specified',
          unit: result.unit || 'Not specified'
        });

      case 'image':
        result = await analyzeProductImage(content);
        return NextResponse.json({
          suggestedCode: result.suggestedCode || 'Not found',
          confidence: result.confidence || 0,
          productDescription: result.productDescription || 'No description provided',
          identifiedFeatures: result.identifiedFeatures || [],
          technicalDetails: result.technicalDetails || [],
          alternativeCodes: result.alternativeCodes || [],
          wcoNotes: result.wcoNotes || 'No notes available',
          rate: result.rate || 'Not specified',
          unit: result.unit || 'Not specified'
        });

      case 'drawing':
        result = await analyzeTechnicalDrawing(content);
        return NextResponse.json({
          suggestedCode: result.suggestedCode || 'Not found',
          confidence: result.confidence || 0,
          technicalSpecifications: result.technicalSpecifications || {
            dimensions: 'Not specified',
            materials: [],
            components: []
          },
          reasoning: result.reasoning || 'No reasoning provided',
          alternativeCodes: result.alternativeCodes || []
        });

      case 'invoice':
        result = await analyzeInvoiceForHSCodes(content);
        return NextResponse.json(result);

      default:
        return NextResponse.json(
          { error: 'Invalid analysis type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in HS lookup:', error);
    return NextResponse.json({
      suggestedCode: 'Error occurred',
      confidence: 0,
      reasoning: 'An error occurred during analysis. Please try again.',
      alternativeCodes: [],
      keyFeatures: [],
      error: true
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');
  const code = searchParams.get('code');

  if (!term && !code) {
    return NextResponse.json({ error: 'Search term or code is required' }, { status: 400 });
  }

  try {
    if (code) {
      const hsCode = getHSCodeByCode(code);
      if (!hsCode) {
        return NextResponse.json({ error: 'HS Code not found' }, { status: 404 });
      }
      return NextResponse.json(hsCode);
    }

    const results = searchHSCodes(term!);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching HS codes:', error);
    return NextResponse.json(
      { error: 'Failed to search HS codes' },
      { status: 500 }
    );
  }
} 