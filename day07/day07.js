const InputParser = require('../src/InputParser');

let parser = new InputParser();

// Work on getting the input into a usable format... 2 arrays holding left/right side
let input = parser.splitLines().splitColumns(': ').input;

let testValue = [];
let numbers = [];
input.forEach(e => {
    testValue.push(e[0])
    numbers.push(e[1])
});
testValue = testValue.map(e => Number(e));
numbers = new InputParser(numbers).parseNumArr().input;

// Vars to hold part1/2 answers
let part1 = 0;
let part2 = 0;

// DFS search applying each operation to the array, hold onto the index
let dfs = function (testVal, currVal, nums, ind, part2 = false) {
    // Went over the test value target
    if (currVal > testVal) {
        return false;
    }
    // At the end
    if (ind === nums.length) {
        // Found the solution
        if (testVal === currVal) {
            return true;
        } else {  // Went past the end with no solution
            return false;
        }
    }
    // add 
    if (dfs(testVal, currVal + nums[ind], nums, ind + 1, part2)) {
        return true;
    }
    // multiply
    if (dfs(testVal, currVal * nums[ind], nums, ind + 1, part2)) {
        return true;
    }
    // Concatenation (part2)
    if(part2) {
        if(dfs(testVal, Number(String(currVal) + String(nums[ind])), nums, ind + 1, part2)) {
            return true;
        }
    }

    return false;

}

for (let i = 0; i < testValue.length; i++) {
    // If true, add up the numbers
    if (dfs(testValue[i], numbers[i][0], numbers[i], 1)) {
        part1 += testValue[i];
    }
    if (dfs(testValue[i], numbers[i][0], numbers[i], 1, true)) {
        part2 += testValue[i];
    }
}



// Answers
console.log(`Part 1 answer: ${part1}`);
console.log(`Part 2 answer: ${part2}`);