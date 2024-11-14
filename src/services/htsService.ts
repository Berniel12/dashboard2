import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface HTSEntry {
  code: string;
  indent: number;
  description: string;
  unitOfQuantity: string[];
  generalRate: string;
  specialRate: string;
}

let htsData: HTSEntry[] | null = null;

export function loadHTSData() {
  if (htsData) return htsData;

  const csvPath = path.join(process.cwd(), 'htsdata.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });

  htsData = records.map((record: any) => ({
    code: record['HTS Number'].replace(/['"]/g, ''),
    indent: parseInt(record['Indent']),
    description: record['Description'].replace(/['"]/g, ''),
    unitOfQuantity: record['Unit of Quantity'] ? JSON.parse(record['Unit of Quantity']) : [],
    generalRate: record['General Rate of Duty'],
    specialRate: record['Special Rate of Duty'],
  }));

  return htsData;
}

export function searchHTS(query: string, isCode: boolean = false): HTSEntry[] {
  const data = loadHTSData();
  
  if (isCode) {
    // Search by code
    const normalizedQuery = query.replace(/\D/g, '');
    return data.filter(entry => entry.code.startsWith(normalizedQuery))
      .sort((a, b) => a.code.localeCompare(b.code));
  } else {
    // Search by description
    const keywords = query.toLowerCase().split(' ').filter(k => k.length > 2);
    return data.filter(entry => {
      const description = entry.description.toLowerCase();
      return keywords.some(keyword => description.includes(keyword));
    }).sort((a, b) => {
      // Sort by relevance (number of matching keywords)
      const aMatches = keywords.filter(k => a.description.toLowerCase().includes(k)).length;
      const bMatches = keywords.filter(k => b.description.toLowerCase().includes(k)).length;
      return bMatches - aMatches;
    });
  }
}

export function getHTSDetails(code: string): HTSEntry | null {
  const data = loadHTSData();
  return data.find(entry => entry.code === code) || null;
} 