import mammoth from 'mammoth';
import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';

// Set up the worker for PDF.js
// We use a specific version matching the index.html import to ensure compatibility.
// If the imported version is available, use it, otherwise fall back to the pinned version.
const pdfjsVersion = version || '4.8.69';

// Try multiple worker sources for better reliability
const workerSources = [
  `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`,
  `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`,
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.mjs`,
];

// Set the worker source (try first one, fallback handled in error)
GlobalWorkerOptions.workerSrc = workerSources[0];

// Helper to initialize worker with fallback
// Note: We don't test worker loading here as it may cause CORS issues
// Instead, we'll let PDF.js handle the error and provide fallback in error handling
const initializeWorker = async () => {
  // Worker is already set, PDF.js will handle loading errors
  // Fallback will be handled in parsePdf error handling
  return Promise.resolve();
};

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
  return new Promise(async (resolve, reject) => {
    // Initialize worker with fallback
    try {
      await initializeWorker();
    } catch (error) {
      console.warn("Worker initialization warning:", error);
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          reject(new Error("无法读取文件"));
          return;
        }

        // PDF.js expects Uint8Array
        const data = new Uint8Array(arrayBuffer);

        // Try multiple cMap sources for better Chinese character support
        const cMapSources = [
          `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/cmaps/`,
          `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsVersion}/cmaps/`,
        ];

        let pdf;
        let lastError: Error | null = null;

        // Try loading PDF with different cMap sources
        for (const cMapUrl of cMapSources) {
          try {
            const loadingTask = getDocument({
              data,
              cMapUrl,
              cMapPacked: true,
              // Disable font face for better compatibility
              disableFontFace: false,
              // Enable standard font data
              standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/standard_fonts/`,
            });

            pdf = await loadingTask.promise;
            break; // Success, exit loop
          } catch (error: any) {
            lastError = error;
            // If it's a password error, don't try other sources
            if (error?.name === 'PasswordException') {
              reject(new Error("PDF文件已加密，需要密码才能解析。纯前端无法处理加密的PDF文件。"));
              return;
            }
            // Try next source
            continue;
          }
        }

        if (!pdf) {
          const errorMsg = lastError?.message || "无法加载PDF文件";
          reject(new Error(`PDF解析失败: ${errorMsg}。可能是文件损坏或格式不支持。`));
          return;
        }

        // Check if PDF is encrypted
        if (pdf.isEncrypted) {
          reject(new Error("PDF文件已加密，需要密码才能解析。纯前端无法处理加密的PDF文件。"));
          return;
        }

        let fullText = '';
        let hasTextContent = false;
        
        // Helper function to extract text with proper word grouping
        // PDF.js often returns text as individual characters, so we need to group them into words
        const extractTextFromItems = (items: any[]): string => {
          if (!items || items.length === 0) return '';
          
          // Filter valid text items
          const validItems = items.filter((item: any) => 
            'str' in item && item.str !== undefined && item.str !== null
          );
          
          if (validItems.length === 0) return '';
          
          // Sort items by position (top to bottom, left to right)
          const sortedItems = [...validItems].sort((a: any, b: any) => {
            const transformA = a.transform || [1, 0, 0, 1, 0, 0];
            const transformB = b.transform || [1, 0, 0, 1, 0, 0];
            
            // Get y position (PDF coordinates: y increases downward)
            const yA = transformA[5];
            const yB = transformB[5];
            
            // Tolerance for same line (in points)
            const lineTolerance = 3;
            
            // If same line (within tolerance), sort by x position
            if (Math.abs(yA - yB) < lineTolerance) {
              const xA = transformA[4];
              const xB = transformB[4];
              return xA - xB;
            }
            
            // Otherwise sort by y position (top to bottom)
            // Higher y = lower on page, so we reverse
            return yB - yA;
          });
          
          // Check if items already contain words (not just single characters)
          // If average item length > 1.5, they're likely already words
          const avgLength = sortedItems.reduce((sum, item) => sum + (item.str?.length || 0), 0) / sortedItems.length;
          const hasWords = avgLength > 1.5;
          
          // Check if we have valid position information
          const hasPositionInfo = sortedItems.some(item => item.transform && item.transform.length >= 6);
          
          // If no position info, use simple fallback: join items with spaces
          if (!hasPositionInfo) {
            return sortedItems
              .map(item => item.str?.trim())
              .filter(str => str && str.length > 0)
              .join(' ');
          }
          
          // Group characters into words based on spacing
          const lines: string[] = [];
          let currentLine: string[] = [];
          let currentWord = '';
          let lastX = -1;
          let lastY = -1;
          let lastWidth = 0;
          
          for (const item of sortedItems) {
            const text = item.str;
            const transform = item.transform || [1, 0, 0, 1, 0, 0];
            const x = transform[4];
            const y = transform[5];
            const width = item.width || (text.length * 5); // Estimate width if not available
            
            // Check if this is a new line
            const isNewLine = lastY !== -1 && Math.abs(y - lastY) > 3;
            
            if (isNewLine) {
              // Finish current word and line
              if (currentWord.trim()) {
                currentLine.push(currentWord.trim());
              }
              if (currentLine.length > 0) {
                lines.push(currentLine.join(' '));
              }
              currentLine = [];
              currentWord = '';
              lastX = -1;
            }
            
            // Check if this is a space character
            const isSpace = text === ' ' || text.trim().length === 0;
            
            if (isSpace) {
              // Push current word if exists
              if (currentWord.trim()) {
                currentLine.push(currentWord.trim());
                currentWord = '';
              }
              lastX = x + width;
              lastY = y;
              lastWidth = width;
              continue;
            }
            
            // If items are already words, use them directly (with spacing check)
            if (hasWords && text.length > 1) {
              // Check if we should add space before this word
              const gap = lastX !== -1 ? (x - (lastX + lastWidth)) : 0;
              const shouldSpace = gap > width * 0.5 && currentLine.length > 0;
              
              if (currentWord.trim()) {
                currentLine.push(currentWord.trim());
                currentWord = '';
              }
              
              // Add word to current line
              currentLine.push(text.trim());
              lastX = x + width;
              lastY = y;
              lastWidth = width;
              continue;
            }
            
            // For single characters, group them into words based on spacing
            const gap = lastX !== -1 ? (x - (lastX + lastWidth)) : 0;
            const charSpacing = Math.max(width * 0.3, 2); // Threshold for word boundary (at least 2 points)
            
            // If gap is large, it's a new word
            if (gap > charSpacing && currentWord.trim()) {
              currentLine.push(currentWord.trim());
              currentWord = text;
            } else {
              // Continue current word
              currentWord += text;
            }
            
            lastX = x + width;
            lastY = y;
            lastWidth = width;
          }
          
          // Finish last word and line
          if (currentWord.trim()) {
            currentLine.push(currentWord.trim());
          }
          if (currentLine.length > 0) {
            lines.push(currentLine.join(' '));
          }
          
          return lines.join('\n');
        };
        
        // Iterate through all pages
        for (let i = 1; i <= pdf.numPages; i++) {
          try {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            // Extract text with proper word grouping
            const pageText = extractTextFromItems(textContent.items);
            
            if (pageText.trim()) {
              hasTextContent = true;
              fullText += pageText + '\n';
            }
          } catch (pageError: any) {
            console.warn(`Error extracting text from page ${i}:`, pageError);
            // Continue with other pages
          }
        }
        
        // Check if this is a scanned PDF (no text content)
        if (!hasTextContent || fullText.trim().length === 0) {
          reject(new Error("检测到扫描版PDF（图片格式），无法提取文本。纯前端无法进行OCR识别，需要使用后端OCR服务（如Tesseract）或在线OCR API。"));
          return;
        }

        // Check if extracted text is too short (might be a problem)
        if (fullText.trim().length < 10) {
          console.warn("提取的文本内容很少，可能是扫描PDF或文本提取有问题");
        }
        
        resolve(fullText.trim());
      } catch (error: any) {
        console.error("PDF parsing error details:", error);
        
        // Provide more specific error messages
        let errorMessage = "PDF解析失败";
        if (error?.name === 'PasswordException') {
          errorMessage = "PDF文件已加密，需要密码才能解析。纯前端无法处理加密的PDF文件。";
        } else if (error?.message?.includes('Invalid PDF')) {
          errorMessage = "PDF文件格式无效或已损坏";
        } else if (error?.message?.includes('worker')) {
          errorMessage = "PDF解析器加载失败，请检查网络连接或刷新页面重试";
        } else if (error?.message) {
          errorMessage = `PDF解析失败: ${error.message}`;
        }
        
        reject(new Error(errorMessage));
      }
    };
    reader.onerror = (error) => {
      reject(new Error("文件读取失败，请确保文件未损坏"));
    };
    reader.readAsArrayBuffer(file);
  });
};