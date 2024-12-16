const InputParser = require('../src/InputParser');

let parser = new InputParser();
let input = parser.splitLines().splitColumns().input;


// Vars to hold part1/2 answers
let part1 = 0;
let part2 = 0;

let width = input.length;
let height = input[0].length;

// Set used to keep track of which spaces have been visited already
let visited = new Set();

let addVisit = function(r,c) {
    let _key = `${r}_${c}`;

    if(visited.has(_key)) {
        return false;
    } else {
        visited.add(_key);
        return true;
    }
}

// Directional vectors in order: up, right, down, left
let dirVec = [ [-1, 0], [0, 1], [1, 0], [0, -1]];
let perimeter = 0;
let area = 0;

let dfs = function(plant, r, c) { 
    // Check if the current plant is outside the perimeter or doesn't match the currnt plant scan
    if(r < 0 || r >= height || c < 0 || c >= width || plant !== input[r][c]) {
        perimeter++;
        return;
    }
    if(!addVisit(r, c)) {
        return
    } else {
        area++;
    }


    for(let i = 0; i < dirVec.length; i++) {
        let _dir = dirVec[i];
        dfs(plant, r+_dir[0], c+_dir[1]);
    }

}

for(var i = 0; i < width; i++) {
    for(var j = 0; j < height; j++) {
        let plant = input[i][j];
        dfs(plant, i, j)
        // Calculate the price for this plant region
        part1 += (perimeter*area);
        // Reset perimeter and area
        perimeter = 0;
        area = 0;
    }
}

// Answers
console.log(`Part 1 answer: ${part1}`);
console.log(`Part 2 answer: ${part2}`);