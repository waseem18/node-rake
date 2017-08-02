const Rake = require('./index.js');
const path = require('path');
const fs = require('fs');
const stopwords_path = path.resolve(__dirname+'/'+'stopWords.txt');

module.exports = {
  generate: function(content, opts = {}) {
    const fileData = fs.readFileSync(stopwords_path).toString().split('\n');
    const stopwordsList = opts.stopwords || fileData;

    const instance = new Rake(content, stopwordsList);
    return instance.generate();
  }
}
