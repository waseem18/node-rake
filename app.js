var Rake = require('./index.js')
var path = './stopWords.txt';



module.exports = {
  main: function(content){
    instance = new Rake(content,path)
    console.log(instance.generate())
  }
}
