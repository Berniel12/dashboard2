const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

interface RawHSCode {
  code: string;
  description: string;
  section: string;
  chapter: string;
  rate: string;
  notes?: string[];
}

const processHSCodes = () => {
  const results: RawHSCode[] = [];
  const inputPath = path.join(__dirname, '../data/raw/hs_codes.csv');
  const outputPath = path.join(__dirname, '../data/hsCodes.ts');

  if (!fs.existsSync(path.dirname(inputPath))) {
    fs.mkdirSync(path.dirname(inputPath), { recursive: true });
  }

  // Create the CSV file if it doesn't exist
  if (!fs.existsSync(inputPath)) {
    const sampleData = `code,description,section,chapter,rate,notes
0101.21,Pure-bred breeding horses,I,01,0%,"Health certificates required|Import permits needed"
0101.29,Live horses (excl. pure-bred breeding animals),I,01,2%,"Health certificates required"`;
    fs.writeFileSync(inputPath, sampleData);
  }

  fs.createReadStream(inputPath)
    .pipe(csv())
    .on('data', (data: any) => {
      results.push({
        code: data.code,
        description: data.description,
        section: data.section,
        chapter: data.chapter,
        rate: data.rate,
        notes: data.notes ? data.notes.split('|') : []
      });
    })
    .on('end', () => {
      // Create output directory if it doesn't exist
      if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      }

      // Write processed data to a TypeScript file
      const output = `
// This file is auto-generated. Do not edit manually.
import { HSCode } from '@/types/customs';

export const hsCodes: HSCode[] = ${JSON.stringify(results, null, 2)};

export const getCodesBySection = (section: string) => {
  return hsCodes.filter(code => code.section === section);
};

export const getCodesByChapter = (chapter: string) => {
  return hsCodes.filter(code => code.chapter === chapter);
};

export const searchCodes = (query: string) => {
  const searchTerm = query.toLowerCase();
  return hsCodes.filter(code => 
    code.code.toLowerCase().includes(searchTerm) ||
    code.description.toLowerCase().includes(searchTerm)
  );
};`;

      fs.writeFileSync(outputPath, output);
      console.log('HS Codes processed successfully!');
    });
};

processHSCodes(); 