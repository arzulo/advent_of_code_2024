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

let makeKey = function(r,c) {
    return `${r}_${c}`;

}
let addVisit = function(r,c) {
    let _key = makeKey(r,c);
    if(visited.has(_key)) {
        return false;
    } else {
        visited.add(_key);
        return true;
    }
}

// Directional vectors in order: up, right, down, left
let dirVec = [ [-1, 0], [0, 1], [1, 0], [0, -1]];
let dirSides = new Map();
let initDirSides = function() {
    // Clear the sides out of the map
    dirSides.clear();
    // Initialize 4 new map entries, indicating each horizontal or vertical sides
    dirSides.set(0, new Set()); // Even is for horizontal 
    dirSides.set(1, new Set()); // Odd is for vertical 
    dirSides.set(2, new Set()); // Even is for horizontal 
    dirSides.set(3, new Set()); // Odd is for vertical
}
let determineSide = function(r, c, dir) {
    let key = makeKey(r,c);
    let k1;
    let k2;
    switch(dir) {
        case 1:
        case 3:
            k1 = makeKey(r-1, c);
            k2 = makeKey(r+1, c);
            break;
        case 0:
        case 2:
            k1 = makeKey(r, c-1);
            k2 = makeKey(r, c+1);
            break;
    }

    // Check if this perimeter is a continuation of a side already here
    // --increment sides if so
    // --decrement if there is a side on both of us (it means we started a new side, but ran into an existing one)
    let _dirSet = dirSides.get(dir);
    if(_dirSet.has(k1) && _dirSet.has(k2)) {
        sides--;
    } else if(!_dirSet.has(k1) && !_dirSet.has(k2)) {
        sides++
    }
    // Add this new perimeter fence to the set
    _dirSet.add(key);

}
let perimeter = 0;
let area = 0;
let sides = 0;
let currSide = -1;

let dfs = function(plant, r, c, dir) { 
    // Check if the current plant is outside the perimeter or doesn't match the currnt plant scan
    if(r < 0 || r >= height || c < 0 || c >= width || plant !== input[r][c]) {
        perimeter++;
        // Added a wall, need to check if it's a new side or not...
        determineSide(r, c, dir)
        return;
    }
    if(!addVisit(r, c)) {
        return
    } else {
        area++;
    }

    for(let i = 0; i < dirVec.length; i++) {
        let _dir = dirVec[i];
        dfs(plant, r+_dir[0], c+_dir[1], i);
    }

}

for(var i = 0; i < width; i++) {
    for(var j = 0; j < height; j++) {
        let plant = input[i][j];
        initDirSides();
        if(visited.has(`${i}_${j}`)) {
            continue;
        }
        dfs(plant, i, j, currSide)
        // Calculate the price for this plant region
        part1 += (perimeter*area);
        part2 += (area*sides);
        // Reset perimeter, area and sides
        currSide = -1;
        sides = 0;
        perimeter = 0;
        area = 0;
    }
}

// Answers
console.log(`Part 1 answer: ${part1}`);
console.log(`Part 2 answer: ${part2}`);