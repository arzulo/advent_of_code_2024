const InputParser = require('../src/InputParser');

let input = new InputParser().input;
input = input.split('').map(e => {
    return Number(e);
})
// Vars to hold part1/2 answers
let part1 = 0;
let part2 = 0;


let id = 0;
let blockArr = [];


let nullQueue = [];

// Loop through the block info
for(var i = 0; i < input.length; i++) {

    if(i % 2 === 0) { // Even index, adding ID of block file on
        blockArr = blockArr.concat(Array(input[i]).fill(id));
        id++; // increment
    } else { // adding free space
        let startInd = blockArr.length;
        for(var j = 0; j < input[i]; j++) {
            nullQueue.push(startInd+j);
            blockArr.push(null);
        }
    }
}

// Let's now move blocks towards the front utnil there is no more space
let nullQueueInd = 0;
for(var i = blockArr.length-1; i >= 0; i--) {

    if(nullQueue[nullQueueInd] >= i) {
        break;
    }
    if(blockArr[i] !== null) {
        // Move the block into the null available spot
        blockArr[nullQueue[nullQueueInd]] = blockArr[i];
        blockArr[i] = null;
        nullQueueInd++;
    }
}

// Now compute the check sum up until we hit our first null position...
for(var i = 0; i < blockArr.length; i++) {
    if(blockArr[i] === null) {
        break;
    }
    part1 += i*blockArr[i];
}

// Answers
console.log(`Part 1 answer: ${part1}`);
console.log(`Part 2 answer: ${part2}`);