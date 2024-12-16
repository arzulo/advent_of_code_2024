const InputParser = require('../src/InputParser');

let parser = new InputParser();
let input = parser.splitLines().parseNumArr('').input;


// Vars to hold part1/2 answers
let part1 = 0;
let part2 = 0;


let width = input.length;
let height = input[0].length;

let visitedSet = new Set();
let addVisit = function(r, c) {
    key = `${r}_${c}`;
    if(visitedSet.has(key)) {
        return false;
    } else {
        visitedSet.add(key);
        return true;
    }
}


let dfs = function(score, r, c) {
    if(!addVisit(r,c)) {
        return 0;
    }
    let val = input[r][c];
    if(val === 9) {
        // part1++;
        return 1;
    }

    // check for a gain in cardinal directions
    // Up
    if(r-1 >= 0) {
        if(input[r-1][c] === val+1) {
            score += dfs(0, r-1, c);
        }
    }

    // Down
    if(r+1 < height) {
        if(input[r+1][c] === val+1) {
            score += dfs(0, r+1, c);
        }
    }

    // Right 
    if(c+1 < width ) {
        if(input[r][c+1] === val+1) {
            score += dfs(0, r, c+1);
        }
    }

    // Left 
    if(c-1 >= 0 ) {
        if(input[r][c-1] === val+1) {
            score += dfs(0, r, c-1);
        }
    }

    return score;
}


// loop through topography map and start DFS at any 0 point
for(var i = 0; i < height; i++) {
    for(var j = 0; j < width; j++) {
        if(input[i][j] === 0) {
            part1 += dfs(0, i, j);
        }
        visitedSet.clear();
    }
}



// Answers
console.log(`Part 1 answer: ${part1}`);
console.log(`Part 2 answer: ${part2}`);