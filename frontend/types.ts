export interface WordFrequency {
  word: string;
  count: number;
}

export interface FileProcessingStatus {
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
}

export interface ParsedFileContent {
  fileName: string;
  text: string;
}
