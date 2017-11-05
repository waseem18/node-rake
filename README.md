# node-rake
[![Build Status](https://travis-ci.org/waseem18/node-rake.svg?branch=master)](https://travis-ci.org/waseem18/node-rake) [![npm](https://img.shields.io/npm/dm/node-rake.svg)](https://www.npmjs.com/package/node-rake)   [![npm](https://img.shields.io/npm/v/node-rake.svg)]()


A NodeJS implementation of the Rapid Automatic Keyword Extraction algorithm.

# Installation
`npm install node-rake`

# Usage

```javascript
rake.generate(text, opts);
```

The `opts` param is an object that allows to pass custom params to generate method. Options:

- `stopwords`: Optional. An `array` containing a custom stopwords list. By default, the method uses a stopwords list which comes along (take a look at [Stopwords source](#stopwords-source)).

## Example of usage:

```javascript
const rake = require('node-rake')
const keywords = rake.generate("LDA stands for Latent Dirichlet Allocation")
// it'll output: [ 'Latent Dirichlet Allocation', 'LDA stands' ]

//or

const myStopwords = ['for', 'the', 'a', 'stands', 'test', 'man', 'woman'];
const opts = {stopwords: myStopwords};

const keywords = rake.generate("LDA stands for Latent Dirichlet Allocation", opts);
// it'll output: [ 'Latent Dirichlet Allocation', 'LDA' ]
```

#### Algorithm sources:
  1.https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents
  2.https://www.ijarcsse.com/docs/papers/Volume_6/5_May2016/V6I5-0392.pdf
  
#### Stopwords source:
  1. http://dev.mysql.com/doc/refman/5.7/en/fulltext-stopwords.html
  
  
#### Example : 
  1. https://runkit.com/waseem18/59fe9c7d20e52f0012606fbe
  2. https://runkit.com/waseem18/59fe9d1b5fbc910012f99891
  
  
  
  
[![npm](https://img.shields.io/npm/l/node-rake.svg)]()
