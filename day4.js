// 2 adjacent digits the same
// 6 digits
// numbers never decrease

// 245318-765747

//Bit messy logic but fairly sound

const validateAscending = digits => {
    for(i=0; i<digits.length -1; i++) {
        if (digits[i+1] < digits[i]) {
            return false;
        }
    }
    return true;
}

const validateAdjacent = digits => {
    for(i=0; i<digits.length -1; i++) {
        if (digits[i] === digits[i+1]) {
            return true;
        }
    }
    return false;
}

const nextEqual = (digs, num, curIndex) => {
    for(j=curIndex; j<digs.length; j++) {
        if (digs[j] !== num) {
            return j;
        }
    }
    return digs.length;
}

const validateAdjacentOnlyTwo = digits => {
    let flag = false;
    for(i=0; i<digits.length -1; i++) {
        if(i < digits.length - 2) {
            if (digits[i] === digits[i+1]) {
                if (digits[i] !== digits[i+2]) {
                    flag=true;
                } else {
                    i = nextEqual(digits, digits[i], i) - 1
                }
        } 
        } else {
            if (digits[i] === digits[i+1]) {
                flag=true;
            }
        }
    }
    return flag;
}

const ruleCheck = num => {
    const digits = num.toString().split('');
    const realDigits = digits.map(Number)
    return validateAdjacent(realDigits) && validateAscending(realDigits)
}

const ruleCheckPartTwo = num => {
    const digitsPartTwo = num.toString().split('');
    const realDigitsPartTwo = digitsPartTwo.map(Number)
    return validateAdjacentOnlyTwo(realDigitsPartTwo) && validateAscending(realDigitsPartTwo)
}

const startNumber = 245318;
const endNumber = 765747;

let inputArray = [];

for (i=startNumber; i<=endNumber; i++) {
    inputArray.push(i);
}

let satisfied = 0;

let satisfiedPartTwo = 0;

inputArray.forEach(input => {
    ruleCheck(input) ? satisfied++ : satisfied;
})

inputArray.forEach(input => {
    ruleCheckPartTwo(input) ? satisfiedPartTwo++ : satisfiedPartTwo;
})

console.log('part one', satisfied);
console.log('part two', satisfiedPartTwo);

