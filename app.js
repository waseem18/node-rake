const Rake = require('./index.js');
const path = require('path');
const fs = require('fs');

const stopwordsPath = path.resolve(`${__dirname}/stopWords.txt`);

module.exports = {
  generate(content, opts = {}) {
    const fileData = fs.readFileSync(stopwordsPath).toString().split('\n');
    const stopwordsList = opts.stopwords || fileData;

    const instance = new Rake(content, stopwordsList);
    return instance.generate();
  },
};
