const fs = require('fs');

class InputParser {

    constructor(file = './input.txt', encoding = 'utf8') {
        try {
            this.__input = fs.readFileSync(file, encoding).trim();
        } catch (err) {
            console.error(err)
        }
    }

    get input() {
        return this.__input;
    }

    splitLines() {
        this.__input = this.__input.split(/\r?\n/);
        return this;
    }

    splitColumns(seperator = '') {
        for(let i = 0; i < this.__input.length; i++) {
            this.__input[i] = this.__input[i].split(seperator);
        }
        return this;
    }

    parseNumArr() {
        this.__input = this.__input.map(e => {
            e = e.split(/\s+/);
            e = e.map(_e => {
                return Number(_e)
            })
            return e
        });
        return this;
    }

}

// Allow this class to be used by other files
module.exports = InputParser;