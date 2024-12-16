const InputParser = require('../src/InputParser');

let parser = new InputParser();
let stones = parser.splitLines().parseNumArr().input[0];

// Vars to hold part1/2 answers
let part1 = 0;
let part2 = 0;

const BLINKSP1 = 25 ;
const BLINKSP2 = 75;


let blink = function(_stones) {

    let newStones = [];
    for(let i = 0; i < _stones.length; i++) {
        let stone = _stones[i];
        if(stone === 0) {
            newStones.push(1);
        } else if( !(String(stone).length % 2)) { // even length
            let _strStone = String(stone);
            let _len = _strStone.length;
            let _newHalf1 = _strStone.slice(0, _len/2);
            let _newHalf2 = _strStone.slice(_len/2,_len);
            newStones.push(Number(_newHalf1), Number(_newHalf2));
        } else {
            newStones.push(stone*2024);
        }
    }
    return newStones;

}

let printStones = function() {
    // console.log(`Current stones: ${stones}`);
}

// Gonna have to offload to disk and filestream, or chunk... too big of an array :'(
printStones();
for(var i = 0; i < BLINKSP2; i++) {
    if(i === BLINKSP1) {
        part1 = stones.length;
    }
    stones = blink(stones);
    printStones();
}
part2 = stones.length;


// Answers
console.log(`Part 1 answer: ${part1}`);
console.log(`Part 2 answer: ${part2}`);