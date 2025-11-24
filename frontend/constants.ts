// A comprehensive list of common English stop words, prepositions, articles, and conjunctions.
// Also includes individual letters often used as multiple choice options (a, b, c, d).

export const STOP_WORDS = new Set([
  // Articles
  'a', 'an', 'the',
  
  // Options / Single Letters (Restricted to common options to avoid filtering real word fragments)
  'b', 'c', 'd', 'e', 'f', 'g', 
  // 'i' is also a pronoun so it's kept in pronouns section or here, but we usually want to keep 'I' as a word if it's meaningful, 
  // but for frequency analysis of academic text, 'I' is often a stop word. Let's include it.
  'z', // rarely used alone

  // Conjunctions & Prepositions & Common Verbs
  'and', 'or', 'but', 'if', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now',
  
  // Advanced Prepositions/Conjunctions
  'upon', 'within', 'without', 'among', 'across', 'along', 'around', 'behind', 'beside', 'beyond', 
  'inside', 'near', 'outside', 'past', 'round', 'since', 'throughout', 'toward', 'underneath', 
  'unlike', 'versus', 'via', 'although', 'though', 'unless', 'whereas', 'whether',
  
  // Pronouns & Quantifiers
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
  'anything', 'everyone', 'everything', 'anyone', 'someone', 'something', 'nothing',
  
  // Be verbs & Auxiliaries
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing',
  'could', 'may', 'might', 'must', 'shall', 'would', 'ought',
  
  // Common fillers / Misc
  'etc', 'et', 'al', 'eg', 'ie', 'ok', 'yes', 'no'
]);

export const MAX_TOP_WORDS = 200;

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};