const InputParser = require('../src/InputParser');

parser = new InputParser();

// Create a 2D array
let input = parser.splitLines().splitColumns().input;
let ansPart1 = 0;
let ansPart2 = 0;
const MATCHLEN=4;


function checkStr(str) {
    if(str.join('') === "XMAS") {
        ansPart1++;
    }
}

// Double for loop... will look around the index in all directions
for(var i = 0; i < input.length; i++) {
    for(var j = 0; j < input[0].length; j++) {

        // Down, up, right, left
        let dirs = new Array(4).fill(false);
        let str;
        // Down
        if(i <= input.length-MATCHLEN) {
            dirs[0] = true;
            str = [input[i][j], input[i+1][j], input[i+2][j], input[i+3][j]];
            checkStr(str);
        }
        // Up
        if(i >= MATCHLEN-1) {
            dirs[1] = true;
            str = [input[i][j], input[i-1][j], input[i-2][j], input[i-3][j]];
            checkStr(str);
        }
        // Right 
        if(j <= input.length-MATCHLEN) {
            dirs[2] = true;
            str = [input[i][j], input[i][j+1], input[i][j+2], input[i][j+3]];
            checkStr(str);
        }
        // left
        if(j >= MATCHLEN-1) {
            dirs[3] = true;
            str = [input[i][j], input[i][j-1], input[i][j-2], input[i][j-3]];
            checkStr(str);
        }
        // Diag UL
        if(dirs[1] && dirs[3]) {
            str = [input[i][j], input[i-1][j-1], input[i-2][j-2], input[i-3][j-3]];
            checkStr(str);
        }
        // Diag UR
        if(dirs[1] && dirs[2]) {
            str = [input[i][j], input[i-1][j+1], input[i-2][j+2], input[i-3][j+3]];
            checkStr(str);
        }

        // Diag DL
        if(dirs[0] && dirs[3]) {
            str = [input[i][j], input[i+1][j-1], input[i+2][j-2], input[i+3][j-3]];
            checkStr(str);
        }

        // Diag DR
        if(dirs[0] && dirs[2]) {
            str = [input[i][j], input[i+1][j+1], input[i+2][j+2], input[i+3][j+3]];
            checkStr(str);
        }
    }
}


console.log(`Part 1 answer: ${ansPart1}`);
console.log(`Part 2 answer: ${ansPart2}`);