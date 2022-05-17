let display = document.querySelector('.display');
let prevNumberDisplay = document.querySelector('.prevNumberDisplay');
let clearBtn = document.querySelector('.clear');
let delBtn = document.querySelector('.delete');
let equalsBtn = document.querySelector('.equals');
let dotBtn = document.querySelector('.dot');
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
let operator = "";
let storedNumber = "";
let pressedEqual = false;

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
    switch (operator) {
        case "add":
            return add(Number(storedNumber), Number(display.textContent));
            break;
        case "subtract":
            return subtract(Number(storedNumber), Number(display.textContent));
            break;
        case "multiply":
            return multiply(Number(storedNumber), Number(display.textContent));
            break;
        case "divide":
            return divide(Number(storedNumber), Number(display.textContent));
            break;
    }
}

function getResult() {
    if (pressedEqual === true) {
        return;
    };
    let currentNumber = Number(display.textContent.trim());
    let unroundedResult = operate(storedNumber, currentNumber, operator);
    let result = Math.round(unroundedResult * 1000)/1000;
    prevNumberDisplay.textContent += " " + currentNumber + " =";
    display.textContent = result;
    storedNumber = ""
    pressedEqual = true;
}

function clearDisplay() {
    display.textContent = "";
    prevNumberDisplay.textContent = "";
    storedNumber = ""
    operator = ""
    
}

function checkDisplayForDecimal() {
    let decimal = "."
    return display.textContent.includes(decimal);
}

function addDecimal() {
    let decimalPresent = checkDisplayForDecimal();
    if (decimalPresent === false && display.textContent === "") {
        display.textContent += "0.";   
    } else if (decimalPresent === false) {
        display.textContent += ".";
    } else {
        return;
    }
}

//add pressed number into display || need to work on this as needs to be able to divide by num > 0 < 1
function addNumber(e) {
    if (e.target.textContent.trim() == 0 && operator === "divide" && display.textContent === "") {
        alert("Cannot divide by 0!");
    } else {
        display.textContent += e.target.textContent.trim();
    } 
}

//remove last digit in number
function delLastDigit () {
    display.textContent = display.textContent.slice(0, -1);
}

//calculate new stored number using number in display, stored number, and previously pressed operator
function calculateStoredNumber() {
    switch (operator) {
        case "add":
            storedNumber = add(Number(storedNumber), Number(display.textContent));
            break;
        case "subtract":
            storedNumber = subtract(Number(storedNumber), Number(display.textContent));
            break;
        case "multiply":
            storedNumber = multiply(Number(storedNumber), Number(display.textContent));
            break;
        case "divide":
            storedNumber = divide(Number(storedNumber), Number(display.textContent));
            break;
    }
    storedNumber = Math.round(storedNumber * 1000)/1000;
}

function displayPressedOperator() {
    switch(operator) {
        case "add":
            prevNumberDisplay.textContent += " +";
            break;
        case "subtract":
            prevNumberDisplay.textContent += " -";
            break;
        case "multiply":
            prevNumberDisplay.textContent += " ×";
            break;
        case "divide":
            prevNumberDisplay.textContent += " ÷";
            break;
    }
}

//working on function for operators being pressed
function pressOperator(e) {
    if (storedNumber === "") {
        storedNumber = Number(display.textContent);
    } else {
        calculateStoredNumber();
    }
    prevNumberDisplay.textContent = storedNumber;
    display.textContent = "";
    operator = e.target.classList[0];
    displayPressedOperator();
    pressedEqual = false;

}

clearBtn.addEventListener('click', clearDisplay);
delBtn.addEventListener('click', delLastDigit);
digitButtons.forEach(button => button.addEventListener('click', addNumber));
addBtn.addEventListener('click', pressOperator);
subtractBtn.addEventListener('click', pressOperator);
multiplyBtn.addEventListener('click', pressOperator);
divideBtn.addEventListener('click', pressOperator);
equalsBtn.addEventListener('click', getResult);
dotBtn.addEventListener('click', addDecimal);