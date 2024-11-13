import { NextResponse } from 'next/server';
import { searchHSCodes, getHSCodeByCode } from '@/data/hsCodes';

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