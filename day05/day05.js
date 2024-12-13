const InputParser = require('../src/InputParser');

let parser = new InputParser();

let parts = parser.splitLines().findRowSeperation();

let orderRulesInput = new InputParser(parts[0]).parseNumArr('|').input;
let manualsInput = new InputParser(parts[1]).parseNumArr(',').input;

// Goal: Make a map for every page, each map contains 2 sets
// -- before: set of pages that come BEFORE map key
// -- after: set of pages taht come AFTEr map key
// Loop through each manual set and check at current index if the pages before
// are contained in before set, and indexes after contained in after set

function ruleSets() {
    return {
        before: new Set(),
        after: new Set()
    }
}
let orderRules = new Map();

// Build out the map we'll use for validation
for (let i = 0; i < orderRulesInput.length; i++) {
    let _i1 = orderRulesInput[i][0];
    let _i2 = orderRulesInput[i][1];

    // Add "after" rule set
    if (!orderRules.has(_i1)) {
        orderRules.set(_i1, ruleSets());
    }
    orderRules.get(_i1).after.add(_i2);

    // Add "before" rule set
    if (!orderRules.has(_i2)) {
        orderRules.set(_i2, ruleSets());
    }
    orderRules.get(_i2).before.add(_i1);
}

// Loop through the manual sets now and check for valid page ordering rules
let resP1 = 0;
let resP2 = 0;
for (let i = 0; i < manualsInput.length; i++) {
    let manualPages = manualsInput[i];

    // Loop twice through to check before/after pages
    let validManualP1 = true;
    var validManualP2 = false;

    // We did a swap, retry until it is valid
    while(!validManualP2) {
        validManualP2 = true;
        for (var j = 0; j < manualPages.length; j++) {
            let check = orderRules.get(manualPages[j]);
            for (var k = 0; k < manualPages.length; k++) {
                // skip checking over self
                if (k === j) {
                    continue;
                }
                // Check before rules
                if (k < j) {
                    if (!check.before.has(manualPages[k])) {
                        // INVALID - set flag
                        validManualP1 = false;
                        validManualP2 = false;
                        break;
                    }
                }
                if (k > j) {
                    if (!check.after.has(manualPages[k])) {
                        // INVALID - set flag
                        validManualP1 = false;
                        validManualP2 = false;
                        break;
                    }
                }
            }
            if (!validManualP2) {
                break;
            }
        }
        // Swap the pages that failed
        if(!validManualP2) {
            let temp = manualPages[k];
            manualPages[k] = manualPages[j];
            manualPages[j] = temp;
        }
    }
    // Manual is valid, grab the number in the middle...
    let midInd = Math.floor(manualPages.length / 2);
    if (validManualP1) {
        // let midInd = Math.floor(manualPages.length / 2);
        resP1 += manualPages[midInd];
    } else {
        resP2 += manualPages[midInd];
    }
}

// Answers
console.log(`Part 1 answer: ${resP1}`);
console.log(`Part 2 answer: ${resP2}`);