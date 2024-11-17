import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.worker.entry';

if (typeof window !== 'undefined') {
  const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');
  pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');
} 