const arrNotLong = (array, val) => {
    return array.length >= val;
}

const opCodeComputer = (input, opCodePos, valueSet) => {
    const newValueSet = valueSet;
    const fullOpCode = valueSet[opCodePos];
    const digits = fullOpCode.toString().split('');
    const realDigits = digits.map(Number)
    let opCode = realDigits[realDigits.length-1];
    if(opCode === 9) {
        opCode = 99;
    }
    let firstValOpMode = arrNotLong(realDigits, 3) ? realDigits[realDigits.length-3] : 0
    let secondValOpMode = arrNotLong(realDigits, 4) ? realDigits[realDigits.length-4] : 0
    let newOpCodePos;
    let firstValPos;
    let secondValPos;
    let firstVar, secondVar, outputVar
      switch(opCode) {
        case 1:
          firstValPos = newValueSet[opCodePos + 1];
          secondValPos = newValueSet[opCodePos + 2];
          outputPos = newValueSet[opCodePos + 3];
          firstVar = firstValOpMode === 0 ? newValueSet[firstValPos] : firstValPos;
          secondVar = secondValOpMode === 0 ? newValueSet[secondValPos] : secondValPos;
          const addRes = firstVar + secondVar;
          newValueSet[outputPos] = addRes;
          newOpCodePos = opCodePos + 4;
          return { set: newValueSet, newPos: newOpCodePos } 
        case 2: 
          firstValPos = newValueSet[opCodePos + 1];
          secondValPos = newValueSet[opCodePos + 2];
          outputPos = newValueSet[opCodePos + 3];
          firstVar = firstValOpMode === 0 ? newValueSet[firstValPos] : firstValPos;
          secondVar = secondValOpMode === 0 ? newValueSet[secondValPos] : secondValPos;
          const mulRes = firstVar * secondVar;
          newValueSet[outputPos] = mulRes;
          newOpCodePos = opCodePos + 4;
          return { set: newValueSet, newPos: newOpCodePos } 
        case 3: 
          const positionToWrite = newValueSet[opCodePos + 1];
          newValueSet[positionToWrite] = input;
          newOpCodePos = opCodePos + 2;
          return { set: newValueSet, newPos: newOpCodePos } 
        case 4: 
          let toOutput = opCodePos + 1
          const positionToOutput = firstValOpMode === 0 ? newValueSet[toOutput] :  toOutput
          const output = newValueSet[positionToOutput];
          console.log('output', output);
          newOpCodePos = opCodePos + 2;
          return { set: newValueSet, newPos: newOpCodePos } 
        case 5:
            firstValPos = newValueSet[opCodePos + 1];
            secondValPos = newValueSet[opCodePos + 2];
            firstVar = firstValOpMode === 0 ? newValueSet[firstValPos] : firstValPos;
            secondVar = secondValOpMode === 0 ? newValueSet[secondValPos] : secondValPos;
            if (firstVar !== 0) {
                newOpCodePos = secondVar;
                return { set: newValueSet, newPos: newOpCodePos }
            }
            newOpCodePos = opCodePos + 3;
            return { set: newValueSet, newPos: newOpCodePos } 
        case 6:
                firstValPos = newValueSet[opCodePos + 1];
                secondValPos = newValueSet[opCodePos + 2];
                firstVar = firstValOpMode === 0 ? newValueSet[firstValPos] : firstValPos;
                secondVar = secondValOpMode === 0 ? newValueSet[secondValPos] : secondValPos;
                if (firstVar === 0) {
                    newOpCodePos = secondVar;
                    return { set: newValueSet, newPos: newOpCodePos }
                }
                newOpCodePos = opCodePos + 3;
                return { set: newValueSet, newPos: newOpCodePos } 
        case 7:
                firstValPos = newValueSet[opCodePos + 1];
                secondValPos = newValueSet[opCodePos + 2];
                outputPos = newValueSet[opCodePos + 3];
                firstVar = firstValOpMode === 0 ? newValueSet[firstValPos] : firstValPos;
                secondVar = secondValOpMode === 0 ? newValueSet[secondValPos] : secondValPos;
                if (firstVar < secondVar) {
                    newValueSet[outputPos] = 1;
                    newOpCodePos = opCodePos + 4;
                    return { set: newValueSet, newPos: newOpCodePos }
                } else {
                    newValueSet[outputPos] = 0;
                    newOpCodePos = opCodePos + 4;
                    return { set: newValueSet, newPos: newOpCodePos }
                }
        case 8:
                firstValPos = newValueSet[opCodePos + 1];
                secondValPos = newValueSet[opCodePos + 2];
                outputPos = newValueSet[opCodePos + 3];
                firstVar = firstValOpMode === 0 ? newValueSet[firstValPos] : firstValPos;
                secondVar = secondValOpMode === 0 ? newValueSet[secondValPos] : secondValPos;
                if (firstVar === secondVar) {
                    newValueSet[outputPos] = 1;
                    newOpCodePos = opCodePos + 4;
                    return { set: newValueSet, newPos: newOpCodePos }
                } else {
                    newValueSet[outputPos] = 0;
                    newOpCodePos = opCodePos + 4;
                    return { set: newValueSet, newPos: newOpCodePos }
                }
        case 99:
          break;
      };
  }

const computer = (input, valueSet) => {
  const newValueSet = valueSet;
  
  let opCodePos = 0;
  let opCode = newValueSet[0];
  
  while(opCodePos < valueSet.length - 1) {
    const { set, newPos } = opCodeComputer(input, opCodePos, valueSet)
    opCodePos = newPos;
    valueSet = set;
    if (valueSet[newPos] === 99) {
        return valueSet
    }
  }
  return valueSet;
}

const testOutput = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,11,91,225,1002,121,77,224,101,-6314,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,74,62,225,1102,82,7,224,1001,224,-574,224,4,224,102,8,223,223,1001,224,3,224,1,224,223,223,1101,28,67,225,1102,42,15,225,2,196,96,224,101,-4446,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1101,86,57,225,1,148,69,224,1001,224,-77,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1101,82,83,225,101,87,14,224,1001,224,-178,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1101,38,35,225,102,31,65,224,1001,224,-868,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1101,57,27,224,1001,224,-84,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1101,61,78,225,1001,40,27,224,101,-89,224,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,226,224,1002,223,2,223,1006,224,329,101,1,223,223,8,226,677,224,102,2,223,223,1005,224,344,101,1,223,223,1107,226,677,224,102,2,223,223,1006,224,359,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,374,101,1,223,223,7,677,677,224,102,2,223,223,1005,224,389,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,404,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,419,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,434,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,464,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,479,101,1,223,223,1007,226,677,224,1002,223,2,223,1006,224,494,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,509,101,1,223,223,1007,677,677,224,1002,223,2,223,1006,224,524,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,539,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,554,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,584,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,599,101,1,223,223,1108,226,677,224,102,2,223,223,1006,224,614,101,1,223,223,8,226,226,224,102,2,223,223,1006,224,629,101,1,223,223,108,226,677,224,102,2,223,223,1005,224,644,1001,223,1,223,108,226,226,224,102,2,223,223,1005,224,659,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226];

const compTest = computer(5, testOutput);