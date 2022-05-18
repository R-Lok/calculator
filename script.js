let display = document.querySelector('.display');
let prevNumberDisplay = document.querySelector('.prevNumberDisplay');
let clearBtn = document.querySelector('.clear');
let delBtn = document.querySelector('.delete');
let equalsBtn = document.querySelector('.equals');
let dotBtn = document.querySelector('.dot');
let addBtn = document.querySelector('.add');
let subtractBtn = document.querySelector('.subtract');
let multiplyBtn = document.querySelector('.multiply');
let divideBtn = document.querySelector('.divide');
let digitButtons = document.querySelectorAll('.num');
let operatorBtns = [subtractBtn, addBtn, multiplyBtn, divideBtn];
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
            return subtract(storedNumber, display.textContent);
            break;
        case "multiply":
            return multiply(storedNumber, display.textContent);
            break;
        case "divide":
            return divide(storedNumber, display.textContent);
            break;
    }
}

function getResult() {
    if (pressedEqual === true || operator === "") {
        return;
    };

    if (operator === "divide" && display.textContent == 0 || operator === "divide" 
        && display.textContent === "") {
        dividedByZero();
        return;
    }
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
    storedNumber = "";
    operator = "";
}

function checkDisplayForDecimal() {
    let decimal = ".";
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

function addNumber(number) {
        display.textContent += number;
};

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
            storedNumber = subtract(storedNumber, display.textContent);
            break;
        case "multiply":
            storedNumber = multiply(storedNumber, display.textContent);
            break;
        case "divide":
            storedNumber = divide(storedNumber, display.textContent);    
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

function pressOperator(e) {
    if (storedNumber === "" && display.textContent === "") {
        return;
    }
    if (storedNumber === "") {
        storedNumber = display.textContent;
    } else if (operator === "divide" && display.textContent == 0 || operator === "divide" 
        && display.textContent === "") {
        dividedByZero();
        return;
    } else {
        calculateStoredNumber();
    }
    prevNumberDisplay.textContent = storedNumber;
    display.textContent = "";
    operator = e.target.classList[0];
    displayPressedOperator();
    pressedEqual = false
}

function dividedByZero() {
    alert("Cannot divide by 0!");
        operator = ""
        prevNumberDisplay.textContent = prevNumberDisplay.textContent.slice(0,-1);
        display.textContent = "";
}

clearBtn.addEventListener('click', clearDisplay);
delBtn.addEventListener('click', delLastDigit);
digitButtons.forEach(button => button.addEventListener('click', (e) => addNumber(e.target.textContent)));
operatorBtns.forEach(button => button.addEventListener('click', pressOperator));
equalsBtn.addEventListener('click', getResult);
dotBtn.addEventListener('click', addDecimal);

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        addNumber(e.key);
    };
    if (e.key === 'Backspace') {
        delLastDigit();
    };
    if (e.key === "=") {
        equalsBtn.click();
    }
    if (e.key === "+") {
        addBtn.click();
    }
    if (e.key === "-") {
        subtractBtn.click();
    }
    if (e.key === "/") {
        divideBtn.click();
    }
    if (e.key === "*") {
        multiplyBtn.click();
    }
    if (e.key === ".") {
        dotBtn.click();
    }
    if (e.key === "Shift") {
        clearDisplay();
    }
})


