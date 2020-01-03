function getStrongRandom() {
    let arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    let n = arr[0];
    let max = Math.pow(2,32)-1;
    return n/max
};

function getStrongRandomArbitrary(min, max) {
    return getStrongRandom() * (max - min) + min;
};

function getStrongRandomInteger(min, max) {
  const range = max - min;
  const maxGeneratedValue = Math.pow(2,32)-1;
  const possibleResultValues = range + 1;
  const possibleGeneratedValues = maxGeneratedValue + 1;
  const remainder = possibleGeneratedValues % possibleResultValues;
  const maxUnbiased = maxGeneratedValue - remainder;

  if (!Number.isInteger(min) || !Number.isInteger(max) ||
       max > Number.MAX_SAFE_INTEGER || min < Number.MIN_SAFE_INTEGER) {
    throw new Error('Arguments must be safe integers.');
  } else if (range > maxGeneratedValue) {
    throw new Error(`Range of ${range} (from ${min} to ${max}) > ${maxGeneratedValue}.`);
  } else if (max < min) {
    throw new Error(`max (${max}) must be >= min (${min}).`);
  } else if (min === max) {
    return min;
  } 

  let generated;
  do {
    generated = getStrongRandom()*maxGeneratedValue;
  } while (generated > maxUnbiased);

  return min + (generated % possibleResultValues);
};

function getNewSequence(len) {
    let sequence = [];
    let number;
    while (sequence.length < len) {
        number = Math.floor(getStrongRandomInteger(1, 60));
        if (!sequence.includes(number)) {
            sequence.push(number)
        }
    }
    return sequence;
};
