import { STOP_WORDS, MAX_TOP_WORDS } from '../constants';
import { WordFrequency } from '../types';

export const processText = (text: string): WordFrequency[] => {
  // 1. Normalize text: lowercase
  const lowerText = text.toLowerCase();

  // 2. Tokenize: Extract words using regex
  // This regex matches sequences of alphabet characters including apostrophes.
  const tokens = lowerText.match(/[a-z]+(?:'[a-z]+)?/g);

  if (!tokens) return [];

  const frequencyMap: Record<string, number> = {};

  // 3. Count frequencies, filtering stop words
  tokens.forEach((token) => {
    // Remove possessive 's if present at the end (e.g., "world's" -> "world")
    // This helps in aggregating counts for the base word.
    let word = token.replace(/'s$/, '');
    
    // Check if the word is valid and not a stop word
    if (word.length > 0 && !STOP_WORDS.has(word)) {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    }
  });

  // 4. Convert to array and sort
  const sortedWords: WordFrequency[] = Object.entries(frequencyMap)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  // 5. Return top N
  return sortedWords.slice(0, MAX_TOP_WORDS);
};