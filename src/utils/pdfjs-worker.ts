import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export { pdfjsLib }; 