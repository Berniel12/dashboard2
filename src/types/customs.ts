export interface HSCode {
  code: string;
  description: string;
  section: string;
  chapter: string;
  rate: string;
  notes?: string[];
}

export interface HSSection {
  id: string;
  title: string;
  chapters: string[];
}

export interface HSChapter {
  id: string;
  title: string;
  section: string;
} 