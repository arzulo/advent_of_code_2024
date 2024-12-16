const InputParser = require('../src/InputParser');

// let parser = new InputParser('./input2.txt');
let parser = new InputParser();

let input = parser.splitLines().splitColumns().input;

// Vars to hold part1/2 answers
let part1 = 0;
let part2 = 0;

let freqMap = new Map();
let antiSet = new Set();
let antiSetP2 = new Set();

// Position of [r, c]
let width = input.length;
let height = input[0].length;

let antiKeyAdd = function (pos) {
    if (pos[0] < 0 || pos[0] >= width || pos[1] < 0 || pos[1] >= height) {
        return;
    }
    let key = `${pos[0]}_${pos[1]}`
    antiSet.add(key);
}

let antiKeyAddP2 = function (pos, dx) {
    var int = 0;
    let anti;
    while (true) {
        anti = [pos[0] + dx[0] * int, pos[1] + dx[1] * int];
        if (anti[0] < 0 || anti[0] >= width || anti[1] < 0 || anti[1] >= height) {
            return;
        }
        let key = `${anti[0]}_${anti[1]}`
        antiSetP2.add(key);
        int++;
    }
}

for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {

        // Contains an antenna
        if (input[i][j] !== '.') {
            let freq = input[i][j];
            let coord = [i, j]

            // Check if the map has it already
            if (freqMap.has(freq)) {
                freqMap.get(freq).push(coord);
            } else { // assign new array with coord
                freqMap.set(freq, [coord]);
            }
        }
    }
}

// Loop through the frequency map 
for (let [freq, coords] of freqMap) {

    for (var i = 0; i < coords.length - 1; i++) {
        for (var j = i + 1; j < coords.length; j++) {
            let pos1 = coords[i];
            let pos2 = coords[j];
            // Compute the 2 anti-node positions
            let dx1 = [pos1[0] - pos2[0], pos1[1] - pos2[1]];
            let dx2 = [pos2[0] - pos1[0], pos2[1] - pos1[1]];
            let anti1 = [pos1[0] + dx1[0], pos1[1] + dx1[1]];
            let anti2 = [pos2[0] + dx2[0], pos2[1] + dx2[1]];
            antiKeyAdd(anti1);
            antiKeyAdd(anti2);

            antiKeyAddP2(pos1, dx1);
            antiKeyAddP2(pos2, dx2);

        }
    }

}

part1 = antiSet.size;
part2 = antiSetP2.size;

// Answers
console.log(`Part 1 answer: ${part1}`);
console.log(`Part 2 answer: ${part2}`);