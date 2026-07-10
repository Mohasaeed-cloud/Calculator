let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultDisplayed = false;
function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operator, number1, number2) {
    if (operator === "/" && number2 === 0) {
        return alert("Nice try 😏 You can't divide by 0!");
    }
    if (operator === "+") {
        return add(number1, number2);
    } else if (operator === "-") {
        return subtract(number1, number2);
    } else if (operator === "*") {
        return multiply(number1, number2);
    } else if (operator === "/") {
        return divide(number1, number2);
    }
}

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
// Digit buttons
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (resultDisplayed) {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            display.textContent = "";
            resultDisplayed = false;
        }
        if (operator === "") {
            firstNumber += button.textContent;
        } else {
            secondNumber += button.textContent;
        }

        display.textContent = firstNumber + operator + secondNumber;
    });
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        // If we already have a complete operation, calculate it first
        if (firstNumber !== "" && secondNumber !== "") {

            const result = operate(
                operator,
                Number(firstNumber),
                Number(secondNumber)
            );

            display.textContent = result;

            firstNumber = result.toString();
            secondNumber = "";
        }

        // Store the newly selected operator
        operator = button.textContent;

        // Show the result followed by the new operator
        display.textContent = firstNumber + operator;
    });
});

// Equal button
equalButton.addEventListener("click", () => {

    const result = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber)
    );

    display.textContent = result.toFixed(2);

    // Prepare for the next calculation
    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
    resultDisplayed = true;
});
 
//clear button
clearButton.addEventListener("click",() => {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    display.textContent = "";
})
//decimal button
const decimalButton = document.querySelector(".decimal");

decimalButton.addEventListener("click", () => {

    if (operator === "") {
        if (!firstNumber.includes(".")) {
            firstNumber += ".";
        }
    } else {
        if (!secondNumber.includes(".")) {
            secondNumber += ".";
        }
    }

    display.textContent = firstNumber + operator + secondNumber;
});
//Backspace
const backspace = document.querySelector(".backspace");

backspace.addEventListener("click", () => {

    if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
    } else if (secondNumber === "") {
        operator = "";
    } else {
        secondNumber = secondNumber.slice(0, -1);
    }

    display.textContent = firstNumber + operator + secondNumber;
});
// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Digits
    if ("0123456789".includes(key)) {

        if (resultDisplayed) {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            display.textContent = "";
            resultDisplayed = false;
        }

        if (operator === "") {
            firstNumber += key;
        } else {
            secondNumber += key;
        }

        display.textContent = firstNumber + operator + secondNumber;
    }

    // Operators
    else if ("+-*/".includes(key)) {

        if (firstNumber !== "" && secondNumber !== "") {

            const result = operate(
                operator,
                Number(firstNumber),
                Number(secondNumber)
            );

            display.textContent = result;

            firstNumber = result.toString();
            secondNumber = "";
        }

        operator = key;
        display.textContent = firstNumber + operator;
    }

    // Equals
    else if (key === "Enter" || key === "=") {

        if (firstNumber === "" || secondNumber === "") return;

        const result = operate(
            operator,
            Number(firstNumber),
            Number(secondNumber)
        );

        display.textContent = result.toFixed(2);

        firstNumber = result.toString();
        secondNumber = "";
        operator = "";
        resultDisplayed = true;
    }

    // Decimal
    else if (key === ".") {

        if (operator === "") {
            if (!firstNumber.includes(".")) {
                firstNumber += ".";
            }
        } else {
            if (!secondNumber.includes(".")) {
                secondNumber += ".";
            }
        }

        display.textContent = firstNumber + operator + secondNumber;
    }

    // Backspace
    else if (key === "Backspace") {

        if (operator === "") {
            firstNumber = firstNumber.slice(0, -1);
        } else if (secondNumber === "") {
            operator = "";
        } else {
            secondNumber = secondNumber.slice(0, -1);
        }

        display.textContent = firstNumber + operator + secondNumber;
    }

    // Clear
    else if (key === "Escape") {

        firstNumber = "";
        operator = "";
        secondNumber = "";
        display.textContent = "";
        resultDisplayed = false;
    }
});