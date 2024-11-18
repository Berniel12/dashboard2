declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const content: any;
  export default content;
}

declare module 'pdfjs-dist/legacy/build/pdf' {
  const content: any;
  export default content;
  export const getDocument: any;
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
}

declare module 'pdfjs-dist' {
  export * from 'pdfjs-dist/legacy/build/pdf';
} 