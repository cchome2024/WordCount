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

// Allowed word list - only words in this list will be counted
export const ALLOWED_WORDS = new Set([
  'alter', 'burst', 'dispose', 'blast', 'consume', 'split', 'spill', 'slip', 'slide', 'spit',
  'bacteria', 'breed', 'budget', 'candidate', 'campus', 'liberal', 'transform', 'transmit', 'transplant', 'transport',
  'shift', 'vary', 'vanish', 'swallow', 'suspicion', 'suspicious', 'mild', 'tender', 'nuisance', 'insignificant',
  'accelerate', 'absolute', 'boundary', 'brake', 'catalog', 'vague', 'vain', 'extinct', 'extraordinary', 'extreme',
  'agent', 'alcohol', 'appeal', 'appreciate', 'approve', 'stimulate', 'acquire', 'accomplish', 'network', 'tide',
  'tidy', 'trace', 'torture', 'wander', 'wax', 'weave', 'preserve', 'abuse', 'academic', 'academy',
  'battery', 'barrier', 'cargo', 'career', 'vessel', 'vertical', 'oblige', 'obscure', 'extent', 'exterior',
  'external', 'petrol', 'petroleum', 'delay', 'decay', 'decent', 'route', 'ruin', 'sake', 'satellite',
  'scale', 'temple', 'tedious', 'tend', 'tendency', 'ultimate', 'undergo', 'abundant', 'adopt', 'adapt',
  'bachelor', 'casual', 'trap', 'vacant', 'vacuum', 'oral', 'optics', 'organ', 'excess', 'expel',
  'expend', 'expenditure', 'expense', 'expensive', 'expand', 'expansion', 'private', 'individual', 'personal', 'personnel',
  'pacific', 'atlantic', 'arctic', 'antarctic', 'grant', 'grand', 'invade', 'acid', 'acknowledge', 'balcony',
  'calculate', 'calendar', 'optimistic', 'optional', 'outstanding', 'export', 'import', 'impose', 'religion', 'religious',
  'victim', 'video', 'videotape', 'offend', 'bother', 'interfere', 'internal', 'beforehand', 'racial', 'radiation',
  'radical', 'range', 'wonder', 'isolate', 'issue', 'hollow', 'hook', 'adequate', 'adhere', 'ban',
  'capture', 'valid', 'valley', 'consistent', 'continuous', 'continual', 'explode', 'exploit', 'explore', 'explosion',
  'explosive', 'remote', 'removal', 'render', 'precaution', 'idle', 'identify', 'identity', 'poverty', 'resistant',
  'resolve', 'barrel', 'bargain', 'coarse', 'coach', 'code', 'coil', 'adult', 'advertise', 'advertisement',
  'agency', 'focus', 'forbid', 'debate', 'debt', 'decade', 'enclose', 'encounter', 'globe', 'global',
  'scan', 'scandal', 'significance', 'subsequent', 'virtual', 'virtue', 'orient', 'portion', 'target', 'portable',
  'decline', 'illusion', 'likelihood', 'stripe', 'emphasize', 'emotion', 'emotional', 'awful', 'awkward', 'clue',
  'collision', 'device', 'inevitable', 'naval', 'navigation', 'necessity', 'previous', 'provision', 'pursue', 'stale',
  'substitute', 'deserve', 'discrimination', 'professional', 'secure', 'scratch', 'talent', 'insurance', 'insure', 'nevertheless',
  'neutral', 'spot', 'spray', 'medium', 'media', 'auxiliary', 'automatic', 'compete', 'competent', 'competition',
  'distribute', 'disturb', 'infer', 'integrate', 'moist', 'moisture', 'promote', 'region', 'register', 'stable',
  'sophisticated', 'splendid', 'cancel', 'variable', 'prospect', 'prosperity', 'aspect', 'cope', 'core', 'maintain',
  'discipline', 'mainland', 'domestic', 'constant', 'cliff', 'authority', 'audio', 'attitude', 'community', 'commit',
  'comment', 'distinguish', 'distress', 'facility', 'faculty', 'mixture', 'mood', 'moral', 'prominent', 'substance',
  'substantial', 'prompt', 'vivid', 'vocabulary', 'venture', 'version', 'waist', 'yawn', 'yield', 'zone',
  'strategy', 'strategic', 'tense', 'tension', 'avenue', 'available', 'comparable', 'comparative', 'dash', 'data',
  'dive', 'diverse', 'entitle', 'regulate', 'release', 'exaggerate', 'evil', 'shrink', 'subtract', 'suburb',
  'subway', 'survey', 'wealthy', 'adjust', 'attach', 'profit', 'profitable', 'slope', 'reinforce', 'reject',
  'fatal', 'fate', 'humble', 'illegal', 'award', 'aware', 'column', 'comedy', 'dumb', 'dump',
  'deaf', 'decorate', 'principal', 'principle', 'prior', 'priority', 'prohibit', 'remarkable', 'remedy', 'repetition',
  'undertake', 'unique', 'obstacle', 'odd', 'omit', 'opponent', 'opportunity', 'orchestra', 'semester', 'semiconductor',
  'seminar', 'terminal', 'territory', 'approximate', 'arbitrary', 'architect', 'architecture', 'biology', 'geography', 'geology',
  'geometry', 'arithmetic', 'algebra', 'entertainment', 'enthusiasm', 'entry', 'environment', 'episode', 'equation', 'restrain',
  'restraint', 'resume', 'severe', 'sexual', 'simplicity', 'simplify', 'sorrow', 'stuff', 'temporary', 'temptation',
  'terror', 'thrust', 'treaty', 'arise', 'arouse', 'burden', 'bureau', 'marvelous', 'massive', 'mature',
  'maximum', 'minimum', 'nonsense', 'nuclear', 'nucleus', 'retail', 'retain', 'restrict', 'sponsor', 'spur',
  'triumph', 'tuition', 'twist', 'undergraduate', 'universal', 'universe', 'via', 'vibrate', 'voluntary', 'volunteer',
  'vote', 'wagon', 'appoint', 'approach', 'appropriate', 'bunch', 'bundle', 'ceremony', 'chaos', 'discount',
  'display', 'equivalent', 'erect', 'fax', 'fertile', 'fertilizer', 'grateful', 'gratitude', 'horror', 'horrible',
  'internet', 'interpret', 'interpretation', 'jungle', 'knot', 'leak', 'lean', 'leap', 'modify', 'nylon',
  'onion', 'powder', 'applicable', 'applicant', 'breadth', 'conservation', 'conservative', 'parallel', 'passion', 'passive',
  'pat', 'peak', 'phenomenon', 'reluctant', 'rely', 'relevant', 'reliable', 'relief', 'reputation', 'rescue',
  'triangle', 'sequence', 'shallow', 'shiver', 'shrug', 'signature', 'sincere', 'utility', 'utilize', 'utter',
  'variation', 'vehicle', 'applause', 'appliance', 'consent', 'conquer', 'defect', 'delicate', 'evolve', 'evolution',
  'frown', 'frustrate', 'guarantee', 'guilty', 'jealous', 'jeans', 'liquor', 'liter', 'modest', 'molecule',
  'orbit', 'participate', 'particle', 'particularly', 'respond', 'response', 'sensitive', 'tremble', 'tremendous', 'trend',
  'trial', 'apparent', 'appetite', 'deposit', 'deputy', 'derive', 'descend', 'missile', 'mission', 'mist',
  'noticeable', 'notify', 'notion', 'resemble', 'reveal', 'revenue', 'shelter', 'shield', 'vital', 'vitally',
  'urban', 'urge', 'urgent', 'usage', 'violent', 'violet', 'weed', 'welfare', 'whatsoever', 'whereas',
  'essential', 'estimate', 'exceed', 'exceedingly', 'exclaim', 'exclude', 'exclusive', 'excursion', 'flash', 'flee',
  'flexible', 'flock', 'hardware', 'harmony', 'haste', 'hatred', 'incident', 'index', 'infant', 'infect',
  'inferior', 'infinite', 'ingredient', 'inhabitant', 'jail', 'jam', 'jewel', 'joint', 'junior', 'laser',
  'launch', 'luxury', 'magnet', 'female', 'manual', 'manufacture', 'marine', 'mutual', 'naked', 'negative',
  'neglect', 'origin', 'oval', 'outset', 'presumably', 'prevail', 'quit', 'quotation', 'recreation', 'recruit',
  'rival', 'shuttle', 'skim', 'sketch', 'slender', 'theme', 'textile', 'tropical', 'kneel', 'label',
  'merchant', 'mere', 'numerous', 'parade', 'pants', 'partial', 'passport', 'prescribe', 'primitive', 'ridge',
  'ridiculous', 'rigid', 'withstand', 'witness', 'withdraw', 'slippery', 'smash', 'snap', 'software', 'solar',
  'lunar', 'submerge', 'timber', 'tissue', 'title', 'tone', 'drift', 'drip', 'durable', 'duration',
  'dusk', 'leather', 'legislation', 'leisure', 'loose', 'earnest', 'earthquake', 'echo', 'elaborate', 'elastic',
  'elbow', 'electron', 'volcano', 'volume', 'fatigue', 'faulty', 'favorable', 'favorite', 'gallery', 'gallon',
  'gap', 'garbage', 'gaze', 'gear', 'gene', 'lest', 'liable', 'liberty', 'license', 'motivate',
  'motive', 'generate', 'genius', 'genuine', 'gasoline', 'germ', 'gesture', 'giant', 'glimpse', 'glory',
  'glorious', 'golf', 'hydrogen', 'oxygen', 'hostile', 'household'
]);

