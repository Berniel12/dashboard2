import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

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

interface MatchedRecord {
  code: string;
  description: string;
  confidence: number;
}

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { description } = body;

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Read and parse CSV file
    const csvPath = path.join(process.cwd(), 'htsdata.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });

    // Search for relevant HTS codes based on description
    const keywords = description.toLowerCase().split(' ');
    const matchedRecords: MatchedRecord[] = records
      .filter((record: any) => {
        const recordDesc = record['Description'].toLowerCase();
        return keywords.some((keyword: string) => recordDesc.includes(keyword));
      })
      .map((record: any) => ({
        code: record['HTS Number'].replace(/['"]/g, ''),
        description: record['Description'].replace(/['"]/g, ''),
        confidence: calculateConfidence(record['Description'].toLowerCase(), keywords)
      }))
      .sort((a: MatchedRecord, b: MatchedRecord) => b.confidence - a.confidence);

    if (matchedRecords.length === 0) {
      return NextResponse.json({
        classification: {
          primaryCode: "0000.00",
          primaryDescription: "No matching HTS code found",
          confidence: 0,
          alternativeCodes: []
        }
      });
    }

    const classification: AIClassification = {
      primaryCode: matchedRecords[0].code,
      primaryDescription: matchedRecords[0].description,
      confidence: matchedRecords[0].confidence,
      alternativeCodes: matchedRecords.slice(1, 4).map((record: MatchedRecord) => ({
        code: record.code,
        description: record.description,
        confidence: record.confidence
      }))
    };

    return NextResponse.json({ classification });

  } catch (error) {
    console.error('AI classification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateConfidence(description: string, keywords: string[]): number {
  const matches = keywords.filter(keyword => description.includes(keyword));
  return Math.round((matches.length / keywords.length) * 100);
} 