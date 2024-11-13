export interface HSCode {
  code: string;
  section: string;
  chapter: string;
  heading: string;
  description: string;
  unit?: string;
  rate?: string;
  notes?: string;
  category?: string;
}

export const hsCodes: HSCode[] = [
  // Electronics and Technology (Chapter 84-85)
  {
    code: "8471.30.0000",
    section: "XVI",
    chapter: "84",
    heading: "84.71",
    description: "Portable automatic data processing machines, weighing not more than 10 kg (laptops, notebooks, tablets)",
    unit: "u",
    rate: "0%",
    category: "Electronics",
    notes: "Includes laptops, tablets, and similar portable computers"
  },
  {
    code: "8517.13.0000",
    section: "XVI",
    chapter: "85",
    heading: "85.17",
    description: "Smartphones",
    unit: "u",
    rate: "0%",
    category: "Electronics",
    notes: "Mobile phones with computing capabilities"
  },
  {
    code: "8528.72.0000",
    section: "XVI",
    chapter: "85",
    heading: "85.28",
    description: "Reception apparatus for television, color",
    unit: "u",
    rate: "5%",
    category: "Electronics"
  },
  {
    code: "8544.42.0000",
    section: "XVI",
    chapter: "85",
    heading: "85.44",
    description: "Electric conductors fitted with connectors",
    unit: "kg",
    rate: "5%",
    category: "Electronics",
    notes: "Includes USB cables and similar connectors"
  },

  // Vehicles and Parts (Chapter 87)
  {
    code: "8703.23.0000",
    section: "XVII",
    chapter: "87",
    heading: "87.03",
    description: "Motor cars, 1500-3000cc cylinder capacity",
    unit: "u",
    rate: "10%",
    category: "Vehicles",
    notes: "Passenger vehicles with medium engine capacity"
  },
  {
    code: "8708.29.0000",
    section: "XVII",
    chapter: "87",
    heading: "87.08",
    description: "Parts and accessories of motor vehicle bodies",
    unit: "kg",
    rate: "5%",
    category: "Vehicle Parts"
  },
  {
    code: "8711.30.0000",
    section: "XVII",
    chapter: "87",
    heading: "87.11",
    description: "Motorcycles, 250-500cc cylinder capacity",
    unit: "u",
    rate: "8%",
    category: "Vehicles"
  },

  // Pharmaceuticals (Chapter 30)
  {
    code: "3004.90.0000",
    section: "VI",
    chapter: "30",
    heading: "30.04",
    description: "Medicaments for therapeutic or prophylactic uses, packaged",
    unit: "kg",
    rate: "0%",
    category: "Pharmaceuticals",
    notes: "Packaged medicines for retail sale"
  },
  {
    code: "3002.15.0000",
    section: "VI",
    chapter: "30",
    heading: "30.02",
    description: "Immunological products, put up in measured doses",
    unit: "kg",
    rate: "0%",
    category: "Pharmaceuticals",
    notes: "Includes vaccines and similar products"
  },

  // Textiles and Clothing (Chapters 61-62)
  {
    code: "6104.62.0000",
    section: "XI",
    chapter: "61",
    heading: "61.04",
    description: "Women's or girls' trousers, cotton, knitted",
    unit: "u",
    rate: "12%",
    category: "Textiles"
  },
  {
    code: "6203.42.0000",
    section: "XI",
    chapter: "62",
    heading: "62.03",
    description: "Men's or boys' trousers, cotton, not knitted",
    unit: "u",
    rate: "12%",
    category: "Textiles"
  },

  // Food and Beverages (Chapters 16-22)
  {
    code: "1806.31.0000",
    section: "IV",
    chapter: "18",
    heading: "18.06",
    description: "Chocolate, filled blocks, slabs or bars",
    unit: "kg",
    rate: "10%",
    category: "Food"
  },
  {
    code: "2204.21.0000",
    section: "IV",
    chapter: "22",
    heading: "22.04",
    description: "Wine in containers of 2l or less",
    unit: "l",
    rate: "15%",
    category: "Beverages",
    notes: "Bottled wine for retail sale"
  },

  // Machinery (Chapter 84)
  {
    code: "8422.30.0000",
    section: "XVI",
    chapter: "84",
    heading: "84.22",
    description: "Machinery for filling, closing, sealing containers",
    unit: "u",
    rate: "5%",
    category: "Industrial Machinery"
  },
  {
    code: "8450.11.0000",
    section: "XVI",
    chapter: "84",
    heading: "84.50",
    description: "Fully-automatic washing machines, capacity ≤10kg",
    unit: "u",
    rate: "8%",
    category: "Home Appliances"
  },

  // Furniture (Chapter 94)
  {
    code: "9403.50.0000",
    section: "XX",
    chapter: "94",
    heading: "94.03",
    description: "Wooden furniture for bedrooms",
    unit: "u",
    rate: "10%",
    category: "Furniture"
  },
  {
    code: "9403.20.0000",
    section: "XX",
    chapter: "94",
    heading: "94.03",
    description: "Other metal furniture",
    unit: "kg",
    rate: "10%",
    category: "Furniture"
  },

  // Medical Equipment (Chapter 90)
  {
    code: "9018.90.0000",
    section: "XVIII",
    chapter: "90",
    heading: "90.18",
    description: "Medical, surgical or veterinary instruments",
    unit: "kg",
    rate: "0%",
    category: "Medical Equipment"
  },
  {
    code: "9019.10.0000",
    section: "XVIII",
    chapter: "90",
    heading: "90.19",
    description: "Mechano-therapy appliances; massage apparatus",
    unit: "kg",
    rate: "5%",
    category: "Medical Equipment"
  },

  // Chemicals (Chapters 28-29)
  {
    code: "2833.21.0000",
    section: "VI",
    chapter: "28",
    heading: "28.33",
    description: "Sulfates of magnesium",
    unit: "kg",
    rate: "5%",
    category: "Chemicals"
  },
  {
    code: "2915.21.0000",
    section: "VI",
    chapter: "29",
    heading: "29.15",
    description: "Acetic acid",
    unit: "kg",
    rate: "5%",
    category: "Chemicals"
  }
];

// Helper function to search HS codes with category filter
export function searchHSCodes(query: string, category?: string): HSCode[] {
  const searchTerm = query.toLowerCase();
  
  return hsCodes.filter(code => {
    const matchesSearch = 
      code.code.includes(searchTerm) || 
      code.description.toLowerCase().includes(searchTerm) ||
      code.chapter.includes(searchTerm) ||
      code.heading.includes(searchTerm);

    if (category) {
      return matchesSearch && code.category === category;
    }
    
    return matchesSearch;
  });
}

// Get unique categories
export function getCategories(): string[] {
  const categories = new Set(hsCodes.map(code => code.category).filter(Boolean));
  return Array.from(categories).sort();
}

// Get codes by category
export function getHSCodesByCategory(category: string): HSCode[] {
  return hsCodes.filter(code => code.category === category);
}

// Get codes by chapter
export function getHSCodesByChapter(chapter: string): HSCode[] {
  return hsCodes.filter(code => code.chapter === chapter);
}

// Get codes by section
export function getHSCodesBySection(section: string): HSCode[] {
  return hsCodes.filter(code => code.section === section);
}

// Get a specific HS code
export function getHSCodeByCode(code: string): HSCode | undefined {
  return hsCodes.find(item => item.code === code);
}