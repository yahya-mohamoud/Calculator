const display = document.querySelector(".display")
const buttons = document.querySelectorAll("button")

let currentvalue = '0';
let currentNumber = null;
let isSecondOperand = false;
let currentOperator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        if (value === "clear") {
            resetCalculator();
            console.log(resetCalculator());
        }else if (value === "plus-minus"){
            display.textContent = String(-parseFloat(display.textContent));
        }else if (value === "%"){
            display.textContent = String(parseFloat(display.textContent) / 100)
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else if (value === "equal"){
            handleEqual()
            console.log(handleEqual);
        } else{
            handleNumber(value);
        }
    })
});

function updateDisplay (){
    display.textContent = currentvalue;
}

function handleNumber (number){
    if (isSecondOperand) {
        currentvalue = number;
        isSecondOperand = false;
    }else {
        if(currentvalue === '0' && number !== "."){
            currentvalue = number;
        }else {
            currentvalue += number;
        }
    }
    updateDisplay();
    limitDisplayNumber();
}

function handleOperator (nextOperator){
    const inputValue = parseFloat(display.textContent)
    if(currentNumber === null && !isNaN(inputValue)) {
        currentNumber = inputValue;
    } else if(currentOperator) {
        const result = operate(currentNumber, inputValue, currentOperator);
        display.textContent = String(result)
        currentNumber = result;
    }

    currentOperator = nextOperator;
    isSecondOperand = true;
} 

function handleEqual (){
    const inputValue = parseFloat(display.textContent);
    if (currentOperator && !isSecondOperand){
        const result = operate(currentNumber, inputValue, currentOperator);
        display.textContent = String(result);
        currentNumber= null;
        currentOperator = null;
        isSecondOperand = false;
    }
    limitDisplayNumber()
}

function operate(firstOperand, secondOperand, operator){
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function resetCalculator () {
    currentvalue = "0"
    currentNumber = null;
    isSecondOperand = false;
    currentOperator = null;

    updateDisplay();
}

function limitDisplayNumber (){
    if(display.textContent.length > 15){
        display.textContent = display.textContent.slice(0, 15)
    }
}