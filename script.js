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
    buttons[i].addEventListener('mousedown', e => {
        e.target.setAttribute('style','box-shadow: 5px 5px black; transform: translateY(5px);')
    })
    buttons[i].addEventListener('mouseup', e => {
        e.target.setAttribute('style', 'box-shadow: 5px 9px black; transform: translateY(0px);')
    })
    // buttons[i].addEventListener('keydown', isOperator);
}
window.addEventListener('keydown', isOperator);
window.addEventListener('keyup', unPress)


const input = document.querySelector('#input');
const ans = document.querySelector('#ans')
let userInput = '';
let answer;
let noMultiDivide = [];
let temp;
let text;
let useCounter = 0;
const validKeycodes = [55, 56, 57, 191, 52, 53, 54, 56, 49, 50, 51, 189, 48, 190, 65, 187, 67, 8,69];
const validShiftKeycodes = [56, 187];
function isOperator(e){
    console.log(e.type)
    let content = e.target.textContent;
    let has2Class = !e.target.classList.contains('noDisplay') && !e.target.classList.contains('operator');
    let hasClass = !e.target.classList.contains('noDisplay');
    let target = e.target;
    if (e.type != 'click'){
        if (validKeycodes.includes(e.keyCode)){
            let pressedBtn = document.querySelector(`button[data-key="${e.keyCode}"]`);
            content = pressedBtn.textContent;
            has2Class = !pressedBtn.classList.contains('operator') && !pressedBtn.classList.contains('noDisplay');
            hasClass = !pressedBtn.classList.contains('noDisplay');
            target = pressedBtn;

            console.log(pressedBtn.style)
            pressedBtn.setAttribute('style', 'box-shadow: 5px 5px black; transform: translateY(5px)');
            console.log(pressedBtn.style)

            if (e.keyCode == 187){
                pressedBtn = document.querySelector(`button[data-key2="187"]`);
                content = pressedBtn.textContent;
                has2Class = !pressedBtn.classList.contains('operator') && !pressedBtn.classList.contains('noDisplay');
                hasClass = !pressedBtn.classList.contains('noDisplay');
                target = pressedBtn;
            }
            if (e.shiftKey){
                if (validShiftKeycodes.includes(e.keyCode)){
                    switch(e.keyCode){
                        case 56:
                            content = '×';
                            has2Class = false;
                            hasClass = true;
                            break;
                        case 187:
                            content = '+';
                            has2Class = false;
                            hasClass = true;
                    }
                }
            }
        }else{
            return;
        } 
    }
    if (content == '.'){
        if (!useCounter >= 1){
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
        }
    }else if (has2Class){
        if (!useCounter >= 1){
            userInput += content;
            input.textContent = userInput;
        }
    }else if (hasClass){
        if (!useCounter >= 1){
            if (input.textContent.length != 0){
                if (userInput.charAt(userInput.length-1) != ' '){
                    userInput += ` ${content} `;
                    input.textContent = userInput;
                }else{
                    userInput = userInput.slice(0,userInput.length-3);
                    userInput += ` ${content} `;
                    input.textContent = userInput;
                }
            }
        }
    }else if(target.id == 'equal'){
        if (!useCounter >= 1){
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
        }
    }else if(target.id == 'backspace'){
        if (!useCounter >= 1){
            if (input.textContent.charAt(input.textContent.length -1) == ' '){
                input.textContent = input.textContent.slice(0,-3);
                userInput = userInput.slice(0,-3);
            }else{
                input.textContent = input.textContent.slice(0,-1);
                userInput = userInput.slice(0,-1);
            }
        }
    }else if (target.id == 'ansBtn'){
        if (useCounter != 0){
            ans.textContent = null;
            noMultiDivide = [];
            userInput = answer.toString();
            input.textContent = userInput;
            useCounter = 0;
        }
    }else if(target.id == 'clear'){
        userInput = '';
        input.textContent = '';
        ans.textContent = null;
        noMultiDivide = [];
        temp = null;
        text = null;
        useCounter = 0;
    }
}

// const ansBtn = document.querySelector('#ansBtn');
// ansBtn.addEventListener('click', operateOnPreviousAns)
// window.addEventListener('keydown', operateOnPreviousAns);

// function operateOnPreviousAns(e){
//     if (useCounter != 0){
//         ans.textContent = null;
//         noMultiDivide = [];
//         userInput = answer.toString();
//         input.textContent = userInput;
//         useCounter = 0;
//     }
// }

// const clear = document.querySelector('#clear');
// clear.addEventListener('click', resetCalculator)

// function resetCalculator(e){
//     userInput = '';
//     input.textContent = '';
//     ans.textContent = null;
//     noMultiDivide = [];
//     temp = null;
//     text = null;
//     useCounter = 0;
// }


function keyBorardOperation(e){
    let pressedBtn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    console.log(pressedBtn);
    console.log(pressedBtn.textContent);
    console.log(!pressedBtn.classList.contains('operator') && !pressedBtn.classList.contains('nodisplay'))
    console.log(!pressedBtn.classList.contains('noDisplay'))
    console.log(pressedBtn.id)
    // console.log(pressedBtn.type)
}

function unPress(e){
    if (validKeycodes.includes(e.keyCode)){
        let pressedBtn = document.querySelector(`button[data-key="${e.keyCode}"]`);
        pressedBtn.setAttribute('style', 'box-shadow: 5px 9px black; transform: translateY(0px);')
    }
}