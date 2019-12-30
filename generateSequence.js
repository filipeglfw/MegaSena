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

function megaSena() {
    let sequence = [];
    let number;
    while (sequence.length < 6) {
        number = Math.floor(getStrongRandomArbitrary(1, 60));
        if (!sequence.includes(number)) {
            sequence.push(number)
        }
    }
    return sequence;
};
