import { STOP_WORDS, MAX_TOP_WORDS, ALLOWED_WORDS, COMMON_EVERYDAY_WORDS } from '../constants';
import { WordFrequency, TextProcessingResult } from '../types';

// Common valid 2-letter words (to avoid filtering legitimate words)
const VALID_TWO_LETTER_WORDS = new Set([
  'am', 'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'if', 'in', 'is', 'it', 'me', 'my', 'no', 'of', 'on', 'or', 'so', 'to', 'up', 'us', 'we'
]);

// Helper function to check if a word is valid
const isValidWord = (word: string): boolean => {
  // 1. Must have at least 2 characters (single letters are not meaningful words)
  if (word.length < 2) {
    return false;
  }
  
  // 2. Must not contain numbers
  if (/\d/.test(word)) {
    return false;
  }
  
  // 3. Must not contain special characters (except apostrophes which are handled in regex)
  if (/[^a-z']/.test(word)) {
    return false;
  }
  
  // 4. Must not be a stop word
  if (STOP_WORDS.has(word)) {
    return false;
  }
  
  // 5. Filter 2-letter words strictly
  if (word.length === 2) {
    // Must be a valid 2-letter word
    if (!VALID_TWO_LETTER_WORDS.has(word)) {
      return false;
    }
    // Must not be repeated characters (like "aa", "bb")
    if (word[0] === word[1]) {
      return false;
    }
    // Must not be sequential letters (like "ab", "cd")
    const sequentialPatterns = ['ab', 'bc', 'cd', 'de', 'ef', 'fg', 'gh', 'hi', 'ij', 'jk', 'kl', 'lm', 'mn', 'op', 'pq', 'qr', 'rs', 'st', 'tu', 'uv', 'vw', 'wx', 'xy', 'yz'];
    if (sequentialPatterns.includes(word)) {
      return false;
    }
  }
  
  // 6. For 3-letter words, must contain at least one vowel (unless it's a common word)
  if (word.length === 3) {
    const hasVowel = /[aeiouy]/.test(word);
    if (!hasVowel) {
      // Allow some common 3-letter words without vowels
      const validNoVowel = new Set(['why', 'cry', 'try', 'fly', 'dry', 'sky', 'gym', 'hmm', 'shh', 'psh']);
      if (!validNoVowel.has(word)) {
        return false;
      }
    }
    // Must not be all consonants (very strict for 3-letter words)
    const consonantCount = (word.match(/[bcdfghjklmnpqrstvwxz]/g) || []).length;
    if (consonantCount === 3 && !hasVowel) {
      return false;
    }
  }
  
  // 7. For words 4+ characters, must contain at least one vowel
  if (word.length >= 4) {
    const hasVowel = /[aeiouy]/.test(word);
    if (!hasVowel) {
      // Very few words without vowels exist, filter them out
      return false;
    }
  }
  
  // 8. Must not be a single repeated character (like "aaa", "bbb")
  if (word.length > 2 && word.split('').every(char => char === word[0])) {
    return false;
  }
  
  // 9. Must not be common non-word patterns (sequential letters)
  if (word.length === 3) {
    const sequentialPatterns = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz'];
    if (sequentialPatterns.includes(word)) {
      return false;
    }
  }
  
  return true;
};

export const processText = (text: string): TextProcessingResult => {
  // 1. Normalize text: lowercase
  const lowerText = text.toLowerCase();

  // 2. Tokenize: Extract words using regex
  // This regex matches sequences of alphabet characters including apostrophes.
  // Updated to be more strict - only letters and apostrophes
  const tokens = lowerText.match(/[a-z]+(?:'[a-z]+)?/g);

  if (!tokens) {
    return {
      allowedWords: [],
      otherWords: []
    };
  }

  const allowedWordsMap: Record<string, number> = {};
  const otherWordsMap: Record<string, number> = {};

  // 3. Count frequencies, separating words into two categories
  tokens.forEach((token) => {
    // Remove possessive 's if present at the end (e.g., "world's" -> "world")
    // This helps in aggregating counts for the base word.
    let word = token.replace(/'s$/, '');
    
    // Remove leading/trailing apostrophes
    word = word.replace(/^'+|'+$/g, '');
    
    // Convert to lowercase for comparison
    const lowerWord = word.toLowerCase();
    
    // Skip if it's a stop word or invalid word
    if (STOP_WORDS.has(lowerWord) || !isValidWord(lowerWord)) {
      return;
    }
    
    // Check if the word is in the allowed words list
    if (ALLOWED_WORDS.has(lowerWord)) {
      allowedWordsMap[lowerWord] = (allowedWordsMap[lowerWord] || 0) + 1;
    } 
    // Otherwise, check if it's not a common everyday word
    else if (!COMMON_EVERYDAY_WORDS.has(lowerWord)) {
      otherWordsMap[lowerWord] = (otherWordsMap[lowerWord] || 0) + 1;
    }
  });

  // 4. Convert to arrays and sort
  const sortedAllowedWords: WordFrequency[] = Object.entries(allowedWordsMap)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_TOP_WORDS);

  const sortedOtherWords: WordFrequency[] = Object.entries(otherWordsMap)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_TOP_WORDS);

  // 5. Return both results
  return {
    allowedWords: sortedAllowedWords,
    otherWords: sortedOtherWords
  };
};