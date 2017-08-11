class Rake {
  constructor(text, stopwordsList) {
    this.text = text;
    this.stopwords = stopwordsList;
    this.regex_expression = this.buildRegex();
  }

  buildRegex() {
    return this.stopwords.join('|');
  }

  removeStopWords(sentence) {
    const reg_exp = this.regex_expression;
    const r = reg_exp.substring(0, reg_exp.length - 1);
    const reg = new RegExp(`\\b(?:${r})\\b`, 'ig');
    const filtered_sentence = sentence.replace(reg, '|').split('|');
    return filtered_sentence;
  }

  splitTextToSentences(text) {
    const sentences = text.match(/[^\.!\?\:\\]+/g);
    const filteredSentences = sentences.filter(s => s.replace(/  +/g, '') !== '');
    return filteredSentences;
  }

  generatePhrases(sentenceList) {
    const reg = /['!"“”’#$%&()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g;
    const phrases = sentenceList.map(s => this.removeStopWords(s));
    const phraseList = phrases.map((phrase) => phrase
      .filter(phr => (phr.replace(reg, '') !== ' ' && phr.replace(reg, '') !== ''))
      .map(phr => phr.trim())
    );
    const flattenedList = [].concat(...phraseList);
    return flattenedList;
  }

  // Generates score for each word.
  calculateKeywordScores(phraseList) {
    const wordFreq = {};
    const wordDegree = {};
    const wordScore = {};
    phraseList.forEach((phrase) => {
      const wordList = phrase.match(/[,.!?;:/‘’“”]|\b[0-9a-z']+\b/gi);
      const wordListDegree = wordList.length;
      wordList.forEach((word) => {
        wordFreq[word] = 0;
        wordFreq[word] += 1;
        wordDegree[word] = 0;
        wordDegree[word] += wordListDegree;
      });
    });

    Object.values(wordFreq).forEach(freq => wordDegree[freq] += wordFreq[freq]);
    Object.keys(wordFreq).forEach(i => wordScore[i] = wordDegree[i] / (wordFreq[i] * 1.0));
    return wordScore;
  }

  // Generates score for each phrase based on the word scores.
  calculatePhraseScores(phraseList, wordScore) {
    const phraseScores = {};
    phraseList.forEach((phrase) => {
      phraseScores[phrase] = 0;
      let candidateScore = 0;
      const wordList = phrase.match(/(\b[^\s]+\b)/g);
      wordList.forEach(word => candidateScore += wordScore[word]);
      phraseScores[phrase] = candidateScore;
    });
    return phraseScores;
  }

  sortPhrases(obj) {
    return Object.keys(obj).sort((a, b) => obj[b] - obj[a]);
  }

  generate() {
    const sentence_list = this.splitTextToSentences(this.text);
    const phrases_list = this.generatePhrases(sentence_list);
    const word_scores = this.calculateKeywordScores(phrases_list);
    const phrase_scores = this.calculatePhraseScores(phrases_list, word_scores);
    const result = this.sortPhrases(phrase_scores);
    return result;
  }
}

module.exports = Rake;
