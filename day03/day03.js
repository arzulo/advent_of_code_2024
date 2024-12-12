const InputParser = require('../src/InputParser');

parser = new InputParser();

let input = parser.input;

// regexp to capture all do's, dont's and mult actions
let regex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
let multiplies = [...input.matchAll(regex)];

let resp1 = 0;
let resp2 = 0;
let state = true; // Start the multiplier state on 

// Loop through each capture and change the state as we get new state changes
multiplies.forEach(e => {
    if (e[0] === "do()") {
        state = true;
    } else if (e[0] === "don't()") {
        state = false;
    } else {
        let _val = Number(e[1]) * Number(e[2]);
        resp1 += _val;
        if (state) {
            resp2 += _val;
        }
    }
})

console.log(`Part 1 answer: ${resp1}`);
console.log(`Part 2 answer: ${resp2}`);
