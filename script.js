const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    })
})

const process = document.querySelector(".process");

const calculatorScreen = document.querySelector(".calculator-screen");

const updateScreen = (number) => {
    calculatorScreen.value = number;
}

let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';
let output = '0';
// let minPlus = [];

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
        // minPlus.push(number);
    } else if(currentNumber === output) {
        currentNumber = number;
        process.value = "";
    } else  {
        currentNumber += number;
        // minPlus.push(currentNumber);
    }
}

// const addMinPlus = document.querySelector(".min-plus");

// addMinPlus.addEventListener("click", (event) => {
//     if (minPlus[0] !== "-" ) {
//         minPlus.splice(0,1);
//     } else {
//         minPlus.unshift("-");
//     }
//     currentNumber = minPlus;
// })

const operators = document.querySelectorAll(".operator");

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
    })
})

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber;  
    } 
    calculationOperator = operator;
    currentNumber = '0';
    if (calculationOperator === "*") {
        process.value = prevNumber + " \u00d7 ";
    } else if (calculationOperator === "/") {
        process.value = prevNumber + " \u00f7 ";
    } else {
        process.value = prevNumber +" "+ operator;   
    }
}

const equalSign = document.querySelector(".equal-sign");

equalSign.addEventListener("click", () => {
    calculate();
    updateScreen(currentNumber);
})

const calculate = () => {
    process.value += currentNumber + " =";
    let result = '';
    switch (calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            break;
        case "*":
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            break;
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            break;
        default:
            break;
    }
    currentNumber = result;
    output = result;
    // processOutput = process.value;
    calculationOperator = '';
}

const clearBtn = document.querySelector(".all-clear");

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';
    process.value = "";
}

clearBtn.addEventListener("click", () => {
    clearAll();
    updateScreen(currentNumber);
})

const decimal = document.querySelector(".decimal");

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
})

inputDecimal = (dot) => {
    if(currentNumber.includes('.')) {
        return;
    }
    currentNumber += dot;
}

const percentage = document.querySelector(".percentage");

percentage.addEventListener("click", () => {
    process.value = currentNumber + "%";
    percent();
    updateScreen(currentNumber);
})

const percent = () => {
    currentNumber = parseFloat(currentNumber) / 100;
}