// Common everyday words to exclude from the second table
// These are too common/ordinary to be meaningful in academic/professional analysis
export const COMMON_EVERYDAY_WORDS = new Set([
  'music', 'people', 'person', 'time', 'year', 'day', 'week', 'month', 'way', 'thing',
  'man', 'woman', 'child', 'children', 'family', 'friend', 'home', 'house', 'school', 'work',
  'job', 'life', 'world', 'country', 'city', 'place', 'room', 'door', 'window', 'table',
  'chair', 'bed', 'food', 'water', 'drink', 'eat', 'sleep', 'walk', 'run', 'talk',
  'say', 'tell', 'think', 'know', 'see', 'look', 'watch', 'hear', 'feel', 'want',
  'need', 'like', 'love', 'hate', 'good', 'bad', 'nice', 'great', 'big', 'small',
  'long', 'short', 'high', 'low', 'new', 'old', 'young', 'hot', 'cold', 'warm',
  'cool', 'happy', 'sad', 'angry', 'tired', 'sick', 'well', 'fine', 'okay', 'yes',
  'no', 'maybe', 'sure', 'please', 'thank', 'sorry', 'hello', 'hi', 'bye', 'goodbye',
  'morning', 'afternoon', 'evening', 'night', 'today', 'tomorrow', 'yesterday', 'now', 'then', 'later',
  'here', 'there', 'where', 'when', 'what', 'who', 'why', 'how', 'which', 'whose',
  'money', 'dollar', 'buy', 'sell', 'shop', 'store', 'market', 'price', 'cost', 'pay',
  'car', 'bus', 'train', 'plane', 'phone', 'computer', 'internet', 'email', 'message', 'call',
  'book', 'read', 'write', 'paper', 'pen', 'pencil', 'letter', 'word', 'sentence', 'story',
  'movie', 'film', 'tv', 'television', 'show', 'game', 'play', 'fun', 'funny', 'interesting',
  'boring', 'easy', 'hard', 'difficult', 'simple', 'complex', 'important', 'special', 'normal', 'usual',
  'different', 'same', 'similar', 'other', 'another', 'some', 'any', 'many', 'much', 'more',
  'most', 'few', 'little', 'lot', 'all', 'every', 'each', 'both', 'either', 'neither',
  'first', 'last', 'next', 'previous', 'begin', 'start', 'end', 'finish', 'stop', 'continue',
  'go', 'come', 'leave', 'arrive', 'move', 'stay', 'wait', 'hurry', 'slow', 'fast',
  'quick', 'early', 'late', 'soon', 'already', 'yet', 'still', 'again', 'once', 'twice',
  'always', 'never', 'often', 'sometimes', 'usually', 'rarely', 'seldom', 'almost', 'quite', 'very',
  'really', 'actually', 'probably', 'maybe', 'perhaps', 'certainly', 'definitely', 'absolutely', 'exactly', 'almost',
  'name', 'age', 'address', 'number', 'phone', 'email', 'website', 'page', 'site', 'link',
  'picture', 'photo', 'image', 'video', 'sound', 'voice', 'noise', 'quiet', 'loud', 'silent',
  'color', 'red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'brown', 'orange',
  'size', 'shape', 'round', 'square', 'circle', 'triangle', 'line', 'point', 'dot', 'spot',
  'animal', 'dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'pig', 'chicken', 'duck',
  'tree', 'flower', 'grass', 'plant', 'garden', 'park', 'beach', 'ocean', 'sea', 'river',
  'mountain', 'hill', 'valley', 'forest', 'field', 'farm', 'road', 'street', 'path', 'way',
  'clothes', 'shirt', 'pants', 'dress', 'shoes', 'hat', 'coat', 'jacket', 'sweater', 'socks',
  'body', 'head', 'face', 'eye', 'nose', 'mouth', 'ear', 'hair', 'hand', 'finger',
  'arm', 'leg', 'foot', 'toe', 'back', 'chest', 'stomach', 'shoulder', 'knee', 'elbow',
  // Additional common words
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'save', 'also', 'best', 'better', 'worse', 'worst',
  'us', 'busy', 'news', 'study', 'learn',
  'use', 'used', 'using', 'uses', 'make', 'made', 'makes', 'making', 'take', 'took',
  'taken', 'takes', 'taking', 'get', 'got', 'gets', 'getting', 'give', 'gave', 'given',
  'gives', 'giving', 'find', 'found', 'finds', 'finding', 'keep', 'kept', 'keeps', 'keeping',
  'let', 'lets', 'letting', 'put', 'puts', 'putting', 'set', 'sets', 'setting', 'try',
  'tries', 'trying', 'tried', 'turn', 'turns', 'turned', 'turning', 'become', 'becomes', 'becoming',
  'became', 'bring', 'brought', 'brings', 'bringing', 'build', 'built', 'builds', 'building',
  'buy', 'bought', 'buys', 'buying', 'catch', 'caught', 'catches', 'catching', 'choose', 'chose',
  'chosen', 'chooses', 'choosing', 'come', 'came', 'comes', 'coming', 'cut', 'cuts', 'cutting',
  'do', 'did', 'done', 'does', 'doing', 'draw', 'drew', 'drawn', 'draws', 'drawing',
  'drive', 'drove', 'driven', 'drives', 'driving', 'fall', 'fell', 'fallen', 'falls', 'falling',
  'feel', 'felt', 'feels', 'feeling', 'fight', 'fought', 'fights', 'fighting', 'fly', 'flew',
  'flown', 'flies', 'flying', 'forget', 'forgot', 'forgotten', 'forgets', 'forgetting', 'forgive', 'forgave',
  'forgiven', 'forgives', 'forgiving', 'freeze', 'froze', 'frozen', 'freezes', 'freezing', 'grow', 'grew',
  'grown', 'grows', 'growing', 'hang', 'hung', 'hangs', 'hanging', 'have', 'had', 'has', 'having',
  'hear', 'heard', 'hears', 'hearing', 'hide', 'hid', 'hidden', 'hides', 'hiding', 'hit',
  'hits', 'hitting', 'hold', 'held', 'holds', 'holding', 'hurt', 'hurts', 'hurting', 'keep',
  'kept', 'keeps', 'keeping', 'know', 'knew', 'known', 'knows', 'knowing', 'lay', 'laid',
  'lays', 'laying', 'lead', 'led', 'leads', 'leading', 'leave', 'left', 'leaves', 'leaving',
  'lend', 'lent', 'lends', 'lending', 'let', 'lets', 'letting', 'lie', 'lay', 'lain',
  'lies', 'lying', 'lose', 'lost', 'loses', 'losing', 'make', 'made', 'makes', 'making',
  'mean', 'meant', 'means', 'meaning', 'meet', 'met', 'meets', 'meeting', 'pay', 'paid',
  'pays', 'paying', 'put', 'puts', 'putting', 'read', 'reads', 'reading', 'ride', 'rode',
  'ridden', 'rides', 'riding', 'ring', 'rang', 'rung', 'rings', 'ringing', 'rise', 'rose',
  'risen', 'rises', 'rising', 'run', 'ran', 'runs', 'running', 'say', 'said', 'says',
  'saying', 'see', 'saw', 'seen', 'sees', 'seeing', 'sell', 'sold', 'sells', 'selling',
  'send', 'sent', 'sends', 'sending', 'set', 'sets', 'setting', 'shake', 'shook', 'shaken',
  'shakes', 'shaking', 'shine', 'shone', 'shines', 'shining', 'shoot', 'shot', 'shots', 'shoots',
  'shooting', 'show', 'showed', 'shown', 'shows', 'showing', 'shut', 'shuts', 'shutting', 'sing',
  'sang', 'sung', 'sings', 'singing', 'sit', 'sat', 'sits', 'sitting', 'sleep', 'slept',
  'sleeps', 'sleeping', 'speak', 'spoke', 'spoken', 'speaks', 'speaking', 'spend', 'spent', 'spends',
  'spending', 'stand', 'stood', 'stands', 'standing', 'steal', 'stole', 'stolen', 'steals', 'stealing',
  'stick', 'stuck', 'sticks', 'sticking', 'strike', 'struck', 'strikes', 'striking', 'swim', 'swam',
  'swum', 'swims', 'swimming', 'take', 'took', 'taken', 'takes', 'taking', 'teach', 'taught',
  'teaches', 'teaching', 'tear', 'tore', 'torn', 'tears', 'tearing', 'tell', 'told', 'tells',
  'telling', 'think', 'thought', 'thinks', 'thinking', 'throw', 'threw', 'thrown', 'throws', 'throwing',
  'understand', 'understood', 'understands', 'understanding', 'wake', 'woke', 'woken', 'wakes', 'waking',
  'wear', 'wore', 'worn', 'wears', 'wearing', 'win', 'won', 'wins', 'winning', 'write',
  'wrote', 'written', 'writes', 'writing'
]);

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};