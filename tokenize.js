const DICTIONARY = require('./dictionary');

const ENCODING_LENGTH = 20;

function tokenize(wordArray) {
    console.log(wordArray);
  let returnArray = [DICTIONARY.START];

  for (var i = 0; i < wordArray.length; i++) {
    let encoding = DICTIONARY.LOOKUP[wordArray[i]];
    returnArray.push(encoding === undefined ? DICTIONARY.UNKNOWN : encoding);
  }

  while (i < ENCODING_LENGTH - 1) {
    returnArray.push(DICTIONARY.PAD);
    i++;
  }

  return [returnArray];
}

module.exports = tokenize;