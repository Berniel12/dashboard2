declare module 'pdfjs-dist/legacy/build/pdf.worker.entry' {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const worker: any;
  export default worker;
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
}

declare module 'pdfjs-dist/legacy/build/pdf' {
  export * from 'pdfjs-dist';
}

declare module 'pdfjs-dist/build/pdf' {
  export * from 'pdfjs-dist';
} 