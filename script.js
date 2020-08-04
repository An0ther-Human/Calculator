function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1/num2;
}

function operate(num1, num2, operator){
    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '×':
            return multiply(num1, num2);
            break;   
        case '÷':
            if (num2 != 0){
                return divide(num1,num2);
            }else{
                i = text.length;
                return 'Calculation Failed.'
            }
        default:
            console.log('Something went wrong!')        
    }
}

const buttons = document.querySelectorAll('button');
for (i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', isOperator);
}
const input = document.querySelector('#input');
const ans = document.querySelector('#ans')
let userInput = '';
let answer;
let noMultiDivide = [];
let temp;
let text;
let useCounter = 0;
function isOperator(e){
    if (!useCounter >= 1){
        console.log(userInput)
        if (e.target.textContent == '.'){
            if (input.textContent.length == 0){
                userInput = '0.'
                input.textContent = userInput;
            }else{
                text = userInput.split(' ');
                if (text[text.length-1].indexOf('.') == -1){
                    if (text[text.length-1] ==''){
                        userInput += '0.';
                        input.textContent = userInput;
                    }else{
                        userInput += '.';
                        input.textContent = userInput;
                    }
                }
            }
        }else if (!e.target.classList.contains('noDisplay') && !e.target.classList.contains('operator')){
                userInput += e.target.textContent;
                input.textContent = userInput;
        }else if (!e.target.classList.contains('noDisplay')){
            if (input.textContent.length != 0){
                if (userInput.charAt(userInput.length-1) != ' '){
                    userInput += ` ${e.target.textContent} `;
                    input.textContent = userInput;
                }else{
                    userInput = userInput.slice(0,userInput.length-3);
                    userInput += ` ${e.target.textContent} `;
                    input.textContent = userInput;
                }
            }
        }else if(e.target.id == 'equal'){
            text = userInput.split(' ')
            let start;
            let previousValue;
            for(i = 0; i < text.length; i++){
                if ((text[i] == '×') || (text [i] == '÷')){
                    if ((text[i-2]!= '×') && (text[i-2]!= '÷')){
                        start = Number(text[i-1]);
                        temp = operate(start, Number(text[i+1]), text[i])
                        previousValue = temp;
                    }else{
                        start = previousValue;
                        temp = operate(start, Number(text[i+1]), text[i])
                        previousValue = temp;
                    }
                    noMultiDivide.pop();
                    noMultiDivide.push(temp);
                    i++;
                }else{
                    noMultiDivide.push(text[i]);
                }
            }
            start = Number(noMultiDivide[0]);
            console.log(noMultiDivide)
            if (!noMultiDivide.includes('Calculation failed.')){
                for(i =0; i<noMultiDivide.length; i++){
                    if (noMultiDivide.includes('+') || noMultiDivide.includes('-')){
                        if((noMultiDivide[i] == '+') || (noMultiDivide[i] == '-')){
                            answer = operate(start, Number(noMultiDivide[i+1]), noMultiDivide[i]);
                            start = answer;
                        }
                    }else{
                        answer = noMultiDivide[0];
                    }
                }
            }else{
                answer = 'Calculation failed.';
            }
            ans.textContent = answer;
            useCounter++
        }else if(e.target.id == 'backspace'){
            if (input.textContent.charAt(input.textContent.length -1) == ' '){
                input.textContent = input.textContent.slice(0,-3);
                userInput = userInput.slice(0,-3);
            }else{
                input.textContent = input.textContent.slice(0,-1);
                userInput = userInput.slice(0,-1);
            }
        }
    }
}

const ansBtn = document.querySelector('#ansBtn');
ansBtn.addEventListener('click', operateOnPreviousAns)

function operateOnPreviousAns(e){
    if (useCounter != 0){
        ans.textContent = null;
        noMultiDivide = [];
        userInput = answer.toString();
        input.textContent = userInput;
        useCounter = 0;
    }
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', resetCalculator)

function resetCalculator(e){
    userInput = '';
    input.textContent = '';
    ans.textContent = null;
    noMultiDivide = [];
    temp = null;
    text = null;
    useCounter = 0;
}