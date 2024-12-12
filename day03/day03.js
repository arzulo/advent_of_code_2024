const InputParser = require('../src/InputParser');

parser = new InputParser();

let input = parser.input;

let regex = /mul\((\d+),(\d+)\)/g;
let multiplies = [...input.matchAll(regex)];


let res = 0;
multiplies.forEach( e => {
    res += Number(e[1]) * Number(e[2]);
})

console.log(`Part 1 answer: ${res}`);
