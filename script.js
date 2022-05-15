let display = document.querySelector('.display');
let clearBtn = document.querySelector('.clear');
let oneBtn = document.querySelector('.one');
let twoBtn = document.querySelector('.two');
let threeBtn = document.querySelector('.three');
let fourBtn = document.querySelector('.four');
let fiveBtn = document.querySelector('.five');
let sixBtn = document.querySelector('.six');
let sevenBtn = document.querySelector('.seven');
let eightBtn = document.querySelector('.eight');
let nineBtn = document.querySelector('.nine');
let zeroBtn = document.querySelector('.zero');
let addBtn = document.querySelector('.add');
let subtractBtn = document.querySelector('.subtract');
let multiplyBtn = document.querySelector('.multiply');
let divideBtn = document.querySelector('.divide');
let digitButtons = [oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, sevenBtn, eightBtn, nineBtn, zeroBtn];

function add(numOne, numTwo) {
    return numOne + numTwo;
};

function subtract(numOne, numTwo) {
    return numOne - numTwo;
};

function multiply(numOne, numTwo) {
    return numOne * numTwo;
};

function divide(numOne, numTwo) {
    return numOne / numTwo;
};

function operate(numOne, numTwo, operator) {
    return operator(numOne,numTwo);
}

function clearDisplay() {
    display.textContent = "";
}

function addNumber(e) {
    display.textContent += e.target.textContent.trim();
}


clearBtn.addEventListener('click', clearDisplay);
digitButtons.forEach(button => button.addEventListener('click', addNumber));