const fs = require('fs');

class InputParser {

    __encoding = 'utf8';
    __file = './input.txt'
    constructor(input) {
        // Handed in an input array
        if(Array.isArray(input)) {
            this.__input = input;
            return;
        } 

        let _file = this.__file;;
        if(typeof input === "string") {
            _file = input;
        }
        // Pulling in an input from input.txt 
        try {
            this.__input = fs.readFileSync(_file, this.__encoding).trim();
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

    // Splits an array of number strings into a 2D array with a provided seperator, 
    // converting each string to number in the process.
    parseNumArr(sep = /\s+/) {
        this.__input = this.__input.map(e => {
            e = e.split(sep);
            e = e.map(_e => {
                return Number(_e)
            })
            return e
        });
        return this;
    }

    findRowSeperation() {
        let input1;
        let input2;
        for(let i = 0; i < this.__input.length; i++) {
            // Look for the empty string row
            if(this.__input[i].length===0) {
                input1 = this.__input.slice(0, i);
                input2 = this.__input.slice(i+1, this.__input.length);
                return [input1, input2];
            }
        }
    }

}

// Allow this class to be used by other files
module.exports = InputParser;