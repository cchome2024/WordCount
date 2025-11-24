import mammoth from 'mammoth';
import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';

// Set up the worker for PDF.js
// We use a specific version matching the index.html import to ensure compatibility.
// If the imported version is available, use it, otherwise fall back to the pinned version.
const pdfjsVersion = version || '4.8.69';
const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`;

// Set the worker source
GlobalWorkerOptions.workerSrc = workerUrl;

export const parseDocx = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          reject(new Error("Failed to read file"));
          return;
        }
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value);
      } catch (error) {
        console.error("Docx parsing error:", error);
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const parsePdf = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          reject(new Error("Failed to read file"));
          return;
        }

        // PDF.js expects Uint8Array
        const data = new Uint8Array(arrayBuffer);

        const loadingTask = getDocument({
          data,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/cmaps/`,
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        
        let fullText = '';
        
        // Iterate through all pages
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          const pageText = textContent.items
            // Filter for items that have text string
            .filter((item: any) => 'str' in item)
            .map((item: any) => item.str)
            .join(' ');
            
          fullText += pageText + ' ';
        }
        
        resolve(fullText);
      } catch (error) {
        console.error("PDF parsing error details:", error);
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};