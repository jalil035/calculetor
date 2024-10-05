
let resultBtn = document.getElementById("result");
let clearBtn = document.getElementById("clear_btn");
let delateBtn = document.getElementById("delate");
let divideBtn = document.getElementById("divide");
let multiplyBtn = document.getElementById("multiply");
let minusBtn = document.getElementById("minus");
let sumBtn = document.getElementById("sum");
let decimalBtn = document.getElementById("decimal");
let equalBtn = document.getElementById("equal");
let numberBtn = document.querySelectorAll(".number");


let result = '';
let operation = '';
let previousOperand = 0;

function appendNumber(number){
    if(number === '.' && result.includes('.')){
        return;
    }
    result += number;
    updateDisplay()
}

//select operator 
function selectOperator(operatorValue){
    if(result === '') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }

    operation = operatorValue;
    previousOperand = result;
    result = ''
    updateDisplay();
}
//calculate Result
function calculateResult(){
    let evaluateResult;
    let pre = parseFloat(previousOperand);
    let current = parseFloat(result);

    if(isNaN(pre) || isNaN(current)) result;

    switch (operation) {
        case '+':
            evaluateResult = pre + current;
            break;
        case '-':
            evaluateResult = pre - current;
            break;
        case '*':
            evaluateResult = pre * current;
            break;
        case '/':
            evaluateResult = pre / current;
            break;
    
        default:
            return;
    }

    result = evaluateResult.toString();
    operation = '';
    previousOperand = '';
}

function updateDisplay(){
    if(operation){
        resultBtn.innerText = `${previousOperand} ${operation} ${result}`
    }else{
        resultBtn.innerHTML = result;
    }
}

function clearDisplay(){
    result = '0';
    previousOperand = '';
    operation = '';
    updateDisplay();
}

function delateLastDigit(){
    if(result !== ''){
        result = result.slice(0, -1)
        if(result === '') result = '0';
    }else if(operation !== ''){
        operation = '';
        result = previousOperand;
        previousOperand = '';
    }else if(previousOperand !== ''){
        previousOperand = previousOperand.slice(0, -1)
    };
    updateDisplay();
}

//add even Listner 
numberBtn.forEach(button =>{
    button.addEventListener('click', () =>{
        appendNumber(button.innerText);
    })
})

decimalBtn.addEventListener('click', () => appendNumber('.'));
sumBtn.addEventListener('click', () => selectOperator('+'));
minusBtn.addEventListener('click', () => selectOperator('-'));
multiplyBtn.addEventListener('click', () => selectOperator('*'));
divideBtn.addEventListener('click', () => selectOperator('/'));
equalBtn.addEventListener('click', () =>{
    if(result === '') result;
    calculateResult();
    updateDisplay();
});

clearBtn.addEventListener('click', clearDisplay);
delateBtn.addEventListener('click', delateLastDigit);