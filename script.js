let display = document.querySelector('.display');
let clearBtn = document.querySelector('.clear');

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

clearBtn.addEventListener('click', clearDisplay);

function insertOne() {

}