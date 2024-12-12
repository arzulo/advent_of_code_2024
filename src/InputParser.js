const fs = require('fs');

class InputParser {

    constructor(file='./input.txt', encoding='utf8') {
        try {
            this.__input = fs.readFileSync(file, encoding).trim();
        } catch(err) {
            console.error(err)
        }
    }

    get input() {
        return this.__input;
    }

    splitLines(_input=this.__input) {
        return _input.split(/\r?\n/);
    }

}

// Allow this class to be used by other files
module.exports = InputParser;