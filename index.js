var fs = require('fs');

class Rake {

  constructor(text,stop_words_path){
    this.text = text;
    this.stop_words_path = stop_words_path
    this.regex_expression = this.buildRegex()
  }

  getStopWordsFromFile() {
    var stopwords = fs.readFileSync(this.stop_words_path).toString().split("\n");
    return stopwords
  }

  buildRegex(){
    var reg = ''
    var stopwords_list = this.getStopWordsFromFile();
    for(var i in stopwords_list){
      var stopword = stopwords_list[i];
      if(i!=stopwords_list.length-1){reg = reg + stopword + '|';}
      else{reg = reg + stopword;}
    }
    return reg;
  }

  removeStopWords(sentence) {
    var reg_exp = this.regex_expression
    var r = reg_exp.substring(0, reg_exp.length - 1);
    var reg = new RegExp('\\b(?:' + r + ')\\b','ig')
    var filtered_sentence  = sentence.replace(reg,'|').split('|')
    return filtered_sentence
  }

  splitTextToSentences(text){
    var sentences = text.match( /[^\.!\?\:\\]+/g );
    var filtered_sentences = []
    for(var i in sentences){
      var s = sentences[i].replace(/  +/g, "");
      if(s != ""){filtered_sentences.push(s)}
    }
    return filtered_sentences
  }


  generatePhrases(sentence_list) {
    var phrase_list = []
    for (var s in sentence_list) {
        var phrases = this.removeStopWords(sentence_list[s]);
        for(var phrase in phrases) {
            var phr = phrases[phrase].replace(/['!"“”’#$%&()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g,'')
            if(phr != ' ' && phr != '') {
                phrase_list.push(phr.trim())
            }
        }
      }
    return phrase_list
  }

  //Generates score for each word.
  calculateKeywordScores(phrase_list) {
    var word_freq = {}
    var word_degree = {}
    var word_score = {}
    for(var phrase in phrase_list) {

      var word_list = phrase_list[phrase].match(/[,.!?;:/‘’“”]|\b[0-9a-z']+\b/gi)
      var word_list_degree = word_list.length
      for(var word in word_list){
        word_freq[word_list[word]] = 0;
        word_freq[word_list[word]] +=1;
        word_degree[word_list[word]] = 0;
        word_degree[word_list[word]] += word_list_degree;
      }
    }

    for(var i in word_freq) {
      var freq = word_freq[i];
      word_degree[freq] = word_degree[freq] + word_freq[freq];
    }

    for(var i in word_freq){
      word_score[i] = 0;
      word_score[i] = word_degree[i] / (word_freq[i] * 1.0);
    }
    return word_score
  }

  //Generates score for each phrase based on the word scores.
  calculatePhraseScores(phrase_list, word_score) {
    var phrase_scores = {}
    for(var p in phrase_list){
        var phrase = phrase_list[p];
        phrase_scores[phrase] = 0;
        var word_list = phrase.match(/(\b[^\s]+\b)/g)
        var candidate_score = 0;
        for(var w in word_list){
            var word = word_list[w];
            candidate_score += word_score[word];
        }
        phrase_scores[phrase] = candidate_score;
    }
    return phrase_scores
  }

  sortPhrases(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
  }


  generate() {
    var sentence_list = this.splitTextToSentences(this.text);
    var phrases_list = this.generatePhrases(sentence_list);
    var word_scores = this.calculateKeywordScores(phrases_list)
    var phrase_scores = this.calculatePhraseScores(phrases_list, word_scores)
    var result = this.sortPhrases(phrase_scores)
    return result
  }
}


module.exports = Rake
