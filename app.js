var Rake = require('./index.js')
var path = require("path");
var stopwords_path = path.resolve(__dirname+'/'+'stopWords.txt')



module.exports = {
  generate: function(content){
    instance = new Rake(content,stopwords_path)
    return instance.generate()
  }
}
