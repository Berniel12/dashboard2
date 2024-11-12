
// This file is auto-generated. Do not edit manually.
import { HSCode } from '@/types/customs';

export const hsCodes: HSCode[] = [
  {
    "code": "0101.21",
    "description": "Pure-bred breeding horses",
    "section": "I",
    "chapter": "01",
    "rate": "0%",
    "notes": [
      "Health certificates required",
      "Import permits needed"
    ]
  },
  {
    "code": "0101.29",
    "description": "Live horses (excl. pure-bred breeding animals)",
    "section": "I",
    "chapter": "01",
    "rate": "2%",
    "notes": [
      "Health certificates required"
    ]
  },
  {
    "code": "... ",
    "notes": []
  }
];

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
};