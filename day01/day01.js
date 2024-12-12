const InputParser = require('../src/InputParser');

parser = new InputParser();

let inputArr = parser.splitLines().parseNumArr().input;

// Let's create two list to push elements onto 
// Could create a min heap for better efficiency, but too lazy. we will just make
// 2 lists, sort them, then iterate
let leftList = [];
let rightList = [];


// Use a map to keep count for part 2
let rightMap = new Map();

// Push onto our lists and assign map, then sort.
inputArr.forEach( line => {
	rightMap.set(line[1],  (rightMap.get(line[1]) ?? 0) + 1);
	leftList.push(line[0]);
	rightList.push(line[1]);
})
leftList.sort();
rightList.sort();

// Calculate the total difference
let sum = 0;
let similarity = 0;
for(let i = 0; i < leftList.length; i++) {
	similarity += leftList[i]*(rightMap.get(leftList[i]) ?? 0);
	sum += Math.abs(leftList[i] - rightList[i]);
}

// Answers
console.log(`Part 1 answer: ${sum}`);
console.log(`Part 2 answer: ${similarity}`);
	
