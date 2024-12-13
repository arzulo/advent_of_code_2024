const InputParser = require('../src/InputParser');

parser = new InputParser();

let input = parser.splitLines().splitColumns().input;

let dir = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};
let guardDirection = new Map();
guardDirection.set('v', dir.DOWN);
guardDirection.set('<', dir.LEFT);
guardDirection.set('>', dir.RIGHT);
guardDirection.set('^', dir.UP);
// Scan for the start position, store starting info
let currentDir;
let pos;
let visited = 0;
let visitedMark = 'o';
for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[0].length; j++) {
        if(guardDirection.has(input[i][j])) {
            pos = [i,j];
            visited++;
            currentDir = guardDirection.get(input[i][j])
            input[i][j] = visitedMark;
        }
    }
}

let dirVector = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let height = input.length;
let width = input[0].length;
while(true) {

    let newY = pos[0] + dirVector[currentDir][0];
    let newX = pos[1] + dirVector[currentDir][1];

    // Check if hit a finish condition (left map)
    if(newY < 0 || newY >= height || newX < 0 || newX >= width) {
        // Break loop
        break;
    }

    // check if we have colided and need to turn
    if(input[newY][newX] === '#') {
        currentDir = (currentDir+1) % 4;
        continue;
    }

    // Otherwise, mark the spot and add
    if(input[newY][newX] !== visitedMark) {
        input[newY][newX] = visitedMark;
        visited++;
    }
    pos = [newY, newX];

}

// Answers
console.log(`Part 1 answer: ${visited}`);
// console.log(`Part 2 answer: ${resP2}`);