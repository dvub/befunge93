// user input is a little different with node so i wont do that yet...

// my simple befunge93 interpreter
// this is not meant to be a full-fledged interpreter - although i might make it so later...


// https://www.codewars.com/kata/526c7b931666d07889000a3c
// the source of this project is this kata on codewars - try it!

// https://replit.com/@nnari/befunge93?v=1
// credit to nari for giving me some hints along the way - thank you!

const code = '01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@';

console.log(code);
const arr = code.split('\n').map(line => line.split(''));

// some helpful functions
const isNumeric = (str) => /^\d+$/.test(str);

const popPair = () => [STACK.pop(), STACK.pop()]; // assign a and b usually to 2 popped values

const MOVE_PTR = (direction) => {
    CUR = [CUR[0] + direction[0], CUR[1] + direction[1]];
};
// direction tokens - these will change the direction of which the ptr moves
const DIRS = {
    '>': [0, 1],
    v: [1, 0],
    '<': [0, -1],
    '^': [-1, 0],
};
// operation tokens - these will perform math ops, change direction, or store data, etc.
const OPS = {
    '+': () => {
        const [a, b] = popPair();
        STACK.push(a + b); // addition, simple
    },
    '-': () => {
        const [a, b] = popPair();
        STACK.push(b - a); // subtraction
    },
    '*': () => {
        const [a, b] = popPair();
        STACK.push(a * b); // multiplication
    },
    '/': () => {
        const [a, b] = popPair();
        STACK.push((a !== 0) ? Math.floor(b / a) : 0); // division
        // we must also check if a is 0 (cannot divide by 0)
    },
    '%': () => {
        const [a, b] = popPair();
        STACK.push((a !== 0) ? b % a : 0); // mod
    },
    '!': () => {
        const x = STACK.pop();
        STACK.push(x === 0 ? 1 : 0); // binary NOT - if x = 0, return 1 (True)
    },
    '`': () => {
        const [a, b] = popPair();
        STACK.push((b > a) ? 1 : 0); // if b > a, true
    },
    '_': () => {
        const x = STACK.pop();
        DIR = (x === 0) ? DIRS['>'] : DIRS['<']; // if x =0, left, else right
    },
    '?': () => {
        const keys = Object.keys(DIRS); // random direction operation
        const direction = keys[Math.floor(Math.random() * 4)];
        DIR = DIRS[direction.toString()];
    },
    '|': () => {
        const x = STACK.pop();
        DIR = (x === 0) ? DIRS['v'] : DIRS['^']; // if x = 0, down, else go up
    },
    ':': () => {
        const x = STACK[STACK.length - 1];
        STACK.push(x ?? 0); // duplicate the top of the stack
    },
    '\\': () => {
        const [a, b] = popPair();
        STACK.push(a); // simply reorder a and b
        STACK.push(b);
    },
    '$': () => {
        STACK.pop(); // we don't need to do anything with the value
    },
    '.': () => {
        const x = STACK.pop();
        output += `${x}`;
    },
    ',': () => {
        const x = STACK.pop();
        output += String.fromCharCode(x);
    },
    ' ': () => { // no operation here!
        return;
    },
    '#': () => { // in order to "skip", we can just move the pointer once more in the direction
        MOVE_PTR(DIR);
    },
    'p': () => {
        const [y, x] = popPair();
        const v = STACK.pop();
        const char = String.fromCharCode(v);
        arr[y][x] = char; // TO DO: check if coord is valid
    },
    'g': () => {
        const [y, x] = popPair();
        STACK.push(arr[y][x].charCodeAt(0)); // initially this didnt work because i forgot charcodeat lmao
    },
    '&': () => {
        console.read
    }

};

// initialize main  variables
let output = '';
const STACK = [];
let CUR = [0, 0];
let DIR = DIRS['>'];
let char = '';
let STR_MODE = false;
// main loop here:
// keep in mind that the program could crash if @ is never reached
while (char !== '@') { // @ will end the program

    char = arr[CUR[0]][CUR[1]];
    console.log(STACK, char, output);
    const operation = OPS[char];


    if (char === '"') {
        STR_MODE = !STR_MODE;
    }
    else if (STR_MODE === true) {
        STACK.push(char.charCodeAt(0));
    }
    else if (operation) {
        operation();
    }
    else if (isNumeric(char)) {
        STACK.push(parseInt(char));
    }

    // change direction

    DIR = DIRS[char] ?? DIR;
    MOVE_PTR(DIR); // move
}

console.log(output);
// console.log(STACK.join('\n'));

