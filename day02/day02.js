const InputParser = require('../src/InputParser');

parser = new InputParser();

let inputArr = parser.splitLines().parseNumArr().input;

let safeCountP1 = 0;
let safeCountP2 = 0;

validate = function(row) {
    let _diff;
    let _prevSign;
    let _safe = {safe: true, index: 0};
    for (var i = 1; i < row.length; i++) {
        _diff = row[i] - row[i - 1];
        if (Math.abs(_diff) > 3 || Math.abs(_diff) < 1) {
            _safe.safe = false;
            _safe.index = i;
            break;
        }
        let _dir = Math.sign(_diff);
        // Not descending / ascending consistently 
        if ((i !== 1) && (_dir != _prevSign)) {
            _safe.safe = false;
            _safe.index = i;
            break;
        }
        _prevSign =  _dir;
    }
    // Check if the safe flag ever got triggered
    return _safe;
}

inputArr.forEach(report => {
    let _validation = validate(report);
    if(_validation.safe) {
        safeCountP1++;
        safeCountP2++;
    } else {
        // Brute force.. yuck
        // Can solve this likely with dynamic programming and computing the the base condition
        // of n[0] - n[1] first, and checking both n[i] - n[i+1] or n[i] - n[i+2] conditions.  
        // Keep track of how many dampenings have been used... too lazy to implement.
        let s = true;
        for(var i = 0; i < report.length; i++) {
            let _copy = [...report];
            _copy.splice(i, 1);
            let _ans = validate(_copy);
            if(_ans.safe) {
                safeCountP2++;
                s = false;
                break;
            }
        } 
    }
});

console.log(`Part 1 answer: ${safeCountP1}`);
console.log(`Part 2 answer: ${safeCountP2}`);