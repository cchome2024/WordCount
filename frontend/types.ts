export interface WordFrequency {
  word: string;
  count: number;
}

export interface TextProcessingResult {
  allowedWords: WordFrequency[];  // Words in the allowed words list
  otherWords: WordFrequency[];    // Words not in the list but not common everyday words
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
