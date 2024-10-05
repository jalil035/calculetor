

let resultElement = document.getElementById("result");
let clear = document.getElementById("clear");
let delate = document.getElementById("delate");
let divide = document.getElementById("divide");
let multiply = document.getElementById("multiply");
let minus = document.getElementById("minus");
let sum = document.getElementById("sum");
let decimal = document.getElementById("decimal");
let equal = document.getElementById("equal");
let numberBtn = document.querySelectorAll(".number");

let result = '';
let operator = '';
let previousOperant = 0;

//Function to Select Operator
function selectOperator(operatorValue){
    if(result === '0')  return;

    if(operator !== '0' && previousOperant !== '0'){
        calculateResult();
    }

    operator = operatorValue;
    previousOperant = result;
    result = '';
    updateDisplay();
}

//Function to calculate Result
function calculateResult (){
    let evalutedResult;
    let prev = parseFloat(previousOperant);
    let current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            evalutedResult = prev + current;
            break;
            case '-':
                evalutedResult = prev - current;
                break;
            case '/':
                evalutedResult = prev / current;
            break;
            case '*':
                evalutedResult = prev * current;
            break;
        default:
            return;
    }
    result = evalutedResult.toString();
    operator = '';
    previousOperant = '';
}

//Function to append Number
function appendNumber(number){
    if(number === '.' && result.includes('.')) return;
    if(result === '0'){
        result = number;
    }else{
        result += number;
    }
    updateDisplay();
}

//Function to clear Display
function clearBtn(){
    result = '0';
    previousOperant = '';
    operator = '';
    updateDisplay();
}

//Function to Delete last Digit
function delateLastDigit(){
    if(result.length === 1){
        result = '0'
    }else{
        result = result.slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay(){
    if(operator){
        resultElement.innerText = `${previousOperant} ${operator} ${result}`
    }else{
        resultElement.innerText= result;
    }
}


//add event Listener
numberBtn.forEach(button =>{
    button.addEventListener('click', () =>{
        appendNumber (button.innerText);
    })
})


decimal.addEventListener('click', () => appendNumber('.'));
sum.addEventListener('click', () => selectOperator('+'));
minus.addEventListener('click', () => selectOperator('-'));
multiply.addEventListener('click', () => selectOperator('*'));
divide.addEventListener('click', () => selectOperator('/'));
equal.addEventListener('click', () =>{
    if(result === '') return;
    calculateResult();
    updateDisplay();
})
clear.addEventListener('click', clearBtn);
delate.addEventListener('click', delateLastDigit)